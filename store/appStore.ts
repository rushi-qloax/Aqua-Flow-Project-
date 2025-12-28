
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Order, InventoryItem, Vehicle, OfferRule, 
  LoadOffer, Payment, Partner, Notification, Toast 
} from '../types';
import { 
  MOCK_ORDERS, MOCK_INVENTORY, MOCK_VEHICLES, 
  MOCK_OFFER_RULES, MOCK_LOAD_OFFERS, MOCK_PAYMENTS, 
  MOCK_ALERTS, MOCK_PARTNERS 
} from '../constants';

interface AppState {
  orders: Order[];
  inventory: InventoryItem[];
  vehicles: Vehicle[];
  rules: OfferRule[];
  offers: LoadOffer[];
  payments: Payment[];
  partners: Partner[];
  notifications: Notification[];
  toasts: Toast[];
  
  // Actions
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
  updateInventory: (id: string, amount: number) => void;
  addInventoryItem: (item: Omit<InventoryItem, 'id' | 'status'>) => void;
  
  // Notifications & UI Feedback
  addNotification: (notif: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addToast: (message: string, type: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  
  // Logistics Actions
  generateOffers: (vehicleId: string) => void;
  acceptOffer: (offerId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      orders: MOCK_ORDERS,
      inventory: MOCK_INVENTORY,
      vehicles: MOCK_VEHICLES,
      rules: MOCK_OFFER_RULES,
      offers: MOCK_LOAD_OFFERS,
      payments: MOCK_PAYMENTS,
      partners: MOCK_PARTNERS,
      notifications: MOCK_ALERTS.map(a => ({ ...a, read: false })),
      toasts: [],

      addOrder: (orderData) => {
        const id = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
        const newOrder: Order = {
          ...orderData,
          id,
          date: new Date().toISOString().split('T')[0]
        };
        set(state => ({ orders: [newOrder, ...state.orders] }));
        get().addToast(`Order ${id} successfully lodged to ledger`, 'success');
        get().addNotification({
          type: 'success',
          title: 'Order Created',
          message: `New request from ${orderData.partnerName} for ${orderData.items}.`,
          priority: 'Medium'
        });
      },

      updateOrderStatus: (id, status) => {
        set(state => ({
          orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
        }));
        get().addToast(`Order ${id} status: ${status}`, 'info');
      },

      deleteOrder: (id) => {
        set(state => ({ orders: state.orders.filter(o => o.id !== id) }));
        get().addToast(`Order ${id} removed from system`, 'error');
      },

      addInventoryItem: (itemData) => {
        const id = (get().inventory.length + 1).toString();
        const status = itemData.stock < itemData.reorderPoint ? 'Low' : 'High';
        const newItem: InventoryItem = { ...itemData, id, status };
        set(state => ({ inventory: [newItem, ...state.inventory] }));
        get().addToast(`SKU ${itemData.sku} registered in matrix`, 'success');
      },

      updateInventory: (id, amount) => {
        set(state => {
          const updated = state.inventory.map(item => {
            if (item.id === id) {
              const newStock = Math.max(0, item.stock + amount);
              const newStatus = newStock < item.reorderPoint ? 'Low' : newStock < item.reorderPoint * 2 ? 'Medium' : 'High';
              
              if (newStatus === 'Low' && item.status !== 'Low') {
                get().addNotification({
                  type: 'error',
                  title: 'Critical Stock Level',
                  message: `${item.name} has fallen below threshold at ${item.location}.`,
                  priority: 'High'
                });
              }
              return { ...item, stock: newStock, status: newStatus };
            }
            return item;
          });
          return { inventory: updated };
        });
      },

      addNotification: (notif) => {
        const id = Math.random().toString(36).substr(2, 9);
        set(state => ({ 
          notifications: [{ ...notif, id, timestamp: 'Just now', read: false }, ...state.notifications] 
        }));
      },

      markNotificationRead: (id) => set(state => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
      })),

      markAllNotificationsRead: () => set(state => ({
        notifications: state.notifications.map(n => ({ ...n, read: true }))
      })),

      addToast: (message, type) => {
        const id = Math.random().toString(36).substr(2, 9);
        set(state => ({ toasts: [...state.toasts, { id, message, type }] }));
        setTimeout(() => get().removeToast(id), 4000);
      },

      removeToast: (id) => set(state => ({ toasts: state.toasts.filter(t => t.id !== id) })),

      generateOffers: (vehicleId) => {
        const vehicle = get().vehicles.find(v => v.id === vehicleId);
        if (!vehicle) return;
        const free = vehicle.capacity - vehicle.currentLoad;
        if (free < 500) {
          get().addToast("Vehicle space insufficient for offers", "error");
          return;
        }
        const newOffer: LoadOffer = {
          id: `OPT-${Math.floor(100 + Math.random() * 900)}`,
          vehicleId,
          targetPartnerId: 'P-10',
          partnerName: 'Ghatkopar Distributors',
          discount: 25,
          quantityRequested: 500,
          status: 'Active',
          expiryTime: '2h 00m'
        };
        set(state => ({ offers: [newOffer, ...state.offers] }));
        get().addToast(`Load offers blasted for ${vehicle.plateNumber}`, 'success');
      },

      acceptOffer: (offerId) => {
        const offer = get().offers.find(o => o.id === offerId);
        if (!offer) return;
        get().addOrder({
          partnerId: offer.targetPartnerId,
          partnerName: offer.partnerName,
          items: `${offer.quantityRequested}L Smart Load`,
          amount: offer.quantityRequested * 15,
          status: 'Approved',
          region: 'Mumbai'
        });
        set(state => ({
          offers: state.offers.map(o => o.id === offerId ? { ...o, status: 'Accepted' } : o),
          vehicles: state.vehicles.map(v => v.id === offer.vehicleId ? { ...v, currentLoad: v.currentLoad + offer.quantityRequested } : v)
        }));
      }
    }),
    { name: 'niks-aqua-v2-storage' }
  )
);
