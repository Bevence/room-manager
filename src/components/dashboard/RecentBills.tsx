import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store/useStore';

export function RecentBills() {
  const navigate = useNavigate();
  const { bills, tenants, settings } = useStore();

  const recentBills = bills
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  const getTenantName = (tenantId: string) => {
    return tenants.find(t => t.id === tenantId)?.name || 'Unknown';
  };

  const formatMonth = (month: string) => {
    const date = new Date(month + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Recent Bills</CardTitle>
        <button 
          onClick={() => navigate('/bills')}
          className="text-xs text-primary font-medium flex items-center gap-0.5"
        >
          View all <ChevronRight className="h-3 w-3" />
        </button>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentBills.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No bills yet
          </p>
        ) : (
          recentBills.map((bill) => (
            <div 
              key={bill.id}
              onClick={() => navigate(`/bills/${bill.id}`)}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
            >
              <div className="space-y-0.5">
                <p className="text-sm font-medium">{getTenantName(bill.tenantId)}</p>
                <p className="text-xs text-muted-foreground">{formatMonth(bill.month)}</p>
              </div>
              <div className="text-right space-y-0.5">
                <p className="text-sm font-semibold">
                  {settings.currency}{bill.grandTotal.toLocaleString()}
                </p>
                <Badge variant={bill.isPaid ? 'success' : 'pending'} className="text-[10px]">
                  {bill.isPaid ? 'Paid' : 'Pending'}
                </Badge>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
