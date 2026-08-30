import React, { useEffect, useState } from "react";
const API_URL = "https://admin.genlearning.in";

const Mentoring = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ========================================
  // FETCH CONFIRMED MENTORING BOOKINGS
  // ========================================

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/admin/dashboard/mentoring-bookings`
        );

        const result = await response.json();

        if (result.success) {
          setBookings(result.data);
        }
      } catch (error) {
        console.error(
          "Mentoring bookings error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
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
  // FORMAT PRICE
  // ========================================

  const formatPrice = (price) => {
    return `₹${Number(price || 0).toFixed(2)}`;
  };

  // ========================================
  // UI
  // ========================================

  return (
    <div className="admin-page">

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="admin-page-header">

        <div>
          <h1>Mentoring</h1>

          <p>
            Manage confirmed mentoring sessions.
          </p>
        </div>

      </div>


      {/* ========================================
          BOOKINGS PANEL
      ======================================== */}

      <div className="admin-page-panel">

        <div className="admin-page-panel-header">

          <div>
            <h3>
              Confirmed Bookings
            </h3>

            <p>
              All successfully booked mentoring sessions.
            </p>
          </div>

          <div className="admin-count">
            {bookings.length}
          </div>

        </div>


        {/* ========================================
            LOADING
        ======================================== */}

        {loading ? (

          <div className="admin-empty-state">
            <p>
              Loading mentoring bookings...
            </p>
          </div>

        ) : bookings.length === 0 ? (

          /* ========================================
              EMPTY
          ======================================== */

          <div className="admin-empty-state">

            <span>
              👨‍🏫
            </span>

            <p>
              No confirmed mentoring bookings yet.
            </p>

          </div>

        ) : (

          /* ========================================
              TABLE
          ======================================== */

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>
                    #
                  </th>

                  <th>
                    User
                  </th>

                  <th>
                    Date
                  </th>

                  <th>
                    Time
                  </th>

                  <th>
                    Duration
                  </th>

                  <th>
                    Price
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Payment ID
                  </th>

                </tr>

              </thead>


              <tbody>

                {bookings.map((booking) => (

                  <tr key={booking.id}>

                    <td>
                      #{booking.id}
                    </td>

                    <td>
                      User #{booking.user_id}
                    </td>

                    <td>
                      {formatDate(
                        booking.booking_date
                      )}
                    </td>

                    <td>
                      {formatTime(
                        booking.booking_time
                      )}
                    </td>

                    <td>
                      {booking.duration_minutes} min
                    </td>

                    <td>
                      {formatPrice(
                        booking.price
                      )}
                    </td>

                    <td>

                      <span className="status-badge confirmed">
                        Confirmed
                      </span>

                    </td>

                    <td>

                      <span className="payment-id">

                        {booking.razorpay_payment_id ||
                          "—"}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default Mentoring;