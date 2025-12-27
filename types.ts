
// Fix: Import React to resolve 'Cannot find namespace React' error when using React.ReactNode
import React from 'react';

export type Role = 'Manufacturer' | 'Wholesaler' | 'Retailer';

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