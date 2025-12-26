import { ReactNode } from 'react';
import { MobileNav } from './MobileNav';

interface MobileLayoutProps {
  children: ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      <main className="pb-20">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
