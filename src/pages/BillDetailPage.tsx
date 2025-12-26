import { useNavigate, useParams } from 'react-router-dom';
import { Check, Trash2, Share2 } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store/useStore';
import { useToast } from '@/hooks/use-toast';

const BillDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const { bills, tenants, rooms, settings, updateBill, deleteBill } = useStore();

  const bill = bills.find(b => b.id === id);
  const tenant = bill ? tenants.find(t => t.id === bill.tenantId) : null;
  const tenantRooms = tenant ? rooms.filter(r => tenant.roomIds.includes(r.id)) : [];

  if (!bill) {
    return (
      <MobileLayout>
        <PageHeader title="Bill Not Found" showBack />
        <div className="px-4 py-8 text-center text-muted-foreground">
          This bill doesn't exist
        </div>
      </MobileLayout>
    );
  }

  const formatMonth = (month: string) => {
    const date = new Date(month + '-01');
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const handleMarkPaid = () => {
    updateBill(bill.id, { 
      isPaid: true, 
      paidDate: new Date().toISOString().split('T')[0] 
    });
    toast({ title: 'Success', description: 'Bill marked as paid' });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      deleteBill(bill.id);
      toast({ title: 'Success', description: 'Bill deleted' });
      navigate('/bills');
    }
  };

  const handleShare = async () => {
    const billText = `
${tenant?.name} - ${formatMonth(bill.month)} Bill

Room Rent: ${settings.currency}${bill.roomRentTotal.toLocaleString()}
Electricity: ${settings.currency}${bill.electricityCharge.toLocaleString()}
Water: ${settings.currency}${bill.waterCharge.toLocaleString()}
─────────────
Total: ${settings.currency}${bill.grandTotal.toLocaleString()}

Status: ${bill.isPaid ? 'PAID' : 'PENDING'}
    `.trim();

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Rent Bill', text: billText });
      } catch (err) {
        // User cancelled share
      }
    } else {
      navigator.clipboard.writeText(billText);
      toast({ title: 'Copied', description: 'Bill details copied to clipboard' });
    }
  };

  return (
    <MobileLayout>
      <PageHeader 
        title="Bill Details" 
        showBack
        action={
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 className="h-5 w-5" />
          </Button>
        }
      />
      
      <div className="px-4 py-4 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{tenant?.name || 'Unknown Tenant'}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatMonth(bill.month)}
                </p>
              </div>
              <Badge variant={bill.isPaid ? 'success' : 'pending'} className="text-sm">
                {bill.isPaid ? 'Paid' : 'Pending'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Rooms */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Rooms</p>
              <div className="flex flex-wrap gap-2">
                {tenantRooms.map(room => (
                  <Badge key={room.id} variant="secondary">
                    {room.name} - {settings.currency}{room.monthlyRent.toLocaleString()}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Bill Breakdown */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Room Rent</span>
                <span className="font-medium">{settings.currency}{bill.roomRentTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Electricity</span>
                <span className="font-medium">{settings.currency}{bill.electricityCharge.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Water</span>
                <span className="font-medium">{settings.currency}{bill.waterCharge.toLocaleString()}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between text-lg font-bold">
                <span>Grand Total</span>
                <span className="text-primary">{settings.currency}{bill.grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {bill.isPaid && bill.paidDate && (
              <div className="pt-2 text-sm text-success">
                Paid on {new Date(bill.paidDate).toLocaleDateString()}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button 
            variant="destructive" 
            className="flex-1"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
          {!bill.isPaid && (
            <Button 
              variant="success" 
              className="flex-1"
              onClick={handleMarkPaid}
            >
              <Check className="h-4 w-4" />
              Mark Paid
            </Button>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default BillDetailPage;
