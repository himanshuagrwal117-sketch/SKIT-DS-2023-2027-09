import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import crypto from "node:crypto";
import supabase from "../supabase.js";
import { Resend } from "resend";


const router = express.Router();

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const BUCKET = "event-proposals";

// ============================================
// PDF UPLOAD CONFIGURATION
// ============================================

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: MAX_FILE_SIZE,
  },

  fileFilter: (req, file, callback) => {
    if (file.mimetype !== "application/pdf") {
      return callback(
        new Error("Only PDF files are allowed")
      );
    }

    callback(null, true);
  },
});

// ============================================
// AUTHENTICATION MIDDLEWARE
// ============================================

function requireAuth(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "Please log in first",
    });
  }

  try {
    req.user = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired login session",
    });
  }
}

// ============================================
// CLUB AUTHENTICATION MIDDLEWARE
// ============================================

async function requireClubAuth(req, res, next) {
  try {
    // Only club accounts are allowed
    if (
      req.user?.role !== "club" ||
      !req.user?.clubId ||
      !req.user?.email
    ) {
      return res.status(403).json({
        message:
          "Only authenticated club accounts can submit events",
      });
    }

    // Verify that the club still exists
    // and the registered email matches.
    const { data: club, error } = await supabase
      .from("clubs")
      .select("id, club_name, club_email")
      .eq("id", req.user.clubId)
      .ilike("club_email", req.user.email)
      .maybeSingle();

    if (error) {
      console.error(
        "Club verification error:",
        error
      );

      return res.status(500).json({
        message: "Failed to verify club account",
      });
    }

    if (!club) {
      return res.status(403).json({
        message:
          "Club account is not registered or authorized",
      });
    }

    // Use actual club ID from database
    req.clubId = club.id;
    req.club = club;

    next();
  } catch (error) {
    console.error(
      "Club authentication error:",
      error
    );

    return res.status(500).json({
      message: "Club authentication failed",
    });
  }
}

// ============================================
// VALIDATION HELPERS
// ============================================

function optionalText(value, maxLength = 3000) {
  if (typeof value !== "string") {
    return null;
  }

  return value.trim().slice(0, maxLength) || null;
}

function optionalDate(value) {
  if (!value) {
    return null;
  }

  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
    Number.isNaN(
      Date.parse(`${value}T00:00:00Z`)
    )
  ) {
    throw new Error("Invalid event date");
  }

  return value;
}

function optionalTime(value) {
  if (!value) {
    return null;
  }

  if (
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(value)
  ) {
    throw new Error("Invalid event time");
  }

  return value;
}

// ============================================
// RESEND EMAIL NOTIFICATION
// ============================================

// ============================================
// ORBIX - ECA EMAIL NOTIFICATION
// ============================================

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatEmailDate(date) {
  if (!date) return "Not provided";

  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return escapeHtml(date);
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatEmailTime(time) {
  if (!time) return "Not provided";

  const [hours, minutes] = String(time)
    .split(":")
    .map(Number);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes)
  ) {
    return escapeHtml(time);
  }

  return new Date(
    2000,
    0,
    1,
    hours,
    minutes
  ).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function sendEcaNotification(event, club) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.ECA_NOTIFICATION_EMAIL;

  if (!apiKey || !from || !to) {
    throw new Error(
      "Resend email configuration is incomplete"
    );
  }

  const resend = new Resend(apiKey);

  const eventName = escapeHtml(event.event_name);
  const clubName = escapeHtml(club.club_name);
  const clubEmail = escapeHtml(club.club_email);

  const eventDate = formatEmailDate(event.event_date);

  const startTime = formatEmailTime(event.start_time);
  const endTime = formatEmailTime(event.end_time);

  const venue = escapeHtml(
    event.venue || "Not provided"
  );

  const motive = escapeHtml(
    event.motive || "Not provided"
  );

  const requirements = escapeHtml(
    event.eca_requirements || "Not provided"
  );

  const trophyCount = escapeHtml(
    event.trophy_count ?? 0
  );

  const requestId = escapeHtml(event.id);
  const clubId = escapeHtml(club.id);

  const submittedAt = event.created_at
    ? new Date(event.created_at).toLocaleString(
        "en-IN",
        {
          timeZone: "Asia/Kolkata",
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      )
    : "Not available";

  // The review page will be implemented in Step 6.2.
  // This URL must point to a protected ECA review page.
  const reviewBaseUrl = process.env.ECA_REVIEW_URL;

  let reviewUrl = null;

  if (reviewBaseUrl) {
    try {
      const url = new URL(reviewBaseUrl);
      url.searchParams.set("eventId", String(event.id));

      if (url.protocol === "https:" ||
          (
            process.env.NODE_ENV !== "production" &&
            url.protocol === "http:" &&
            ["localhost", "127.0.0.1"].includes(
              url.hostname
            )
          )) {
        reviewUrl = escapeHtml(url.toString());
      }
    } catch {
      console.error("Invalid ECA_REVIEW_URL");
    }
  }

  const detailRow = (label, value) => `
    <tr>
      <td
        style="
          padding: 13px 16px;
          border-bottom: 1px solid #F0F0F0;
          font-size: 13px;
          color: #777777;
          width: 40%;
          vertical-align: top;
        "
      >
        ${label}
      </td>

      <td
        style="
          padding: 13px 16px;
          border-bottom: 1px solid #F0F0F0;
          font-size: 13px;
          font-weight: 600;
          color: #252525;
          vertical-align: top;
        "
      >
        ${value}
      </td>
    </tr>
  `;

  const html = `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8" />

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />

    <title>Orbix Event Approval Request</title>
  </head>

  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #F5F5F7;
      font-family: Arial, Helvetica, sans-serif;
      color: #252525;
    "
  >

    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="background-color: #F5F5F7;"
    >
      <tr>
        <td
          align="center"
          style="padding: 35px 15px;"
        >

          <!-- MAIN EMAIL CONTAINER -->

          <table
            role="presentation"
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="
              max-width: 620px;
              background: #FFFFFF;
              border-radius: 14px;
              overflow: hidden;
              border: 1px solid #EAEAEA;
            "
          >

            <!-- ORBIX HEADER -->

            <tr>
              <td
                style="
                  background-color: #900505;
                  padding: 28px 30px;
                "
              >

                <table
                  role="presentation"
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                >
                  <tr>
                    <td>
                      <div
                        style="
                          color: #FFFFFF;
                          font-size: 29px;
                          font-weight: 800;
                          letter-spacing: -1px;
                        "
                      >
                        ORBIX
                      </div>

                      <div
                        style="
                          color: #F5DADA;
                          font-size: 11px;
                          letter-spacing: 1.4px;
                          margin-top: 5px;
                        "
                      >
                        CLUB & EVENT MANAGEMENT
                      </div>
                    </td>

                    <td
                      align="right"
                      style="
                        color: #FFFFFF;
                        font-size: 12px;
                        font-weight: 600;
                      "
                    >
                      ECA CELL
                      <br />
                      <span
                        style="
                          font-size: 11px;
                          font-weight: 400;
                          color: #F5DADA;
                        "
                      >
                        SKIT Jaipur
                      </span>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- TITLE SECTION -->

            <tr>
              <td style="padding: 30px 30px 20px;">

                <div
                  style="
                    font-size: 11px;
                    font-weight: 700;
                    color: #900505;
                    letter-spacing: 1.3px;
                    margin-bottom: 9px;
                  "
                >
                  NEW EVENT REQUEST
                </div>

                <h1
                  style="
                    font-size: 23px;
                    line-height: 1.35;
                    font-weight: 700;
                    color: #222222;
                    margin: 0 0 12px;
                  "
                >
                  Event Approval Required
                </h1>

                <p
                  style="
                    font-size: 13px;
                    line-height: 1.8;
                    color: #777777;
                    margin: 0;
                  "
                >
                  A new event proposal has been submitted
                  by <strong style="color: #333333;">
                    ${clubName}
                  </strong>.

                  Please review the event information
                  before taking any action.
                </p>

              </td>
            </tr>

            <!-- STATUS CARD -->

            <tr>
              <td style="padding: 0 30px 22px;">

                <table
                  role="presentation"
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    background-color: #FFF8EA;
                    border: 1px solid #F5E6C8;
                    border-radius: 9px;
                  "
                >
                  <tr>
                    <td style="padding: 14px 16px;">

                      <span
                        style="
                          font-size: 12px;
                          font-weight: 700;
                          color: #A46A14;
                        "
                      >
                        &#9679; PENDING APPROVAL
                      </span>

                    </td>

                    <td
                      align="right"
                      style="
                        padding: 14px 16px;
                        font-size: 12px;
                        color: #A46A14;
                      "
                    >
                      Request #${requestId}
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- EVENT NAME -->

            <tr>
              <td style="padding: 0 30px 22px;">

                <div
                  style="
                    background-color: #FFF5F5;
                    border-left: 4px solid #900505;
                    border-radius: 5px;
                    padding: 17px 20px;
                  "
                >

                  <div
                    style="
                      font-size: 11px;
                      font-weight: 700;
                      color: #900505;
                      letter-spacing: 1px;
                      margin-bottom: 7px;
                    "
                  >
                    EVENT NAME
                  </div>

                  <div
                    style="
                      font-size: 19px;
                      font-weight: 700;
                      line-height: 1.4;
                      color: #252525;
                    "
                  >
                    ${eventName}
                  </div>

                </div>

              </td>
            </tr>

            <!-- CLUB DETAILS -->

            <tr>
              <td style="padding: 0 30px 22px;">

                <h2
                  style="
                    font-size: 14px;
                    font-weight: 700;
                    color: #252525;
                    margin: 0 0 12px;
                  "
                >
                  Organizing Club
                </h2>

                <table
                  role="presentation"
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    border: 1px solid #EAEAEA;
                    border-radius: 8px;
                    border-collapse: separate;
                    border-spacing: 0;
                  "
                >

                  ${detailRow("Club Name", clubName)}
                  ${detailRow("Club ID", clubId)}
                  ${detailRow("Club Email", clubEmail)}

                </table>

              </td>
            </tr>

            <!-- EVENT DETAILS -->

            <tr>
              <td style="padding: 0 30px 22px;">

                <h2
                  style="
                    font-size: 14px;
                    font-weight: 700;
                    color: #252525;
                    margin: 0 0 12px;
                  "
                >
                  Event Information
                </h2>

                <table
                  role="presentation"
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    border: 1px solid #EAEAEA;
                    border-radius: 8px;
                    border-collapse: separate;
                    border-spacing: 0;
                  "
                >

                  ${detailRow("Event Date", eventDate)}

                  ${detailRow(
                    "Event Timing",
                    `${startTime} - ${endTime}`
                  )}

                  ${detailRow("Venue", venue)}

                  ${detailRow(
                    "Trophies Required",
                    trophyCount
                  )}

                  ${detailRow(
                    "Submitted At",
                    escapeHtml(submittedAt)
                  )}

                </table>

              </td>
            </tr>

            <!-- EVENT MOTIVE -->

            <tr>
              <td style="padding: 0 30px 22px;">

                <h2
                  style="
                    font-size: 14px;
                    font-weight: 700;
                    color: #252525;
                    margin: 0 0 12px;
                  "
                >
                  Event Motive
                </h2>

                <div
                  style="
                    background: #F8F8FA;
                    border: 1px solid #EEEEEE;
                    border-radius: 8px;
                    padding: 16px;
                    font-size: 13px;
                    line-height: 1.8;
                    color: #555555;
                    white-space: pre-wrap;
                    overflow-wrap: anywhere;
                  "
                >${motive}</div>

              </td>
            </tr>

            <!-- ECA REQUIREMENTS -->

            <tr>
              <td style="padding: 0 30px 25px;">

                <h2
                  style="
                    font-size: 14px;
                    font-weight: 700;
                    color: #252525;
                    margin: 0 0 12px;
                  "
                >
                  Requirements from ECA
                </h2>

                <div
                  style="
                    background: #F8F8FA;
                    border: 1px solid #EEEEEE;
                    border-radius: 8px;
                    padding: 16px;
                    font-size: 13px;
                    line-height: 1.8;
                    color: #555555;
                    white-space: pre-wrap;
                    overflow-wrap: anywhere;
                  "
                >${requirements}</div>

              </td>
            </tr>

            <!-- APPROVAL ACTIONS -->

            <tr>
              <td style="padding: 0 30px 28px;">

                <div
                  style="
                    border-top: 1px solid #EEEEEE;
                    padding-top: 23px;
                  "
                >

                  <h2
                    style="
                      font-size: 16px;
                      font-weight: 700;
                      color: #252525;
                      margin: 0 0 9px;
                    "
                  >
                    Review This Request
                  </h2>

                  <p
                    style="
                      font-size: 12px;
                      line-height: 1.7;
                      color: #777777;
                      margin: 0 0 20px;
                    "
                  >
                    Review the event details before
                    approving or rejecting the request.
                  </p>

                  ${
                    reviewUrl
                      ? `
                    <table
                      role="presentation"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tr>

                        <td
                          width="50%"
                          style="padding-right: 6px;"
                        >
                          <a
                            href="${reviewUrl}&action=approve"
                            style="
                              display: block;
                              text-align: center;
                              background: #16804A;
                              color: #FFFFFF;
                              text-decoration: none;
                              font-size: 13px;
                              font-weight: 700;
                              padding: 14px 8px;
                              border-radius: 8px;
                            "
                          >
                            Approve Event
                          </a>
                        </td>

                        <td
                          width="50%"
                          style="padding-left: 6px;"
                        >
                          <a
                            href="${reviewUrl}&action=reject"
                            style="
                              display: block;
                              text-align: center;
                              background: #C53030;
                              color: #FFFFFF;
                              text-decoration: none;
                              font-size: 13px;
                              font-weight: 700;
                              padding: 14px 8px;
                              border-radius: 8px;
                            "
                          >
                            Reject Event
                          </a>
                        </td>

                      </tr>
                    </table>

                    <p
                      style="
                        margin: 14px 0 0;
                        font-size: 11px;
                        line-height: 1.7;
                        color: #999999;
                      "
                    >
                      Both buttons open the secure
                      Orbix ECA review page.
                      Login and confirmation are required.
                    </p>
                  `
                      : `
                    <div
                      style="
                        padding: 14px 16px;
                        border: 1px solid #E5E7EB;
                        border-radius: 8px;
                        background: #F9FAFB;
                        color: #666666;
                        font-size: 12px;
                        line-height: 1.7;
                      "
                    >
                      Approval actions will be available
                      through the Orbix ECA review portal.
                      The secure review page is currently
                      being configured.
                    </div>
                  `
                  }

                </div>

              </td>
            </tr>

            <!-- FOOTER -->

            <tr>
              <td
                style="
                  background: #F8F8FA;
                  padding: 24px 30px;
                  border-top: 1px solid #EEEEEE;
                  text-align: center;
                "
              >

                <div
                  style="
                    color: #900505;
                    font-size: 17px;
                    font-weight: 800;
                    letter-spacing: -0.5px;
                    margin-bottom: 7px;
                  "
                >
                  ORBIX
                </div>

                <div
                  style="
                    color: #777777;
                    font-size: 11px;
                    line-height: 1.8;
                  "
                >
                  Extra-Curricular Activities Cell
                  <br />
                  Swami Keshvanand Institute of Technology
                  <br />
                  Jaipur, Rajasthan
                </div>

                <div
                  style="
                    margin-top: 16px;
                    padding-top: 14px;
                    border-top: 1px solid #EAEAEA;
                    color: #AAAAAA;
                    font-size: 10px;
                    line-height: 1.7;
                  "
                >
                  This is an automated notification
                  generated by Orbix.
                  <br />
                  Please do not reply to this email.
                </div>

              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;

  const plainText = `
ORBIX - ECA EVENT APPROVAL REQUEST

A new event request has been submitted.

REQUEST DETAILS
------------------------------
Request ID: ${event.id}
Status: PENDING APPROVAL

CLUB DETAILS
------------------------------
Club Name: ${club.club_name}
Club ID: ${club.id}
Club Email: ${club.club_email}

EVENT DETAILS
------------------------------
Event Name: ${event.event_name}
Event Date: ${event.event_date || "Not provided"}
Start Time: ${event.start_time || "Not provided"}
End Time: ${event.end_time || "Not provided"}
Venue: ${event.venue || "Not provided"}
Trophies Required: ${event.trophy_count ?? 0}

EVENT MOTIVE
------------------------------
${event.motive || "Not provided"}

ECA REQUIREMENTS
------------------------------
${event.eca_requirements || "Not provided"}

Submitted At: ${submittedAt}

Please review this request through
the authorized Orbix ECA review portal.

Extra-Curricular Activities Cell
SKIT Jaipur

Automated notification from Orbix.
  `.trim();

  const { data, error } = await resend.emails.send({
    from,
    to: [to],

    subject: `ORBIX | Event Approval Request - ${event.event_name}`,

    html,

    text: plainText,
  });

  if (error) {
    throw new Error(
      `Email sending failed: ${error.message}`
    );
  }

  return data;
}
// ============================================
// CREATE EVENT REQUEST
// ============================================

router.post(
  "/",

  requireAuth,

  requireClubAuth,

  // ============================================
  // HANDLE OPTIONAL PDF UPLOAD
  // ============================================

  (req, res, next) => {
    upload.single("proposal")(
      req,
      res,
      (error) => {
        if (error) {
          return res.status(400).json({
            message: error.message,
          });
        }

        next();
      }
    );
  },

  // ============================================
  // SAVE EVENT REQUEST
  // ============================================

  async (req, res) => {
    let uploadedPath = null;
    let eventSaved = false;

    try {
      // ====================================
      // 1. VALIDATE STATUS
      // ====================================

      const status = req.body.status;

      if (
        !["draft", "pending"].includes(status)
      ) {
        return res.status(400).json({
          message: "Invalid request status",
        });
      }

      // ====================================
      // 2. READ FORM DATA
      // ====================================

      const eventName = optionalText(
        req.body.eventName,
        120
      );

      const motive = optionalText(
        req.body.motive
      );

      const eventDate = optionalDate(
        req.body.eventDate
      );

      const startTime = optionalTime(
        req.body.startTime
      );

      const endTime = optionalTime(
        req.body.endTime
      );

      const venue = optionalText(
        req.body.venue,
        300
      );

      const requirements = optionalText(
        req.body.requirements
      );

      const trophyCount = Number(
        req.body.trophyCount ?? 0
      );

      // ====================================
      // 3. VALIDATE TROPHY COUNT
      // ====================================

      if (
        !Number.isInteger(trophyCount) ||
        trophyCount < 0 ||
        trophyCount > 100
      ) {
        return res.status(400).json({
          message: "Invalid trophy count",
        });
      }

      // ====================================
      // 4. VALIDATE EVENT TIME
      // ====================================

      if (
        startTime &&
        endTime &&
        endTime <= startTime
      ) {
        return res.status(400).json({
          message:
            "End time must be after start time",
        });
      }

      // ====================================
      // 5. VALIDATE REQUIRED FIELDS
      // ====================================

      if (
        status === "pending" &&
        (
          !eventName ||
          !motive ||
          !eventDate ||
          !startTime ||
          !venue
        )
      ) {
        return res.status(400).json({
          message:
            "Please complete all required event fields",
        });
      }

      // ====================================
      // 6. VALIDATE PDF CONTENT
      // ====================================

      if (
        req.file &&
        req.file.buffer
          .subarray(0, 5)
          .toString() !== "%PDF-"
      ) {
        return res.status(400).json({
          message: "Invalid PDF document",
        });
      }

      // ====================================
      // 7. UPLOAD PDF TO SUPABASE
      // ====================================

      if (req.file) {
        uploadedPath =
          `${req.clubId}/${crypto.randomUUID()}.pdf`;

        const { error: uploadError } =
          await supabase.storage
            .from(BUCKET)
            .upload(
              uploadedPath,
              req.file.buffer,
              {
                contentType: "application/pdf",
                upsert: false,
              }
            );

        if (uploadError) {
          throw uploadError;
        }
      }

      // ====================================
      // 8. SAVE EVENT TO SUPABASE
      // ====================================

      const { data, error } = await supabase
        .from("event_requests")
        .insert({
          club_id: req.clubId,

          event_name: eventName,

          motive,

          event_date: eventDate,

          start_time: startTime,

          end_time: endTime,

          venue,

          eca_requirements: requirements,

          trophy_count: trophyCount,

          proposal_path: uploadedPath,

          status,
        })
        .select(`
          id,
          club_id,
          event_name,
          motive,
          event_date,
          start_time,
          end_time,
          venue,
          eca_requirements,
          trophy_count,
          status,
          created_at
        `)
        .single();

      if (error) {
        throw error;
      }

      eventSaved = true;

      console.log(
        "Event request saved:",
        data.id,
        "Club:",
        req.club.club_name
      );

      // ====================================
      // 9. SEND EMAIL IF STATUS IS PENDING
      // ====================================

      let emailSent = false;

      if (status === "pending") {
        try {
          await sendEcaNotification(
            data,
            req.club
          );

          emailSent = true;

          console.log(
            "ECA email notification accepted:",
            data.id
          );
        } catch (emailError) {
          // Event remains saved even if
          // email notification fails.

          console.error(
            "ECA email notification failed:",
            emailError
          );
        }
      }

      // ====================================
      // 10. SEND SUCCESS RESPONSE
      // ====================================

      return res.status(201).json({
        success: true,

        message:
          status === "draft"
            ? "Event draft saved successfully"
            : "Event request submitted successfully",

        event: data,

        emailSent,
      });
    } catch (error) {
      // ====================================
      // ERROR HANDLING
      // ====================================

      if (
        uploadedPath &&
        !eventSaved
      ) {
        try {
          const { error: cleanupError } =
            await supabase.storage
              .from(BUCKET)
              .remove([uploadedPath]);

          if (cleanupError) {
            console.error(
              "PDF cleanup failed:",
              cleanupError
            );
          }
        } catch (cleanupError) {
          console.error(
            "PDF cleanup failed:",
            cleanupError
          );
        }
      }

      console.error(
        "Event request error:",
        error
      );

      const validationError =
        error.message?.startsWith("Invalid");

      return res.status(
        validationError ? 400 : 500
      ).json({
        success: false,

        message: validationError
          ? error.message
          : "Failed to save event request",
      });
    }
  }
);

// ============================================
// GET CLUB EVENT REQUEST STATISTICS
// ============================================

router.get(
  "/stats",

  requireAuth,
  requireClubAuth,

  async (req, res) => {
    try {
      // Logged-in club ID comes from verified JWT
      // and is checked against Supabase clubs table.

      const clubId = req.clubId;

      // ====================================
      // TOTAL EVENT REQUESTS
      // ====================================

      const {
        count: totalRequests,
        error: totalError,
      } = await supabase
        .from("event_requests")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("club_id", clubId);

      if (totalError) {
        throw totalError;
      }

      // ====================================
      // PENDING EVENT REQUESTS
      // ====================================

      const {
        count: pendingRequests,
        error: pendingError,
      } = await supabase
        .from("event_requests")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("club_id", clubId)
        .eq("status", "pending");

      if (pendingError) {
        throw pendingError;
      }

      // ====================================
      // DRAFT EVENT REQUESTS
      // ====================================

      const {
        count: draftRequests,
        error: draftError,
      } = await supabase
        .from("event_requests")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("club_id", clubId)
        .eq("status", "draft");

      if (draftError) {
        throw draftError;
      }

      // ====================================
      // SUCCESS RESPONSE
      // ====================================

      return res.status(200).json({
        success: true,

        clubId,

        clubName: req.club.club_name,

        statistics: {
          totalRequests: totalRequests ?? 0,
          pendingRequests: pendingRequests ?? 0,
          draftRequests: draftRequests ?? 0,
        },
      });

    } catch (error) {
      console.error(
        "Failed to fetch event statistics:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to fetch event statistics",
      });
    }
  }
);

// ============================================
// GET ALL EVENT REQUESTS FOR LOGGED-IN CLUB
// ============================================

router.get(
  "/",
  requireAuth,
  requireClubAuth,

  async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("event_requests")
        .select(`
  id,
  club_id,
  event_name,
  motive,
  event_date,
  start_time,
  end_time,
  venue,
  eca_requirements,
  trophy_count,
  proposal_path,
  status,
  rejection_reason,
  reviewed_by,
  reviewed_at,
  poster_path,
  poster_status,
  poster_rejection_reason,
  published_at,
  academic_year,
  created_at,
  updated_at
`)
        .eq("club_id", req.clubId)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      return res.status(200).json({
        success: true,
        clubId: req.clubId,
        clubName: req.club.club_name,
        total: data?.length ?? 0,
        events: data ?? [],
      });

    } catch (error) {
      console.error(
        "Failed to fetch club event requests:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to fetch event requests",
      });
    }
  }
);

export default router;