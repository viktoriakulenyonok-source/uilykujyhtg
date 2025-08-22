import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Auth from './pages/Auth'
import TaskBank from './pages/TaskBank'
import MyTasks from './pages/MyTasks'
import Profile from './pages/Profile'
import Market from './pages/Market'
import TaskDetails from './pages/TaskDetails'
import GiftPopup from './pages/GiftPopup'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<TaskBank />} />
            <Route path="tasks" element={<MyTasks />} />
            <Route path="profile" element={<Profile />} />
            <Route path="market" element={<Market />} />
            <Route path="task/:id" element={<TaskDetails />} />
            <Route path="gift" element={<GiftPopup />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App