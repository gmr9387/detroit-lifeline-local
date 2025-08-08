import React, { useState, useEffect } from 'react';
import Onboarding from '@/components/Onboarding';
import Dashboard from '@/components/Dashboard';
import ProgramDetail from '@/components/ProgramDetail';

interface UserProfile {
  householdSize: number;
  householdType: string;
  incomeLevel: string;
  zipCode: string;
  neighborhood: string;
  primaryNeeds: string[];
  language: string;
  hasChildren: boolean;
  isVeteran: boolean;
  hasDisability: boolean;
  isStudent: boolean;
}

interface Program {
  id: string;
  title: string;
  category: string;
  description: string;
  benefits: string[];
  eligibility: Record<string, any>;
  requirements: string[];
  contact: {
    phone: string;
    website: string;
    address: string;
    hours: string;
  };
  applicationProcess: string[];
  languages: string[];
  deadlines?: string[];
}

type AppState = 'onboarding' | 'dashboard' | 'program-detail';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('onboarding');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  
  console.log('Current appState:', appState);
  console.log('UserProfile:', userProfile);

  useEffect(() => {
    // Check if user has completed onboarding
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
      setAppState('dashboard');
    }
  }, []);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setAppState('dashboard');
  };

  const handleProgramSelect = (program: Program) => {
    setSelectedProgram(program);
    setAppState('program-detail');
  };

  const handleBackToDashboard = () => {
    setSelectedProgram(null);
    setAppState('dashboard');
  };

  const handleShowOnboarding = () => {
    setAppState('onboarding');
  };

  // App routing based on state
  switch (appState) {
    case 'onboarding':
      return <Onboarding onComplete={handleOnboardingComplete} />;
    
    case 'dashboard':
      return userProfile ? (
        <Dashboard 
          userProfile={userProfile}
          onProgramSelect={handleProgramSelect}
          onShowOnboarding={handleShowOnboarding}
        />
      ) : null;
    
    case 'program-detail':
      return userProfile && selectedProgram ? (
        <ProgramDetail 
          program={selectedProgram}
          userProfile={userProfile}
          onBack={handleBackToDashboard}
        />
      ) : null;
    
    default:
      return null;
  }
};

export default Index;
