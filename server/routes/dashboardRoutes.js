const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
  getRecentEnrollments,
  getRecentPayments,
  getMentoringBookings,
} = require("../controllers/dashboardController");


// ========================================
// DASHBOARD STATS
// ========================================

router.get(
  "/stats",
  getDashboardStats
);


// ========================================
// COURSE-WISE ENROLLMENTS
// ========================================

router.get(
  "/recent-enrollments",
  getRecentEnrollments
);


// ========================================
// RECENT PAYMENTS
// ========================================

router.get(
  "/recent-payments",
  getRecentPayments
);


// ========================================
// CONFIRMED MENTORING BOOKINGS
// ========================================

router.get(
  "/mentoring-bookings",
  getMentoringBookings
);


module.exports = router;