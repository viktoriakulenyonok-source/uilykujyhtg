import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  ClipboardList, 
  User, 
  ShoppingBag, 
  LogOut,
  Bell,
  Settings
} from 'lucide-react'

const Layout = () => {
  const location = useLocation()

  const navigation = [
    { name: 'Банк заданий', href: '/dashboard', icon: Home },
    { name: 'Мои задания', href: '/dashboard/tasks', icon: ClipboardList },
    { name: 'Профиль', href: '/dashboard/profile', icon: User },
    { name: 'Маркет', href: '/dashboard/market', icon: ShoppingBag },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">TaskManager</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Пользователь</p>
                <p className="text-xs text-gray-500">user@example.com</p>
              </div>
            </div>
            <button className="mt-3 flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <LogOut className="w-4 h-4 mr-2" />
              Выйти
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {navigation.find(item => item.href === location.pathname)?.name || 'Панель управления'}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout