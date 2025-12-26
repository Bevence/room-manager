import { useState } from 'react';
import { Save, Zap, Droplets, IndianRupee } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/store/useStore';
import { useToast } from '@/hooks/use-toast';

const SettingsPage = () => {
  const { toast } = useToast();
  const { settings, updateSettings } = useStore();

  const [formData, setFormData] = useState({
    electricityPricePerUnit: settings.electricityPricePerUnit,
    waterMonthlyPrice: settings.waterMonthlyPrice,
    currency: settings.currency,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.electricityPricePerUnit < 0 || formData.waterMonthlyPrice < 0) {
      toast({
        title: 'Error',
        description: 'Prices cannot be negative',
        variant: 'destructive',
      });
      return;
    }

    updateSettings(formData);
    toast({ title: 'Success', description: 'Settings saved successfully' });
  };

  return (
    <MobileLayout>
      <PageHeader title="Settings" />
      
      <form onSubmit={handleSubmit} className="px-4 py-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Electricity Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="electricityPrice">Price per Unit ({formData.currency})</Label>
              <Input
                id="electricityPrice"
                type="number"
                min="0"
                step="0.01"
                value={formData.electricityPricePerUnit}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  electricityPricePerUnit: Number(e.target.value) 
                }))}
              />
              <p className="text-xs text-muted-foreground">
                Cost charged per unit of electricity consumed
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              Water Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="waterPrice">Fixed Monthly Price ({formData.currency})</Label>
              <Input
                id="waterPrice"
                type="number"
                min="0"
                value={formData.waterMonthlyPrice}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  waterMonthlyPrice: Number(e.target.value) 
                }))}
              />
              <p className="text-xs text-muted-foreground">
                Fixed water charge added to each tenant's monthly bill
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IndianRupee className="h-4 w-4" />
              Currency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency Symbol</Label>
              <Input
                id="currency"
                value={formData.currency}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  currency: e.target.value 
                }))}
                placeholder="₹"
                maxLength={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50">
          <CardContent className="p-4">
            <div className="space-y-2 text-sm">
              <p className="font-medium">Current Rates</p>
              <div className="flex justify-between text-muted-foreground">
                <span>Electricity</span>
                <span>{settings.currency}{settings.electricityPricePerUnit}/unit</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Water</span>
                <span>{settings.currency}{settings.waterMonthlyPrice}/month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" size="lg">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </form>
    </MobileLayout>
  );
};

export default SettingsPage;
