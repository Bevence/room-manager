import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Phone, Mail, Home } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store/useStore';

const TenantsPage = () => {
  const navigate = useNavigate();
  const { tenants, rooms, settings } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.phone.includes(searchQuery)
  );

  const getTenantRooms = (roomIds: string[]) => {
    return rooms.filter(r => roomIds.includes(r.id));
  };

  const getTotalRent = (roomIds: string[]) => {
    return getTenantRooms(roomIds).reduce((sum, r) => sum + r.monthlyRent, 0);
  };

  return (
    <MobileLayout>
      <PageHeader 
        title="Tenants" 
        subtitle={`${tenants.filter(t => t.isActive).length} active tenants`}
        action={
          <Button size="sm" onClick={() => navigate('/tenants/new')}>
            <Plus className="h-4 w-4" />
            Add
          </Button>
        }
      />
      
      <div className="px-4 py-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tenants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Tenant List */}
        <div className="space-y-3">
          {filteredTenants.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No tenants found</p>
                <Button 
                  variant="link" 
                  className="mt-2"
                  onClick={() => navigate('/tenants/new')}
                >
                  Add your first tenant
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredTenants.map((tenant, index) => {
              const tenantRooms = getTenantRooms(tenant.roomIds);
              const totalRent = getTotalRent(tenant.roomIds);
              
              return (
                <Card 
                  key={tenant.id}
                  className="animate-slide-up cursor-pointer hover:shadow-lg transition-shadow"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => navigate(`/tenants/${tenant.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{tenant.name}</h3>
                          <Badge variant={tenant.isActive ? 'success' : 'muted'}>
                            {tenant.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {tenant.phone}
                          </span>
                          {tenant.email && (
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {tenant.email.split('@')[0]}...
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Home className="h-3 w-3 text-muted-foreground" />
                          {tenantRooms.map(room => (
                            <Badge key={room.id} variant="secondary" className="text-xs">
                              {room.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">
                          {settings.currency}{totalRent.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">/month</p>
                      </div>
                    </div>
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

export default TenantsPage;
