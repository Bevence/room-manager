import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Trash2 } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useStore } from '@/store/useStore';
import { useToast } from '@/hooks/use-toast';

const TenantFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const { tenants, rooms, addTenant, updateTenant, deleteTenant, updateRoom } = useStore();

  const existingTenant = id ? tenants.find(t => t.id === id) : null;
  const isEditing = !!existingTenant;

  const [formData, setFormData] = useState({
    name: existingTenant?.name || '',
    phone: existingTenant?.phone || '',
    email: existingTenant?.email || '',
    moveInDate: existingTenant?.moveInDate || new Date().toISOString().split('T')[0],
    roomIds: existingTenant?.roomIds || [] as string[],
    isActive: existingTenant?.isActive ?? true,
  });

  const availableRooms = rooms.filter(r => 
    !r.isOccupied || formData.roomIds.includes(r.id)
  );

  const handleRoomToggle = (roomId: string) => {
    setFormData(prev => ({
      ...prev,
      roomIds: prev.roomIds.includes(roomId)
        ? prev.roomIds.filter(id => id !== roomId)
        : [...prev.roomIds, roomId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: 'Error',
        description: 'Name and phone are required',
        variant: 'destructive',
      });
      return;
    }

    if (isEditing && existingTenant) {
      // Update room occupancy for removed rooms
      existingTenant.roomIds.forEach(roomId => {
        if (!formData.roomIds.includes(roomId)) {
          updateRoom(roomId, { isOccupied: false, tenantId: undefined });
        }
      });
      
      // Update room occupancy for added rooms
      formData.roomIds.forEach(roomId => {
        updateRoom(roomId, { isOccupied: true, tenantId: existingTenant.id });
      });
      
      updateTenant(existingTenant.id, formData);
      toast({ title: 'Success', description: 'Tenant updated successfully' });
    } else {
      const newTenantId = Math.random().toString(36).substring(2, 15);
      addTenant({ ...formData, id: newTenantId });
      
      // Update room occupancy
      formData.roomIds.forEach(roomId => {
        updateRoom(roomId, { isOccupied: true, tenantId: newTenantId });
      });
      
      toast({ title: 'Success', description: 'Tenant added successfully' });
    }
    
    navigate('/tenants');
  };

  const handleDelete = () => {
    if (existingTenant && window.confirm('Are you sure you want to delete this tenant?')) {
      // Free up rooms
      existingTenant.roomIds.forEach(roomId => {
        updateRoom(roomId, { isOccupied: false, tenantId: undefined });
      });
      
      deleteTenant(existingTenant.id);
      toast({ title: 'Success', description: 'Tenant deleted successfully' });
      navigate('/tenants');
    }
  };

  return (
    <MobileLayout>
      <PageHeader 
        title={isEditing ? 'Edit Tenant' : 'Add Tenant'} 
        showBack
      />
      
      <form onSubmit={handleSubmit} className="px-4 py-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tenant Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter tenant name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="tenant@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="moveInDate">Move-in Date</Label>
              <Input
                id="moveInDate"
                type="date"
                value={formData.moveInDate}
                onChange={(e) => setFormData(prev => ({ ...prev, moveInDate: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Assign Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            {availableRooms.length === 0 ? (
              <p className="text-sm text-muted-foreground">No rooms available</p>
            ) : (
              <div className="space-y-3">
                {availableRooms.map(room => (
                  <div 
                    key={room.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={room.id}
                        checked={formData.roomIds.includes(room.id)}
                        onCheckedChange={() => handleRoomToggle(room.id)}
                      />
                      <Label htmlFor={room.id} className="cursor-pointer">
                        {room.name}
                      </Label>
                    </div>
                    <span className="font-semibold">₹{room.monthlyRent.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-3 pt-4">
          {isEditing && (
            <Button 
              type="button" 
              variant="destructive" 
              className="flex-1"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          )}
          <Button type="submit" className="flex-1">
            <Save className="h-4 w-4" />
            {isEditing ? 'Update' : 'Save'}
          </Button>
        </div>
      </form>
    </MobileLayout>
  );
};

export default TenantFormPage;
