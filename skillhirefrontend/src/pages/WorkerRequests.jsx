import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function WorkerRequests() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await fetch('http://localhost:5000/api/worker/bookings', {
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

  const handleAcceptBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await fetch(`http://localhost:5000/api/worker/bookings/${bookingId}/accept`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        alert('Booking accepted!')
        fetchBookings()
      } else {
        alert('Failed to accept booking')
      }
    } catch (error) {
      console.error('Error accepting booking:', error)
      alert('Error accepting booking')
    }
  }

  const handleRejectBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await fetch(`http://localhost:5000/api/worker/bookings/${bookingId}/reject`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        alert('Booking rejected!')
        fetchBookings()
      } else {
        alert('Failed to reject booking')
      }
    } catch (error) {
      console.error('Error rejecting booking:', error)
      alert('Error rejecting booking')
    }
  }

  const handleCompleteBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await fetch(`http://localhost:5000/api/worker/bookings/${bookingId}/complete`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        alert('Booking marked as completed!')
        fetchBookings()
      } else {
        alert('Failed to complete booking')
      }
    } catch (error) {
      console.error('Error completing booking:', error)
      alert('Error completing booking')
    }
  }

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    accepted: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Booking Requests</h1>
          <Link to="/worker-dashboard" className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold">
            ← Back to Dashboard
          </Link>
        </div>

        {loading ? (
          <div className="bg-white dark:bg-gray-800 p-12 rounded-lg shadow text-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-12 rounded-lg shadow text-center">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">No booking requests yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map(booking => (
              <div key={booking._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-xl">👤</div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{booking.customer?.name || 'Customer'}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{booking.customer?.email || ''}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <p className="text-gray-600 dark:text-gray-400"><strong>Service:</strong> {booking.service}</p>
                      <p className="text-gray-600 dark:text-gray-400"><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                      <p className="text-gray-600 dark:text-gray-400"><strong>Time:</strong> {booking.time}</p>
                      <p className="text-gray-600 dark:text-gray-400"><strong>Location:</strong> {booking.location}</p>
                      <p className="text-gray-600 dark:text-gray-400"><strong>Amount:</strong> ₹{booking.amount}</p>
                    </div>
                    {booking.notes && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-3"><strong>Notes:</strong> {booking.notes}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 min-w-[150px]">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize text-center ${statusColors[booking.status] || 'bg-gray-100 text-gray-700'}`}>{booking.status}</span>
                    {booking.status === 'pending' && (
                      <div className="flex gap-2">
                        <button onClick={() => handleAcceptBooking(booking._id)} className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition">
                          Accept
                        </button>
                        <button onClick={() => handleRejectBooking(booking._id)} className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition">
                          Reject
                        </button>
                      </div>
                    )}
                    {booking.status === 'accepted' && (
                      <button onClick={() => handleCompleteBooking(booking._id)} className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                        Mark Complete
                      </button>
                    )}
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
