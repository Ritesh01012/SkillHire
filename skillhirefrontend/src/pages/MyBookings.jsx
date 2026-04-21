import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const demoBookings = [
  { id: 1, worker: 'Rajesh Kumar', skill: 'Electrician', date: '2025-04-15', price: 450, status: 'Completed' },
  { id: 2, worker: 'Suresh Patil',  skill: 'Plumber',     date: '2025-04-18', price: 400, status: 'Pending' },
  { id: 3, worker: 'Amit Sharma',   skill: 'Carpenter',   date: '2025-04-22', price: 500, status: 'Confirmed' },
]

const statusColors = {
  Completed: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  Pending:   'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  Confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  Cancelled: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

export default function MyBookings() {
  const [bookings, setBookings] = useState(demoBookings)
  const [filter, setFilter] = useState('All')

  const filters = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled']
  const visible = filter === 'All' ? bookings : bookings.filter(b => b.status === filter)

  const cancel = (id) => setBookings(bs => bs.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b))

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

        {visible.length === 0 ? (
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
              <div key={b.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-2xl">👤</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{b.worker}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">{b.skill}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">📅 {b.date} &nbsp;|&nbsp; ₹{b.price}/day</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[b.status]}`}>{b.status}</span>
                  {(b.status === 'Pending' || b.status === 'Confirmed') && (
                    <button onClick={() => cancel(b.id)} className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg text-sm font-semibold transition">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
