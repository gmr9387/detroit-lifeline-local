import React, { useState, useEffect } from 'react';
import FunnelWizard from '@/components/FunnelWizard';
import { IntegratedDashboard } from '@/components/IntegratedDashboard';
import ProgramDetail from '@/components/ProgramDetail';
import SEOHead from '@/components/SEOHead';

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

// Legacy interface for backward compatibility
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

type AppState = 'funnel' | 'dashboard' | 'program-detail';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('funnel');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [funnelData, setFunnelData] = useState<FunnelResponse | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  
  console.log('Current appState:', appState);
  console.log('UserProfile:', userProfile);
  console.log('FunnelData:', funnelData);

  useEffect(() => {
    // Check if user has completed funnel or legacy onboarding
    const savedFunnel = localStorage.getItem('funnelResponses');
    const savedProfile = localStorage.getItem('userProfile');
    
    if (savedFunnel) {
      const funnelResponses = JSON.parse(savedFunnel);
      setFunnelData(funnelResponses);
      setUserProfile(convertFunnelToProfile(funnelResponses));
      setAppState('dashboard');
    } else if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
      setAppState('dashboard');
    }
  }, []);

  // Convert funnel responses to legacy UserProfile format for compatibility
  const convertFunnelToProfile = (funnel: FunnelResponse): UserProfile => {
    const primaryNeeds = funnel.goal.map(goal => {
      switch (goal) {
        case 'Housing / Rent / Mortgage help': return 'housing';
        case 'Food & Nutrition': return 'food';
        case 'Healthcare / Insurance': return 'healthcare';
        case 'Childcare & Family Support': return 'childcare';
        case 'Jobs / Training / Certification': return 'employment';
        case 'Small Business / Grants / Loans': return 'entrepreneurship';
        case 'Taxes / Credits / Rebates': return 'financial';
        case 'Education / Student Loans': return 'education';
        default: return 'financial';
      }
    });

    return {
      householdSize: funnel.dependents + 1,
      householdType: funnel.household.toLowerCase().replace(' ', '-'),
      incomeLevel: funnel.income,
      zipCode: '', // Will be determined by state
      neighborhood: funnel.state,
      primaryNeeds,
      language: 'english',
      hasChildren: funnel.household.includes('kids') || funnel.dependents > 0,
      isVeteran: funnel.roles.includes('Veteran'),
      hasDisability: funnel.roles.includes('Disabled'),
      isStudent: funnel.roles.includes('Student')
    };
  };

  const handleFunnelComplete = (responses: FunnelResponse) => {
    setFunnelData(responses);
    const profile = convertFunnelToProfile(responses);
    setUserProfile(profile);
    localStorage.setItem('userProfile', JSON.stringify(profile));
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

  const handleShowFunnel = () => {
    // Clear saved data and restart funnel
    localStorage.removeItem('funnelResponses');
    localStorage.removeItem('userProfile');
    setFunnelData(null);
    setUserProfile(null);
    setAppState('funnel');
  };

  // App routing based on state
  switch (appState) {
    case 'funnel':
      return (
        <>
          <SEOHead 
            title="Get Started - Lifeline Navigator"
            description="Answer a few questions to find government assistance programs tailored to your needs. Access healthcare, food, housing, and employment benefits."
          />
          <FunnelWizard onComplete={handleFunnelComplete} />
        </>
      );
    
    case 'dashboard':
      return userProfile ? (
        <>
          <SEOHead 
            title={`Programs for ${userProfile.neighborhood} - Lifeline Navigator`}
            description={`Personalized government assistance programs for your household of ${userProfile.householdSize} in ${userProfile.neighborhood}. Find healthcare, food, housing, and employment resources.`}
          />
          <IntegratedDashboard 
            userProfile={userProfile}
            onProgramSelect={handleProgramSelect}
            onShowFunnel={handleShowFunnel}
          />
        </>
      ) : null;
    
    case 'program-detail':
      return userProfile && selectedProgram ? (
        <>
          <SEOHead 
            title={`${selectedProgram.title} - Lifeline Navigator`}
            description={selectedProgram.description}
            keywords={`${selectedProgram.category}, government assistance, ${selectedProgram.title}`}
          />
          <ProgramDetail 
            program={selectedProgram}
            userProfile={userProfile}
            onBack={handleBackToDashboard}
          />
        </>
      ) : null;
    
    default:
      return null;
  }
};

export default Index;
