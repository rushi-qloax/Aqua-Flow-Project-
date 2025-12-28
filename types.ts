
import React from 'react';

export type Role = 'ADMIN' | 'STAFF' | 'DRIVER';

export interface User {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
}

export interface KPIData {
  label: string;
  value: string;
  trend: number;
  icon: React.ReactNode;
  color: string;
  key: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  stock: number;
  reorderPoint: number;
  status: 'Low' | 'Medium' | 'High';
  location: string;
  price: number;
}

export interface Order {
  id: string;
  partnerId: string;
  partnerName: string;
  items: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Packed' | 'Dispatched' | 'Delivered' | 'Cancelled';
  date: string;
  region: string;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  capacity: number;
  currentLoad: number;
  route: string;
  status: 'Loading' | 'In-Transit' | 'Available';
}

export interface OfferRule {
  id: string;
  minQuantity: number;
  discountPercentage: number;
  isActive: boolean;
}

export interface LoadOffer {
  id: string;
  vehicleId: string;
  targetPartnerId: string;
  partnerName: string;
  discount: number;
  quantityRequested: number;
  status: 'Active' | 'Accepted' | 'Expired';
  expiryTime: string;
}

export interface Payment {
  id: string;
  partnerId: string;
  partnerName: string;
  amount: number;
  due: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Partially Paid';
  creditLimit: number;
}

export interface Partner {
  id: string;
  name: string;
  type: 'Wholesaler' | 'Retailer';
  rating: number;
  region: string;
  reliability: number;
  contact: string;
  email: string;
  address: string;
}

export interface Notification {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  priority: 'High' | 'Medium' | 'Low';
  read: boolean;
}

// Fix: Added missing Alert type alias exported to constants.tsx
export type Alert = Notification;

// Fix: Added missing OrderTrend interface exported to constants.tsx
export interface OrderTrend {
  date: string;
  orders: number;
  revenue: number;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}