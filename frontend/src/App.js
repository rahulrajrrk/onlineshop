import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Customer Pages
import CustomerHome from './pages/CustomerHome';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CustomerOrders from './pages/CustomerOrders';
import CustomerProfile from './pages/CustomerProfile';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AddProduct from './pages/AddProduct';
import AdminProductList from './pages/AdminProductList';
import AdminOrders from './pages/AdminOrders';
import AdminReports from './pages/AdminReports';

const role = localStorage.getItem('role');

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Customer Routes */}
        <Route
          path="/customer"
          element={role === 'customer' ? <CustomerHome /> : <Navigate to="/login" />}
        />
        <Route
          path="/customer/cart"
          element={role === 'customer' ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/customer/checkout"
          element={role === 'customer' ? <Checkout /> : <Navigate to="/login" />}
        />
        <Route
          path="/customer/orders"
          element={role === 'customer' ? <CustomerOrders /> : <Navigate to="/login" />}
        />
        <Route
          path="/customer/profile"
          element={role === 'customer' ? <CustomerProfile /> : <Navigate to="/login" />}
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/add-product"
          element={role === 'admin' ? <AddProduct /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/products"
          element={role === 'admin' ? <AdminProductList /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/orders"
          element={role === 'admin' ? <AdminOrders /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/reports"
          element={role === 'admin' ? <AdminReports /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
