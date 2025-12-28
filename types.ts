
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
