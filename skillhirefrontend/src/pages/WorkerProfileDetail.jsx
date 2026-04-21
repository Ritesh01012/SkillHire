import { useParams, useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'

export default function WorkerProfileDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [worker, setWorker] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWorkerData()
  }, [id])

  const fetchWorkerData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/worker/${id}`)
      if (response.ok) {
        const data = await response.json()
        setWorker(data.worker)
        setReviews(data.reviews)
      }
    } catch (error) {
      console.error('Error fetching worker:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBook = () => {
    navigate(`/booking?workerId=${id}`)
  }

  if (loading) {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-600 dark:text-gray-400">Loading worker profile...</p>
        </div>
      </div>
    )
  }

  if (!worker) {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-600 dark:text-gray-400">Worker not found</p>
        </div>
      </div>
    )
  }

  const skills = worker.skills || []
  const primarySkill = skills[0] || 'General'
  const rate = worker.rate || 0

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-600 hover:underline mb-6 font-medium">
          ← Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-6xl mx-auto mb-4">👤</div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{worker.name}</h1>
              <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">⭐ {primarySkill}</p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</span>
                <span className="text-gray-500 dark:text-gray-400">(5/5)</span>
              </div>
              <div className="flex justify-center gap-6 mb-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{worker.experience || 0}+</p>
                  <p>Years Exp</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{reviews.length}</p>
                  <p>Reviews</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{worker.availability}</p>
                  <p>Status</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">₹{rate}<span className="text-base text-gray-500">/hour</span></p>
              <button
                onClick={handleBook}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-bold hover:shadow-lg transition hover-scale"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">About</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {worker.bio || `Hi, I'm ${worker.name}, a professional ${primarySkill} with ${worker.experience || 0} years of experience. I take pride in delivering high-quality work on time.`}
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-gray-600 dark:text-gray-400"><strong>Location:</strong> {worker.location || 'Not specified'}</p>
                <p className="text-gray-600 dark:text-gray-400"><strong>Phone:</strong> {worker.phone || 'Not provided'}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Skills & Services</h2>
              <div className="flex flex-wrap gap-2">
                {skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">{skill}</span>
                  ))
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">No skills listed</span>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Customer Reviews</h2>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((r, i) => (
                    <div key={i} className="border-b border-gray-100 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-semibold text-gray-900 dark:text-white">{r.customer?.name || 'Anonymous'}</p>
                        <span className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="text-yellow-400 text-sm mb-1">{'⭐'.repeat(r.rating)}</div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{r.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No reviews yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
