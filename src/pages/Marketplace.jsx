import React, { useState, useEffect } from 'react'
import { Gift, Star, ShoppingCart, Heart, Eye, X } from 'lucide-react'

const Marketplace = () => {
  const [rewards, setRewards] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const [selectedReward, setSelectedReward] = useState(null)

  const categories = [
    { id: 'all', name: 'All Rewards' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'gift-cards', name: 'Gift Cards' },
    { id: 'books', name: 'Books' },
    { id: 'clothing', name: 'Clothing' }
  ]

  // Mock data
  useEffect(() => {
    const mockRewards = [
      {
        id: 1,
        name: 'Amazon Gift Card',
        description: '$50 Amazon gift card for online shopping',
        category: 'gift-cards',
        points: 5000,
        image: 'https://via.placeholder.com/200x150?text=Amazon+Card',
        available: true,
        popular: true
      },
      {
        id: 2,
        name: 'Wireless Headphones',
        description: 'Premium noise-canceling wireless headphones',
        category: 'electronics',
        points: 8000,
        image: 'https://via.placeholder.com/200x150?text=Headphones',
        available: true,
        popular: false
      },
      {
        id: 3,
        name: 'Programming Book Bundle',
        description: 'Collection of 5 best-selling programming books',
        category: 'books',
        points: 3000,
        image: 'https://via.placeholder.com/200x150?text=Books',
        available: true,
        popular: true
      },
      {
        id: 4,
        name: 'Premium T-Shirt',
        description: 'High-quality cotton t-shirt with custom design',
        category: 'clothing',
        points: 1500,
        image: 'https://via.placeholder.com/200x150?text=T-Shirt',
        available: false,
        popular: false
      },
      {
        id: 5,
        name: 'Starbucks Gift Card',
        description: '$25 Starbucks gift card for coffee lovers',
        category: 'gift-cards',
        points: 2500,
        image: 'https://via.placeholder.com/200x150?text=Starbucks',
        available: true,
        popular: false
      },
      {
        id: 6,
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with health tracking',
        category: 'electronics',
        points: 12000,
        image: 'https://via.placeholder.com/200x150?text=Smart+Watch',
        available: true,
        popular: true
      }
    ]

    setRewards(mockRewards)
    setLoading(false)
  }, [])

  const filteredRewards = rewards.filter(reward => 
    selectedCategory === 'all' || reward.category === selectedCategory
  )

  const handleRewardClick = (reward) => {
    setSelectedReward(reward)
    setShowPopup(true)
  }

  const handleRedeem = () => {
    // Handle redemption logic here
    alert(`Redeemed ${selectedReward.name} for ${selectedReward.points} points!`)
    setShowPopup(false)
    setSelectedReward(null)
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
          <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
          <p className="mt-1 text-sm text-gray-500">
            Redeem your points for amazing rewards and gifts
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex items-center space-x-2 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
            <Star className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">1,250 points available</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map(reward => (
          <div
            key={reward.id}
            className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer ${
              !reward.available ? 'opacity-50' : ''
            }`}
            onClick={() => handleRewardClick(reward)}
          >
            <div className="relative">
              <img
                src={reward.image}
                alt={reward.name}
                className="w-full h-48 object-cover"
              />
              {reward.popular && (
                <div className="absolute top-2 left-2">
                  <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    Popular
                  </span>
                </div>
              )}
              {!reward.available && (
                <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-medium">Out of Stock</span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {reward.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4">
                {reward.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold text-gray-900">
                    {reward.points.toLocaleString()} points
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200">
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRewards.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Gift className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No rewards found</h3>
          <p className="text-gray-500">Try selecting a different category</p>
        </div>
      )}

      {/* Reward Popup */}
      {showPopup && selectedReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedReward.name}
              </h3>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <img
              src={selectedReward.image}
              alt={selectedReward.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            
            <p className="text-gray-600 mb-4">
              {selectedReward.description}
            </p>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold text-gray-900">
                  {selectedReward.points.toLocaleString()} points
                </span>
              </div>
              {selectedReward.popular && (
                <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  Popular
                </span>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowPopup(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleRedeem}
                disabled={!selectedReward.available}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Redeem
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Marketplace