import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">💼</span>
              <span className="text-2xl font-bold">SkillHire</span>
            </div>
            <p className="text-gray-400 leading-relaxed">Hire Skilled People Anytime, Anywhere. Connecting customers with trusted professionals.</p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white text-xl transition">f</a>
              <a href="#" className="text-gray-400 hover:text-white text-xl transition">𝕏</a>
              <a href="#" className="text-gray-400 hover:text-white text-xl transition">in</a>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-6 text-white border-b-2 border-blue-500 pb-2">For Users</h5>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/all-workers" className="hover:text-white transition font-medium">Find Workers</Link></li>
              <li><a href="/#about" className="hover:text-white transition font-medium">How it Works</a></li>
              <li><a href="#" className="hover:text-white transition font-medium">Reviews</a></li>
              <li><a href="#" className="hover:text-white transition font-medium">Safety Tips</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-6 text-white border-b-2 border-blue-500 pb-2">For Workers</h5>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/signup" className="hover:text-white transition font-medium">Join as Worker</Link></li>
              <li><a href="#" className="hover:text-white transition font-medium">Earn Money</a></li>
              <li><a href="#" className="hover:text-white transition font-medium">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition font-medium">Guidelines</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-6 text-white border-b-2 border-blue-500 pb-2">Company</h5>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition font-medium">About Us</a></li>
              <li><a href="/#contact-form" className="hover:text-white transition font-medium">Contact</a></li>
              <li><a href="#" className="hover:text-white transition font-medium">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition font-medium">Terms of Service</a></li>
              <li><Link to="/login?role=admin" className="hover:text-red-400 transition font-medium text-sm">⚙️ Admin Panel</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>© 2024-2025 SkillHire. All rights reserved. | Connecting skilled workers with customers nationwide.</p>
        </div>
      </div>
    </footer>
  )
}
