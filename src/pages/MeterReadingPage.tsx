import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStore } from '@/store/useStore';
import { useToast } from '@/hooks/use-toast';

const MeterReadingPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { tenants, meterReadings, settings, addMeterReading } = useStore();

  const activeTenants = tenants.filter(t => t.isActive);
  const currentMonth = new Date().toISOString().slice(0, 7);

  const [selectedTenantId, setSelectedTenantId] = useState('');
  const [month, setMonth] = useState(currentMonth);
  const [previousReading, setPreviousReading] = useState('');
  const [currentReading, setCurrentReading] = useState('');

  // Auto-fill previous reading from last month
  const handleTenantChange = (tenantId: string) => {
    setSelectedTenantId(tenantId);
    
    const lastReading = meterReadings
      .filter(r => r.tenantId === tenantId)
      .sort((a, b) => b.month.localeCompare(a.month))[0];
    
    if (lastReading) {
      setPreviousReading(lastReading.currentReading.toString());
    } else {
      setPreviousReading('');
    }
  };

  const unitsConsumed = currentReading && previousReading 
    ? Math.max(0, Number(currentReading) - Number(previousReading))
    : 0;
  
  const electricityCost = unitsConsumed * settings.electricityPricePerUnit;

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

    if (!currentReading) {
      toast({
        title: 'Error',
        description: 'Please enter current reading',
        variant: 'destructive',
      });
      return;
    }

    addMeterReading({
      id: Math.random().toString(36).substring(2, 15),
      tenantId: selectedTenantId,
      month,
      previousReading: Number(previousReading) || 0,
      currentReading: Number(currentReading),
      unitsConsumed,
      electricityCost,
    });

    toast({ title: 'Success', description: 'Meter reading saved' });
    navigate('/bills');
  };

  return (
    <MobileLayout>
      <PageHeader title="Meter Reading" showBack />
      
      <form onSubmit={handleSubmit} className="px-4 py-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Electricity Meter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Tenant *</Label>
              <Select value={selectedTenantId} onValueChange={handleTenantChange}>
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
              <Label htmlFor="month">Reading Month</Label>
              <Input
                id="month"
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="prevReading">Previous Reading</Label>
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
                <Label htmlFor="currReading">Current Reading</Label>
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
          </CardContent>
        </Card>

        {selectedTenantId && (
          <Card className="bg-primary-light">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Units Consumed</span>
                  <span className="font-medium">{unitsConsumed} units</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rate per unit</span>
                  <span>{settings.currency}{settings.electricityPricePerUnit}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between font-semibold">
                  <span>Electricity Cost</span>
                  <span className="text-primary">{settings.currency}{electricityCost.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={!selectedTenantId}>
          Save Reading
        </Button>
      </form>
    </MobileLayout>
  );
};

export default MeterReadingPage;
