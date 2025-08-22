import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Star, 
  Clock, 
  User, 
  Calendar, 
  Tag, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  Download,
  MessageCircle
} from 'lucide-react'

const TaskDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAcceptModal, setShowAcceptModal] = useState(false)

  // Mock data
  useEffect(() => {
    const mockTask = {
      id: parseInt(id),
      title: 'Create a React component library',
      description: 'Build a comprehensive component library with TypeScript and Storybook. This project involves creating reusable UI components that can be used across multiple applications. The library should include common components like buttons, forms, modals, and navigation elements.',
      longDescription: `
        <h3>Project Overview</h3>
        <p>We need a modern, accessible, and well-documented React component library that can be used across our product suite. The library should follow best practices for component design and include comprehensive documentation.</p>
        
        <h3>Requirements</h3>
        <ul>
          <li>Build components using TypeScript for type safety</li>
          <li>Use Storybook for component documentation and testing</li>
          <li>Implement accessibility features (ARIA labels, keyboard navigation)</li>
          <li>Create responsive designs that work on all screen sizes</li>
          <li>Include unit tests for all components</li>
          <li>Provide clear documentation and usage examples</li>
        </ul>
        
        <h3>Deliverables</h3>
        <ul>
          <li>Source code for all components</li>
          <li>Storybook documentation</li>
          <li>Unit test suite</li>
          <li>Usage documentation</li>
          <li>Example implementations</li>
        </ul>
      `,
      category: 'development',
      difficulty: 'Hard',
      points: 500,
      estimatedTime: '2-3 weeks',
      dueDate: '2024-02-15',
      tags: ['React', 'TypeScript', 'Storybook', 'UI/UX', 'Accessibility'],
      author: 'TechCorp',
      authorAvatar: 'https://via.placeholder.com/40',
      createdAt: '2024-01-15',
      requirements: [
        'Strong knowledge of React and TypeScript',
        'Experience with component library development',
        'Familiarity with Storybook',
        'Understanding of accessibility standards',
        'Experience with testing frameworks'
      ],
      attachments: [
        { name: 'Design Guidelines.pdf', size: '2.4 MB', type: 'pdf' },
        { name: 'API Documentation.docx', size: '1.8 MB', type: 'doc' },
        { name: 'Wireframes.sketch', size: '5.2 MB', type: 'sketch' }
      ],
      status: 'available' // available, accepted, completed
    }

    setTask(mockTask)
    setLoading(false)
  }, [id])

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleAcceptTask = () => {
    // Handle task acceptance logic here
    alert('Task accepted successfully! You can now start working on it.')
    setShowAcceptModal(false)
    navigate('/my-tasks')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!task) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Task not found</h3>
        <p className="text-gray-500">The task you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
            <p className="text-sm text-gray-500">Posted by {task.author} on {formatDate(task.createdAt)}</p>
          </div>
        </div>
        
        {task.status === 'available' && (
          <button
            onClick={() => setShowAcceptModal(true)}
            className="btn-primary"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Accept Task
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Task Overview</h2>
            <p className="text-gray-600 mb-4">{task.description}</p>
            
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: task.longDescription }}
            />
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h2>
            <ul className="space-y-2">
              {task.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Attachments */}
          {task.attachments && task.attachments.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h2>
              <div className="space-y-2">
                {task.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {attachment.type.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                        <p className="text-xs text-gray-500">{attachment.size}</p>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Task Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Difficulty</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(task.difficulty)}`}>
                  {task.difficulty}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Points</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-semibold text-gray-900">{task.points}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Estimated Time</span>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900">{task.estimatedTime}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Due Date</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900">{formatDate(task.dueDate)}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Category</span>
                <span className="text-gray-900 capitalize">{task.category}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {task.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Posted by</h3>
            <div className="flex items-center space-x-3">
              <img
                src={task.authorAvatar}
                alt={task.author}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{task.author}</p>
                <p className="text-sm text-gray-500">Verified Client</p>
              </div>
            </div>
            <button className="w-full mt-4 btn-secondary">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Client
            </button>
          </div>
        </div>
      </div>

      {/* Accept Task Modal */}
      {showAcceptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Accept Task
            </h3>
            
            <div className="space-y-4 mb-6">
              <p className="text-gray-600">
                Are you sure you want to accept this task? Once accepted, you'll be responsible for completing it by the due date.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Task Summary</h4>
                <div className="space-y-2 text-sm text-blue-800">
                  <div className="flex justify-between">
                    <span>Points:</span>
                    <span className="font-medium">{task.points}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Due Date:</span>
                    <span className="font-medium">{formatDate(task.dueDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Time:</span>
                    <span className="font-medium">{task.estimatedTime}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAcceptModal(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleAcceptTask}
                className="flex-1 btn-primary"
              >
                Accept Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskDetail