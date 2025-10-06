import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FunnelWizard from '@/components/FunnelWizard';
import { IntegratedDashboard } from '@/components/IntegratedDashboard';
import { ProgramDetailWrapper } from '@/components/ProgramDetailWrapper';
import SEOHead from '@/components/SEOHead';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
interface FunnelResponse {
  goal: string[];
  hardship: string;
  household: string;
  dependents: number;
  roles: string[];
  housing: string;
  state: string;
  immediate: string;
  income: string;
}

type AppState = 'funnel' | 'dashboard' | 'program-detail';

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading, signOut } = useAuth();
  const { profile, isLoading: profileLoading, updateProfile } = useProfile();
  const [appState, setAppState] = useState<AppState>('funnel');
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profile && profile.state) {
      setAppState('dashboard');
    }
  }, [profile]);

  const handleFunnelComplete = async (responses: FunnelResponse) => {
    if (!user) return;

    // Update profile with funnel data
    await updateProfile({
      state: responses.state,
      household_size: responses.dependents + 1,
      income_level: responses.income,
      audience_tier: responses.roles.includes('Veteran') ? 'veteran' : 'general',
    });

    setAppState('dashboard');
  };

  const handleProgramSelect = (program: any) => {
    setSelectedProgramId(program.id);
    setAppState('program-detail');
  };

  const handleBackToDashboard = () => {
    setSelectedProgramId(null);
    setAppState('dashboard');
  };

  const handleShowFunnel = () => {
    setAppState('funnel');
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // App routing based on state
  switch (appState) {
    case 'funnel':
      return (
        <>
          <SEOHead 
            title="Get Started - Detroit Lifeline"
            description="Answer a few questions to find government assistance programs tailored to your needs. Access healthcare, food, housing, and employment benefits."
          />
          <div className="fixed top-4 right-4 z-50">
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
          <FunnelWizard onComplete={handleFunnelComplete} />
        </>
      );
    
    case 'dashboard':
      return (
        <>
          <SEOHead 
            title={`Programs for ${profile?.state || 'You'} - Detroit Lifeline`}
            description={`Personalized government assistance programs for your household. Find healthcare, food, housing, and employment resources.`}
          />
          <div className="fixed top-4 right-4 z-50">
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
          <IntegratedDashboard 
            userProfile={profile}
            onProgramSelect={handleProgramSelect}
            onShowFunnel={handleShowFunnel}
          />
        </>
      );
    
    case 'program-detail':
      return selectedProgramId ? (
        <>
          <SEOHead 
            title="Program Details - Detroit Lifeline"
            description="View program details and apply"
          />
          <div className="fixed top-4 right-4 z-50">
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
          <ProgramDetailWrapper 
            programId={selectedProgramId}
            userProfile={{
              householdSize: profile?.household_size || 1,
              householdType: 'general',
              incomeLevel: profile?.income_level || 'low',
              zipCode: profile?.zip_code || '',
              neighborhood: profile?.state || '',
              primaryNeeds: [],
              language: 'english',
              hasChildren: false,
              isVeteran: profile?.audience_tier === 'veteran',
              hasDisability: false,
              isStudent: false,
            }}
            onBack={handleBackToDashboard}
          />
        </>
      ) : null;
    
    default:
      return null;
  }
};

export default Index;
