import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getCurrentUser } from '../data/auth'

export default function CustomerDashboard() {
  const user = getCurrentUser()

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Customer Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Welcome back, {user?.email || 'Customer'}!</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Bookings', value: '3', color: 'text-blue-600' },
            { label: 'Completed',      value: '2', color: 'text-green-600' },
            { label: 'Pending',        value: '1', color: 'text-yellow-600' },
          ].map(stat => (
            <div key={stat.label} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{stat.label}</h3>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/all-workers" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition hover:border-blue-500 border-2 border-transparent">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Find Workers</h3>
            <p className="text-gray-600 dark:text-gray-400">Browse and book skilled professionals near you.</p>
          </Link>
          <Link to="/my-bookings" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition hover:border-blue-500 border-2 border-transparent">
            <div className="text-4xl mb-3">📋</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">My Bookings</h3>
            <p className="text-gray-600 dark:text-gray-400">View and manage all your service bookings.</p>
          </Link>
          <Link to="/messages" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition hover:border-blue-500 border-2 border-transparent">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Messages</h3>
            <p className="text-gray-600 dark:text-gray-400">Chat with workers and service providers.</p>
          </Link>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="text-4xl mb-3">👤</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">My Profile</h3>
            <p className="text-gray-600 dark:text-gray-400">Update your profile and preferences.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
