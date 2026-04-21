import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function WorkerReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await fetch('http://localhost:5000/api/worker/reviews', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setReviews(data)
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Reviews</h1>
          <Link to="/worker-dashboard" className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold">
            ← Back to Dashboard
          </Link>
        </div>

        {loading ? (
          <div className="bg-white dark:bg-gray-800 p-12 rounded-lg shadow text-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-12 rounded-lg shadow text-center">
            <div className="text-6xl mb-4">⭐</div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">No reviews yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-xl">👤</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{review.customer?.name || 'Customer'}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-yellow-400 text-xl">{'⭐'.repeat(review.rating)}</div>
                    </div>
                    {review.booking && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                        Service: <span className="font-medium">{review.booking.service}</span>
                      </p>
                    )}
                    <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
