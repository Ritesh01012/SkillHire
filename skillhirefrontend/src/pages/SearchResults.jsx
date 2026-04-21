import { useSearchParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WorkerCard from '../components/WorkerCard'
import { workers } from '../data/workers'

export default function SearchResults() {
  const [params] = useSearchParams()
  const query = params.get('q') || ''

  const results = workers.filter(w =>
    w.skill.toLowerCase().includes(query.toLowerCase()) ||
    w.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Search Results {query && <span className="text-blue-600">"{query}"</span>}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{results.length} worker{results.length !== 1 ? 's' : ''} found</p>
        </div>

        {results.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-12 rounded-lg shadow text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No workers found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Try a different search term or browse all workers.</p>
            <Link to="/all-workers" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
              Browse All Workers
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map(w => <WorkerCard key={w.id} worker={w} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
