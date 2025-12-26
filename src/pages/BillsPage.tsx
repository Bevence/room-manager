import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store/useStore';

const BillsPage = () => {
  const navigate = useNavigate();
  const { bills, tenants, settings } = useStore();
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending'>('all');

  const filteredBills = bills
    .filter(bill => {
      if (filter === 'paid') return bill.isPaid;
      if (filter === 'pending') return !bill.isPaid;
      return true;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getTenantName = (tenantId: string) => {
    return tenants.find(t => t.id === tenantId)?.name || 'Unknown';
  };

  const formatMonth = (month: string) => {
    const date = new Date(month + '-01');
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const paidCount = bills.filter(b => b.isPaid).length;
  const pendingCount = bills.filter(b => !b.isPaid).length;

  return (
    <MobileLayout>
      <PageHeader 
        title="Bills" 
        subtitle={`${paidCount} paid, ${pendingCount} pending`}
        action={
          <Button size="sm" onClick={() => navigate('/bills/new')}>
            <Plus className="h-4 w-4" />
            New
          </Button>
        }
      />
      
      <div className="px-4 py-4 space-y-4">
        {/* Filter Tabs */}
        <div className="flex gap-2">
          {(['all', 'paid', 'pending'] as const).map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setFilter(status)}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>

        {/* Bills List */}
        <div className="space-y-3">
          {filteredBills.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No bills found</p>
                <Button 
                  variant="link" 
                  className="mt-2"
                  onClick={() => navigate('/bills/new')}
                >
                  Generate a new bill
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredBills.map((bill, index) => (
              <Card 
                key={bill.id}
                className="animate-slide-up cursor-pointer hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => navigate(`/bills/${bill.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{getTenantName(bill.tenantId)}</h3>
                      <p className="text-sm text-muted-foreground">{formatMonth(bill.month)}</p>
                      
                      <div className="flex gap-3 text-xs text-muted-foreground mt-2">
                        <span>Rent: {settings.currency}{bill.roomRentTotal.toLocaleString()}</span>
                        <span>Elec: {settings.currency}{bill.electricityCharge.toLocaleString()}</span>
                        <span>Water: {settings.currency}{bill.waterCharge.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-1">
                      <p className="text-lg font-bold">
                        {settings.currency}{bill.grandTotal.toLocaleString()}
                      </p>
                      <Badge variant={bill.isPaid ? 'success' : 'pending'}>
                        {bill.isPaid ? 'Paid' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default BillsPage;
