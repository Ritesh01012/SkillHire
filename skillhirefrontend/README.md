# 💼 SkillHire — React App

A React + Vite + Tailwind CSS conversion of the SkillHire HTML project.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── App.jsx                  # Routes (React Router v6)
├── main.jsx                 # Entry point
├── index.css                # Global styles + Tailwind
├── data/
│   ├── workers.js           # Worker data & skill categories
│   └── auth.js              # Auth helpers (localStorage)
├── components/
│   ├── Navbar.jsx           # Sticky navbar with dark mode toggle
│   ├── Footer.jsx           # Footer with links
│   └── WorkerCard.jsx       # Reusable worker card
└── pages/
    ├── Home.jsx             # Landing page (hero, how it works, skills, contact)
    ├── Login.jsx            # Login form (customer / worker / admin)
    ├── Signup.jsx           # Signup form with role selection
    ├── AllWorkers.jsx       # All workers with skill filter
    ├── CustomerDashboard.jsx
    ├── WorkerDashboard.jsx
    ├── AdminDashboard.jsx   # Worker table + recent bookings
    ├── MyBookings.jsx       # Booking list with cancel
    ├── Messages.jsx         # Chat UI
    ├── SearchResults.jsx    # Filtered search results
    ├── WorkerProfileDetail.jsx # Worker profile + reviews
    └── BookingPage.jsx      # Booking form with total summary
```

---

## 🔐 Demo Login

| Role     | How to login                          |
|----------|---------------------------------------|
| Customer | Login → select **Customer**           |
| Worker   | Login → select **Worker**             |
| Admin    | Click **⚙️ Admin** in navbar → Login  |

Auth is demo-only using `localStorage` — no real backend.

---

## 🛠 Tech Stack

- **React 18** with hooks
- **React Router v6** for routing
- **Vite** for dev server & build
- **Tailwind CSS v3** for styling
- **Dark mode** via `class` strategy

---

## 🔌 To connect a real backend

Replace the functions in `src/data/auth.js` with real API calls.
Replace the `workers` array in `src/data/workers.js` with a `fetch()` to your API.
