import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning';
  className?: string;
}

export function StatCard({ title, value, icon, variant = 'default', className }: StatCardProps) {
  const bgVariants = {
    default: 'bg-card',
    primary: 'bg-primary-light',
    success: 'bg-success-light',
    warning: 'bg-accent-light',
  };

  const iconBgVariants = {
    default: 'bg-secondary text-secondary-foreground',
    primary: 'bg-primary text-primary-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-accent text-accent-foreground',
  };

  return (
    <Card className={`${bgVariants[variant]} animate-slide-up ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
          </div>
          <div className={`p-2.5 rounded-xl ${iconBgVariants[variant]}`}>
            {icon}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
