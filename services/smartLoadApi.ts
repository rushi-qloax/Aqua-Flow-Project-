
import { LoadOffer, OfferRule, Vehicle } from '../types';

const API_BASE = '/api/smart-load';

export const smartLoadApi = {
  getActiveOffers: async (): Promise<LoadOffer[]> => {
    const response = await fetch(`${API_BASE}/offers/active`);
    if (!response.ok) throw new Error('Failed to fetch active offers');
    return response.json();
  },

  generateOffers: async (vehicleId: string): Promise<{ success: boolean; offersCount: number }> => {
    const response = await fetch(`${API_BASE}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vehicleId }),
    });
    if (!response.ok) throw new Error('Failed to generate offers');
    return response.json();
  },

  acceptOffer: async (offerId: string): Promise<{ orderId: string; updatedCapacity: number }> => {
    const response = await fetch(`${API_BASE}/offers/accept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ offerId }),
    });
    if (!response.ok) throw new Error('Failed to accept offer');
    return response.json();
  },

  getRules: async (): Promise<OfferRule[]> => {
    const response = await fetch(`${API_BASE}/rules`);
    if (!response.ok) throw new Error('Failed to fetch rules');
    return response.json();
  },

  updateRule: async (ruleId: string, updates: Partial<OfferRule>): Promise<OfferRule> => {
    const response = await fetch(`${API_BASE}/rules/${ruleId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update rule');
    return response.json();
  }
};
