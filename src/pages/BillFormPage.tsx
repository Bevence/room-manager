import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Receipt, Zap } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStore } from '@/store/useStore';
import { useToast } from '@/hooks/use-toast';

const BillFormPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { tenants, rooms, settings, addBill, addMeterReading } = useStore();

  const activeTenants = tenants.filter(t => t.isActive);
  const currentMonth = new Date().toISOString().slice(0, 7);

  const [selectedTenantId, setSelectedTenantId] = useState('');
  const [month, setMonth] = useState(currentMonth);
  const [previousReading, setPreviousReading] = useState('');
  const [currentReading, setCurrentReading] = useState('');

  const selectedTenant = tenants.find(t => t.id === selectedTenantId);
  const tenantRooms = selectedTenant 
    ? rooms.filter(r => selectedTenant.roomIds.includes(r.id))
    : [];
  
  const roomRentTotal = tenantRooms.reduce((sum, r) => sum + r.monthlyRent, 0);
  
  const unitsConsumed = currentReading && previousReading 
    ? Math.max(0, Number(currentReading) - Number(previousReading))
    : 0;
  
  const electricityCharge = unitsConsumed * settings.electricityPricePerUnit;
  const waterCharge = settings.waterMonthlyPrice;
  const grandTotal = roomRentTotal + electricityCharge + waterCharge;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTenantId) {
      toast({
        title: 'Error',
        description: 'Please select a tenant',
        variant: 'destructive',
      });
      return;
    }

    // Add meter reading
    const readingId = Math.random().toString(36).substring(2, 15);
    addMeterReading({
      id: readingId,
      tenantId: selectedTenantId,
      month,
      previousReading: Number(previousReading) || 0,
      currentReading: Number(currentReading) || 0,
      unitsConsumed,
      electricityCost: electricityCharge,
    });

    // Add bill
    addBill({
      id: Math.random().toString(36).substring(2, 15),
      tenantId: selectedTenantId,
      month,
      roomRentTotal,
      electricityCharge,
      waterCharge,
      grandTotal,
      isPaid: false,
      createdAt: new Date().toISOString(),
    });

    toast({ title: 'Success', description: 'Bill generated successfully' });
    navigate('/bills');
  };

  return (
    <MobileLayout>
      <PageHeader title="Generate Bill" showBack />
      
      <form onSubmit={handleSubmit} className="px-4 py-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Bill Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Tenant *</Label>
              <Select value={selectedTenantId} onValueChange={setSelectedTenantId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a tenant" />
                </SelectTrigger>
                <SelectContent>
                  {activeTenants.map(tenant => (
                    <SelectItem key={tenant.id} value={tenant.id}>
                      {tenant.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="month">Billing Month</Label>
              <Input
                id="month"
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {selectedTenant && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Electricity Reading
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="prevReading">Previous</Label>
                    <Input
                      id="prevReading"
                      type="number"
                      min="0"
                      value={previousReading}
                      onChange={(e) => setPreviousReading(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currReading">Current</Label>
                    <Input
                      id="currReading"
                      type="number"
                      min="0"
                      value={currentReading}
                      onChange={(e) => setCurrentReading(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-secondary/50 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Units Consumed</span>
                    <span className="font-medium">{unitsConsumed} units</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rate per unit</span>
                    <span>{settings.currency}{settings.electricityPricePerUnit}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Receipt className="h-4 w-4" />
                  Bill Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Room Rent ({tenantRooms.length} rooms)</span>
                    <span>{settings.currency}{roomRentTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Electricity ({unitsConsumed} units)</span>
                    <span>{settings.currency}{electricityCharge.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Water (Fixed)</span>
                    <span>{settings.currency}{waterCharge.toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Grand Total</span>
                    <span className="text-primary">{settings.currency}{grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={!selectedTenantId}>
          <Receipt className="h-4 w-4" />
          Generate Bill
        </Button>
      </form>
    </MobileLayout>
  );
};

export default BillFormPage;
