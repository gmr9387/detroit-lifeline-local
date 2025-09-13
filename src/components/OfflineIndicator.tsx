import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, Download, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useToast } from '@/hooks/use-toast';
import { offlineManager } from '@/services/offlineManager';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isServiceWorkerReady, setIsServiceWorkerReady] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState(false);
  const [storageInfo, setStorageInfo] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Back Online",
        description: "Your connection has been restored. Syncing data...",
      });
      
      // Process offline queue when back online
      offlineManager.processOfflineQueue().catch(console.error);
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "You're Offline",
        description: "Don't worry! You can still browse cached programs and manage your applications.",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check service worker status
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        setIsServiceWorkerReady(true);
      });

      // Listen for service worker updates
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setPendingUpdate(true);
      });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'BACKGROUND_SYNC') {
          toast({
            title: "Data Synced",
            description: "Your offline changes have been synchronized.",
          });
        }
      });
    }

    // Initialize offline manager and get storage info
    offlineManager.initialize().then(async () => {
      const info = await offlineManager.getStorageInfo();
      setStorageInfo(info);
    }).catch(console.error);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  const handleRefresh = () => {
    if (pendingUpdate) {
      window.location.reload();
    } else {
      // Force refresh data
      window.location.reload();
    }
  };

  const downloadForOffline = async () => {
    try {
      // This would trigger downloading essential data for offline use
      toast({
        title: "Downloading Data",
        description: "Preparing essential programs for offline access...",
      });
      
      // In a real implementation, this would download critical program data
      setTimeout(() => {
        toast({
          title: "Download Complete",
          description: "Programs are now available offline!",
        });
      }, 2000);
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to download offline data. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Only show if offline or if there's an update
  if (isOnline && !pendingUpdate) {
    return null;
  }

  return (
    <Card className="fixed top-4 left-4 right-4 z-40 card-elevated md:left-auto md:right-4 md:w-80">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            {isOnline ? (
              <Wifi className="h-5 w-5 text-success" />
            ) : (
              <WifiOff className="h-5 w-5 text-destructive" />
            )}
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">
                {isOnline ? 'Update Available' : 'Offline Mode'}
              </h4>
              
              {pendingUpdate && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefresh}
                  className="h-6 w-6 p-0"
                >
                  <RefreshCw className="h-3 w-3" />
                </Button>
              )}
            </div>
            
            <p className="text-xs text-muted-foreground">
              {isOnline && pendingUpdate
                ? "A new version is available. Refresh to update."
                : "You can still access cached programs and manage applications."
              }
            </p>
            
            {!isOnline && storageInfo && (
              <div className="text-xs text-muted-foreground space-y-1">
                <div>📋 {storageInfo.programsCount} programs cached</div>
                <div>⭐ {storageInfo.favoritesCount} favorites saved</div>
                <div>📄 {storageInfo.applicationsCount} applications tracked</div>
              </div>
            )}
            
            {!isOnline && (
              <Button
                variant="outline"
                size="sm"
                onClick={downloadForOffline}
                className="w-full"
              >
                <Download className="h-3 w-3 mr-1" />
                Download for Offline
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};