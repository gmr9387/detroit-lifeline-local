import React from 'react';
import { usePrograms, Program } from '@/hooks/usePrograms';
import ProgramDetail from './ProgramDetail';
import LoadingSpinner from './LoadingSpinner';

interface ProgramDetailWrapperProps {
  programId: string;
  userProfile: any;
  onBack: () => void;
}

export const ProgramDetailWrapper: React.FC<ProgramDetailWrapperProps> = ({
  programId,
  userProfile,
  onBack,
}) => {
  const { programs, isLoading } = usePrograms();
  const program = programs.find(p => p.id === programId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Program not found</h2>
          <button onClick={onBack} className="text-primary hover:underline">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Convert database program to legacy format for ProgramDetail
  const legacyProgram = {
    id: program.id,
    title: program.title,
    category: program.category,
    description: program.description,
    benefits: program.benefits,
    eligibility: {
      requirements: program.eligibility.join(', '),
    },
    requirements: program.eligibility,
    contact: {
      phone: program.contact_phone || '',
      website: program.contact_website || '',
      address: program.state || 'Federal Program',
      hours: 'Contact for hours',
    },
    applicationProcess: [
      'Visit the program website',
      'Complete the online application',
      'Submit required documents',
      'Wait for review',
    ],
    languages: ['English'],
  };

  return <ProgramDetail program={legacyProgram} userProfile={userProfile} onBack={onBack} />;
};
