const express = require("express");
const cors = require("cors");

const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const db = require("./config/db");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const app = express();

app.use(
  cors({
    origin: [
  "http://localhost:5173",
  "https://admin.genlearning.in",
  ],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GenLearning Admin API is running",
  });
});

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

const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`GenLearning Admin Server running on port ${PORT}`);
});