
import React from 'react';
import { ShoppingCart, DollarSign, CreditCard, Activity } from 'lucide-react';
import { KPIData, InventoryItem, Alert, OrderTrend } from './types';

export const INITIAL_KPIS: Record<string, KPIData[]> = {
  Manufacturer: [
    { label: 'Total Production', value: '1.2M L', trend: 12.5, icon: <Activity className="w-6 h-6" />, color: 'blue' },
    { label: 'Factory Revenue', value: '$450K', trend: 8.2, icon: <DollarSign className="w-6 h-6" />, color: 'emerald' },
    { label: 'Wholesale Orders', value: '4,280', trend: -2.4, icon: <ShoppingCart className="w-6 h-6" />, color: 'indigo' },
    { label: 'Unpaid Invoices', value: '$82K', trend: 5.1, icon: <CreditCard className="w-6 h-6" />, color: 'rose' },
  ],
  Wholesaler: [
    { label: 'Current Inventory', value: '450K L', trend: -4.2, icon: <Activity className="w-6 h-6" />, color: 'blue' },
    { label: 'Weekly Revenue', value: '$125K', trend: 15.2, icon: <DollarSign className="w-6 h-6" />, color: 'emerald' },
    { label: 'Retailer Requests', value: '842', trend: 10.5, icon: <ShoppingCart className="w-6 h-6" />, color: 'indigo' },
    { label: 'Accounts Payable', value: '$45K', trend: -1.2, icon: <CreditCard className="w-6 h-6" />, color: 'rose' },
  ],
  Retailer: [
    { label: 'Store Sales', value: '12K L', trend: 22.1, icon: <Activity className="w-6 h-6" />, color: 'blue' },
    { label: 'Daily Revenue', value: '$4.2K', trend: 18.2, icon: <DollarSign className="w-6 h-6" />, color: 'emerald' },
    { label: 'Customer Orders', value: '1,120', trend: 34.5, icon: <ShoppingCart className="w-6 h-6" />, color: 'indigo' },
    { label: 'Inventory Value', value: '$8.5K', trend: 2.1, icon: <CreditCard className="w-6 h-6" />, color: 'rose' },
  ]
};

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: '1', sku: 'AQ-500-CL', name: 'AquaFlow 500ml Classic', stock: 12000, reorderPoint: 5000, status: 'High' },
  { id: '2', sku: 'AQ-1000-CL', name: 'AquaFlow 1L Classic', stock: 2400, reorderPoint: 3000, status: 'Low' },
  { id: '3', sku: 'AQ-2000-PR', name: 'AquaFlow 2L Premium', stock: 5500, reorderPoint: 4000, status: 'Medium' },
  { id: '4', sku: 'AQ-5000-SP', name: 'AquaFlow 5L Sparkling', stock: 800, reorderPoint: 1000, status: 'Low' },
  { id: '5', sku: 'AQ-20-JAR', name: 'AquaFlow 20L Jar', stock: 15000, reorderPoint: 8000, status: 'High' },
];

export const MOCK_ALERTS: Alert[] = [
  { id: 'a1', type: 'error', title: 'Low Stock Alert', message: '1L Classic SKU is below reorder point in Mumbai Warehouse.', timestamp: '10m ago', priority: 'High' },
  { id: 'a2', type: 'warning', title: 'Delayed Shipment', message: 'Route B-42 from Factory to Pune is delayed by 4 hours.', timestamp: '45m ago', priority: 'Medium' },
  { id: 'a3', type: 'info', title: 'Payment Pending', message: 'Invoice #INV-9821 for City Mart is overdue.', timestamp: '2h ago', priority: 'Medium' },
];

export const ORDER_TRENDS: OrderTrend[] = [
  { date: 'Mon', orders: 400, revenue: 2400 },
  { date: 'Tue', orders: 300, revenue: 1398 },
  { date: 'Wed', orders: 200, revenue: 9800 },
  { date: 'Thu', orders: 278, revenue: 3908 },
  { date: 'Fri', orders: 189, revenue: 4800 },
  { date: 'Sat', orders: 239, revenue: 3800 },
  { date: 'Sun', orders: 349, revenue: 4300 },
];

export const MAHARASHTRA_DISTRICTS = [
  { name: 'Mumbai', value: 85, revenue: '1.2M', orders: 12500, color: '#1e40af' },
  { name: 'Pune', value: 72, revenue: '980K', orders: 8400, color: '#2563eb' },
  { name: 'Nagpur', value: 45, revenue: '450K', orders: 3200, color: '#60a5fa' },
  { name: 'Nashik', value: 60, revenue: '620K', orders: 4800, color: '#3b82f6' },
  { name: 'Aurangabad', value: 38, revenue: '310K', orders: 2100, color: '#93c5fd' },
  { name: 'Thane', value: 78, revenue: '890K', orders: 7600, color: '#1d4ed8' },
];
