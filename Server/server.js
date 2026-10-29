import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

import eventRequestsRouter from "./routes/eventRequests.js";
import supabase from "./supabase.js";

import ecaAdminRouter from "./routes/ecaAdmin.js";

// =====================================================
// ENVIRONMENT CONFIGURATION
// =====================================================

dotenv.config();

const app = express();

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

// =====================================================
// CORS CONFIGURATION
// =====================================================

const allowedOrigins = [
  "https://skit-ds-2023-2027-09.vercel.app",
  "https://orbix-himanshu-preview.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, origin || false);
      }

      console.error("CORS blocked origin:", origin);

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(express.json());

app.use(cookieParser());

// =====================================================
// EVENT REQUEST ROUTES
// =====================================================

app.use(
  "/api/event-requests",
  eventRequestsRouter
);

// =====================================================
// ECA ADMIN ROUTES
// =====================================================

app.use("/api/eca", ecaAdminRouter);

// =====================================================
// CORS DEBUG
// =====================================================

app.get("/debug/cors", (req, res) => {
  res.json({
    originReceived: req.headers.origin || null,
    allowed: allowedOrigins.includes(req.headers.origin),
    version: "cors-fix-v2",
  });
});

// =====================================================
// SERVER HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {
  res.json({
    message: "Orbix server is running",
  });
});

// =====================================================
// COOKIE CONFIGURATION
// =====================================================

function setAuthCookie(res, token) {
  const isProduction =
    process.env.NODE_ENV === "production" ||
    Boolean(process.env.VERCEL);

  res.cookie("token", token, {
    httpOnly: true,

    secure: isProduction,

    sameSite: isProduction ? "none" : "lax",

    maxAge: 24 * 60 * 60 * 1000,

    path: "/",
  });
}

// =====================================================
// GOOGLE AUTHORIZATION CODE VERIFICATION
// =====================================================

async function verifyGoogleCode(code) {
  if (!code || typeof code !== "string") {
    const error = new Error(
      "Authorization code is missing"
    );

    error.statusCode = 400;
    throw error;
  }

  // Exchange authorization code for Google tokens
  const { tokens } = await googleClient.getToken({
    code,
    redirect_uri: "postmessage",
  });

  if (!tokens.id_token) {
    throw new Error(
      "Google ID token was not received"
    );
  }

  // Verify Google ID token
  const ticket = await googleClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error(
      "Google account information is unavailable"
    );
  }

  const email = payload.email?.trim().toLowerCase();

  // Only verified SKIT Google Workspace accounts
  if (
    !payload.email_verified ||
    payload.hd !== "skit.ac.in" ||
    !email?.endsWith("@skit.ac.in")
  ) {
    const error = new Error(
      "Only verified SKIT Google accounts are allowed"
    );

    error.statusCode = 403;
    throw error;
  }

  return {
    email,
    name: payload.name || email.split("@")[0],
  };
}

// =====================================================
// STUDENT GOOGLE LOGIN
// POST /auth/google
// =====================================================

app.post("/auth/google", async (req, res) => {
  try {
    const { email, name } =
      await verifyGoogleCode(req.body.code);

    // Student-specific JWT
    const token = jwt.sign(
      {
        email,
        name,
        role: "student",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    setAuthCookie(res, token);

    console.log(
      "Student login successful:",
      email
    );

    return res.status(200).json({
      message: "SKIT login successful",

      authenticated: true,

      role: "student",

      name,

      email,

      studentId: email.split("@")[0],
    });

  } catch (error) {
    console.error(
      "Student authentication error:",
      error
    );

    return res.status(
      error.statusCode || 500
    ).json({
      message:
        error.statusCode
          ? error.message
          : "Google authentication failed",
    });
  }
});

// =====================================================
// CLUB GOOGLE LOGIN
// POST /auth/club/google
// =====================================================

app.post("/auth/club/google", async (req, res) => {
  try {
    // Step 1: Verify Google account
    const { email, name } =
      await verifyGoogleCode(req.body.code);

    // Step 2: Find registered club in Supabase
    const { data: club, error } = await supabase
      .from("clubs")
      .select(
        "id, club_name, club_email"
      )
      .ilike("club_email", email)
      .maybeSingle();

    if (error) {
      console.error(
        "Club lookup error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to verify club account",
      });
    }

    // Step 3: Reject unregistered club accounts
    if (!club) {
      return res.status(403).json({
        message:
          "This email is not registered as a club account",
      });
    }

    // Step 4: Generate club-specific JWT
    const token = jwt.sign(
      {
        email,

        name,

        role: "club",

        clubId: club.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Step 5: Save club session cookie
    setAuthCookie(res, token);

    console.log(
      "Club login successful:",
      club.club_name,
      "ID:",
      club.id
    );

    // Step 6: Return club information
    return res.status(200).json({
      message: "Club login successful",

      authenticated: true,

      role: "club",

      clubId: club.id,

      clubName: club.club_name,

      email: club.club_email,
    });

  } catch (error) {
    console.error(
      "Club authentication error:",
      error
    );

    return res.status(
      error.statusCode || 500
    ).json({
      message:
        error.statusCode
          ? error.message
          : "Club Google login failed",
    });
  }
});
// =====================================================
// ECA ADMIN GOOGLE LOGIN
// POST /auth/eca/google
// =====================================================

app.post("/auth/eca/google", async (req, res) => {
  try {
    // 1. Verify Google account
    const { email, name } = await verifyGoogleCode(
      req.body.code
    );

    // 2. Check ECA admin registration in Supabase
    const { data: admin, error } = await supabase
      .from("eca_admins")
      .select("id, name, email, role, is_active")
      .ilike("email", email)
      .maybeSingle();

    if (error) {
      console.error("ECA admin lookup error:", error);

      return res.status(500).json({
        message: "Failed to verify ECA administrator",
      });
    }

    // 3. Only active registered admins can log in
    if (!admin || !admin.is_active) {
      return res.status(403).json({
        message:
          "This Google account is not authorized for ECA administration",
      });
    }

    // 4. Create ECA-specific JWT
    const token = jwt.sign(
      {
        email,
        name: admin.name || name,
        role: "eca_admin",
        adminId: admin.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // 5. Set existing secure session cookie
    setAuthCookie(res, token);

    return res.status(200).json({
      authenticated: true,
      role: "eca_admin",
      adminId: admin.id,
      name: admin.name,
      email: admin.email,
      message: "ECA Admin login successful",
    });
  } catch (error) {
    console.error("ECA login error:", error);

    return res.status(error.statusCode || 500).json({
      message:
        error.statusCode
          ? error.message
          : "ECA Google authentication failed",
    });
  }
});

// =====================================================
// VERIFY ECA ADMIN SESSION
// GET /auth/eca/me
// =====================================================

app.get("/auth/eca/me", async (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      authenticated: false,
      message: "ECA Admin login required",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (
      decoded.role !== "eca_admin" ||
      !decoded.adminId ||
      !decoded.email
    ) {
      return res.status(403).json({
        authenticated: false,
        message: "Access restricted to ECA administrators",
      });
    }

    // Verify admin is still active in database
    const { data: admin, error } = await supabase
      .from("eca_admins")
      .select("id, name, email, role, is_active")
      .eq("id", decoded.adminId)
      .ilike("email", decoded.email)
      .maybeSingle();

    if (error) {
      console.error("ECA session verification error:", error);

      return res.status(500).json({
        authenticated: false,
        message: "Failed to verify ECA session",
      });
    }

    if (!admin || !admin.is_active) {
      return res.status(403).json({
        authenticated: false,
        message: "ECA administrator is no longer authorized",
      });
    }

    return res.status(200).json({
      authenticated: true,
      role: "eca_admin",
      adminId: admin.id,
      name: admin.name,
      email: admin.email,
    });
  } catch (error) {
    return res.status(401).json({
      authenticated: false,
      message: "Invalid or expired ECA session",
    });
  }
});
// =====================================================
// CHECK CURRENT LOGIN SESSION
// GET /auth/me
// =====================================================

app.get("/auth/me", (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      authenticated: true,

      name: decoded.name,

      email: decoded.email,

      role: decoded.role || "student",

      studentId:
        decoded.email?.split("@")[0] || null,

      clubId: decoded.clubId || null,
    });

  } catch (error) {
    return res.status(401).json({
      message:
        "Invalid or expired session",
    });
  }
});

// =====================================================
// CHECK CLUB LOGIN SESSION
// GET /auth/club/me
// =====================================================

app.get("/auth/club/me", async (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "Club login required",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Only club accounts can access this endpoint
    if (
      decoded.role !== "club" ||
      !decoded.clubId
    ) {
      return res.status(403).json({
        message:
          "Access restricted to club accounts",
      });
    }

    // Verify club still exists and email is registered
    const { data: club, error } = await supabase
      .from("clubs")
      .select(
        "id, club_name, club_email"
      )
      .eq("id", decoded.clubId)
      .ilike("club_email", decoded.email)
      .maybeSingle();

    if (error) {
      console.error(
        "Club session lookup error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to verify club session",
      });
    }

    if (!club) {
      return res.status(403).json({
        message:
          "Club account is no longer authorized",
      });
    }

    return res.status(200).json({
      authenticated: true,

      role: "club",

      clubId: club.id,

      clubName: club.club_name,

      email: club.club_email,
    });

  } catch (error) {
    return res.status(401).json({
      message:
        "Invalid or expired club session",
    });
  }
});

// =====================================================
// LOGOUT
// GET /logout
// =====================================================

app.get("/logout", (req, res) => {
  const isProduction =
    process.env.NODE_ENV === "production" ||
    Boolean(process.env.VERCEL);

  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
});

// =====================================================
// EXPORT APP FOR VERCEL
// =====================================================

export default app;

// =====================================================
// START SERVER LOCALLY
// =====================================================

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(
      `Orbix backend running on port ${PORT}`
    );
  });
}