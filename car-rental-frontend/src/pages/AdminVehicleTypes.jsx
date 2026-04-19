import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function AdminVehicleTypes() {
  const [types, setTypes] = useState([]);

  const [form, setForm] = useState({
    typeName: "",
    dailyRate: "",
    weeklyRate: "",
    monthlyRate: ""
  });

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    const res = await api.get("/vehicle-types");
    setTypes(res.data);
  };

  //  ADD TYPE
  const handleAdd = async () => {
    try {
      await api.post("/vehicle-types", {
        typeName: form.typeName,
        dailyRate: parseFloat(form.dailyRate),
        weeklyRate: parseFloat(form.weeklyRate),
        monthlyRate: parseFloat(form.monthlyRate)
      });

      alert("Type added 🚗");

      setForm({
        typeName: "",
        dailyRate: "",
        weeklyRate: "",
        monthlyRate: ""
      });

      fetchTypes();

    } catch (err) {
      console.error(err);
      alert("Error adding type");
    }
  };

  //  DELETE
  const handleDelete = async (id) => {
    try {
      await api.delete(`/vehicle-types/${id}`);
      fetchTypes();
    } catch (err) {
      alert("Cannot delete: Type used in vehicles 🚫");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          🚘 Vehicle Types
        </h1>

        {/*   FORM */}
        <div className="bg-white p-6 rounded-xl shadow mb-8 grid gap-3">

          <input
            placeholder="Type Name (SUV, Sedan)"
            value={form.typeName}
            onChange={(e)=>setForm({...form, typeName:e.target.value})}
            className="border p-2 rounded"
          />

          <input
            placeholder="Daily Rate"
            value={form.dailyRate}
            onChange={(e)=>setForm({...form, dailyRate:e.target.value})}
            className="border p-2 rounded"
          />

          <input
            placeholder="Weekly Rate"
            value={form.weeklyRate}
            onChange={(e)=>setForm({...form, weeklyRate:e.target.value})}
            className="border p-2 rounded"
          />

          <input
            placeholder="Monthly Rate"
            value={form.monthlyRate}
            onChange={(e)=>setForm({...form, monthlyRate:e.target.value})}
            className="border p-2 rounded"
          />

          <button
            onClick={handleAdd}
            className="bg-green-600 text-white py-2 rounded"
          >
            Add Type
          </button>
        </div>

        {/* 🚘 LIST */}
        {types.map(t => (
          <div key={t.typeId}
            className="flex justify-between bg-white p-4 rounded shadow mb-2"
          >
            <div>
              <p className="font-bold">{t.typeName}</p>
              <p className="text-sm text-gray-500">
                ₹{t.dailyRate}/day
              </p>
            </div>

            <button
              onClick={()=>handleDelete(t.typeId)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default AdminVehicleTypes;