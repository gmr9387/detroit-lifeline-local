import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Download, X, Smartphone, Monitor } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      const event = e as BeforeInstallPromptEvent;
      // Prevent the mini-infobar from appearing on mobile
      event.preventDefault();
      // Save the event so it can be triggered later
      setDeferredPrompt(event);
      
      // Show our custom install prompt after a delay
      setTimeout(() => {
        if (!isInstalled) {
          setShowPrompt(true);
        }
      }, 10000); // Show after 10 seconds
    };

    // Listen for successful installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      
      toast({
        title: "App Installed!",
        description: "Lifeline Navigator has been added to your device.",
      });
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isInstalled, toast]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback for browsers that don't support the install prompt
      toast({
        title: "Install Manually",
        description: "Add this site to your home screen using your browser's menu.",
      });
      return;
    }

    try {
      // Show the install prompt
      await deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        toast({
          title: "Installing...",
          description: "The app is being installed on your device.",
        });
      }
      
      // Clear the deferred prompt
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('Install prompt failed:', error);
      toast({
        title: "Installation Failed",
        description: "There was an issue installing the app. Please try again.",
        variant: "destructive",
      });
    }
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
    
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Don't show if already installed or dismissed
  if (isInstalled || !showPrompt || sessionStorage.getItem('pwa-prompt-dismissed')) {
    return null;
  }

  const isMobile = window.innerWidth < 768;

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 card-elevated md:left-auto md:right-4 md:w-96">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {isMobile ? (
              <Smartphone className="h-5 w-5 text-primary" />
            ) : (
              <Monitor className="h-5 w-5 text-primary" />
            )}
            <CardTitle className="text-lg">Install Lifeline Navigator</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={dismissPrompt}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Install our app for faster access to benefits and programs, even when offline.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-success" />
              Offline access
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-success" />
              Faster loading
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-success" />
              Home screen icon
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-success" />
              Push notifications
            </div>
          </div>
          
          <Button
            onClick={handleInstallClick}
            className="w-full"
            size="sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Install App
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};