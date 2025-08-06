import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, Home, Users, DollarSign, MapPin, Heart } from 'lucide-react';

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

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const STEPS = [
  { title: 'Household Info', icon: Users },
  { title: 'Location', icon: MapPin },
  { title: 'Income', icon: DollarSign },
  { title: 'Needs', icon: Heart },
  { title: 'Preferences', icon: Home }
];

const PRIMARY_NEEDS = [
  { id: 'employment', label: 'Jobs & Employment Training', icon: '💼' },
  { id: 'housing', label: 'Housing Assistance', icon: '🏠' },
  { id: 'food', label: 'Food & Nutrition', icon: '🍽️' },
  { id: 'healthcare', label: 'Healthcare Services', icon: '🏥' },
  { id: 'childcare', label: 'Childcare & Family Support', icon: '👶' },
  { id: 'utilities', label: 'Utility Assistance', icon: '💡' },
  { id: 'financial', label: 'Financial Services', icon: '💰' },
  { id: 'entrepreneurship', label: 'Business Development', icon: '🚀' }
];

const INCOME_LEVELS = [
  'Under $25,000',
  '$25,000 - $35,000',
  '$35,000 - $50,000',
  '$50,000 - $75,000',
  'Over $75,000',
  'Prefer not to say'
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({
    householdSize: 1,
    householdType: 'individual',
    incomeLevel: '',
    zipCode: '',
    neighborhood: '',
    primaryNeeds: [],
    language: 'english',
    hasChildren: false,
    isVeteran: false,
    hasDisability: false,
    isStudent: false
  });

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save profile to localStorage
      localStorage.setItem('userProfile', JSON.stringify(profile));
      onComplete(profile);
    }
  };

  const handleNeedToggle = (needId: string) => {
    setProfile(prev => ({
      ...prev,
      primaryNeeds: prev.primaryNeeds.includes(needId)
        ? prev.primaryNeeds.filter(id => id !== needId)
        : [...prev.primaryNeeds, needId]
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return profile.householdSize > 0 && profile.householdType;
      case 1:
        return profile.zipCode.length >= 5;
      case 2:
        return profile.incomeLevel;
      case 3:
        return profile.primaryNeeds.length > 0;
      case 4:
        return profile.language;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="householdSize" className="text-lg font-medium text-foreground">
                How many people live in your household?
              </Label>
              <Input
                id="householdSize"
                type="number"
                min="1"
                max="15"
                value={profile.householdSize}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  householdSize: parseInt(e.target.value) || 1
                }))}
                className="mt-3 text-lg"
              />
            </div>

            <div>
              <Label className="text-lg font-medium text-foreground mb-4 block">
                Which best describes your household?
              </Label>
              <RadioGroup
                value={profile.householdType}
                onValueChange={(value) => setProfile(prev => ({ ...prev, householdType: value }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="individual" id="individual" />
                  <Label htmlFor="individual">Individual/Single person</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="family-children" id="family-children" />
                  <Label htmlFor="family-children">Family with children</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="family-no-children" id="family-no-children" />
                  <Label htmlFor="family-no-children">Family without children</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="senior" id="senior" />
                  <Label htmlFor="senior">Senior household (60+)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="text-lg font-medium text-foreground">Additional Information</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasChildren"
                    checked={profile.hasChildren}
                    onCheckedChange={(checked) => setProfile(prev => ({ ...prev, hasChildren: checked as boolean }))}
                  />
                  <Label htmlFor="hasChildren">I have children under 18</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isVeteran"
                    checked={profile.isVeteran}
                    onCheckedChange={(checked) => setProfile(prev => ({ ...prev, isVeteran: checked as boolean }))}
                  />
                  <Label htmlFor="isVeteran">I am a military veteran</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasDisability"
                    checked={profile.hasDisability}
                    onCheckedChange={(checked) => setProfile(prev => ({ ...prev, hasDisability: checked as boolean }))}
                  />
                  <Label htmlFor="hasDisability">I have a disability</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isStudent"
                    checked={profile.isStudent}
                    onCheckedChange={(checked) => setProfile(prev => ({ ...prev, isStudent: checked as boolean }))}
                  />
                  <Label htmlFor="isStudent">I am currently a student</Label>
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="zipCode" className="text-lg font-medium text-foreground">
                What's your ZIP code?
              </Label>
              <Input
                id="zipCode"
                type="text"
                placeholder="48201"
                value={profile.zipCode}
                onChange={(e) => setProfile(prev => ({ ...prev, zipCode: e.target.value }))}
                className="mt-3 text-lg"
                maxLength={5}
              />
              <p className="text-sm text-muted-foreground mt-2">
                This helps us show you resources closest to you.
              </p>
            </div>

            <div>
              <Label htmlFor="neighborhood" className="text-lg font-medium text-foreground">
                What neighborhood do you live in? (Optional)
              </Label>
              <Input
                id="neighborhood"
                type="text"
                placeholder="e.g., Downtown, Corktown, Midtown"
                value={profile.neighborhood}
                onChange={(e) => setProfile(prev => ({ ...prev, neighborhood: e.target.value }))}
                className="mt-3 text-lg"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-foreground mb-4 block">
                What is your approximate annual household income?
              </Label>
              <p className="text-sm text-muted-foreground mb-4">
                This information helps us determine which programs you may be eligible for. Your information is private and secure.
              </p>
              <RadioGroup
                value={profile.incomeLevel}
                onValueChange={(value) => setProfile(prev => ({ ...prev, incomeLevel: value }))}
              >
                {INCOME_LEVELS.map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <RadioGroupItem value={level} id={level} />
                    <Label htmlFor={level}>{level}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-foreground mb-4 block">
                What are your most important needs right now?
              </Label>
              <p className="text-sm text-muted-foreground mb-4">
                Select all that apply. We'll prioritize these in your recommendations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {PRIMARY_NEEDS.map((need) => (
                  <div
                    key={need.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-smooth ${
                      profile.primaryNeeds.includes(need.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleNeedToggle(need.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{need.icon}</span>
                      <span className="font-medium">{need.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-foreground mb-4 block">
                Preferred Language
              </Label>
              <RadioGroup
                value={profile.language}
                onValueChange={(value) => setProfile(prev => ({ ...prev, language: value }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="english" id="english" />
                  <Label htmlFor="english">English</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spanish" id="spanish" />
                  <Label htmlFor="spanish">Español (Spanish)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="arabic" id="arabic" />
                  <Label htmlFor="arabic">العربية (Arabic)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <h3 className="font-semibold text-success mb-2">You're all set!</h3>
              <p className="text-sm text-success-foreground">
                We'll use this information to show you personalized resources and programs that match your needs.
                You can update your preferences anytime in your profile settings.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-hero gradient-hero bg-clip-text text-transparent">
            Welcome to Detroit Resource Navigator
          </h1>
          <p className="text-subtitle mt-4">
            Let's get to know you so we can connect you with the right resources
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center ${
                    index <= currentStep ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-center font-medium">{step.title}</span>
                </div>
              );
            })}
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground text-center mt-2">
            Step {currentStep + 1} of {STEPS.length}
          </p>
        </div>

        {/* Content */}
        <Card className="card-elevated p-6 mb-6">
          {renderStep()}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="btn-hero"
          >
            {currentStep === STEPS.length - 1 ? 'Complete Setup' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;