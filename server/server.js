const express = require("express");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const db = require("./config/db");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

/* =========================
   CORS
========================= */

app.use((req, res, next) => {
  const origin = req.headers.origin;

  console.log("REQUEST:", req.method, req.originalUrl);
  console.log("ORIGIN:", origin);

  if (
    origin === "https://admin.genlearning.in" ||
    origin === "http://localhost:5173"
  ) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    console.log("CORS PREFLIGHT OK");

    return res.status(204).end();
  }

  next();
});

/* =========================
   JSON
========================= */

app.use(express.json());

/* =========================
   ROUTES
========================= */

app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GenLearning Admin API is running",
  });
});

/* =========================
   DB TEST
========================= */

app.get("/api/db-test", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT 1 AS connected"
    );

    res.json({
      success: true,
      message: "Admin database connected successfully",
      data: rows,
    });
  } catch (error) {
    console.error("Admin database error:", error);

    res.status(500).json({
      success: false,
      message: "Admin database connection failed",
    });
  }
});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `GenLearning Admin Server running on port ${PORT}`
  );
});