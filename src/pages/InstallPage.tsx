import { useState, useEffect } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Smartphone, CheckCircle2, Share, MoreVertical } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPage() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled) {
    return (
      <MobileLayout>
        <PageHeader title="Install App" showBack />
        <div className="p-4 space-y-6">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-6 text-center">
              <CheckCircle2 className="h-16 w-16 mx-auto text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">App Installed!</h2>
              <p className="text-muted-foreground">
                Rent Manager is now installed on your device. You can access it from your home screen.
              </p>
            </CardContent>
          </Card>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <PageHeader title="Install App" showBack />
      <div className="p-4 space-y-6">
        <div className="text-center py-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Smartphone className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Install Rent Manager</h1>
          <p className="text-muted-foreground">
            Install the app on your device for quick access and offline use
          </p>
        </div>

        {deferredPrompt && (
          <Button 
            onClick={handleInstall} 
            className="w-full h-14 text-lg"
            size="lg"
          >
            <Download className="mr-2 h-5 w-5" />
            Install Now
          </Button>
        )}

        {isIOS && (
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="font-semibold text-lg">How to install on iPhone/iPad:</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-primary">1</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      Tap the <Share className="inline h-4 w-4 mx-1" /> Share button in Safari
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-primary">2</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Scroll down and tap "Add to Home Screen"</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-primary">3</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Tap "Add" to install the app</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!isIOS && !deferredPrompt && (
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="font-semibold text-lg">How to install on Android:</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-primary">1</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      Tap the <MoreVertical className="inline h-4 w-4 mx-1" /> menu in Chrome
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-primary">2</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Tap "Add to Home screen" or "Install app"</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-primary">3</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Tap "Install" to add the app</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">Benefits of installing:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Quick access from your home screen
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Works offline
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Full-screen experience
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Faster loading times
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
}
