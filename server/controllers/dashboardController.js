const db = require("../config/db");

// ========================================
// DASHBOARD STATS
// ========================================

const getDashboardStats = async (req, res) => {
  try {
    const [[users]] = await db.query(
      "SELECT COUNT(*) AS totalUsers FROM users"
    );

    const [[courses]] = await db.query(
      "SELECT COUNT(*) AS totalCourses FROM courses"
    );

    const [[enrollments]] = await db.query(
      "SELECT COUNT(*) AS totalEnrollments FROM enrollments"
    );

    const [[payments]] = await db.query(
      "SELECT COUNT(*) AS totalPayments FROM payments"
    );

    res.json({
      success: true,
      data: {
        totalUsers: users.totalUsers,
        totalCourses: courses.totalCourses,
        totalEnrollments: enrollments.totalEnrollments,
        totalPayments: payments.totalPayments,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics.",
    });
  }
};


// ========================================
// COURSE-WISE ENROLLMENT COUNTS
// ========================================

const getRecentEnrollments = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        c.id AS course_id,
        c.title AS course_name,
        COUNT(e.id) AS enrollment_count
      FROM courses c
      LEFT JOIN enrollments e
        ON c.id = e.course_id
      GROUP BY c.id, c.title
      ORDER BY enrollment_count DESC, c.id ASC
    `);

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Course enrollment count error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch course enrollment counts.",
    });
  }
};


// ========================================
// RECENT PAYMENTS
// ========================================

const getRecentPayments = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        p.id,
        p.user_id,
        p.course_id,
        c.title AS course_name,
        p.amount,
        p.status,
        p.razorpay_order_id,
        p.razorpay_payment_id,
        p.created_at
      FROM payments p
      LEFT JOIN courses c
        ON p.course_id = c.id
      ORDER BY p.id DESC
      LIMIT 5
    `);

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Recent payments error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch recent payments.",
    });
  }
};


const getMentoringBookings = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        mb.id,
        mb.user_id,
        mb.duration_minutes,
        mb.price,
        mb.booking_date,
        mb.booking_time,
        mb.status,
        mb.razorpay_payment_id,
        mb.created_at
      FROM mentoring_bookings mb
      WHERE mb.status = 'confirmed'
      ORDER BY mb.booking_date DESC, mb.booking_time DESC
    `);

    res.json({
      success: true,
      data: rows,
    });

  } catch (error) {
    console.error("Mentoring bookings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch mentoring bookings.",
    });
  }
};


// ========================================
// EXPORT
// ========================================
 
module.exports = {
  getDashboardStats,
  getRecentEnrollments,
  getRecentPayments,
  getMentoringBookings,
};