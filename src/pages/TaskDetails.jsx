import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Star, 
  Calendar, 
  DollarSign, 
  FileText, 
  Upload,
  CheckCircle,
  AlertCircle,
  MessageCircle
} from 'lucide-react'

const TaskDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [progress, setProgress] = useState(65)

  // Mock task data
  const task = {
    id: id,
    title: 'Разработка веб-приложения',
    description: 'Создание современного веб-приложения с использованием React и Node.js. Приложение должно включать систему аутентификации, панель администратора и API для мобильного приложения.',
    status: 'in-progress',
    progress: progress,
    deadline: '2024-02-15',
    reward: 5000,
    priority: 'high',
    category: 'development',
    difficulty: 'medium',
    client: {
      name: 'Технологическая компания ABC',
      rating: 4.8,
      completedTasks: 45
    },
    requirements: [
      'React 18+ с TypeScript',
      'Node.js backend с Express',
      'MongoDB база данных',
      'JWT аутентификация',
      'Responsive дизайн',
      'API документация'
    ],
    deliverables: [
      'Исходный код проекта',
      'Документация по развертыванию',
      'Тестовые данные',
      'Презентация функционала'
    ],
    timeline: [
      { phase: 'Планирование и дизайн', duration: '3 дня', completed: true },
      { phase: 'Разработка фронтенда', duration: '7 дней', completed: true },
      { phase: 'Разработка бэкенда', duration: '5 дней', completed: false },
      { phase: 'Тестирование и отладка', duration: '3 дня', completed: false },
      { phase: 'Документация и сдача', duration: '2 дня', completed: false }
    ]
  }

  const tabs = [
    { id: 'overview', name: 'Обзор', icon: FileText },
    { id: 'requirements', name: 'Требования', icon: FileText },
    { id: 'timeline', name: 'Временная шкала', icon: Calendar },
    { id: 'communication', name: 'Общение', icon: MessageCircle }
  ]

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
            <p className="text-gray-600">ID: {task.id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
            {getStatusText(task.status)}
          </span>
          <button className="btn-primary">Завершить задание</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map(tab => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {tab.name}
                    </button>
                  )
                })}
              </nav>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Описание</h3>
                    <p className="text-gray-600">{task.description}</p>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Прогресс выполнения</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Timeline preview */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Временная шкала</h3>
                    <div className="space-y-3">
                      {task.timeline.map((phase, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            phase.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {phase.completed ? (
                              <CheckCircle className="w-4 h-4 text-white" />
                            ) : (
                              <span className="text-xs text-white">{index + 1}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{phase.phase}</p>
                            <p className="text-xs text-gray-500">{phase.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Requirements Tab */}
              {activeTab === 'requirements' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Технические требования</h3>
                    <ul className="space-y-2">
                      {task.requirements.map((req, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Что нужно сдать</h3>
                    <ul className="space-y-2">
                      {task.deliverables.map((deliverable, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Timeline Tab */}
              {activeTab === 'timeline' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Детальная временная шкала</h3>
                    <div className="space-y-4">
                      {task.timeline.map((phase, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            phase.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {phase.completed ? (
                              <CheckCircle className="w-5 h-5 text-white" />
                            ) : (
                              <span className="text-sm text-white font-medium">{index + 1}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{phase.phase}</h4>
                            <p className="text-sm text-gray-600">Длительность: {phase.duration}</p>
                            <p className="text-sm text-gray-500">
                              {phase.completed ? 'Завершено' : 'В процессе'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Communication Tab */}
              {activeTab === 'communication' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Сообщения</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">К</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-gray-900">Клиент</span>
                              <span className="text-sm text-gray-500">2 часа назад</span>
                            </div>
                            <p className="text-gray-700">Здравствуйте! Как продвигается работа над проектом?</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">Я</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-gray-900">Вы</span>
                              <span className="text-sm text-gray-500">1 час назад</span>
                            </div>
                            <p className="text-gray-700">Работа идет по плану. Фронтенд готов на 80%, начинаю работу над бэкендом.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <textarea
                        placeholder="Написать сообщение..."
                        rows={3}
                        className="input-field"
                      />
                      <div className="mt-2 flex justify-end">
                        <button className="btn-primary">Отправить</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Task info */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Информация о задании</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Награда</span>
                <span className="font-semibold text-primary-600">{task.reward} ₽</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Срок</span>
                <span className="font-medium">{new Date(task.deadline).toLocaleDateString('ru-RU')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Приоритет</span>
                <span className="font-medium text-red-600">{task.priority === 'high' ? 'Высокий' : 'Средний'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Сложность</span>
                <span className="font-medium">{task.difficulty === 'medium' ? 'Средняя' : 'Высокая'}</span>
              </div>
            </div>
          </div>

          {/* Client info */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Клиент</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">{task.client.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{task.client.name}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{task.client.rating}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Завершено заданий: {task.client.completedTasks}
              </div>
            </div>
          </div>

          {/* File upload */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Загрузка файлов</h3>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Перетащите файлы сюда или</p>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  выберите файлы
                </button>
              </div>
              <div className="text-xs text-gray-500">
                Максимальный размер файла: 10MB
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetails