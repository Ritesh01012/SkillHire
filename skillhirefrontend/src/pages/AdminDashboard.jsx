import Navbar from '../components/Navbar'
import { workers } from '../data/workers'

export default function AdminDashboard() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Workers',   value: workers.length, color: 'text-blue-600' },
            { label: 'Total Customers', value: 24,             color: 'text-green-600' },
            { label: 'Total Bookings',  value: 38,             color: 'text-purple-600' },
          ].map(stat => (
            <div key={stat.label} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{stat.label}</h3>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Workers Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Registered Workers</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {['ID', 'Name', 'Skill', 'Rating', 'Price/Day', 'Status'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {workers.map(w => (
                  <tr key={w.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">#{w.id}</td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white">{w.name}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{w.skill}</td>
                    <td className="px-6 py-4 text-yellow-500">{'⭐'.repeat(w.rating)}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">₹{w.price}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-xs font-semibold">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Bookings</h2>
          </div>
          <div className="p-6">
            {[
              { customer: 'Priya Sharma',  worker: 'Rajesh Kumar', skill: 'Electrician', status: 'Completed', statusColor: 'bg-green-100 text-green-700' },
              { customer: 'Anil Gupta',    worker: 'Suresh Patil', skill: 'Plumber',     status: 'Pending',   statusColor: 'bg-yellow-100 text-yellow-700' },
              { customer: 'Meena Joshi',   worker: 'Amit Sharma',  skill: 'Carpenter',   status: 'Active',    statusColor: 'bg-blue-100 text-blue-700' },
            ].map((b, i) => (
              <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{b.customer} → {b.worker}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{b.skill}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${b.statusColor}`}>{b.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
