import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import styles from "../CSS/MyRentals.module.css";

function MyRentals() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(null);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    setLoading(true);
    try {
      const res = await api.get("/rentals/my");
      setRentals(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (rentalId) => {
    setPaymentLoading(rentalId);
    try {
      await api.post(`/payments?rentalId=${rentalId}`, {
        method: "UPI",
      });

      alert("Payment successful 💰");
      fetchRentals();
    } catch (err) {
      alert("Payment failed");
      console.error(err);
    } finally {
      setPaymentLoading(null);
    }
  };

  const calculateDaysLeft = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();
    const days = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return styles.statusActive;
      case "completed":
        return styles.statusCompleted;
      case "cancelled":
        return styles.statusCancelled;
      default:
        return styles.statusPending;
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <div className={styles.mainContent}>
        <div className={styles.headerSection}>
          <div className={styles.headerContent}>
            <h1 className={styles.mainTitle}>My Rentals</h1>
            <p className={styles.subtitle}>
              Manage and track your vehicle rentals
            </p>
          </div>
          <div className={styles.rentalCount}>
            <span className={styles.countBadge}>{rentals.length}</span>
            <p>Active Rentals</p>
          </div>
        </div>

        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading your rentals...</p>
          </div>
        ) : rentals.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🚗</div>
            <h2>No Active Rentals</h2>
            <p>Start your journey by renting a vehicle today</p>
          </div>
        ) : (
          <div className={styles.rentalsGrid}>
            {rentals.map((r, index) => (
              <div
                key={r.rentalId}
                className={styles.rentalCard}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.cardHeader}>
                  <div>
                    <h2 className={styles.vehicleModel}>{r.vehicle.model}</h2>
                    <p className={styles.vehicleType}>
                      {r.vehicle.type || "Premium Car"}
                    </p>
                  </div>
                  <span className={`${styles.status} ${getStatusColor(r.status)}`}>
                    {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.dateSection}>
                    <div className={styles.dateItem}>
                      <span className={styles.dateLabel}>Start Date</span>
                      <p className={styles.dateValue}>
                        📅 {new Date(r.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.dateItem}>
                      <span className={styles.dateLabel}>End Date</span>
                      <p className={styles.dateValue}>
                        📅 {new Date(r.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {r.status === "active" && (
                    <div className={styles.daysLeftBox}>
                      <span className={styles.daysIcon}>⏰</span>
                      <div>
                        <p className={styles.daysLabel}>Days Left</p>
                        <p className={styles.daysValue}>
                          {calculateDaysLeft(r.endDate)} days
                        </p>
                      </div>
                    </div>
                  )}

                  <div className={styles.amountSection}>
                    <span className={styles.amountLabel}>Total Amount</span>
                    <p className={styles.amountValue}>₹{r.totalAmount}</p>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <button
                    onClick={() => handlePayment(r.rentalId)}
                    disabled={paymentLoading === r.rentalId}
                    className={`${styles.payButton} ${
                      paymentLoading === r.rentalId ? styles.loading : ""
                    }`}
                  >
                    {paymentLoading === r.rentalId ? (
                      <>
                        <span className={styles.buttonSpinner}></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        💳 Pay Now
                      </>
                    )}
                  </button>
                  {/* <button className={styles.detailsButton}>
                    View Details →
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRentals;
