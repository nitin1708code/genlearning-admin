const express = require("express");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const db = require("./config/db");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(express.json());

/* =========================
   CORS
========================= */

app.use((req, res, next) => {
  const origin = req.headers.origin;

  const allowedOrigins = [
    "https://admin.genlearning.in",
    "http://localhost:5173",
  ];

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

/* =========================
   API ROUTES
========================= */

app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);

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
 

const frontendPath = path.join(__dirname, "../dist");

app.use(express.static(frontendPath));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api/")) {
    return res.sendFile(path.join(frontendPath, "index.html"));
  }

  next();
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