import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Clock, XCircle, Star, Calendar, AlertCircle } from 'lucide-react'

const MyTasks = () => {
  const [tasks, setTasks] = useState([])
  const [activeTab, setActiveTab] = useState('active')
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'active', name: 'Active', count: 0 },
    { id: 'completed', name: 'Completed', count: 0 },
    { id: 'overdue', name: 'Overdue', count: 0 }
  ]

  // Mock data
  useEffect(() => {
    const mockTasks = [
      {
        id: 1,
        title: 'Create a React component library',
        status: 'active',
        progress: 75,
        dueDate: '2024-02-15',
        points: 500,
        category: 'development',
        startedAt: '2024-01-20',
        estimatedTime: '2-3 weeks'
      },
      {
        id: 2,
        title: 'Design a mobile app interface',
        status: 'completed',
        progress: 100,
        dueDate: '2024-01-30',
        points: 300,
        category: 'design',
        startedAt: '2024-01-10',
        completedAt: '2024-01-28',
        estimatedTime: '1-2 weeks'
      },
      {
        id: 3,
        title: 'Write technical documentation',
        status: 'overdue',
        progress: 60,
        dueDate: '2024-01-25',
        points: 150,
        category: 'writing',
        startedAt: '2024-01-15',
        estimatedTime: '3-5 days'
      }
    ]

    setTasks(mockTasks)
    
    // Update tab counts
    const updatedTabs = tabs.map(tab => ({
      ...tab,
      count: mockTasks.filter(task => task.status === tab.id).length
    }))
    
    setLoading(false)
  }, [])

  const filteredTasks = tasks.filter(task => task.status === activeTab)

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <Clock className="h-5 w-5 text-blue-500" />
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'overdue':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-blue-600 bg-blue-100'
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'overdue':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your progress and manage your accepted tasks
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/"
            className="btn-primary"
          >
            Browse More Tasks
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
              <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map(task => (
          <div key={task.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {getStatusIcon(task.status)}
                  <h3 className="text-lg font-semibold text-gray-900">
                    {task.title}
                  </h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="h-4 w-4 mr-2" />
                    <span>{task.points} points</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Due: {formatDate(task.dueDate)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{task.estimatedTime}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        task.status === 'completed' ? 'bg-green-500' :
                        task.status === 'overdue' ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Started: {formatDate(task.startedAt)}
                    {task.completedAt && (
                      <span className="ml-4">Completed: {formatDate(task.completedAt)}</span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/task/${task.id}`}
                      className="btn-secondary text-sm"
                    >
                      View Details
                    </Link>
                    {task.status === 'active' && (
                      <button className="btn-primary text-sm">
                        Update Progress
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Clock className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {activeTab} tasks
          </h3>
          <p className="text-gray-500">
            {activeTab === 'active' && "You don't have any active tasks. Browse the task bank to find new opportunities."}
            {activeTab === 'completed' && "You haven't completed any tasks yet. Keep working on your active tasks!"}
            {activeTab === 'overdue' && "Great! You don't have any overdue tasks."}
          </p>
          {activeTab === 'active' && (
            <div className="mt-4">
              <Link to="/" className="btn-primary">
                Browse Tasks
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MyTasks