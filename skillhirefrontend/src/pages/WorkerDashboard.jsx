import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getCurrentUser } from '../data/auth'
import { useState, useEffect } from 'react'

export default function WorkerDashboard() {
  const user = getCurrentUser()
  const [stats, setStats] = useState({
    totalJobs: 0,
    completedJobs: 0,
    earnings: 0,
    pendingRequests: 0,
    averageRating: 0,
    totalReviews: 0
  })
  const [loading, setLoading] = useState(true)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    skills: [],
    rate: 0,
    availability: 'available',
    location: '',
    phone: '',
    bio: '',
    experience: 0
  })

  useEffect(() => {
    fetchStats()
    fetchProfile()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await fetch('http://localhost:5000/api/worker/stats', {
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
      const response = await fetch('http://localhost:5000/api/worker/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setProfileData({
          skills: data.skills || [],
          rate: data.rate || 0,
          availability: data.availability || 'available',
          location: data.location || '',
          phone: data.phone || '',
          bio: data.bio || '',
          experience: data.experience || 0
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
      console.log('Token:', token ? 'exists' : 'missing')
      console.log('Profile data:', profileData)

      const response = await fetch('http://localhost:5000/api/worker/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      })

      console.log('Response status:', response.status)

      if (response.ok) {
        const data = await response.json()
        console.log('Success:', data)
        alert('Profile updated successfully!')
        setShowEditProfile(false)
        fetchProfile() // Refresh profile data
      } else {
        const errorData = await response.json()
        console.error('Error response:', errorData)
        alert(`Failed to update profile: ${errorData.message || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert(`Error updating profile: ${error.message}`)
    }
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Worker Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Welcome back, {user?.email || 'Worker'}!</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Jobs',    value: loading ? '...' : stats.totalJobs, color: 'text-blue-600' },
            { label: 'Completed',     value: loading ? '...' : stats.completedJobs, color: 'text-green-600' },
            { label: 'Earnings',      value: loading ? '...' : `₹${stats.earnings}`, color: 'text-purple-600' },
          ].map(stat => (
            <div key={stat.label} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{stat.label}</h3>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="text-4xl mb-3">📋</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Incoming Requests</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">You have <span className="font-bold text-blue-600">{loading ? '...' : stats.pendingRequests} new</span> booking requests.</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">View Requests</button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="text-4xl mb-3">👤</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">My Profile</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Update skills, rate, availability and portfolio.</p>
            <button onClick={() => setShowEditProfile(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">Edit Profile</button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">My Reviews</h3>
            <p className="text-gray-600 dark:text-gray-400">Average Rating: <span className="font-bold text-yellow-500">{loading ? '...' : `${stats.averageRating} / 5`}</span> ({stats.totalReviews} reviews)</p>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {showEditProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
                  <button onClick={() => setShowEditProfile(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl">&times;</button>
                </div>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Skills (comma separated)</label>
                    <input
                      type="text"
                      value={profileData.skills.join(', ')}
                      onChange={e => setProfileData({...profileData, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., Plumbing, Electrical, Carpentry"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Hourly Rate (₹)</label>
                    <input
                      type="number"
                      value={profileData.rate}
                      onChange={e => setProfileData({...profileData, rate: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Availability</label>
                    <select
                      value={profileData.availability}
                      onChange={e => setProfileData({...profileData, availability: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="available">Available</option>
                      <option value="busy">Busy</option>
                      <option value="unavailable">Unavailable</option>
                    </select>
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
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Experience (years)</label>
                    <input
                      type="number"
                      value={profileData.experience}
                      onChange={e => setProfileData({...profileData, experience: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={e => setProfileData({...profileData, bio: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                      rows="4"
                      placeholder="Tell customers about yourself..."
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
