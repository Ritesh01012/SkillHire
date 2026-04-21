import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function BookingPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const workerId = params.get('workerId')
  const [worker, setWorker] = useState(null)
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({ date: '', time: '', location: '', notes: '' })
  const [booked, setBooked] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (workerId) {
      fetchWorker()
    }
  }, [workerId])

  const fetchWorker = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/worker/${workerId}`)
      if (response.ok) {
        const data = await response.json()
        setWorker(data.worker)
      }
    } catch (error) {
      console.error('Error fetching worker:', error)
    } finally {
      setLoading(false)
    }
  }

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const token = localStorage.getItem('userToken')
      const response = await fetch('http://localhost:5000/api/customer/bookings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          workerId: workerId,
          service: worker.skills?.[0] || 'Service',
          date: form.date,
          time: form.time,
          location: form.location,
          amount: worker.rate || 0,
          notes: form.notes
        })
      })

      if (response.ok) {
        setBooked(true)
      } else {
        alert('Failed to create booking')
      }
    } catch (error) {
      console.error('Error creating booking:', error)
      alert('Error creating booking')
    } finally {
      setSubmitting(false)
    }
  }

  if (booked) {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="bg-white dark:bg-gray-800 max-w-md mx-auto p-10 rounded-2xl shadow">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              <strong>{worker?.name || 'Worker'}</strong> has been booked for <strong>{form.date}</strong> at <strong>{form.time}</strong>.
            </p>
            <button onClick={() => navigate('/my-bookings')} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              View My Bookings
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-gray-600 dark:text-gray-400">Loading worker information...</p>
        </div>
      </div>
    )
  }

  if (!worker) {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-gray-600 dark:text-gray-400">Worker not found</p>
          <Link to="/all-workers" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Back to Workers
          </Link>
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Book Worker</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Worker summary */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 text-center sticky top-24">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-3">👤</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{worker.name}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">{primarySkill}</p>
              <div className="text-yellow-400 mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{rate}<span className="text-sm text-gray-500">/hour</span></p>
            </div>
          </div>

          {/* Booking form */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Date</label>
                    <input type="date" required value={form.date} onChange={set('date')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Time</label>
                    <input type="time" required value={form.time} onChange={set('time')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Service Address</label>
                  <input type="text" required value={form.location} onChange={set('location')} placeholder="Enter your full address"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Additional Notes (optional)</label>
                  <textarea rows={4} value={form.notes} onChange={set('notes')} placeholder="Describe the work needed..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-1">
                    <span>Service charge</span><span>₹{rate}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-1">
                    <span>Platform fee</span><span>₹50</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 dark:text-white text-lg border-t border-blue-200 dark:border-blue-700 pt-2 mt-2">
                    <span>Total</span><span>₹{rate + 50}</span>
                  </div>
                </div>
                <button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition hover-scale disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? 'Processing...' : 'Confirm Booking'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
