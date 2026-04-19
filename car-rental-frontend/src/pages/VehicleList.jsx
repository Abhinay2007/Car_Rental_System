import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import VehicleCard from "../components/VehicleCard";

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    fetchLocations();
    fetchVehicles();
  }, []);

  //   fetch locations
  const fetchLocations = async () => {
    try {
      const res = await api.get("/locations");
      setLocations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  //   fetch vehicles with filter
  const fetchVehicles = async (locationId = "") => {
    try {
      let url = "/vehicles";

      if (locationId) {
        url += `?locationId=${locationId}`;
      }

      const res = await api.get(url);
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  //   handle dropdown change
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setSelectedLocation(value);
    fetchVehicles(value);
  };

  return (
    <div>
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">

        {/*   FILTER BAR */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">

          <h2 className="text-2xl font-bold text-gray-800">
            Available Vehicles 🚗
          </h2>

          <select
            value={selectedLocation}
            onChange={handleLocationChange}
            className="border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc.locationId} value={loc.locationId}>
                {loc.name} ({loc.city})
              </option>
            ))}
          </select>
        </div>

        {/* VEHICLE GRID */}
        {vehicles.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            No vehicles found 🚫
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vehicles.map((v) => (
              <VehicleCard key={v.vehicleId} vehicle={v} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default VehicleList;