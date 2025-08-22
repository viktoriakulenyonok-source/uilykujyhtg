import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Star, Clock, DollarSign, Tag } from 'lucide-react'

const TaskBank = () => {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'development', name: 'Development' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'writing', name: 'Writing' },
    { id: 'translation', name: 'Translation' }
  ]

  // Mock data
  useEffect(() => {
    const mockTasks = [
      {
        id: 1,
        title: 'Create a React component library',
        description: 'Build a comprehensive component library with TypeScript and Storybook',
        category: 'development',
        difficulty: 'Hard',
        points: 500,
        estimatedTime: '2-3 weeks',
        tags: ['React', 'TypeScript', 'Storybook'],
        author: 'TechCorp',
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        title: 'Design a mobile app interface',
        description: 'Create modern UI/UX designs for a food delivery mobile application',
        category: 'design',
        difficulty: 'Medium',
        points: 300,
        estimatedTime: '1-2 weeks',
        tags: ['UI/UX', 'Mobile', 'Figma'],
        author: 'DesignStudio',
        createdAt: '2024-01-14'
      },
      {
        id: 3,
        title: 'Write technical documentation',
        description: 'Create comprehensive documentation for a new API service',
        category: 'writing',
        difficulty: 'Easy',
        points: 150,
        estimatedTime: '3-5 days',
        tags: ['Documentation', 'API', 'Technical Writing'],
        author: 'DevTeam',
        createdAt: '2024-01-13'
      },
      {
        id: 4,
        title: 'Social media marketing campaign',
        description: 'Develop and execute a social media marketing strategy for a startup',
        category: 'marketing',
        difficulty: 'Medium',
        points: 250,
        estimatedTime: '1 week',
        tags: ['Social Media', 'Marketing', 'Strategy'],
        author: 'MarketingPro',
        createdAt: '2024-01-12'
      },
      {
        id: 5,
        title: 'Translate website content',
        description: 'Translate website content from English to Spanish and French',
        category: 'translation',
        difficulty: 'Easy',
        points: 200,
        estimatedTime: '4-6 days',
        tags: ['Translation', 'Spanish', 'French'],
        author: 'GlobalLingo',
        createdAt: '2024-01-11'
      }
    ]

    setTasks(mockTasks)
    setFilteredTasks(mockTasks)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = tasks

    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(task => task.category === selectedCategory)
    }

    setFilteredTasks(filtered)
  }, [searchTerm, selectedCategory, tasks])

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
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
          <h1 className="text-2xl font-bold text-gray-900">Task Bank</h1>
          <p className="mt-1 text-sm text-gray-500">
            Browse and accept tasks to earn points and build your portfolio
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/my-tasks"
            className="btn-primary"
          >
            View My Tasks
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map(task => (
          <div key={task.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {task.title}
                </h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(task.difficulty)}`}>
                  {task.difficulty}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {task.description}
              </p>

              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  <span>{task.points} points</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{task.estimatedTime}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
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

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">by {task.author}</span>
                <Link
                  to={`/task/${task.id}`}
                  className="btn-primary text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

export default TaskBank