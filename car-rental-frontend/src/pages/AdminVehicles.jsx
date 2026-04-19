import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function AdminVehicles() {
  const [vehicles, setVehicles] = useState([]);

  const [form, setForm] = useState({
    model: "",
    regNumber: "",
    year: "",
    typeId: "",
    locationId: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await api.get("/vehicles");
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  //  ADD VEHICLE
  const handleAdd = async () => {
    try {
      await api.post("/vehicles", {
        model: form.model,
        regNumber: form.regNumber,
        year: parseInt(form.year),
        status: "available",

        vehicleType: {
          typeId: parseInt(form.typeId),
        },

        location: {
          locationId: parseInt(form.locationId),
        },

        imageUrl: form.imageUrl,
      });

      alert("Vehicle added 🚗");

      // reset form
      setForm({
        model: "",
        regNumber: "",
        year: "",
        typeId: "",
        locationId: "",
        imageUrl: "",
      });

      fetchVehicles();

    } catch (err) {
      console.error(err);
      alert("Error adding vehicle");
    }
  };

  // DELETE VEHICLE
  const handleDelete = async (id) => {
    try {
      await api.delete(`/vehicles/${id}`);
      fetchVehicles();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="p-6 max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          🚗 Manage Vehicles
        </h1>

        {/*  FORM */}
        <div className="bg-white p-6 rounded-xl shadow mb-8 grid gap-3">

          <input
            className="border p-2 rounded"
            placeholder="Model"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            placeholder="Reg Number"
            value={form.regNumber}
            onChange={(e) => setForm({ ...form, regNumber: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            placeholder="Year"
            type="number"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            placeholder="Vehicle Type ID"
            value={form.typeId}
            onChange={(e) => setForm({ ...form, typeId: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            placeholder="Location ID"
            value={form.locationId}
            onChange={(e) => setForm({ ...form, locationId: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />

          <button
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
          >
            Add Vehicle
          </button>
        </div>

        {/* 🚗 VEHICLE LIST */}
        {vehicles.length === 0 ? (
          <p className="text-center text-gray-500">No vehicles found 🚫</p>
        ) : (
          <div className="grid gap-4">
            {vehicles.map((v) => (
              <div
                key={v.vehicleId}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
              >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-4">

                  {/* IMAGE */}
                  <img
                    src={v.imageUrl || "https://via.placeholder.com/100"}
                    alt={v.model}
                    className="w-24 h-16 object-cover rounded"
                  />

                  {/* DETAILS */}
                  <div>
                    <p className="font-bold text-gray-800">
                      {v.model}
                    </p>

                    <p className="text-sm text-gray-500">
                      {v.regNumber}
                    </p>

                    <p className="text-xs text-gray-400">
                      {v.vehicleType?.typeName}
                    </p>
                  </div>
                </div>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => handleDelete(v.vehicleId)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminVehicles;