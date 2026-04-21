import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { workers } from '../data/workers'

export default function BookingPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const workerId = Number(params.get('id'))
  const worker = workers.find(w => w.id === workerId) || workers[0]

  const [form, setForm] = useState({ date: '', time: '', address: '', notes: '' })
  const [booked, setBooked] = useState(false)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setBooked(true)
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
              <strong>{worker.name}</strong> has been booked for <strong>{form.date}</strong> at <strong>{form.time}</strong>.
            </p>
            <button onClick={() => navigate('/my-bookings')} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              View My Bookings
            </button>
          </div>
        </div>
      </div>
    )
  }

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
              <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">{worker.skill}</p>
              <div className="text-yellow-400 mb-2">{'⭐'.repeat(worker.rating)}</div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{worker.price}<span className="text-sm text-gray-500">/day</span></p>
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
                  <input type="text" required value={form.address} onChange={set('address')} placeholder="Enter your full address"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Additional Notes (optional)</label>
                  <textarea rows={4} value={form.notes} onChange={set('notes')} placeholder="Describe the work needed..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-1">
                    <span>Service charge</span><span>₹{worker.price}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-1">
                    <span>Platform fee</span><span>₹50</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 dark:text-white text-lg border-t border-blue-200 dark:border-blue-700 pt-2 mt-2">
                    <span>Total</span><span>₹{worker.price + 50}</span>
                  </div>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition hover-scale">
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
