import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { getCurrentUser } from './data/auth'

import Home               from './pages/Home'
import Login              from './pages/Login'
import Signup             from './pages/Signup'
import AllWorkers         from './pages/AllWorkers'
import CustomerDashboard  from './pages/CustomerDashboard'
import WorkerDashboard    from './pages/WorkerDashboard'
import AdminDashboard     from './pages/AdminDashboard'
import MyBookings         from './pages/MyBookings'
import Messages           from './pages/Messages'
import SearchResults      from './pages/SearchResults'
import WorkerProfileDetail from './pages/WorkerProfileDetail'
import BookingPage        from './pages/BookingPage'

// Protected route wrapper
function Protected({ children, allowedRoles }) {
  const user = getCurrentUser()
  if (!user) return <Navigate to="/login" replace />
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/"                    element={<Home />} />
        <Route path="/login"               element={<Login />} />
        <Route path="/signup"              element={<Signup />} />
        <Route path="/all-workers"         element={<AllWorkers />} />
        <Route path="/search-results"      element={<SearchResults />} />
        <Route path="/worker/:id"          element={<WorkerProfileDetail />} />

        {/* Customer */}
        <Route path="/customer-dashboard"  element={<Protected allowedRoles={['customer']}><CustomerDashboard /></Protected>} />
        <Route path="/my-bookings"         element={<Protected allowedRoles={['customer']}><MyBookings /></Protected>} />
        <Route path="/messages"            element={<Protected allowedRoles={['customer', 'worker']}><Messages /></Protected>} />
        <Route path="/booking"             element={<Protected allowedRoles={['customer']}><BookingPage /></Protected>} />

        {/* Worker */}
        <Route path="/worker-dashboard"    element={<Protected allowedRoles={['worker']}><WorkerDashboard /></Protected>} />

        {/* Admin */}
        <Route path="/admin-dashboard"     element={<Protected allowedRoles={['admin']}><AdminDashboard /></Protected>} />

        {/* Fallback */}
        <Route path="*"                    element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
