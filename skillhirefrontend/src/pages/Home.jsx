import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { skillCategories } from '../data/workers'

export default function Home() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const observerRef = useRef(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          } else {
            entry.target.classList.remove('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.scroll-reveal')
    elements.forEach((el) => observerRef.current.observe(el))

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const handleSearch = () => {
    if (search.trim()) navigate(`/search-results?q=${encodeURIComponent(search)}`)
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      <Navbar />

      {/* HERO */}
      <section id="home" className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-24 relative overflow-hidden perspective-1000">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              {/* Logo */}
              <div className="mb-8 animate-float">
                <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#60A5FA',stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#A855F7',stopOpacity:1}} />
                    </linearGradient>
                    <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="4" dy="4" stdDeviation="3" floodOpacity="0.3"/>
                    </filter>
                  </defs>
                  <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" filter="url(#shadow3d)"/>
                  <path d="M30 50 L45 65 L70 35" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" filter="url(#shadow3d)"/>
                </svg>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-3d">
                Hire Skilled Workers<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-pink-200">Anytime, Anywhere</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8">Connect with trusted local professionals in minutes. Get quality work done professionally without hassle.</p>
              <div className="flex flex-col md:flex-row gap-3 mb-8">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  placeholder="Search skills (Electrician, Plumber...)"
                  className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-300 transition text-lg shadow-lg"
                />
                <button onClick={handleSearch} className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-purple-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg shadow-lg">
                  Search
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-purple-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center shadow-lg">
                  🔍 Find Workers
                </Link>
                <Link to="/signup" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center shadow-lg backdrop-blur-sm">
                  💼 Become a Worker
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              {/* 3D Logo Display */}
              <div className="relative animate-float-3d">
                <div className="card-3d bg-white/10 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20">
                  <svg className="w-48 h-48 mx-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="logoGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:'#60A5FA',stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:'#A855F7',stopOpacity:1}} />
                      </linearGradient>
                      <filter id="shadow3d2" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="6" dy="6" stdDeviation="4" floodOpacity="0.4"/>
                      </filter>
                    </defs>
                    <circle cx="50" cy="50" r="45" fill="url(#logoGradient2)" filter="url(#shadow3d2)"/>
                    <path d="M30 50 L45 65 L70 35" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" filter="url(#shadow3d2)"/>
                  </svg>
                  <p className="text-center text-2xl font-bold mt-6 text-white">SkillHire</p>
                  <p className="text-center text-blue-200 mt-2">Your Trusted Partner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="about" className="800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">How SkillHire Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Simple steps to connect with the perfect worker</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: 1, icon: '✅', title: 'Create Account', desc: 'Sign up as a Worker or Customer. Choose your role and complete your profile with necessary information.' },
              { step: 2, icon: '🔍', title: 'Search or Showcase', desc: 'Customers search nearby workers. Workers showcase their skills, rates, and availability on their profile.' },
              { step: 3, icon: '🤝', title: 'Book & Connect', desc: 'Book workers, get their contact information, complete the service, and leave ratings and reviews.' },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="text-center">
                <div className="h-36 mb-6 flex items-center justify-center">
                  <div className="text-8xl">{icon}</div>
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg">{step}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILL CATEGORIES */}
      <section id="services" className="scroll-reveal py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 perspective-1000">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-3d">Find Workers By Skill</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Browse through various skilled professionals in your area</p>
          </div>
          <div className="card-grid-3d grid grid-cols-2 md:grid-cols-4 gap-6">
            {skillCategories.map(cat => (
              <Link
                key={cat.name}
                to="/all-workers"
                className="card-item-3d bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 text-center border border-purple-100 dark:border-purple-800"
              >
                <div className="text-7xl mb-4">{cat.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white hover:text-purple-600 transition">{cat.name}</h3>
                <p className="text-sm text-gray-500 mt-2">{cat.count} Available</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/all-workers" className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl font-bold text-lg transition btn-3d">
              👥 View All Workers
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="scroll-reveal py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 perspective-1000">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-3d">Why Choose SkillHire?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Experience the best platform for connecting with skilled workers</p>
          </div>
          <div className="card-grid-3d grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '✅', title: 'Verified Workers',    desc: 'All workers are verified and reviewed by customers for quality assurance.' },
              { icon: '📍', title: 'Nearby Workers',      desc: 'Find skilled workers nearest to your location in minutes.' },
              { icon: '💰', title: 'Transparent Pricing', desc: 'No hidden charges. Know the price before booking services.' },
              { icon: '📞', title: 'Direct Contact',      desc: 'Get worker contact after booking for direct communication.' },
              { icon: '⭐', title: 'Ratings & Reviews',   desc: 'Read authentic reviews from previous customers about workers.' },
              { icon: '⚡', title: 'Quick Booking',       desc: 'Book workers in seconds with flexible date and time options.' },
            ].map(f => (
              <div key={f.title} className="card-item-3d p-8 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800 rounded-2xl hover:border-purple-600 hover:shadow-2xl transition duration-500">
                <div className="text-6xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact-form" className="scroll-reveal py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden perspective-1000">
        {/* Animated gradient orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-pink-600 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-3d">Get In Touch</h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">Have questions? We'd love to hear from you.</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="card-3d glass-form p-8 rounded-3xl shadow-2xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_key: '20f19a1c-3d88-4a29-af0f-dcbbad2e7cd0', ...form }),
      })
      setSent(true)
    } catch {
      alert('Message sent! (demo mode)')
      setSent(true)
    }
  }

  if (sent) return <div className="text-center text-white text-2xl py-8">✅ Message sent! We'll get back to you soon.</div>

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {[
        { id: 'name',    label: 'Your Name',      type: 'text',  placeholder: 'John Doe' },
        { id: 'email',   label: 'Email Address',  type: 'email', placeholder: 'john@example.com' },
      ].map(({ id, label, type, placeholder }) => (
        <div key={id}>
          <label className="block text-white font-semibold mb-2">{label}</label>
          <input
            type={type}
            required
            value={form[id]}
            onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
            placeholder={placeholder}
            className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
      ))}
      <div>
        <label className="block text-white font-semibold mb-2">Your Message</label>
        <textarea
          rows={5}
          required
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          placeholder="Tell us how we can help you..."
          className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
        />
      </div>
      <div className="text-center">
        <button type="submit" className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-xl transform hover:scale-105 transition duration-300">
          Send Message 📤
        </button>
      </div>
    </form>
  )
}
