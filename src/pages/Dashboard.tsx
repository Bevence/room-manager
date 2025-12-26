import { Users, DoorOpen, Banknote, AlertCircle, Zap, Droplets } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentBills } from '@/components/dashboard/RecentBills';
import { IncomeChart } from '@/components/dashboard/IncomeChart';
import { useStore } from '@/store/useStore';

const Dashboard = () => {
  const { tenants, rooms, bills, settings } = useStore();
  
  const activeTenants = tenants.filter(t => t.isActive).length;
  const occupiedRooms = rooms.filter(r => r.isOccupied).length;
  
  const currentMonth = new Date().toISOString().slice(0, 7);
  const currentMonthBills = bills.filter(b => b.month === currentMonth);
  
  const collected = currentMonthBills
    .filter(b => b.isPaid)
    .reduce((sum, b) => sum + b.grandTotal, 0);
  
  const pending = currentMonthBills
    .filter(b => !b.isPaid)
    .reduce((sum, b) => sum + b.grandTotal, 0);

  const electricityTotal = currentMonthBills.reduce((sum, b) => sum + b.electricityCharge, 0);
  const waterTotal = currentMonthBills.reduce((sum, b) => sum + b.waterCharge, 0);

  return (
    <MobileLayout>
      <PageHeader 
        title="Dashboard" 
        subtitle={new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      />
      
      <div className="px-4 py-4 space-y-4">
        {/* Main Stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            title="Tenants"
            value={activeTenants}
            icon={<Users className="h-5 w-5" />}
            variant="primary"
          />
          <StatCard
            title="Rooms"
            value={`${occupiedRooms}/${rooms.length}`}
            icon={<DoorOpen className="h-5 w-5" />}
          />
          <StatCard
            title="Collected"
            value={`${settings.currency}${collected.toLocaleString()}`}
            icon={<Banknote className="h-5 w-5" />}
            variant="success"
          />
          <StatCard
            title="Pending"
            value={`${settings.currency}${pending.toLocaleString()}`}
            icon={<AlertCircle className="h-5 w-5" />}
            variant="warning"
          />
        </div>

        {/* Utility Stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            title="Electricity"
            value={`${settings.currency}${electricityTotal.toLocaleString()}`}
            icon={<Zap className="h-5 w-5" />}
          />
          <StatCard
            title="Water"
            value={`${settings.currency}${waterTotal.toLocaleString()}`}
            icon={<Droplets className="h-5 w-5" />}
          />
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Income Chart */}
        <IncomeChart />

        {/* Recent Bills */}
        <RecentBills />
      </div>
    </MobileLayout>
  );
};

export default Dashboard;
