import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Gift, Star, ShoppingCart, AlertCircle, CheckCircle } from 'lucide-react'

const GiftPopup = () => {
  const navigate = useNavigate()
  const [isConfirming, setIsConfirming] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  // Mock gift data
  const gift = {
    id: 1,
    name: 'Беспроводные наушники',
    description: 'Высококачественные наушники с шумоподавлением. Идеально подходят для работы и отдыха. Включают в себя: наушники, зарядный чехол, USB-C кабель, инструкцию по использованию.',
    category: 'electronics',
    points: 5000,
    originalPrice: 8000,
    rating: 4.8,
    reviews: 124,
    image: '🎧',
    available: true,
    popular: true,
    userPoints: 12450,
    deliveryInfo: 'Доставка: 3-5 рабочих дней',
    warranty: 'Гарантия: 1 год'
  }

  const handleExchange = () => {
    setIsConfirming(true)
    // Simulate API call
    setTimeout(() => {
      setIsConfirmed(true)
    }, 2000)
  }

  const handleClose = () => {
    navigate('/dashboard/market')
  }

  if (isConfirmed) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Запрос отправлен!</h2>
          <p className="text-gray-600 mb-6">
            Ваш запрос на обмен подарка успешно отправлен. Мы свяжемся с вами в ближайшее время для подтверждения деталей доставки.
          </p>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Номер заказа</p>
              <p className="font-medium text-gray-900">#GIFT-2024-001</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Списано баллов</p>
              <p className="font-medium text-primary-600">{gift.points} баллов</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-full btn-primary mt-6"
          >
            Вернуться в маркет
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Детали подарка</h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gift image and basic info */}
            <div className="space-y-4">
              <div className="text-8xl text-center py-8 bg-gray-50 rounded-lg">
                {gift.image}
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900">{gift.name}</h3>
                <p className="text-gray-600">{gift.description}</p>
                
                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{gift.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({gift.reviews} отзывов)</span>
                </div>

                {/* Popular badge */}
                {gift.popular && (
                  <span className="inline-block bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Популярный
                  </span>
                )}
              </div>
            </div>

            {/* Exchange details */}
            <div className="space-y-6">
              {/* Points and price */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Стоимость</span>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary-600">{gift.points} баллов</div>
                    <div className="text-sm text-gray-500 line-through">{gift.originalPrice} ₽</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Ваши баллы</span>
                  <span className="font-medium text-gray-900">{gift.userPoints} баллов</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Останется после обмена</span>
                  <span className="font-medium text-gray-900">{gift.userPoints - gift.points} баллов</span>
                </div>
              </div>

              {/* Additional info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{gift.deliveryInfo}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{gift.warranty}</span>
                </div>
              </div>

              {/* Exchange button */}
              <div className="space-y-3">
                {gift.userPoints >= gift.points ? (
                  <button
                    onClick={handleExchange}
                    disabled={isConfirming}
                    className="w-full btn-primary flex items-center justify-center"
                  >
                    {isConfirming ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Обработка...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Обменять за {gift.points} баллов
                      </>
                    )}
                  </button>
                ) : (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="text-sm font-medium text-red-800">Недостаточно баллов</p>
                        <p className="text-sm text-red-600">
                          Вам нужно еще {gift.points - gift.userPoints} баллов для обмена
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleClose}
                  className="w-full btn-secondary"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>

          {/* Terms and conditions */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Условия обмена</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Обмен производится на основе доступности товара</li>
              <li>• Доставка осуществляется в течение 3-5 рабочих дней</li>
              <li>• Возврат возможен в течение 14 дней с момента получения</li>
              <li>• Баллы списываются сразу после подтверждения заказа</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GiftPopup