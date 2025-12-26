import { useNavigate } from 'react-router-dom';
import { UserPlus, DoorOpen, Receipt, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const actions = [
  { icon: UserPlus, label: 'Add Tenant', path: '/tenants/new', color: 'bg-primary' },
  { icon: DoorOpen, label: 'Add Room', path: '/rooms/new', color: 'bg-success' },
  { icon: Receipt, label: 'New Bill', path: '/bills/new', color: 'bg-accent' },
  { icon: Zap, label: 'Meter Reading', path: '/bills/meter', color: 'bg-chart-4' },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.path}
                onClick={() => navigate(action.path)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-secondary transition-colors"
              >
                <div className={`${action.color} p-2.5 rounded-xl text-primary-foreground`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-medium text-center leading-tight text-muted-foreground">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
