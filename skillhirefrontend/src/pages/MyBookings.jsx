import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const statusColors = {
  completed: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  pending:   'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  accepted:  'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

export default function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' })

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await fetch('http://localhost:5000/api/customer/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const cancelBooking = async (id) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await fetch(`http://localhost:5000/api/customer/bookings/${id}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        alert('Booking cancelled successfully!')
        fetchBookings()
      } else {
        alert('Failed to cancel booking')
      }
    } catch (error) {
      console.error('Error cancelling booking:', error)
      alert('Error cancelling booking')
    }
  }

  const openReviewModal = (booking) => {
    setSelectedBooking(booking)
    setReviewData({ rating: 5, comment: '' })
    setShowReviewModal(true)
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('userToken')
      const response = await fetch('http://localhost:5000/api/customer/reviews', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bookingId: selectedBooking._id,
          rating: reviewData.rating,
          comment: reviewData.comment
        })
      })

      if (response.ok) {
        alert('Review submitted successfully!')
        setShowReviewModal(false)
        fetchBookings()
      } else {
        const errorData = await response.json()
        alert(`Failed to submit review: ${errorData.message || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      alert('Error submitting review')
    }
  }

  const filters = ['All', 'Pending', 'Accepted', 'Completed', 'Cancelled']
  const visible = filter === 'All' ? bookings : bookings.filter(b => b.status === filter)

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Bookings</h1>
          <Link to="/all-workers" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
            + New Booking
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                filter === f ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="bg-white dark:bg-gray-800 p-12 rounded-lg shadow text-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg">Loading bookings...</p>
          </div>
        ) : visible.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-12 rounded-lg shadow text-center">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">No bookings found.</p>
            <Link to="/all-workers" className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
              Find Workers
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {visible.map(b => (
              <div key={b._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-2xl">👤</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{b.worker?.name || 'Unknown'}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">{b.service || b.worker?.skills?.[0] || 'Service'}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">📅 {new Date(b.date).toLocaleDateString()} at {b.time} &nbsp;|&nbsp; ₹{b.amount}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${statusColors[b.status] || 'bg-gray-100 text-gray-700'}`}>{b.status}</span>
                  {(b.status === 'pending' || b.status === 'accepted') && (
                    <button onClick={() => cancelBooking(b._id)} className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg text-sm font-semibold transition">
                      Cancel
                    </button>
                  )}
                  {b.status === 'completed' && (
                    <button onClick={() => openReviewModal(b)} className="px-4 py-2 bg-yellow-100 text-yellow-600 hover:bg-yellow-200 rounded-lg text-sm font-semibold transition">
                      ⭐ Rate Worker
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Rate Worker</h2>
                <button onClick={() => setShowReviewModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl">&times;</button>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 dark:text-gray-400 mb-2">Rating for: <strong>{selectedBooking?.worker?.name || 'Worker'}</strong></p>
              </div>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewData({...reviewData, rating: star})}
                        className={`text-3xl transition ${star <= reviewData.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Comment</label>
                  <textarea
                    value={reviewData.comment}
                    onChange={e => setReviewData({...reviewData, comment: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    rows="4"
                    placeholder="Share your experience..."
                    required
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowReviewModal(false)} className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition font-semibold">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">Submit Review</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
