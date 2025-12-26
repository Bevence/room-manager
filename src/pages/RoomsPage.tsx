import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, User } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store/useStore';

const RoomsPage = () => {
  const navigate = useNavigate();
  const { rooms, tenants, settings } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTenantName = (tenantId?: string) => {
    if (!tenantId) return null;
    return tenants.find(t => t.id === tenantId)?.name;
  };

  const occupiedCount = rooms.filter(r => r.isOccupied).length;
  const vacantCount = rooms.length - occupiedCount;

  return (
    <MobileLayout>
      <PageHeader 
        title="Rooms" 
        subtitle={`${occupiedCount} occupied, ${vacantCount} vacant`}
        action={
          <Button size="sm" onClick={() => navigate('/rooms/new')}>
            <Plus className="h-4 w-4" />
            Add
          </Button>
        }
      />
      
      <div className="px-4 py-4 space-y-4">
        {/* Quick Stats */}
        <div className="flex gap-2">
          <Badge variant="success" className="px-3 py-1">
            {occupiedCount} Occupied
          </Badge>
          <Badge variant="pending" className="px-3 py-1">
            {vacantCount} Vacant
          </Badge>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Room List */}
        <div className="grid grid-cols-2 gap-3">
          {filteredRooms.length === 0 ? (
            <Card className="col-span-2">
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No rooms found</p>
                <Button 
                  variant="link" 
                  className="mt-2"
                  onClick={() => navigate('/rooms/new')}
                >
                  Add your first room
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredRooms.map((room, index) => {
              const tenantName = getTenantName(room.tenantId);
              
              return (
                <Card 
                  key={room.id}
                  className="animate-slide-up cursor-pointer hover:shadow-lg transition-shadow"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => navigate(`/rooms/${room.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{room.name}</h3>
                      <Badge variant={room.isOccupied ? 'success' : 'pending'} className="text-[10px]">
                        {room.isOccupied ? 'Occupied' : 'Vacant'}
                      </Badge>
                    </div>
                    
                    <p className="text-xl font-bold text-primary mb-2">
                      {settings.currency}{room.monthlyRent.toLocaleString()}
                    </p>
                    
                    {tenantName ? (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span className="truncate">{tenantName}</span>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">No tenant</p>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default RoomsPage;
