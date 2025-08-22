import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { User, Mail, Calendar, Award, Settings, Edit, Save, X } from 'lucide-react'

const Profile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || 'No bio yet',
    location: user?.location || '',
    website: user?.website || ''
  })

  const stats = [
    { label: 'Total Points', value: user?.points || 0, icon: Award },
    { label: 'Completed Tasks', value: user?.completedTasks || 0, icon: Award },
    { label: 'Member Since', value: 'Jan 2024', icon: Calendar },
    { label: 'Success Rate', value: '95%', icon: Award }
  ]

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false)
    // You would typically update the user data in the backend
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || 'No bio yet',
      location: user?.location || '',
      website: user?.website || ''
    })
    setIsEditing(false)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account settings and view your statistics
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-secondary"
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={user?.avatar || 'https://via.placeholder.com/80'}
                alt={user?.name}
                className="h-20 w-20 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {user?.name}
                </h2>
                <p className="text-gray-500">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                ) : (
                  <p className="text-gray-900">{formData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                ) : (
                  <p className="text-gray-900">{formData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="input-field"
                  />
                ) : (
                  <p className="text-gray-900">{formData.bio}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter your location"
                  />
                ) : (
                  <p className="text-gray-900">{formData.location || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="https://yourwebsite.com"
                  />
                ) : (
                  <p className="text-gray-900">
                    {formData.website ? (
                      <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-500">
                        {formData.website}
                      </a>
                    ) : (
                      'Not specified'
                    )}
                  </p>
                )}
              </div>

              {isEditing && (
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleSave}
                    className="btn-primary"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
            
            <div className="space-y-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 text-primary-600" />
                      <span className="text-sm font-medium text-gray-700">
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      {stat.value}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h4>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Completed</span> "Design a mobile app interface"
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Started</span> "Create a React component library"
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Earned</span> 300 points
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Notifications</h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span className="ml-2 text-sm text-gray-700">Email notifications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span className="ml-2 text-sm text-gray-700">Task updates</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span className="ml-2 text-sm text-gray-700">Marketing emails</span>
              </label>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Privacy</h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span className="ml-2 text-sm text-gray-700">Public profile</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span className="ml-2 text-sm text-gray-700">Show completed tasks</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span className="ml-2 text-sm text-gray-700">Allow messages</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button className="btn-secondary text-red-600 hover:bg-red-50">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile