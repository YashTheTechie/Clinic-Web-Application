import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Patient Pages
import Home from './pages/patient/Home';
import AllServices from './pages/patient/AllServices';
import BookAppointment from './pages/patient/BookAppointment';
import Reviews from './pages/patient/Reviews';
import AboutUs from './pages/patient/AboutUs';
import Contact from './pages/patient/Contact';
import MyAppointments from './pages/patient/MyAppointments';
import PatientAppointmentDetail from './pages/patient/PatientAppointmentDetail';
// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Appointments from './pages/admin/Appointments';
import AppointmentDetail from './pages/admin/AppointmentDetail';
import History from './pages/admin/History';

// Route Guards
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Patient Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<AllServices />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
<Route path="/my-appointments/:id" element={<PatientAppointmentDetail />} />
        {/* Protected Patient Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/book-appointment" element={<BookAppointment />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="appointments/:id" element={<AppointmentDetail />} />
            <Route path="history" element={<History />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;