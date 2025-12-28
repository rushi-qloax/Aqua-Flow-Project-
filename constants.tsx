
import React from 'react';
import { ShoppingCart, DollarSign, CreditCard, Activity, Truck, MapPin, UserCheck, ShieldCheck, Gift } from 'lucide-react';
import { KPIData, InventoryItem, Alert, OrderTrend, Order, Payment, Partner, Vehicle, OfferRule, LoadOffer } from './types';

export const INITIAL_KPIS: Record<string, KPIData[]> = {
  ADMIN: [
    { label: "Today's Orders", value: '42', trend: 12.5, icon: <ShoppingCart className="w-5 h-5" />, color: 'blue' },
    { label: 'Pending Payments', value: '₹8.2L', trend: 5.1, icon: <CreditCard className="w-5 h-5" />, color: 'red' },
    { label: 'Stock Health', value: '94%', trend: 2.4, icon: <Activity className="w-5 h-5" />, color: 'emerald' },
    { label: 'Offer Revenue', value: '₹1.4L', trend: 15.2, icon: <Gift className="w-5 h-5" />, color: 'indigo' },
  ],
  STAFF: [
    { label: 'Orders to Process', value: '18', trend: 0, icon: <ShoppingCart className="w-5 h-5" />, color: 'blue' },
    { label: "Today's Deliveries", value: '12', trend: 0, icon: <Truck className="w-5 h-5" />, color: 'emerald' },
    { label: 'Active Load Offers', value: '5', trend: 0, icon: <Gift className="w-5 h-5" />, color: 'indigo' },
    { label: 'Pending Approval', value: '5', trend: 0, icon: <ShieldCheck className="w-5 h-5" />, color: 'amber' },
  ]
};

export const MOCK_VEHICLES: Vehicle[] = [
  { id: 'V-001', plateNumber: 'MH-12-AQ-9082', capacity: 3000, currentLoad: 1800, route: 'Mumbai - Thane', status: 'Loading' },
  { id: 'V-002', plateNumber: 'MH-14-BT-1122', capacity: 2000, currentLoad: 1950, route: 'Pune - Nashik', status: 'In-Transit' },
  { id: 'V-003', plateNumber: 'MH-01-XX-4455', capacity: 5000, currentLoad: 2500, route: 'Nagpur - Wardha', status: 'Loading' },
];

export const MOCK_OFFER_RULES: OfferRule[] = [
  { id: 'R-1', minQuantity: 500, discountPercentage: 30, isActive: true },
  { id: 'R-2', minQuantity: 1000, discountPercentage: 20, isActive: true },
  { id: 'R-3', minQuantity: 1500, discountPercentage: 10, isActive: true },
];

export const MOCK_LOAD_OFFERS: LoadOffer[] = [
  { id: 'OFFER-771', vehicleId: 'V-001', targetPartnerId: 'P-10', partnerName: 'Ghatkopar Distributors', discount: 30, quantityRequested: 500, status: 'Active', expiryTime: '2h 15m' },
  { id: 'OFFER-772', vehicleId: 'V-001', targetPartnerId: 'P-11', partnerName: 'Mulund Retailers', discount: 20, quantityRequested: 1000, status: 'Accepted', expiryTime: '0' },
  { id: 'OFFER-773', vehicleId: 'V-003', targetPartnerId: 'P-22', partnerName: 'Wardha Traders', discount: 30, quantityRequested: 500, status: 'Active', expiryTime: '4h 00m' },
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: '1', sku: 'NIKS-500-CL', name: 'NIKS-AQUA 500ml Classic', stock: 12000, reorderPoint: 5000, status: 'High', location: 'Main Plant A' },
  { id: '2', sku: 'NIKS-1000-CL', name: 'NIKS-AQUA 1L Classic', stock: 2400, reorderPoint: 3000, status: 'Low', location: 'Mumbai Hub' },
  { id: '3', sku: 'NIKS-2000-PR', name: 'NIKS-AQUA 2L Premium', stock: 5500, reorderPoint: 4000, status: 'Medium', location: 'Pune Wholesaler 1' },
  { id: '4', sku: 'NIKS-20-JAR', name: 'NIKS-AQUA 20L Jar', stock: 15000, reorderPoint: 8000, status: 'High', location: 'Thane Central' },
];

export const MOCK_ORDERS: Order[] = [
  { id: 'ORD-1001', partner: 'Mumbai Logistics Co.', items: '1200 x 20L Jars', amount: 48000, status: 'Delivered', date: '2024-03-01', region: 'Mumbai' },
  { id: 'ORD-1002', partner: 'Pune Retail Hub', items: '500 x 1L Classic', amount: 12500, status: 'Dispatched', date: '2024-03-02', region: 'Pune' },
  { id: 'ORD-1003', partner: 'Nagpur Fresh Mart', items: '3000 x 500ml Classic', amount: 30000, status: 'Approved', date: '2024-03-02', region: 'Nagpur' },
  { id: 'ORD-1004', partner: 'Nashik Wholesale', items: '100 x 5L Sparkling', amount: 8000, status: 'Pending', date: '2024-03-03', region: 'Nashik' },
];

export const MOCK_PAYMENTS: Payment[] = [
  { id: 'PAY-7001', partner: 'Mumbai Logistics Co.', amount: 48000, due: '2024-03-15', status: 'Paid', creditLimit: 200000 },
  { id: 'PAY-7002', partner: 'Pune Retail Hub', amount: 12500, due: '2024-03-20', status: 'Pending', creditLimit: 100000 },
  { id: 'PAY-7003', partner: 'Nagpur Fresh Mart', amount: 30000, due: '2024-03-10', status: 'Overdue', creditLimit: 50000 },
];

export const MOCK_ALERTS: Alert[] = [
  { id: '1', type: 'error', title: 'Payment Due', message: 'Nagpur Fresh Mart has an overdue balance of ₹30,000.', timestamp: '10 mins ago', priority: 'High' },
  { id: '2', type: 'warning', title: 'Low Stock Alert', message: '1L Classic bottles are low at Mumbai Hub.', timestamp: '1 hour ago', priority: 'Medium' },
];

export const ORDER_TRENDS: OrderTrend[] = [
  { date: 'Mon', orders: 40, revenue: 24000 },
  { date: 'Tue', orders: 60, revenue: 38000 },
  { date: 'Wed', orders: 120, revenue: 98000 },
  { date: 'Thu', orders: 85, revenue: 59000 },
  { date: 'Fri', orders: 110, revenue: 78000 },
  { date: 'Sat', orders: 50, revenue: 38000 },
  { date: 'Sun', orders: 30, revenue: 23000 },
];

export const MAHARASHTRA_DISTRICTS = [
  { name: 'MUMBAI', value: 95, revenue: 1250000, orders: 45000 },
  { name: 'PUNE', value: 85, revenue: 850000, orders: 32000 },
  { name: 'NAGPUR', value: 65, revenue: 420000, orders: 18000 },
  { name: 'NASHIK', value: 55, revenue: 310000, orders: 15000 },
  { name: 'AURANGABAD', value: 45, revenue: 210000, orders: 11000 },
  { name: 'THANE', value: 90, revenue: 980000, orders: 38000 },
];
