import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getCurrentUser } from '../data/auth'
import { useState, useEffect } from 'react'

export default function CustomerDashboard() {
  const user = getCurrentUser()
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedBookings: 0,
    pendingBookings: 0,
    cancelledBookings: 0,
    totalSpent: 0
  })
  const [loading, setLoading] = useState(true)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    phone: '',
    location: '',
    bio: ''
  })

  useEffect(() => {
    fetchStats()
    fetchProfile()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await fetch('http://localhost:5000/api/customer/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await fetch('http://localhost:5000/api/customer/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setProfileData({
          phone: data.phone || '',
          location: data.location || '',
          bio: data.bio || ''
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('userToken')
      const response = await fetch('http://localhost:5000/api/customer/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      })

      if (response.ok) {
        alert('Profile updated successfully!')
        setShowEditProfile(false)
      } else {
        alert('Failed to update profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile')
    }
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Customer Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Welcome back, {user?.email || 'Customer'}!</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Bookings', value: loading ? '...' : stats.totalBookings, color: 'text-blue-600' },
            { label: 'Completed',      value: loading ? '...' : stats.completedBookings, color: 'text-green-600' },
            { label: 'Pending',        value: loading ? '...' : stats.pendingBookings, color: 'text-yellow-600' },
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
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="text-4xl mb-3">👤</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">My Profile</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Update your profile and preferences.</p>
            <button onClick={() => setShowEditProfile(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">Edit Profile</button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Total Spent</h3>
            <p className="text-gray-600 dark:text-gray-400">Total amount spent on bookings: <span className="font-bold text-purple-600">₹{loading ? '...' : stats.totalSpent}</span></p>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {showEditProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
                  <button onClick={() => setShowEditProfile(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl">&times;</button>
                </div>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Phone</label>
                    <input
                      type="text"
                      value={profileData.phone}
                      onChange={e => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Location</label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={e => setProfileData({...profileData, location: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., New York, NY"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={e => setProfileData({...profileData, bio: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                      rows="4"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setShowEditProfile(false)} className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition font-semibold">Cancel</button>
                    <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
