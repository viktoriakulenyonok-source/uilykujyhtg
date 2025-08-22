import React, { useState } from 'react'
import { Search, Filter, Plus, Clock, Star, Users } from 'lucide-react'

const TaskBank = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock data for tasks
  const tasks = [
    {
      id: 1,
      title: 'Разработка веб-приложения',
      description: 'Создание современного веб-приложения с использованием React и Node.js',
      category: 'development',
      difficulty: 'medium',
      duration: '2-3 недели',
      reward: 5000,
      participants: 3,
      rating: 4.5
    },
    {
      id: 2,
      title: 'Дизайн логотипа',
      description: 'Создание уникального логотипа для стартапа в сфере технологий',
      category: 'design',
      difficulty: 'easy',
      duration: '1 неделя',
      reward: 2000,
      participants: 1,
      rating: 4.8
    },
    {
      id: 3,
      title: 'Анализ данных',
      description: 'Проведение анализа больших данных и создание отчетов',
      category: 'analytics',
      difficulty: 'hard',
      duration: '3-4 недели',
      reward: 8000,
      participants: 2,
      rating: 4.2
    },
    {
      id: 4,
      title: 'Написание контента',
      description: 'Создание качественного контента для блога компании',
      category: 'content',
      difficulty: 'easy',
      duration: '5 дней',
      reward: 1500,
      participants: 4,
      rating: 4.6
    }
  ]

  const categories = [
    { id: 'all', name: 'Все категории' },
    { id: 'development', name: 'Разработка' },
    { id: 'design', name: 'Дизайн' },
    { id: 'analytics', name: 'Аналитика' },
    { id: 'content', name: 'Контент' }
  ]

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'Легкий'
      case 'medium': return 'Средний'
      case 'hard': return 'Сложный'
      default: return 'Неизвестно'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Банк заданий</h1>
          <p className="text-gray-600">Найдите подходящее задание для выполнения</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Создать задание
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск заданий..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Category filter */}
          <div className="sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
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

      {/* Tasks grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map(task => (
          <div key={task.id} className="card hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(task.difficulty)}`}>
                {getDifficultyText(task.difficulty)}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {task.duration}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {task.participants}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-600">{task.rating}</span>
                </div>
                <span className="text-lg font-bold text-primary-600">{task.reward} ₽</span>
              </div>
              
              <button className="w-full btn-primary">
                Принять задание
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Задания не найдены</h3>
          <p className="text-gray-600">Попробуйте изменить параметры поиска</p>
        </div>
      )}
    </div>
  )
}

export default TaskBank