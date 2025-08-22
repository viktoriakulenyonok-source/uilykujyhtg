import React, { useState } from 'react'
import { Gift, Star, ShoppingCart, Filter, Search, Heart, Eye } from 'lucide-react'

const Market = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('popular')

  // Mock data for gifts
  const gifts = [
    {
      id: 1,
      name: 'Беспроводные наушники',
      description: 'Высококачественные наушники с шумоподавлением',
      category: 'electronics',
      points: 5000,
      originalPrice: 8000,
      rating: 4.8,
      reviews: 124,
      image: '🎧',
      available: true,
      popular: true
    },
    {
      id: 2,
      name: 'Книга "Искусство программирования"',
      description: 'Классическое руководство по алгоритмам',
      category: 'books',
      points: 2000,
      originalPrice: 3500,
      rating: 4.9,
      reviews: 89,
      image: '📚',
      available: true,
      popular: false
    },
    {
      id: 3,
      name: 'Кофейный сертификат',
      description: 'Сертификат на кофе в популярной сети',
      category: 'food',
      points: 800,
      originalPrice: 1200,
      rating: 4.5,
      reviews: 256,
      image: '☕',
      available: true,
      popular: true
    },
    {
      id: 4,
      name: 'Фитнес-браслет',
      description: 'Умный браслет для отслеживания активности',
      category: 'electronics',
      points: 3500,
      originalPrice: 6000,
      rating: 4.6,
      reviews: 67,
      image: '⌚',
      available: false,
      popular: false
    },
    {
      id: 5,
      name: 'Онлайн курс по React',
      description: 'Полный курс по современной разработке',
      category: 'education',
      points: 4000,
      originalPrice: 7000,
      rating: 4.7,
      reviews: 203,
      image: '💻',
      available: true,
      popular: true
    },
    {
      id: 6,
      name: 'Подарочная карта в кино',
      description: 'Карта для покупки билетов в кинотеатр',
      category: 'entertainment',
      points: 1500,
      originalPrice: 2000,
      rating: 4.4,
      reviews: 178,
      image: '🎬',
      available: true,
      popular: false
    }
  ]

  const categories = [
    { id: 'all', name: 'Все категории', icon: Gift },
    { id: 'electronics', name: 'Электроника', icon: Gift },
    { id: 'books', name: 'Книги', icon: Gift },
    { id: 'food', name: 'Еда и напитки', icon: Gift },
    { id: 'education', name: 'Образование', icon: Gift },
    { id: 'entertainment', name: 'Развлечения', icon: Gift }
  ]

  const filteredGifts = gifts.filter(gift => {
    const matchesSearch = gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gift.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || gift.category === selectedCategory
    return matchesSearch && matchesCategory
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.popular - a.popular
      case 'rating':
        return b.rating - a.rating
      case 'points-low':
        return a.points - b.points
      case 'points-high':
        return b.points - a.points
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Маркет</h1>
          <p className="text-gray-600">Обменивайте баллы на подарки и награды</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-primary-100 text-primary-700 px-4 py-2 rounded-lg">
            <span className="font-medium">Ваши баллы: 12,450</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск подарков..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Category filter */}
          <div className="lg:w-48">
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

          {/* Sort */}
          <div className="lg:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              <option value="popular">Популярные</option>
              <option value="rating">По рейтингу</option>
              <option value="points-low">Баллы: по возрастанию</option>
              <option value="points-high">Баллы: по убыванию</option>
            </select>
          </div>
        </div>
      </div>

      {/* Gifts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGifts.map(gift => (
          <div key={gift.id} className="card hover:shadow-md transition-shadow">
            <div className="relative">
              {/* Gift image */}
              <div className="text-6xl text-center py-8 bg-gray-50 rounded-lg mb-4">
                {gift.image}
              </div>
              
              {/* Popular badge */}
              {gift.popular && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Популярный
                </div>
              )}
              
              {/* Availability badge */}
              {!gift.available && (
                <div className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Недоступно
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">{gift.name}</h3>
              <p className="text-gray-600 text-sm">{gift.description}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{gift.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({gift.reviews} отзывов)</span>
              </div>
              
              {/* Points and price */}
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-primary-600">{gift.points} баллов</div>
                <div className="text-sm text-gray-500 line-through">{gift.originalPrice} ₽</div>
              </div>
              
              {/* Action buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 btn-primary flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Обменять
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGifts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Gift className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Подарки не найдены</h3>
          <p className="text-gray-600">Попробуйте изменить параметры поиска</p>
        </div>
      )}

      {/* No gifts message */}
      {selectedCategory !== 'all' && filteredGifts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Gift className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Нет подарков в выбранных категориях
          </h3>
          <p className="text-gray-600">Попробуйте выбрать другую категорию</p>
        </div>
      )}
    </div>
  )
}

export default Market