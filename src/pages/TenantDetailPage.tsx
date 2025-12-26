import { useNavigate, useParams } from 'react-router-dom';
import { Phone, Mail, Calendar, Edit, Home, Receipt } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store/useStore';

const TenantDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tenants, rooms, bills, settings } = useStore();

  const tenant = tenants.find(t => t.id === id);
  const tenantRooms = tenant ? rooms.filter(r => tenant.roomIds.includes(r.id)) : [];
  const tenantBills = tenant ? bills.filter(b => b.tenantId === tenant.id) : [];

  if (!tenant) {
    return (
      <MobileLayout>
        <PageHeader title="Tenant Not Found" showBack />
        <div className="px-4 py-8 text-center text-muted-foreground">
          This tenant doesn't exist
        </div>
      </MobileLayout>
    );
  }

  const totalRent = tenantRooms.reduce((sum, r) => sum + r.monthlyRent, 0);
  const totalPaid = tenantBills.filter(b => b.isPaid).reduce((sum, b) => sum + b.grandTotal, 0);
  const totalPending = tenantBills.filter(b => !b.isPaid).reduce((sum, b) => sum + b.grandTotal, 0);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatMonth = (month: string) => {
    const date = new Date(month + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <MobileLayout>
      <PageHeader 
        title="Tenant Details" 
        showBack
        action={
          <Button variant="ghost" size="icon" onClick={() => navigate(`/tenants/${id}/edit`)}>
            <Edit className="h-5 w-5" />
          </Button>
        }
      />
      
      <div className="px-4 py-4 space-y-4">
        {/* Profile Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">{tenant.name}</h2>
                <Badge variant={tenant.isActive ? 'success' : 'muted'} className="mt-1">
                  {tenant.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">
                  {settings.currency}{totalRent.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">per month</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${tenant.phone}`} className="text-primary">{tenant.phone}</a>
              </div>
              {tenant.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${tenant.email}`} className="text-primary">{tenant.email}</a>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Move-in: {formatDate(tenant.moveInDate)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rooms */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Home className="h-4 w-4" />
              Rented Rooms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tenantRooms.map(room => (
                <div 
                  key={room.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <span className="font-medium">{room.name}</span>
                  <span className="text-primary font-semibold">
                    {settings.currency}{room.monthlyRent.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-success-light">
                <p className="text-xs text-muted-foreground">Total Paid</p>
                <p className="text-lg font-bold text-success">
                  {settings.currency}{totalPaid.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-accent-light">
                <p className="text-xs text-muted-foreground">Pending</p>
                <p className="text-lg font-bold text-accent-foreground">
                  {settings.currency}{totalPending.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bill History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Bill History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tenantBills.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No bills yet
              </p>
            ) : (
              <div className="space-y-2">
                {tenantBills
                  .sort((a, b) => b.month.localeCompare(a.month))
                  .slice(0, 5)
                  .map(bill => (
                    <div 
                      key={bill.id}
                      onClick={() => navigate(`/bills/${bill.id}`)}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 cursor-pointer hover:bg-secondary"
                    >
                      <div>
                        <p className="font-medium">{formatMonth(bill.month)}</p>
                        <p className="text-xs text-muted-foreground">
                          {bill.isPaid ? `Paid on ${formatDate(bill.paidDate!)}` : 'Pending'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{settings.currency}{bill.grandTotal.toLocaleString()}</p>
                        <Badge variant={bill.isPaid ? 'success' : 'pending'} className="text-[10px]">
                          {bill.isPaid ? 'Paid' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default TenantDetailPage;
