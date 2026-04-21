import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { login } from '../data/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('customer')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const isAdmin = params.get('role') === 'admin'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const user = await login(email, password, isAdmin ? 'admin' : role)
      if (user.role === 'admin') navigate('/admin-dashboard')
      else if (user.role === 'worker') navigate('/worker-dashboard')
      else navigate('/customer-dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-900 perspective-1000">
      {/* Massive animated gradient orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-600 rounded-full filter blur-[100px] opacity-30 animate-pulse-glow"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600 rounded-full filter blur-[100px] opacity-30 animate-pulse-glow" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600 rounded-full filter blur-[80px] opacity-25 animate-pulse-glow" style={{animationDelay: '4s'}}></div>
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-600 rounded-full filter blur-[80px] opacity-20 animate-pulse-glow animate-rainbow" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-rose-600 rounded-full filter blur-[90px] opacity-25 animate-pulse-glow animate-rainbow" style={{animationDelay: '3s'}}></div>
      
      {/* Morphing blob shapes */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-500/40 to-pink-500/40 animate-morph backdrop-blur-sm border border-white/20"></div>
      <div className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-r from-blue-500/40 to-indigo-500/40 animate-morph backdrop-blur-sm border border-white/20" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-pink-500/40 to-rose-500/40 animate-morph backdrop-blur-sm border border-white/20" style={{animationDelay: '4s'}}></div>
      <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-gradient-to-r from-indigo-500/40 to-purple-500/40 animate-morph backdrop-blur-sm border border-white/20" style={{animationDelay: '1s'}}></div>
      
      {/* Spinning geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 backdrop-blur-md animate-spin-slow border-2 border-white/30 rounded-lg rotate-45"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white/10 backdrop-blur-md animate-spin-slow border-2 border-white/30 rounded-full" style={{animationDirection: 'reverse', animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-10 w-20 h-20 bg-white/10 backdrop-blur-md animate-spin-slow border-2 border-white/30 rotate-12" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-1/2 right-10 w-16 h-16 bg-white/10 backdrop-blur-md animate-spin-slow border-2 border-white/30 -rotate-12" style={{animationDirection: 'reverse', animationDelay: '3s'}}></div>
      
      {/* Orbiting particles */}
      <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-orbit shadow-lg shadow-yellow-500/50"></div>
      <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-orbit shadow-lg shadow-cyan-500/50" style={{animationDelay: '5s'}}></div>
      <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-orbit shadow-lg shadow-green-500/50" style={{animationDelay: '10s'}}></div>
      
      {/* Bouncing 3D shapes */}
      <div className="absolute top-20 right-1/3 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 animate-bounce-3d border-2 border-white/40 shadow-2xl shadow-purple-500/50 rounded-2xl"></div>
      <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-blue-400 to-indigo-400 animate-bounce-3d border-2 border-white/40 shadow-2xl shadow-blue-500/50 rounded-2xl" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/3 left-1/5 w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 animate-bounce-3d border-2 border-white/40 shadow-2xl shadow-pink-500/50 rounded-2xl" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-1/4 right-1/5 w-14 h-14 bg-gradient-to-r from-indigo-400 to-purple-400 animate-bounce-3d border-2 border-white/40 shadow-2xl shadow-indigo-500/50 rounded-2xl" style={{animationDelay: '1.5s'}}></div>
      
      {/* Wave floating elements */}
      <div className="absolute top-1/5 left-1/5 w-8 h-8 bg-white/20 backdrop-blur-md animate-wave border border-white/40 rounded-full shadow-lg"></div>
      <div className="absolute top-1/4 right-1/5 w-10 h-10 bg-white/20 backdrop-blur-md animate-wave border border-white/40 rounded-full shadow-lg" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-1/5 left-1/3 w-6 h-6 bg-white/20 backdrop-blur-md animate-wave border border-white/40 rounded-full shadow-lg" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-1/4 right-1/3 w-9 h-9 bg-white/20 backdrop-blur-md animate-wave border border-white/40 rounded-full shadow-lg" style={{animationDelay: '0.5s'}}></div>
      
      {/* Exploding stars */}
      <div className="absolute top-1/6 right-1/6 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-yellow-400/50 animate-explode"></div>
      <div className="absolute bottom-1/6 left-1/6 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[21px] border-l-transparent border-r-transparent border-b-pink-400/50 animate-explode" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/3 left-1/6 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[17px] border-l-transparent border-r-transparent border-b-cyan-400/50 animate-explode" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-1/3 right-1/6 w-0 h-0 border-l-[14px] border-r-[14px] border-b-[24px] border-l-transparent border-r-transparent border-b-purple-400/50 animate-explode" style={{animationDelay: '3s'}}></div>
      
      {/* Rainbow gradient rings */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-4 border-white/10 rounded-full animate-spin-slow animate-rainbow" style={{animationDuration: '30s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-4 border-white/10 rounded-full animate-spin-slow animate-rainbow" style={{animationDuration: '25s', animationDirection: 'reverse'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border-4 border-white/10 rounded-full animate-spin-slow animate-rainbow" style={{animationDuration: '20s'}}></div>
      
      <div className="card-3d bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 relative z-10 border border-white/40 dark:border-gray-700/50">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">💼 SkillHire</h1>
          <p className="text-white/90">{isAdmin ? 'Admin Login' : 'Login to your account'}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2 font-medium">Email</label>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-white mb-2 font-medium">Password</label>
            <input
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
              placeholder="Enter your password"
            />
          </div>
          {!isAdmin && (
            <div>
              <label className="block text-white mb-2 font-medium">Login as</label>
              <select
                value={role} onChange={e => setRole(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/10 text-white focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
              >
                <option value="customer">Customer</option>
                <option value="worker">Worker</option>
              </select>
            </div>
          )}
          <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:from-purple-600 hover:to-pink-600 transition">
            Login
          </button>
          {error && <p className="text-red-400 text-center mt-2">{error}</p>}
        </form>
        <p className="text-center mt-6 text-white/80">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-300 font-semibold hover:text-purple-200 hover:underline">Sign Up</Link>
        </p>
        <div className="text-center mt-4">
          <Link to="/" className="text-white/60 hover:text-white">← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
