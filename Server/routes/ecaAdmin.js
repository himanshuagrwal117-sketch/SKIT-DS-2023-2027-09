import express from "express";
import jwt from "jsonwebtoken";
import supabase from "../supabase.js";

const router = express.Router();

// =====================================================
// AUTHENTICATION
// =====================================================

async function requireEcaAdmin(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "ECA Admin login required",
      });
    }

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
        success: false,
        message: "ECA Admin access required",
      });
    }

    // Verify admin is still active.
    const { data: admin, error } = await supabase
      .from("eca_admins")
      .select("id, name, email, role, is_active")
      .eq("id", decoded.adminId)
      .ilike("email", decoded.email)
      .maybeSingle();

    if (error) {
      console.error("ECA admin verification error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to verify ECA Admin",
      });
    }

    if (
      !admin ||
      !admin.is_active ||
      admin.role !== "eca_admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "ECA Admin account is not authorized",
      });
    }

    req.ecaAdmin = admin;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired ECA session",
    });
  }
}

// =====================================================
// VALIDATE EVENT ID
// =====================================================

function validateEventId(req, res, next) {
  const id = String(req.params.id || "");

  if (!/^[1-9]\d*$/.test(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid event request ID",
    });
  }

  next();
}

// =====================================================
// GET ALL EVENT REQUESTS
// =====================================================

router.get(
  "/event-requests",
  requireEcaAdmin,
  async (req, res) => {
    try {
      const status = req.query.status;

      const allowedStatuses = [
        "draft",
        "pending",
        "approved",
        "rejected",
      ];

      if (
        status &&
        !allowedStatuses.includes(status)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid event status filter",
        });
      }

      let query = supabase
  .from("event_requests")
  .select(`
    *,
    clubs (
      id,
      club_name
    )
  `)
  .order("created_at", {
    ascending: false,
  });

      if (status) {
        query = query.eq("status", status);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return res.status(200).json({
        success: true,
        total: data?.length ?? 0,
        events: data ?? [],
      });
    } catch (error) {
      console.error("Fetch ECA event requests:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch event requests",
      });
    }
  }
);

// =====================================================
// GET SINGLE EVENT REQUEST
// =====================================================

router.get(
  "/event-requests/:id",
  requireEcaAdmin,
  validateEventId,
  async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("event_requests")
        .select(`
  *,
  clubs (
    id,
    club_name
  )
`)
        .eq("id", req.params.id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Event request not found",
        });
      }

      return res.status(200).json({
        success: true,
        event: data,
      });
    } catch (error) {
      console.error("Fetch ECA event details:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch event details",
      });
    }
  }
);

// =====================================================
// APPROVE EVENT PROPOSAL
// =====================================================

router.patch(
  "/event-requests/:id/approve",
  requireEcaAdmin,
  validateEventId,
  async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("event_requests")
        .update({
          status: "approved",

          reviewed_by: req.ecaAdmin.id,

          reviewed_at: new Date().toISOString(),

          rejection_reason: null,

          updated_at: new Date().toISOString(),
        })
        .eq("id", req.params.id)
        .eq("status", "pending")
        .select()
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (!data) {
        return res.status(409).json({
          success: false,
          message:
            "Event request is not pending or has already been reviewed",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Event proposal approved successfully",
        event: data,
      });
    } catch (error) {
      console.error("Approve event proposal:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to approve event proposal",
      });
    }
  }
);

// =====================================================
// REJECT EVENT PROPOSAL
// =====================================================

router.patch(
  "/event-requests/:id/reject",
  requireEcaAdmin,
  validateEventId,
  async (req, res) => {
    try {
      const reason =
        typeof req.body?.reason === "string"
          ? req.body.reason.trim()
          : "";

      if (!reason || reason.length > 1000) {
        return res.status(400).json({
          success: false,
          message:
            "A rejection reason between 1 and 1000 characters is required",
        });
      }

      const { data, error } = await supabase
        .from("event_requests")
        .update({
          status: "rejected",

          rejection_reason: reason,

          reviewed_by: req.ecaAdmin.id,

          reviewed_at: new Date().toISOString(),

          updated_at: new Date().toISOString(),
        })
        .eq("id", req.params.id)
        .eq("status", "pending")
        .select()
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (!data) {
        return res.status(409).json({
          success: false,
          message:
            "Event request is not pending or has already been reviewed",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Event proposal rejected successfully",
        event: data,
      });
    } catch (error) {
      console.error("Reject event proposal:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to reject event proposal",
      });
    }
  }
);

export default router;