import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts";

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);
  const [statusData, setStatusData] = useState([]);

        useEffect(() => {
        fetchStats();
        fetchChart();
        fetchStatusChart();
        }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchChart = async () => {
        try {
            const res = await api.get("/admin/revenue-chart");
            setChartData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchStatusChart = async () => {
        const res = await api.get("/admin/status-chart");
        setStatusData(res.data);
    };

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-6 shadow rounded-xl">
            <h2 className="text-gray-500">Total Vehicles</h2>
            <p className="text-2xl font-bold">{stats.totalVehicles}</p>
          </div>

          <div className="bg-white p-6 shadow rounded-xl">
            <h2 className="text-gray-500">Total Rentals</h2>
            <p className="text-2xl font-bold">{stats.totalRentals}</p>
          </div>

          <div className="bg-white p-6 shadow rounded-xl">
            <h2 className="text-gray-500">Total Users</h2>
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
          </div>

          <div className="bg-white p-6 shadow rounded-xl">
            <h2 className="text-gray-500">Total Revenue</h2>
            <p className="text-2xl font-bold text-green-600">
              ₹{stats.totalRevenue}
            </p>
          </div>



        </div>

        <div className="mt-10 bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Revenue Chart</h2>

                <LineChart width={600} height={300} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#22c55e" />
                </LineChart>
        </div>

        <div className="mt-10 bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Rental Status</h2>

            <PieChart width={400} height={300}>
                <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                >
                {statusData.map((entry, index) => (
                    <Cell key={index} fill={["#22c55e", "#3b82f6", "#ef4444"][index % 3]} />
                ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;