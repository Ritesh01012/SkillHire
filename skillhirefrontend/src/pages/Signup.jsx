import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../data/auth'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const user = await signup(form.name, form.email, form.password, form.role)
      if (user.role === 'worker') navigate('/worker-dashboard')
      else navigate('/customer-dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/assets/login -background.mp4" type="video/mp4" />
      </video>
      <div className="bg-white/15 dark:bg-gray-800/15 backdrop-blur-xl p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 relative z-10 border border-white/30 dark:border-gray-700/40">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">💼 SkillHire</h1>
          <p className="text-gray-600 dark:text-gray-400">Create your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: 'name',     label: 'Full Name', type: 'text',     placeholder: 'Enter your name' },
            { key: 'email',    label: 'Email',     type: 'email',    placeholder: 'Enter your email' },
            { key: 'password', label: 'Password',  type: 'password', placeholder: 'Create password' },
          ].map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">{label}</label>
              <input
                type={type} required value={form[key]} onChange={set(key)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={placeholder}
              />
            </div>
          ))}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Role</label>
            <select
              value={form.role} onChange={set('role')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="customer">Customer</option>
              <option value="worker">Worker</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition">
            Sign Up
          </button>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>
        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Login</Link>
        </p>
        <div className="text-center mt-4">
          <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-blue-600">← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
