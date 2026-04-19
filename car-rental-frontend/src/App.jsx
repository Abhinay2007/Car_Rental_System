import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import VehicleList from "./pages/VehicleList"; // ✅ ADD THIS
import VehicleDetail from "./pages/VehicleDetail";
import MyRentals from "./pages/MyRentals";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import AdminVehicles from "./pages/AdminVehicles";
import AdminLocations from "./pages/AdminLocations";
import AdminVehicleTypes from "./pages/AdminVehicleTypes";
import Home from "./pages/Home";

function Dashboard() {
  return <h1 className="text-center mt-10">Dashboard</h1>;
}

function App() {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />
        {/* <Route
          path="/"
          element={token ? <Navigate to="/vehicles" /> : <Home />}
        /> */}

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 🔥 NEW ROUTE */}
        <Route
          path="/vehicles"
          element={
            <ProtectedRoute>
              <VehicleList />
            </ProtectedRoute>
          }
        />

        <Route
        path="/vehicles/:id"
          element={
            <ProtectedRoute>
              <VehicleDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-rentals"
          element={
            <ProtectedRoute>
              <MyRentals />
            </ProtectedRoute>
          }
        />

        <Route path="/register" element={<Register />} />




        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route path="/admin/vehicles" element={<AdminVehicles />} />

        <Route path="/admin/locations" element={<AdminLocations />} />

        <Route path="/admin/types" element={<AdminVehicleTypes />} />

        <Route path="/login" element={<Login/>}/>

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;