import React, { useEffect, useState } from "react";

const API_URL = "https://admin.genlearning.in";

const Dashboard = () => {
  // ========================================
  // STATES
  // ========================================

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    totalPayments: 0,
  });

  const [courseEnrollments, setCourseEnrollments] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [mentoringBookings, setMentoringBookings] = useState([]);

  const [loading, setLoading] = useState(true);


  // ========================================
  // FETCH DASHBOARD DATA
  // ========================================

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          statsResponse,
          enrollmentsResponse,
          paymentsResponse,
          mentoringResponse,
        ] = await Promise.all([
          fetch(`${API_URL}/api/admin/dashboard/stats`),

          fetch(
            `${API_URL}/api/admin/dashboard/recent-enrollments`
          ),

          fetch(
            `${API_URL}/api/admin/dashboard/recent-payments`
          ),

          fetch(
            `${API_URL}/api/admin/dashboard/mentoring-bookings`
          ),
        ]);


        // ========================================
        // CONVERT RESPONSES TO JSON
        // ========================================

        const statsResult =
          await statsResponse.json();

        const enrollmentsResult =
          await enrollmentsResponse.json();

        const paymentsResult =
          await paymentsResponse.json();

        const mentoringResult =
          await mentoringResponse.json();


        // ========================================
        // DASHBOARD STATS
        // ========================================

        if (statsResult.success) {
          setStats(statsResult.data);
        }


        // ========================================
        // COURSE ENROLLMENTS
        // ========================================

        if (enrollmentsResult.success) {
          setCourseEnrollments(
            enrollmentsResult.data
          );
        }


        // ========================================
        // RECENT PAYMENTS
        // ========================================

        if (paymentsResult.success) {
          setRecentPayments(
            paymentsResult.data
          );
        }


        // ========================================
        // MENTORING BOOKINGS
        // ONLY CONFIRMED BOOKINGS
        // ========================================

        if (mentoringResult.success) {
          setMentoringBookings(
            mentoringResult.data
          );
        }

      } catch (error) {
        console.error(
          "Dashboard data error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };


    fetchDashboardData();
  }, []);


  // ========================================
  // FORMAT DATE
  // ========================================

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  // ========================================
  // FORMAT TIME
  // ========================================

  const formatTime = (time) => {
    if (!time) return "—";

    const parts = String(time).split(":");

    if (parts.length < 2) {
      return time;
    }

    const hours = Number(parts[0]);
    const minutes = parts[1];

    const suffix = hours >= 12 ? "PM" : "AM";

    const formattedHours =
      hours % 12 || 12;

    return `${formattedHours}:${minutes} ${suffix}`;
  };


  // ========================================
  // FORMAT AMOUNT
  // ========================================

  const formatAmount = (amount) => {
    const value = Number(amount || 0);

    return `₹${value.toFixed(2)}`;
  };


  // ========================================
  // UI
  // ========================================

  return (
    <div className="admin-dashboard">


      {/* ========================================
          HEADER
      ======================================== */}

      <div className="dashboard-header">

        <div>
          <h1>
            Dashboard
          </h1>

          <p>
            Welcome back, Admin.
          </p>
        </div>


        <div className="dashboard-admin">

          <span>
            NK
          </span>

          <div>

            <strong>
              Nitin Kumar
            </strong>

            <small>
              Administrator
            </small>

          </div>

        </div>

      </div>



      {/* ========================================
          STATS
      ======================================== */}

      <div className="dashboard-stats">


        {/* TOTAL USERS */}

        <div className="stat-card">

          <span className="stat-label">
            Total Users
          </span>

          <h2>
            {loading
              ? "—"
              : stats.totalUsers}
          </h2>

          <p>
            Registered users
          </p>

        </div>



        {/* TOTAL COURSES */}

        <div className="stat-card">

          <span className="stat-label">
            Total Courses
          </span>

          <h2>
            {loading
              ? "—"
              : stats.totalCourses}
          </h2>

          <p>
            Published courses
          </p>

        </div>



        {/* TOTAL ENROLLMENTS */}

        <div className="stat-card">

          <span className="stat-label">
            Enrollments
          </span>

          <h2>
            {loading
              ? "—"
              : stats.totalEnrollments}
          </h2>

          <p>
            Total enrollments
          </p>

        </div>



        {/* TOTAL PAYMENTS */}

        <div className="stat-card">

          <span className="stat-label">
            Payments
          </span>

          <h2>
            {loading
              ? "—"
              : stats.totalPayments}
          </h2>

          <p>
            Total transactions
          </p>

        </div>

      </div>



      {/* ========================================
          MAIN GRID
      ======================================== */}

      <div className="dashboard-grid">


        {/* ========================================
            COURSE ENROLLMENTS
        ======================================== */}

        <div className="dashboard-panel">


          <div className="panel-header">

            <div>

              <h3>
                Course Enrollments
              </h3>

              <p>
                Enrollment count by course
              </p>

            </div>

            <button>
              View All
            </button>

          </div>



          <div className="enrollment-list">


            {/* LOADING */}

            {loading ? (

              <div className="empty-state">

                <p>
                  Loading enrollments...
                </p>

              </div>


            ) : courseEnrollments.length === 0 ? (


              /* NO DATA */

              <div className="empty-state">

                <span>
                  📚
                </span>

                <p>
                  No course data yet.
                </p>

              </div>


            ) : (


              /* COURSE DATA */

              courseEnrollments.map((course) => (

                <div
                  className="enrollment-item"
                  key={course.course_id}
                >


                  <div className="enrollment-icon">
                    📚
                  </div>


                  <div className="enrollment-info">

                    <strong>
                      {course.course_name}
                    </strong>

                    <span>

                      {course.enrollment_count}{" "}

                      {Number(
                        course.enrollment_count
                      ) === 1
                        ? "Enrollment"
                        : "Enrollments"}

                    </span>

                  </div>


                  <div className="enrollment-progress">

                    {course.enrollment_count}

                  </div>

                </div>

              ))

            )}

          </div>

        </div>



        {/* ========================================
            RECENT PAYMENTS
        ======================================== */}

        <div className="dashboard-panel">


          <div className="panel-header">

            <div>

              <h3>
                Recent Payments
              </h3>

              <p>
                Latest payment activity
              </p>

            </div>

            <button>
              View All
            </button>

          </div>



          <div className="enrollment-list">


            {loading ? (

              <div className="empty-state">

                <p>
                  Loading payments...
                </p>

              </div>


            ) : recentPayments.length === 0 ? (

              <div className="empty-state">

                <span>
                  ₹
                </span>

                <p>
                  No payment data yet.
                </p>

              </div>


            ) : (

              recentPayments.map((payment) => (

                <div
                  className="enrollment-item"
                  key={payment.id}
                >


                  <div className="enrollment-icon">
                    ₹
                  </div>


                  <div className="enrollment-info">

                    <strong>
                      {payment.course_name ||
                        `Course #${payment.course_id}`}
                    </strong>

                    <span>
                      User #{payment.user_id}
                      {" • "}
                      {payment.status}
                    </span>

                  </div>


                  <div className="enrollment-progress">

                    {formatAmount(
                      payment.amount
                    )}

                  </div>

                </div>

              ))

            )}

          </div>

        </div>



        {/* ========================================
            CONFIRMED MENTORING BOOKINGS
        ======================================== */}

        <div className="dashboard-panel">


          <div className="panel-header">

            <div>

              <h3>
                Mentoring Bookings
              </h3>

              <p>
                Confirmed mentoring sessions
              </p>

            </div>

            <button>
              View All
            </button>

          </div>



          <div className="enrollment-list">


            {loading ? (

              <div className="empty-state">

                <p>
                  Loading bookings...
                </p>

              </div>


            ) : mentoringBookings.length === 0 ? (

              <div className="empty-state">

                <span>
                  👨‍🏫
                </span>

                <p>
                  No confirmed bookings yet.
                </p>

              </div>


            ) : (

              mentoringBookings.map((booking) => (

                <div
                  className="enrollment-item"
                  key={booking.id}
                >


                  {/* ICON */}

                  <div className="enrollment-icon">
                    👨‍🏫
                  </div>



                  {/* BOOKING INFO */}

                  <div className="enrollment-info">

                    <strong>
                      User #{booking.user_id}
                    </strong>

                    <span>

                      {formatDate(
                        booking.booking_date
                      )}

                      {" • "}

                      {formatTime(
                        booking.booking_time
                      )}

                      {" • "}

                      {booking.duration_minutes} min

                    </span>

                  </div>



                  {/* PRICE */}

                  <div className="enrollment-progress">

                    {formatAmount(
                      booking.price
                    )}

                  </div>


                </div>

              ))

            )}

          </div>

        </div>



        {/* ========================================
            PAYMENT / BOOKING SUMMARY
        ======================================== */}

        <div className="dashboard-panel">


          <div className="panel-header">

            <div>

              <h3>
                Mentoring Summary
              </h3>

              <p>
                Confirmed session overview
              </p>

            </div>

          </div>



          <div className="empty-state">

            <span>
              📅
            </span>

            <p>

              {loading
                ? "Loading..."
                : `${mentoringBookings.length} confirmed mentoring ${
                    mentoringBookings.length === 1
                      ? "booking"
                      : "bookings"
                  }`}

            </p>

          </div>


        </div>


      </div>

    </div>
  );
};


export default Dashboard;