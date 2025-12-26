import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Trash2 } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/store/useStore';
import { useToast } from '@/hooks/use-toast';

const RoomFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const { rooms, addRoom, updateRoom, deleteRoom } = useStore();

  const existingRoom = id ? rooms.find(r => r.id === id) : null;
  const isEditing = !!existingRoom;

  const [formData, setFormData] = useState({
    name: existingRoom?.name || '',
    monthlyRent: existingRoom?.monthlyRent || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: 'Error',
        description: 'Room name is required',
        variant: 'destructive',
      });
      return;
    }

    if (formData.monthlyRent <= 0) {
      toast({
        title: 'Error',
        description: 'Monthly rent must be greater than 0',
        variant: 'destructive',
      });
      return;
    }

    if (isEditing && existingRoom) {
      updateRoom(existingRoom.id, formData);
      toast({ title: 'Success', description: 'Room updated successfully' });
    } else {
      addRoom({ 
        ...formData, 
        id: Math.random().toString(36).substring(2, 15),
        isOccupied: false 
      });
      toast({ title: 'Success', description: 'Room added successfully' });
    }
    
    navigate('/rooms');
  };

  const handleDelete = () => {
    if (existingRoom) {
      if (existingRoom.isOccupied) {
        toast({
          title: 'Error',
          description: 'Cannot delete an occupied room. Remove the tenant first.',
          variant: 'destructive',
        });
        return;
      }
      
      if (window.confirm('Are you sure you want to delete this room?')) {
        deleteRoom(existingRoom.id);
        toast({ title: 'Success', description: 'Room deleted successfully' });
        navigate('/rooms');
      }
    }
  };

  return (
    <MobileLayout>
      <PageHeader 
        title={isEditing ? 'Edit Room' : 'Add Room'} 
        showBack
      />
      
      <form onSubmit={handleSubmit} className="px-4 py-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Room Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Room Name/Number *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Room 101, Suite A"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rent">Monthly Rent (₹) *</Label>
              <Input
                id="rent"
                type="number"
                min="0"
                value={formData.monthlyRent || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, monthlyRent: Number(e.target.value) }))}
                placeholder="5000"
              />
            </div>
          </CardContent>
        </Card>

        {isEditing && existingRoom && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className={`font-medium ${existingRoom.isOccupied ? 'text-success' : 'text-accent'}`}>
                  {existingRoom.isOccupied ? 'Occupied' : 'Vacant'}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

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

export default RoomFormPage;
