import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);


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
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());


// ================= SERVER CHECK =================
app.get("/", (req, res) => {
  res.json({ message: "Orbix server is running" });
});


// ================= GOOGLE LOGIN =================
app.post("/auth/google", async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        message: "Authorization code is missing",
      });
    }


    // Exchange Google authorization code
    const { tokens } = await googleClient.getToken({
      code,
      redirect_uri: "postmessage",
    });


    // Verify Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });


    // Google user information
    const payload = ticket.getPayload();

    const email = payload.email;
    const name = payload.name;
    const emailVerified = payload.email_verified;


    // ================= SKIT EMAIL CHECK =================
    if (
      !emailVerified ||
      !email ||
      !email.toLowerCase().endsWith("@skit.ac.in")
    ) {
      return res.status(403).json({
        message: "Only SKIT college email IDs are allowed.",
      });
    }


    // ================= CREATE JWT =================
    const token = jwt.sign(
      {
        email: email,
        name: name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );


    // ================= SAVE JWT COOKIE =================
    const isProduction = process.env.NODE_ENV === "production";

res.cookie("token", token, {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000,
});


    // Login success
    res.json({
      message: "SKIT login successful",
      name: name,
      email: email,
      studentId: email.split("@")[0],
    });

  } catch (error) {
    console.error("Google authentication error:", error);

    res.status(500).json({
      message: "Google authentication failed",
    });
  }
});


// ================= CHECK LOGGED-IN USER =================
app.get("/auth/me", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }

  try {

    // decoded ONLY exists here after jwt.verify()
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    res.json({
      authenticated: true,
      name: decoded.name,
      email: decoded.email,
      studentId: decoded.email.split("@")[0],
    });

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired session",
    });
  }
});


// ================= START SERVER =================
// Export Express app for Vercel
export default app;

// Start server only for local development
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Orbix backend running on port ${PORT}`);
  });
}