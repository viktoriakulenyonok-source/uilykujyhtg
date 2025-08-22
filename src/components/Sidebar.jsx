import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  Home, 
  ClipboardList, 
  ShoppingBag, 
  User, 
  Award,
  Settings,
  LogOut
} from 'lucide-react'

const Sidebar = () => {
  const { user } = useAuth()

  const navigation = [
    { name: 'Task Bank', href: '/', icon: Home },
    { name: 'My Tasks', href: '/my-tasks', icon: ClipboardList },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
    { name: 'Profile', href: '/profile', icon: User },
  ]

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
          {/* Logo */}
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-primary-600">
            <h1 className="text-xl font-bold text-white">TaskManager</h1>
          </div>

          {/* Navigation */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                        isActive
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                  >
                    <Icon
                      className="mr-3 flex-shrink-0 h-6 w-6"
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
                )
              })}
            </nav>

            {/* User stats */}
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.avatar || 'https://via.placeholder.com/32'}
                    alt={user?.name}
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.name}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span className="text-xs text-gray-500">
                      {user?.points} points
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar