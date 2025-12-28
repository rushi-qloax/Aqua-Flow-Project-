
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
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  stock: number;
  reorderPoint: number;
  status: 'Low' | 'Medium' | 'High';
  location: string;
}

export interface Order {
  id: string;
  partner: string;
  items: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Packed' | 'Dispatched' | 'Delivered' | 'Cancelled';
  date: string;
  region: string;
}

// --- Smart Load Feature Types ---

export interface Vehicle {
  id: string;
  plateNumber: string;
  capacity: number; // in Liters/Bottles
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
  partner: string;
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
  badge?: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface OrderTrend {
  date: string;
  orders: number;
  revenue: number;
}
