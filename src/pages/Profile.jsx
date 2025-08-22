import React, { useState } from 'react'
import { User, Mail, Phone, MapPin, Edit, Save, X, Award, Clock, CheckCircle, Star } from 'lucide-react'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'Иван Петров',
    email: 'ivan.petrov@example.com',
    phone: '+7 (999) 123-45-67',
    location: 'Москва, Россия',
    bio: 'Опытный разработчик с 5-летним стажем работы в сфере веб-разработки. Специализируюсь на React, Node.js и современных веб-технологиях.',
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'Docker']
  })

  const stats = [
    { label: 'Завершенных заданий', value: 24, icon: CheckCircle, color: 'text-green-600' },
    { label: 'Средний рейтинг', value: 4.8, icon: Star, color: 'text-yellow-600' },
    { label: 'Часов работы', value: 156, icon: Clock, color: 'text-blue-600' },
    { label: 'Получено наград', value: 8, icon: Award, color: 'text-purple-600' }
  ]

  const recentTasks = [
    { id: 1, title: 'Разработка веб-приложения', status: 'completed', reward: 5000, date: '2024-01-15' },
    { id: 2, title: 'Дизайн логотипа', status: 'completed', reward: 2000, date: '2024-01-10' },
    { id: 3, title: 'Анализ данных', status: 'in-progress', reward: 8000, date: '2024-01-05' }
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
    console.log('Profile updated:', profileData)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data if needed
  }

  const handleChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Профиль</h1>
          <p className="text-gray-600">Управляйте своими личными данными и настройками</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button onClick={handleCancel} className="btn-secondary flex items-center">
                <X className="w-4 h-4 mr-2" />
                Отмена
              </button>
              <button onClick={handleSave} className="btn-primary flex items-center">
                <Save className="w-4 h-4 mr-2" />
                Сохранить
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="btn-primary flex items-center">
              <Edit className="w-4 h-4 mr-2" />
              Редактировать
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Основная информация</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="input-field"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">{profileData.name}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="input-field"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">{profileData.email}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="input-field"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">{profileData.phone}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Местоположение</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      className="input-field"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">{profileData.location}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">О себе</label>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    rows={4}
                    className="input-field"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-900">{profileData.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Навыки</h2>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Добавить навык..."
                  className="input-field"
                />
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                      {skill}
                      <button className="ml-2 text-primary-600 hover:text-primary-800">×</button>
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Recent Tasks */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Последние задания</h2>
            <div className="space-y-3">
              {recentTasks.map(task => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(task.date).toLocaleDateString('ru-RU')} • {task.reward} ₽
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.status === 'completed' ? 'text-green-600 bg-green-100' : 'text-blue-600 bg-blue-100'
                  }`}>
                    {task.status === 'completed' ? 'Завершено' : 'В работе'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Статистика</h2>
            <div className="space-y-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Icon className={`w-5 h-5 mr-3 ${stat.color}`} />
                      <span className="text-sm text-gray-600">{stat.label}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Быстрые действия</h2>
            <div className="space-y-2">
              <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Изменить пароль
              </button>
              <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Настройки уведомлений
              </button>
              <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Экспорт данных
              </button>
              <button className="w-full text-left p-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                Удалить аккаунт
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile