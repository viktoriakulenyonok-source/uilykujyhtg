import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import Auth from './pages/Auth'
import TaskBank from './pages/TaskBank'
import MyTasks from './pages/MyTasks'
import Marketplace from './pages/Marketplace'
import Profile from './pages/Profile'
import TaskDetail from './pages/TaskDetail'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<TaskBank />} />
              <Route path="my-tasks" element={<MyTasks />} />
              <Route path="marketplace" element={<Marketplace />} />
              <Route path="profile" element={<Profile />} />
              <Route path="task/:id" element={<TaskDetail />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App