import React, { useState } from 'react';
import Dashboard from './Dashboard';
import { NotificationCenter } from './NotificationCenter';
import { EmergencyHotlines } from './EmergencyHotlines';
import { Button } from './ui/button';
import { Phone } from 'lucide-react';

interface IntegratedDashboardProps {
  userProfile: any;
  onProgramSelect: (program: any) => void;
  onShowFunnel: () => void;
}

export const IntegratedDashboard: React.FC<IntegratedDashboardProps> = ({
  userProfile,
  onProgramSelect,
  onShowFunnel,
}) => {
  const [showEmergency, setShowEmergency] = useState(false);

  return (
    <div className="relative">
      {/* Main Dashboard */}
      <Dashboard
        userProfile={userProfile}
        onProgramSelect={onProgramSelect}
        onShowFunnel={onShowFunnel}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-40">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setShowEmergency(!showEmergency)}
          className="rounded-full h-12 w-12 shadow-strong"
        >
          <Phone className="h-5 w-5" />
        </Button>
        
        <NotificationCenter />
      </div>

      {/* Emergency Hotlines Overlay */}
      {showEmergency && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">Emergency Resources</h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowEmergency(false)}
                >
                  ×
                </Button>
              </div>
              <EmergencyHotlines />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
