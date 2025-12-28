
import { create } from 'zustand';
import { Vehicle, OfferRule, LoadOffer } from '../types';
import { MOCK_VEHICLES, MOCK_OFFER_RULES, MOCK_LOAD_OFFERS } from '../constants';

interface SmartLoadState {
  vehicles: Vehicle[];
  rules: OfferRule[];
  offers: LoadOffer[];
  isLoading: boolean;
  
  // Actions
  fetchData: () => Promise<void>;
  generateOffers: (vehicleId: string) => void;
  acceptOffer: (offerId: string) => void;
  updateRule: (id: string, updates: Partial<OfferRule>) => void;
  getRemainingCapacity: (vehicleId: string) => number;
}

export const useSmartLoadStore = create<SmartLoadState>((set, get) => ({
  vehicles: MOCK_VEHICLES,
  rules: MOCK_OFFER_RULES,
  offers: MOCK_LOAD_OFFERS,
  isLoading: false,

  fetchData: async () => {
    set({ isLoading: true });
    // In a real app, this would call smartLoadApi
    set({ isLoading: false });
  },

  getRemainingCapacity: (vehicleId: string) => {
    const vehicle = get().vehicles.find(v => v.id === vehicleId);
    return vehicle ? vehicle.capacity - vehicle.currentLoad : 0;
  },

  generateOffers: (vehicleId: string) => {
    const vehicle = get().vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;

    const remaining = vehicle.capacity - vehicle.currentLoad;
    if (remaining <= 0) return;

    // Filter rules that fit in remaining capacity
    const applicableRules = get().rules.filter(r => r.isActive && r.minQuantity <= remaining);
    
    if (applicableRules.length === 0) return;

    // Simulate auto-generation of 3 offers for the route
    const newOffers: LoadOffer[] = [
      {
        id: `AUTO-${Math.random().toString(36).substr(2, 9)}`,
        vehicleId,
        targetPartnerId: 'PARTNER-X',
        partnerName: 'Dynamic Route Partner A',
        discount: applicableRules[0].discountPercentage,
        quantityRequested: applicableRules[0].minQuantity,
        status: 'Active',
        expiryTime: '1h 30m'
      }
    ];

    set(state => ({ offers: [...newOffers, ...state.offers] }));
  },

  acceptOffer: (offerId: string) => {
    set(state => {
      const offer = state.offers.find(o => o.id === offerId);
      if (!offer || offer.status !== 'Active') return state;

      const vehicle = state.vehicles.find(v => v.id === offer.vehicleId);
      if (!vehicle) return state;

      const newLoad = vehicle.currentLoad + offer.quantityRequested;
      const isFull = newLoad >= vehicle.capacity;

      // Update vehicle load and current offer status
      const updatedVehicles = state.vehicles.map(v => 
        v.id === vehicle.id ? { ...v, currentLoad: newLoad } : v
      );

      const updatedOffers = state.offers.map(o => {
        if (o.id === offerId) return { ...o, status: 'Accepted' as const };
        // Auto-expire other offers for the same vehicle if it's full
        if (isFull && o.vehicleId === vehicle.id && o.status === 'Active') {
          return { ...o, status: 'Expired' as const };
        }
        return o;
      });

      return {
        vehicles: updatedVehicles,
        offers: updatedOffers
      };
    });
  },

  updateRule: (id, updates) => set(state => ({
    rules: state.rules.map(r => r.id === id ? { ...r, ...updates } : r)
  }))
}));
