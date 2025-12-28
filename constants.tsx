
import React from 'react';
import { ShoppingCart, DollarSign, CreditCard, Activity, Truck, MapPin, UserCheck, ShieldCheck } from 'lucide-react';
import { KPIData, InventoryItem, Alert, OrderTrend, Order, Payment, Partner } from './types';

export const INITIAL_KPIS: Record<string, KPIData[]> = {
  Manufacturer: [
    { label: 'Total Production', value: '1.2M L', trend: 12.5, icon: <Activity className="w-6 h-6" />, color: 'teal' },
    { label: 'Factory Revenue', value: '₹45.2L', trend: 8.2, icon: <DollarSign className="w-6 h-6" />, color: 'emerald' },
    { label: 'Wholesale Orders', value: '4,280', trend: -2.4, icon: <ShoppingCart className="w-6 h-6" />, color: 'cyan' },
    { label: 'Unpaid Invoices', value: '₹8.2L', trend: 5.1, icon: <CreditCard className="w-6 h-6" />, color: 'rose' },
  ]
};

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: '1', sku: 'NIKS-500-CL', name: 'NIKS-AQUA 500ml Classic', stock: 12000, reorderPoint: 5000, status: 'High', location: 'Main Plant A' },
  { id: '2', sku: 'NIKS-1000-CL', name: 'NIKS-AQUA 1L Classic', stock: 2400, reorderPoint: 3000, status: 'Low', location: 'Mumbai Hub' },
  { id: '3', sku: 'NIKS-2000-PR', name: 'NIKS-AQUA 2L Premium', stock: 5500, reorderPoint: 4000, status: 'Medium', location: 'Pune Wholesaler 1' },
  { id: '4', sku: 'NIKS-20-JAR', name: 'NIKS-AQUA 20L Jar', stock: 15000, reorderPoint: 8000, status: 'High', location: 'Thane Central' },
];

export const MOCK_ORDERS: Order[] = [
  { id: 'ORD-1001', partner: 'Mumbai Logistics Co.', items: '1200 x 20L Jars', amount: 4800, status: 'Delivered', type: 'B2B', date: '2024-03-01', region: 'Mumbai' },
  { id: 'ORD-1002', partner: 'Pune Retail Hub', items: '500 x 1L Classic', amount: 1250, status: 'Dispatched', type: 'B2B', date: '2024-03-02', region: 'Pune' },
  { id: 'ORD-1003', partner: 'Nagpur Fresh Mart', items: '3000 x 500ml Classic', amount: 3000, status: 'Approved', type: 'B2B', date: '2024-03-02', region: 'Nagpur' },
  { id: 'ORD-1004', partner: 'Nashik Wholesale', items: '100 x 5L Sparkling', amount: 800, status: 'Pending', type: 'B2B', date: '2024-03-03', region: 'Nashik' },
];

export const MOCK_LOGISTICS = [
  { id: 'V-01', driver: 'Rahul S.', route: 'Mumbai → Pune', status: 'In Transit', progress: 65, vehicle: 'Tata Ace (MH-12-AQ-90)' },
  { id: 'V-02', driver: 'Amit K.', route: 'Thane → Kalyan', status: 'Delivered', progress: 100, vehicle: 'Eicher Pro (MH-04-NK-45)' },
  { id: 'V-03', driver: 'Sandeep P.', route: 'Nashik → Factory', status: 'Loading', progress: 10, vehicle: 'Mahindra Blazo (MH-15-BW-22)' },
];

export const MOCK_PARTNERS: Partner[] = [
  { id: 'P-001', name: 'Mumbai Logistics Co.', type: 'Wholesaler', rating: 4.8, region: 'Mumbai', badge: 'Fast Delivery', reliability: 98 },
  { id: 'P-002', name: 'Pune Retail Hub', type: 'Retailer', rating: 4.5, region: 'Pune', reliability: 92 },
  { id: 'P-003', name: 'Nagpur Fresh Mart', type: 'Retailer', rating: 3.9, region: 'Nagpur', badge: 'High Volume', reliability: 78 },
  { id: 'P-004', name: 'Nashik Wholesale', type: 'Wholesaler', rating: 4.9, region: 'Nashik', badge: 'Zero Complaints', reliability: 99 },
];

export const ORDER_TRENDS: OrderTrend[] = [
  { date: 'Mon', orders: 400, revenue: 2400 },
  { date: 'Tue', orders: 600, revenue: 3800 },
  { date: 'Wed', orders: 1200, revenue: 9800 },
  { date: 'Thu', orders: 850, revenue: 5900 },
  { date: 'Fri', orders: 1100, revenue: 7800 },
  { date: 'Sat', orders: 500, revenue: 3800 },
  { date: 'Sun', orders: 300, revenue: 2300 },
];

export const MAHARASHTRA_DISTRICTS = [
  { name: 'Mumbai', value: 85, revenue: '₹1.2M', orders: 12500, color: '#0d9488' },
  { name: 'Pune', value: 72, revenue: '₹980K', orders: 8400, color: '#0f766e' },
  { name: 'Nagpur', value: 45, revenue: '₹450K', orders: 3200, color: '#14b8a6' },
  { name: 'Nashik', value: 60, revenue: '₹620K', orders: 4800, color: '#0d9488' },
  { name: 'Thane', value: 78, revenue: '₹890K', orders: 7600, color: '#0f766e' },
];

// Define MOCK_ALERTS to fix the missing exported member error
export const MOCK_ALERTS: Alert[] = [
  { id: '1', type: 'warning', title: 'Low Inventory', message: 'NIKS-AQUA 1L SKU falling below safety levels in Mumbai node.', timestamp: '2 mins ago', priority: 'High' },
  { id: '2', type: 'success', title: 'Logistics Update', message: 'Vehicle V-02 has successfully delivered to Kalyan.', timestamp: '15 mins ago', priority: 'Medium' },
  { id: '3', type: 'error', title: 'Settlement Critical', message: 'Nashik Wholesale credit limit exceeded. Immediate action required.', timestamp: '1 hour ago', priority: 'High' },
];

// Define MOCK_PAYMENTS to fix the missing exported member error
export const MOCK_PAYMENTS: Payment[] = [
  { id: 'PAY-7001', partner: 'Mumbai Logistics Co.', amount: 48000, due: '2024-03-15', status: 'Paid', creditLimit: 200000 },
  { id: 'PAY-7002', partner: 'Pune Retail Hub', amount: 12500, due: '2024-03-20', status: 'Pending', creditLimit: 100000 },
  { id: 'PAY-7003', partner: 'Nagpur Fresh Mart', amount: 30000, due: '2024-03-10', status: 'Overdue', creditLimit: 50000 },
  { id: 'PAY-7004', partner: 'Nashik Wholesale', amount: 80000, due: '2024-03-25', status: 'Partially Paid', creditLimit: 150000 },
];
