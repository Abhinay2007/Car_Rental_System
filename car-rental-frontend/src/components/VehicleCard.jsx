import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/VehicleCard.css";

function VehicleCard({ vehicle }) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Vehicle type color
  const getVehicleTypeColor = (type) => {
    const colors = {
      sedan: "#0066ff",
      suv: "#10b981",
      hatchback: "#8b5cf6",
      truck: "#f59e0b",
    };
    return colors[type?.toLowerCase()] || "#0066ff";
  };

  // Placeholder image
  const PlaceholderImage = () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f5f7fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#7a8594",
        fontWeight: "600",
      }}
    >
      {vehicle.model || "Vehicle"}
    </div>
  );

  return (
    <div
      className="vehicle-card"
      onClick={() => navigate(`/vehicles/${vehicle.vehicleId}`)}
    >
      {/*  IMAGE */}
      <div
        className="vehicle-image-container"
        style={
          imageError
            ? {
                background: `linear-gradient(135deg, ${getVehicleTypeColor(
                  vehicle.vehicleType?.typeName
                )}15 0%, ${getVehicleTypeColor(
                  vehicle.vehicleType?.typeName
                )}08 100%)`,
              }
            : {}
        }
      >
        {!imageError && vehicle.imageUrl ? (
          <img
            src={vehicle.imageUrl}
            alt={vehicle.model}
            className="vehicle-image"
            onError={() => setImageError(true)}
          />
        ) : (
          <PlaceholderImage />
        )}

        {/* Overlay */}
        <div className="image-overlay">
          <button className="view-details-btn">
            View Details
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="vehicle-content">
        {/* Header */}
        <div className="vehicle-header">
          <div>
            <h3 className="vehicle-model">{vehicle.model}</h3>

            {/* ✅ FIXED: typeName */}
            <p className="vehicle-category">
              {vehicle.vehicleType?.typeName || "Standard"}
            </p>
          </div>

          <span className="rating">⭐ 4.8</span>
        </div>

        {/* Registration */}
        <p className="vehicle-registration">
          Reg: {vehicle.regNumber}
        </p>

        {/* Price */}
        <div className="vehicle-footer">
          <div>
            <p className="price-label">From</p>
            <p className="price-amount">
              {formatPrice(vehicle.vehicleType?.dailyRate || 0)}
              <span>/day</span>
            </p>
          </div>

          <button className="book-btn">
            Book Now →
          </button>
        </div>
      </div>
    </div>
  );
}

export default VehicleCard;