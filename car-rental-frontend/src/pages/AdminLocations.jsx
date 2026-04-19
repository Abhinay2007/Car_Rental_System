import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function AdminLocations() {
  const [locations, setLocations] = useState([]);

  const [form, setForm] = useState({
    name: "",
    address: "",   // ✅ ADD
    city: "",
    phone: ""
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await api.get("/locations");
      setLocations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ ADD LOCATION
  const handleAdd = async () => {
    try {
        await api.post("/locations", {
            name: form.name,
            address: form.address,   // ✅ ADD
            city: form.city,
            phone: form.phone,
            isActive: true
        })

      alert("Location added 📍");

      setForm({
        name: "",
        address: "",   // ✅ ADD
        city: "",
        phone: ""
      });

      fetchLocations();

    } catch (err) {
      console.error(err);
      alert("Error adding location");
    }
  };

  // ✅ DELETE LOCATION
  const handleDelete = async (id) => {
    try {
      await api.delete(`/locations/${id}`);
      fetchLocations();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          📍 Manage Locations
        </h1>

        {/* 🔥 FORM */}
        <div className="bg-white p-6 rounded-xl shadow mb-8 grid gap-3">

          <input
            className="border p-2 rounded"
            placeholder="Location Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Add Location
          </button>
        </div>

        {/* 📍 LIST */}
        {locations.length === 0 ? (
          <p>No locations found</p>
        ) : (
          <div className="grid gap-4">
            {locations.map((l) => (
              <div
                key={l.locationId}
                className="flex justify-between items-center bg-white p-4 rounded shadow"
              >
                <div>
                  <p className="font-bold">{l.name}</p>
                  <p className="text-sm text-gray-500">{l.address}</p>
                  <p className="text-sm text-gray-500">{l.city}</p>
                </div>

                <button
                  onClick={() => handleDelete(l.locationId)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
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

export default AdminLocations;