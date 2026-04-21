import { useNavigate } from 'react-router-dom'

export default function WorkerCard({ worker }) {
  const navigate = useNavigate()

  const handleBook = () => {
    navigate(`/booking?workerId=${worker._id}`)
  }

  const handleViewProfile = () => {
    navigate(`/worker/${worker._id}`)
  }

  const skills = worker.skills || []
  const primarySkill = skills[0] || 'General'
  const rate = worker.rate || 0

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition duration-300">
      <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
        <div className="text-8xl">👤</div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-1 text-gray-900 dark:text-white">{worker.name}</h3>
        <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">⭐ {primarySkill}</p>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                +{skills.length - 3}
              </span>
            )}
          </div>
        )}
        <p className="text-gray-700 dark:text-gray-300 font-semibold mb-1">₹{rate}/hour</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">📍 {worker.location || 'Location not specified'}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">✓ {worker.experience || 0} years experience</p>
        <div className="flex gap-2">
          <button
            onClick={handleViewProfile}
            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:shadow-lg font-semibold transition"
          >
            View Profile
          </button>
          <button
            onClick={handleBook}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:shadow-lg font-semibold transition hover-scale"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}
