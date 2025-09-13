import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Check, X, Calendar, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'deadline';
  timestamp: number;
  read: boolean;
  actionUrl?: string;
  programId?: string;
  dueDate?: number;
}

interface NotificationSettings {
  deadlineReminders: boolean;
  applicationUpdates: boolean;
  newPrograms: boolean;
  systemUpdates: boolean;
  enablePush: boolean;
}

export const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    deadlineReminders: true,
    applicationUpdates: true,
    newPrograms: false,
    systemUpdates: true,
    enablePush: false,
  });
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load notifications from localStorage
    loadNotifications();
    loadSettings();
    
    // Generate sample notifications if none exist
    generateSampleNotifications();
    
    // Set up periodic checks for deadlines
    const interval = setInterval(checkForDeadlines, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update unread count
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  const loadNotifications = () => {
    try {
      const stored = localStorage.getItem('notifications');
      if (stored) {
        const parsed = JSON.parse(stored);
        setNotifications(parsed);
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  };

  const saveNotifications = (newNotifications: Notification[]) => {
    try {
      localStorage.setItem('notifications', JSON.stringify(newNotifications));
      setNotifications(newNotifications);
    } catch (error) {
      console.error('Failed to save notifications:', error);
    }
  };

  const loadSettings = () => {
    try {
      const stored = localStorage.getItem('notificationSettings');
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({ ...settings, ...parsed });
      }
    } catch (error) {
      console.error('Failed to load notification settings:', error);
    }
  };

  const saveSettings = (newSettings: NotificationSettings) => {
    try {
      localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('Failed to save notification settings:', error);
    }
  };

  const generateSampleNotifications = () => {
    if (notifications.length > 0) return;

    const sampleNotifications: Notification[] = [
      {
        id: '1',
        title: 'SNAP Application Approved',
        message: 'Your SNAP benefits application has been approved. You should receive your EBT card within 7-10 business days.',
        type: 'success',
        timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
        read: false,
        programId: 'snap',
      },
      {
        id: '2',
        title: 'Document Deadline Approaching',
        message: 'Your Medicaid renewal documents are due in 3 days. Please submit all required paperwork to avoid interruption in coverage.',
        type: 'deadline',
        timestamp: Date.now() - 6 * 60 * 60 * 1000, // 6 hours ago
        read: false,
        programId: 'medicaid',
        dueDate: Date.now() + 3 * 24 * 60 * 60 * 1000, // 3 days from now
      },
      {
        id: '3',
        title: 'New Housing Programs Available',
        message: 'Three new affordable housing programs have been added to your area. Check them out in the Housing section.',
        type: 'info',
        timestamp: Date.now() - 24 * 60 * 60 * 1000, // 1 day ago
        read: true,
      },
      {
        id: '4',
        title: 'Interview Scheduled',
        message: 'Your WIC program interview has been scheduled for tomorrow at 2:00 PM. Please bring all required documents.',
        type: 'warning',
        timestamp: Date.now() - 3 * 60 * 60 * 1000, // 3 hours ago
        read: false,
        programId: 'wic',
      },
    ];

    saveNotifications(sampleNotifications);
  };

  const checkForDeadlines = () => {
    // In a real app, this would check application deadlines and generate notifications
    if (!settings.deadlineReminders) return;
    
    // Implementation would check stored applications for upcoming deadlines
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    saveNotifications(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    saveNotifications(updated);
  };

  const deleteNotification = (id: string) => {
    const updated = notifications.filter(n => n.id !== id);
    saveNotifications(updated);
  };

  const clearAllNotifications = () => {
    saveNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'deadline':
        return <Calendar className="h-4 w-4 text-destructive" />;
      default:
        return <Info className="h-4 w-4 text-primary" />;
    }
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      try {
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
          saveSettings({ ...settings, enablePush: true });
          toast({
            title: "Notifications Enabled",
            description: "You'll now receive important updates and reminders.",
          });
        } else {
          toast({
            title: "Notifications Blocked",
            description: "Enable notifications in your browser settings to receive important updates.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    }
  };

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>
    );
  }

  return (
    <Card className="fixed top-16 right-4 w-96 max-h-[80vh] z-50 card-elevated">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="secondary">{unreadCount}</Badge>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
            >
              <Check className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllNotifications}
          >
            Clear all
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-64">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <BellOff className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications</p>
            </div>
          ) : (
            <div className="space-y-0">
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <div
                    className={`p-4 hover:bg-muted/50 cursor-pointer ${
                      !notification.read ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <p className="text-xs text-muted-foreground">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {formatTime(notification.timestamp)}
                          </span>
                          
                          {!notification.read && (
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {index < notifications.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <Separator />
        
        {/* Notification Settings */}
        <div className="p-4 space-y-4">
          <h4 className="font-medium text-sm">Notification Settings</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Deadline reminders</span>
              <Switch
                checked={settings.deadlineReminders}
                onCheckedChange={(checked) =>
                  saveSettings({ ...settings, deadlineReminders: checked })
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Application updates</span>
              <Switch
                checked={settings.applicationUpdates}
                onCheckedChange={(checked) =>
                  saveSettings({ ...settings, applicationUpdates: checked })
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">New programs</span>
              <Switch
                checked={settings.newPrograms}
                onCheckedChange={(checked) =>
                  saveSettings({ ...settings, newPrograms: checked })
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Push notifications</span>
              <Switch
                checked={settings.enablePush}
                onCheckedChange={(checked) => {
                  if (checked) {
                    requestNotificationPermission();
                  } else {
                    saveSettings({ ...settings, enablePush: false });
                  }
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};