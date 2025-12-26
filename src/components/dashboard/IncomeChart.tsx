import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useStore } from '@/store/useStore';

export function IncomeChart() {
  const { bills, settings } = useStore();

  // Group bills by month and calculate totals
  const monthlyData = bills.reduce((acc, bill) => {
    const existing = acc.find(item => item.month === bill.month);
    if (existing) {
      existing.collected += bill.isPaid ? bill.grandTotal : 0;
      existing.pending += !bill.isPaid ? bill.grandTotal : 0;
    } else {
      acc.push({
        month: bill.month,
        collected: bill.isPaid ? bill.grandTotal : 0,
        pending: !bill.isPaid ? bill.grandTotal : 0,
      });
    }
    return acc;
  }, [] as { month: string; collected: number; pending: number }[]);

  // Sort by month and take last 6 months
  const chartData = monthlyData
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-6)
    .map(item => ({
      ...item,
      name: new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'short' }),
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Income Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No data available yet
          </p>
        ) : (
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={4}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  tickFormatter={(value) => `${settings.currency}${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted) / 0.5)' }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number, name: string) => [
                    `${settings.currency}${value.toLocaleString()}`,
                    name === 'collected' ? 'Collected' : 'Pending'
                  ]}
                />
                <Bar 
                  dataKey="collected" 
                  fill="hsl(var(--success))" 
                  radius={[4, 4, 0, 0]}
                  name="collected"
                />
                <Bar 
                  dataKey="pending" 
                  fill="hsl(var(--accent))" 
                  radius={[4, 4, 0, 0]}
                  name="pending"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-success" />
            <span className="text-xs text-muted-foreground">Collected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-accent" />
            <span className="text-xs text-muted-foreground">Pending</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
