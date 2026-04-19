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
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer
} from "recharts";
import "../CSS/AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    totalRentals: 0,
    totalUsers: 0,
    totalRevenue: 0
  });
  const [chartData, setChartData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchStats(), fetchChart(), fetchStatusChart()]).finally(
      () => setLoading(false)
    );
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
    try {
      const res = await api.get("/admin/status-chart");
      setStatusData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const statCards = [
    {
      title: "Total Vehicles",
      value: stats.totalVehicles,
      icon: "🚗",
      color: "gradient-blue"
    },
    {
      title: "Total Rentals",
      value: stats.totalRentals,
      icon: "📋",
      color: "gradient-purple"
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: "👥",
      color: "gradient-orange"
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: "💰",
      color: "gradient-green"
    }
  ];

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b"];

  return (
    <div className="admin-container">
      <Navbar />

      <div className="admin-content">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Dashboard</h1>
            <p className="admin-subtitle">
              Welcome back! Here's your performance overview
            </p>
          </div>
          <div className="header-date">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {statCards.map((card, index) => (
            <div
              key={index}
              className={`stat-card ${card.color}`}
              style={{ "--delay": `${index * 0.1}s` }}
            >
              <div className="stat-icon">{card.icon}</div>
              <div className="stat-content">
                <h3 className="stat-label">{card.title}</h3>
                <p className="stat-value">{card.value}</p>
              </div>
              <div className="stat-accent"></div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          {/* Revenue Chart */}
          <div className="chart-card chart-revenue">
            <div className="chart-header">
              <div>
                <h2 className="chart-title">Revenue Trend</h2>
                <p className="chart-subtitle">Monthly performance analytics</p>
              </div>
            </div>
            <div className="chart-wrapper">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff"
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ fill: "#10b981", r: 5 }}
                      activeDot={{ r: 7 }}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="loading-state">Loading chart...</div>
              )}
            </div>
          </div>

          {/* Status Chart */}
          <div className="chart-card chart-status">
            <div className="chart-header">
              <div>
                <h2 className="chart-title">Rental Status</h2>
                <p className="chart-subtitle">Current distribution</p>
              </div>
            </div>
            <div className="chart-wrapper pie-wrapper">
              {statusData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="loading-state">Loading chart...</div>
              )}
            </div>
          </div>
        </div>

        {/* Summary Stats Footer */}
        <div className="summary-section">
          <div className="summary-card">
            <h3>Quick Stats</h3>
            <div className="quick-stats">
              <div className="quick-stat">
                <span className="badge">AVG</span>
                <span className="value">$2,340</span>
                <span className="label">Avg Revenue/Day</span>
              </div>
              <div className="quick-stat">
                <span className="badge">TOP</span>
                <span className="value">94%</span>
                <span className="label">Utilization Rate</span>
              </div>
              <div className="quick-stat">
                <span className="badge">NEW</span>
                <span className="value">+28</span>
                <span className="label">New Users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
