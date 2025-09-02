// Global type definitions for the Food Order App

export interface User {
  id: string
  email: string
  name: string
  role: 'customer' | 'owner' | 'admin'
  createdAt: Date
  updatedAt: Date
}

export interface Restaurant {
  id: string
  name: string
  description?: string
  address?: string
  phone?: string
  email?: string
  ownerId: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  restaurantId: string
  sortOrder: number
  createdAt: Date
}

export interface MenuItem {
  id: string
  name: string
  description?: string
  price: number
  imageUrl?: string
  categoryId: string
  restaurantId: string
  isAvailable: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  userId: string
  restaurantId: string
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  totalAmount: number
  deliveryAddress?: string
  phone?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  menuItemId: string
  quantity: number
  unitPrice: number
  totalPrice: number
  specialInstructions?: string
}