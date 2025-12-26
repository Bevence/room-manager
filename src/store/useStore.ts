import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Room, Tenant, Bill, MeterReading, Settings } from '@/types';

interface AppState {
  rooms: Room[];
  tenants: Tenant[];
  bills: Bill[];
  meterReadings: MeterReading[];
  settings: Settings;
  
  // Room actions
  addRoom: (room: Room) => void;
  updateRoom: (id: string, room: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  
  // Tenant actions
  addTenant: (tenant: Tenant) => void;
  updateTenant: (id: string, tenant: Partial<Tenant>) => void;
  deleteTenant: (id: string) => void;
  
  // Bill actions
  addBill: (bill: Bill) => void;
  updateBill: (id: string, bill: Partial<Bill>) => void;
  deleteBill: (id: string) => void;
  
  // Meter reading actions
  addMeterReading: (reading: MeterReading) => void;
  updateMeterReading: (id: string, reading: Partial<MeterReading>) => void;
  
  // Settings actions
  updateSettings: (settings: Partial<Settings>) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

// Sample data
const sampleRooms: Room[] = [
  { id: 'room-1', name: 'Room 101', monthlyRent: 5000, isOccupied: true, tenantId: 'tenant-1' },
  { id: 'room-2', name: 'Room 102', monthlyRent: 5500, isOccupied: true, tenantId: 'tenant-1' },
  { id: 'room-3', name: 'Room 201', monthlyRent: 6000, isOccupied: true, tenantId: 'tenant-2' },
  { id: 'room-4', name: 'Room 202', monthlyRent: 4500, isOccupied: false },
  { id: 'room-5', name: 'Room 301', monthlyRent: 7000, isOccupied: true, tenantId: 'tenant-3' },
];

const sampleTenants: Tenant[] = [
  { id: 'tenant-1', name: 'Rahul Sharma', phone: '+91 98765 43210', email: 'rahul@email.com', roomIds: ['room-1', 'room-2'], moveInDate: '2024-01-15', isActive: true },
  { id: 'tenant-2', name: 'Priya Patel', phone: '+91 87654 32109', email: 'priya@email.com', roomIds: ['room-3'], moveInDate: '2024-03-01', isActive: true },
  { id: 'tenant-3', name: 'Amit Kumar', phone: '+91 76543 21098', roomIds: ['room-5'], moveInDate: '2024-06-10', isActive: true },
];

const currentMonth = new Date().toISOString().slice(0, 7);

const sampleBills: Bill[] = [
  { id: 'bill-1', tenantId: 'tenant-1', month: currentMonth, roomRentTotal: 10500, electricityCharge: 1250, waterCharge: 300, grandTotal: 12050, isPaid: true, paidDate: '2024-12-05', createdAt: '2024-12-01' },
  { id: 'bill-2', tenantId: 'tenant-2', month: currentMonth, roomRentTotal: 6000, electricityCharge: 780, waterCharge: 300, grandTotal: 7080, isPaid: false, createdAt: '2024-12-01' },
  { id: 'bill-3', tenantId: 'tenant-3', month: currentMonth, roomRentTotal: 7000, electricityCharge: 920, waterCharge: 300, grandTotal: 8220, isPaid: false, createdAt: '2024-12-01' },
];

const sampleMeterReadings: MeterReading[] = [
  { id: 'reading-1', tenantId: 'tenant-1', month: currentMonth, previousReading: 1200, currentReading: 1450, unitsConsumed: 250, electricityCost: 1250 },
  { id: 'reading-2', tenantId: 'tenant-2', month: currentMonth, previousReading: 800, currentReading: 956, unitsConsumed: 156, electricityCost: 780 },
  { id: 'reading-3', tenantId: 'tenant-3', month: currentMonth, previousReading: 500, currentReading: 684, unitsConsumed: 184, electricityCost: 920 },
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      rooms: sampleRooms,
      tenants: sampleTenants,
      bills: sampleBills,
      meterReadings: sampleMeterReadings,
      settings: {
        electricityPricePerUnit: 5,
        waterMonthlyPrice: 300,
        currency: '₹',
      },
      
      // Room actions
      addRoom: (room) => set((state) => ({ rooms: [...state.rooms, { ...room, id: generateId() }] })),
      updateRoom: (id, room) => set((state) => ({
        rooms: state.rooms.map((r) => (r.id === id ? { ...r, ...room } : r)),
      })),
      deleteRoom: (id) => set((state) => ({ rooms: state.rooms.filter((r) => r.id !== id) })),
      
      // Tenant actions
      addTenant: (tenant) => set((state) => ({ tenants: [...state.tenants, { ...tenant, id: generateId() }] })),
      updateTenant: (id, tenant) => set((state) => ({
        tenants: state.tenants.map((t) => (t.id === id ? { ...t, ...tenant } : t)),
      })),
      deleteTenant: (id) => set((state) => ({ tenants: state.tenants.filter((t) => t.id !== id) })),
      
      // Bill actions
      addBill: (bill) => set((state) => ({ bills: [...state.bills, { ...bill, id: generateId() }] })),
      updateBill: (id, bill) => set((state) => ({
        bills: state.bills.map((b) => (b.id === id ? { ...b, ...bill } : b)),
      })),
      deleteBill: (id) => set((state) => ({ bills: state.bills.filter((b) => b.id !== id) })),
      
      // Meter reading actions
      addMeterReading: (reading) => set((state) => ({ meterReadings: [...state.meterReadings, { ...reading, id: generateId() }] })),
      updateMeterReading: (id, reading) => set((state) => ({
        meterReadings: state.meterReadings.map((r) => (r.id === id ? { ...r, ...reading } : r)),
      })),
      
      // Settings actions
      updateSettings: (settings) => set((state) => ({ settings: { ...state.settings, ...settings } })),
    }),
    {
      name: 'rent-manager-storage',
    }
  )
);
