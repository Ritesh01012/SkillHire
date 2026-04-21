import { useState } from 'react'
import Navbar from '../components/Navbar'

const contacts = [
  { id: 1, name: 'Rajesh Kumar', skill: 'Electrician', lastMsg: 'I will arrive by 10 AM.', time: '10:30 AM', unread: 2 },
  { id: 2, name: 'Suresh Patil',  skill: 'Plumber',     lastMsg: 'Can we reschedule to tomorrow?', time: 'Yesterday', unread: 0 },
  { id: 3, name: 'Amit Sharma',   skill: 'Carpenter',   lastMsg: 'Job completed. Thank you!', time: 'Mon', unread: 0 },
]

const initMessages = {
  1: [
    { from: 'them', text: 'Hello! I can come for the electrical work.', time: '10:00 AM' },
    { from: 'me',   text: 'Great! What time suits you?', time: '10:15 AM' },
    { from: 'them', text: 'I will arrive by 10 AM.', time: '10:30 AM' },
  ],
  2: [
    { from: 'me',   text: 'Hi, I booked you for plumbing tomorrow.', time: 'Yesterday' },
    { from: 'them', text: 'Can we reschedule to tomorrow?', time: 'Yesterday' },
  ],
  3: [
    { from: 'them', text: 'Job completed. Thank you!', time: 'Mon' },
    { from: 'me',   text: 'Thank you, great work!', time: 'Mon' },
  ],
}

export default function Messages() {
  const [active, setActive] = useState(contacts[0])
  const [messages, setMessages] = useState(initMessages)
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    const newMsg = { from: 'me', text: input, time: 'Now' }
    setMessages(m => ({ ...m, [active.id]: [...(m[active.id] || []), newMsg] }))
    setInput('')
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Messages</h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden" style={{ height: '70vh' }}>
          <div className="flex h-full">
            {/* Contacts sidebar */}
            <div className="w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <input
                  type="text" placeholder="Search conversations..."
                  className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none"
                />
              </div>
              <div className="flex-1 overflow-y-auto">
                {contacts.map(c => (
                  <div
                    key={c.id}
                    onClick={() => setActive(c)}
                    className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition ${active.id === c.id ? 'bg-blue-50 dark:bg-gray-700' : ''}`}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-xl flex-shrink-0">👤</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{c.name}</p>
                        <span className="text-xs text-gray-400 flex-shrink-0">{c.time}</span>
                      </div>
                      <p className="text-xs text-blue-500 mb-1">{c.skill}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{c.lastMsg}</p>
                    </div>
                    {c.unread > 0 && (
                      <span className="w-5 h-5 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center flex-shrink-0">{c.unread}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Chat window */}
            <div className="hidden md:flex flex-col flex-1">
              {/* Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-lg">👤</div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{active.name}</p>
                  <p className="text-xs text-blue-500">{active.skill}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {(messages[active.id] || []).map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                      msg.from === 'me'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                    }`}>
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.from === 'me' ? 'text-blue-200' : 'text-gray-400'}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={send} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
