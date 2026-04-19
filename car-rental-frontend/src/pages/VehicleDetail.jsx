import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "../CSS/VehicleDetail.css";

function VehicleDetail() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  // Calculate total price when dates change
  useEffect(() => {
    if (startDate && endDate && vehicle) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      
      if (days > 0) {
        setTotalDays(days);
        setTotalPrice(days * vehicle.vehicleType.dailyRate);
      }
    }
  }, [startDate, endDate, vehicle]);

  const fetchVehicle = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/vehicles/${id}`);
      setVehicle(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load vehicle details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    // Validation
    if (!startDate || !endDate) {
      setError("Please select both start and end dates");
      return;
    }

    if (totalDays <= 0) {
      setError("End date must be after start date");
      return;
    }

    try {
      setBookingLoading(true);
      await api.post(`/rentals/book?vehicleId=${id}`, {
        startDate,
        endDate,
      });
      
      alert("🎉 Booking Confirmed! We'll contact you soon.");
      // Reset form
      setStartDate("");
      setEndDate("");
      setTotalDays(0);
      setTotalPrice(0);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Please try again.");
      console.error(err);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div>
        <Navbar />
        <div className="error-container">
          <p>Vehicle not found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="vehicle-detail-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="vehicle-image-wrapper">
            <img
              src={vehicle.imageUrl || "/placeholder-car.jpg"}
              alt={vehicle.model}
              className="vehicle-image"
            />
            <div className="vehicle-badge">{vehicle.vehicleType.typeName}</div>
          </div>

          <div className="hero-content">
            <h1 className="vehicle-title">{vehicle.model}</h1>
            <p className="vehicle-subtitle">Registration: {vehicle.regNumber}</p>
            
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Year</span>
                <span className="spec-value">{vehicle.year}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Type</span>
                <span className="spec-value">{vehicle.vehicleType.typeName}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Daily Rate</span>
                <span className="spec-value price">₹{vehicle.vehicleType.dailyRate}</span>
              </div>
            </div>

            <div className="rating-section">
              <div className="stars">★★★★★</div>
              <span className="reviews">(124 reviews)</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="detail-content">
          {/* Booking Section */}
          <div className="booking-card">
            <h2 className="section-title">Reserve Your Vehicle</h2>
            
            {error && <div className="error-message">{error}</div>}

            <div className="booking-form">
              <div className="date-group">
                <div className="input-wrapper">
                  <label className="input-label">Start Date</label>
                  <input
                    type="date"
                    className="date-input"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">End Date</label>
                  <input
                    type="date"
                    className="date-input"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              {/* Price Summary */}
              {totalDays > 0 && (
                <div className="price-summary">
                  <div className="price-row">
                    <span>Daily Rate</span>
                    <span>₹{vehicle.vehicleType.dailyRate} × {totalDays} days</span>
                  </div>
                  <div className="price-row total">
                    <span>Total Price</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleBooking}
                disabled={bookingLoading}
                className="book-button"
              >
                {bookingLoading ? (
                  <>
                    <span className="spinner-mini"></span>
                    Booking...
                  </>
                ) : (
                  "Book Now"
                )}
              </button>
            </div>
          </div>

          {/* Features Section */}
          {/* <div className="features-section">
            <h2 className="section-title">Vehicle Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🔧</div>
                <span>Excellent Condition</span>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🛡️</div>
                <span>Full Insurance Included</span>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⛽</div>
                <span>Free Fuel Up</span>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📍</div>
                <span>GPS & Navigation</span>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <span>Keyless Entry</span>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🚗</div>
                <span>Free Pickup</span>
              </div>
            </div>
          </div> */}

          {/* Terms Section */}
          <div className="terms-section">
            <h2 className="section-title">Rental Terms</h2>
            <ul className="terms-list">
              <li>✓ Minimum rental period: 1 day</li>
              <li>✓ Driver's license required (at least 1 year old)</li>
              <li>✓ Security deposit: ₹5,000</li>
              <li>✓ Free cancellation up to 24 hours before pickup</li>
              <li>✓ Comprehensive insurance included</li>
              <li>✓ 24/7 roadside assistance available</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetail;
