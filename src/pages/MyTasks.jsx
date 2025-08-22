import React, { useState } from 'react'
import { Clock, CheckCircle, XCircle, AlertCircle, MoreVertical, Calendar, DollarSign } from 'lucide-react'

const MyTasks = () => {
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Mock data for user's tasks
  const tasks = [
    {
      id: 1,
      title: 'Разработка веб-приложения',
      description: 'Создание современного веб-приложения с использованием React и Node.js',
      status: 'in-progress',
      progress: 65,
      deadline: '2024-02-15',
      reward: 5000,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Дизайн логотипа',
      description: 'Создание уникального логотипа для стартапа в сфере технологий',
      status: 'completed',
      progress: 100,
      deadline: '2024-01-30',
      reward: 2000,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Анализ данных',
      description: 'Проведение анализа больших данных и создание отчетов',
      status: 'pending',
      progress: 0,
      deadline: '2024-03-01',
      reward: 8000,
      priority: 'high'
    },
    {
      id: 4,
      title: 'Написание контента',
      description: 'Создание качественного контента для блога компании',
      status: 'overdue',
      progress: 30,
      deadline: '2024-01-25',
      reward: 1500,
      priority: 'low'
    }
  ]

  const statuses = [
    { id: 'all', name: 'Все задания', icon: Clock },
    { id: 'pending', name: 'Ожидающие', icon: Clock },
    { id: 'in-progress', name: 'В работе', icon: AlertCircle },
    { id: 'completed', name: 'Завершенные', icon: CheckCircle },
    { id: 'overdue', name: 'Просроченные', icon: XCircle }
  ]

  const filteredTasks = tasks.filter(task => 
    selectedStatus === 'all' || task.status === selectedStatus
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'in-progress': return 'text-blue-600 bg-blue-100'
      case 'completed': return 'text-green-600 bg-green-100'
      case 'overdue': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Ожидает'
      case 'in-progress': return 'В работе'
      case 'completed': return 'Завершено'
      case 'overdue': return 'Просрочено'
      default: return 'Неизвестно'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'Высокий'
      case 'medium': return 'Средний'
      case 'low': return 'Низкий'
      default: return 'Неизвестно'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Мои задания</h1>
          <p className="text-gray-600">Управляйте своими принятыми заданиями</p>
        </div>
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2">
        {statuses.map(status => {
          const Icon = status.icon
          return (
            <button
              key={status.id}
              onClick={() => setSelectedStatus(status.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === status.id
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {status.name}
            </button>
          )
        })}
      </div>

      {/* Tasks list */}
      <div className="space-y-4">
        {filteredTasks.map(task => (
          <div key={task.id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {getStatusText(task.status)}
                    </span>
                    <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {getPriorityText(task.priority)}
                    </span>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{task.description}</p>
                
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Прогресс</span>
                    <span>{task.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Срок: {new Date(task.deadline).toLocaleDateString('ru-RU')}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {task.reward} ₽
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center justify-end space-x-3 mt-4 pt-4 border-t border-gray-200">
              {task.status === 'pending' && (
                <>
                  <button className="btn-secondary">Отказаться</button>
                  <button className="btn-primary">Начать работу</button>
                </>
              )}
              {task.status === 'in-progress' && (
                <>
                  <button className="btn-secondary">Приостановить</button>
                  <button className="btn-primary">Завершить</button>
                </>
              )}
              {task.status === 'overdue' && (
                <>
                  <button className="btn-secondary">Запросить продление</button>
                  <button className="btn-primary">Завершить</button>
                </>
              )}
              {task.status === 'completed' && (
                <button className="btn-secondary">Просмотреть детали</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Clock className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Задания не найдены</h3>
          <p className="text-gray-600">У вас пока нет заданий с выбранным статусом</p>
        </div>
      )}
    </div>
  )
}

export default MyTasks