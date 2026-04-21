import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WorkerCard from '../components/WorkerCard'

export default function AllWorkers() {
  const [workers, setWorkers] = useState([])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWorkers()
  }, [])

  const fetchWorkers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/worker/all')
      if (response.ok) {
        const data = await response.json()
        setWorkers(data)
      }
    } catch (error) {
      console.error('Error fetching workers:', error)
    } finally {
      setLoading(false)
    }
  }

  // Get unique skills from workers
  const skills = ['All', ...new Set(workers.flatMap(w => w.skills || []))]

  const filtered = filter === 'All' ? workers : workers.filter(w => w.skills && w.skills.includes(filter))

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <Navbar />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">All Skilled Workers</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Find the right professional for your needs</p>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Loading workers...</p>
            </div>
          ) : workers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No workers available yet.</p>
            </div>
          ) : (
            <>
              {/* Filter buttons */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {skills.map(s => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`px-5 py-2 rounded-full font-semibold transition ${
                      filter === s
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-blue-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map(worker => (
                  <WorkerCard key={worker._id} worker={worker} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}
