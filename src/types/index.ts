export interface Room {
  id: string;
  name: string;
  monthlyRent: number;
  isOccupied: boolean;
  tenantId?: string;
}

export interface Tenant {
  id: string;
  name: string;
  phone: string;
  email?: string;
  roomIds: string[];
  moveInDate: string;
  isActive: boolean;
}

export interface MeterReading {
  id: string;
  tenantId: string;
  month: string; // YYYY-MM format
  previousReading: number;
  currentReading: number;
  unitsConsumed: number;
  electricityCost: number;
}

export interface Bill {
  id: string;
  tenantId: string;
  month: string; // YYYY-MM format
  roomRentTotal: number;
  electricityCharge: number;
  waterCharge: number;
  grandTotal: number;
  isPaid: boolean;
  paidDate?: string;
  createdAt: string;
}

export interface Settings {
  electricityPricePerUnit: number;
  waterMonthlyPrice: number;
  currency: string;
}

export interface DashboardStats {
  totalTenants: number;
  totalRooms: number;
  occupiedRooms: number;
  monthlyRentCollected: number;
  pendingPayments: number;
  electricityTotal: number;
  waterTotal: number;
}
