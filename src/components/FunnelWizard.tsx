import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

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

interface FunnelWizardProps {
  onComplete: (responses: FunnelResponse) => void;
}

const FUNNEL_QUESTIONS = [
  {
    "id": "goal",
    "question": "What are you looking for today?",
    "type": "multi-select",
    "options": [
      "Housing / Rent / Mortgage help",
      "Food & Nutrition",
      "Healthcare / Insurance",
      "Childcare & Family Support",
      "Jobs / Training / Certification",
      "Small Business / Grants / Loans",
      "Taxes / Credits / Rebates",
      "Education / Student Loans",
      "Retirement / Benefits Planning",
      "Emergency / Immediate Assistance"
    ]
  },
  {
    "id": "hardship",
    "question": "Are you currently facing financial hardship?",
    "type": "single-choice",
    "options": ["Yes", "No", "Prefer not to say"]
  },
  {
    "id": "household",
    "question": "Which best describes your household?",
    "type": "single-choice",
    "options": [
      "Single",
      "Couple",
      "Family with kids",
      "Multigenerational household"
    ]
  },
  {
    "id": "dependents",
    "question": "How many dependents do you have?",
    "type": "numeric"
  },
  {
    "id": "roles",
    "question": "Do you identify with any of the following? (Select all that apply)",
    "type": "multi-select",
    "options": [
      "Employed",
      "Unemployed",
      "Student",
      "Veteran",
      "Senior (65+)",
      "Disabled",
      "Business Owner"
    ]
  },
  {
    "id": "housing",
    "question": "Do you own or rent your home?",
    "type": "single-choice",
    "options": ["Own", "Rent", "Other"]
  },
  {
    "id": "state",
    "question": "What state do you live in?",
    "type": "dropdown",
    "options": [
      "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
      "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
      "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
      "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
      "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
      "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
      "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
      "Wisconsin", "Wyoming", "District of Columbia"
    ]
  },
  {
    "id": "immediate",
    "question": "Do you need immediate help today?",
    "type": "single-choice",
    "options": ["Yes", "No"]
  },
  {
    "id": "income",
    "question": "What is your approximate household income?",
    "type": "single-choice",
    "options": [
      "Under $25,000",
      "$25,000–$50,000",
      "$50,000–$100,000",
      "$100,000–$200,000",
      "Over $200,000",
      "Prefer not to say"
    ]
  }
];

const FunnelWizard: React.FC<FunnelWizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Partial<FunnelResponse>>({
    goal: [],
    roles: [],
    dependents: 0
  });

  const progress = ((currentStep + 1) / FUNNEL_QUESTIONS.length) * 100;
  const currentQuestion = FUNNEL_QUESTIONS[currentStep];

  const handleNext = () => {
    if (currentStep < FUNNEL_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save responses and complete funnel
      const completeResponses = responses as FunnelResponse;
      localStorage.setItem('funnelResponses', JSON.stringify(completeResponses));
      onComplete(completeResponses);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleMultiSelectChange = (value: string, checked: boolean) => {
    const currentValues = responses[currentQuestion.id as keyof FunnelResponse] as string[] || [];
    if (checked) {
      setResponses(prev => ({
        ...prev,
        [currentQuestion.id]: [...currentValues, value]
      }));
    } else {
      setResponses(prev => ({
        ...prev,
        [currentQuestion.id]: currentValues.filter(v => v !== value)
      }));
    }
  };

  const handleSingleSelectChange = (value: string) => {
    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNumericChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: numValue
    }));
  };

  const canProceed = () => {
    const currentValue = responses[currentQuestion.id as keyof FunnelResponse];
    
    if (currentQuestion.type === 'multi-select') {
      return Array.isArray(currentValue) && currentValue.length > 0;
    } else if (currentQuestion.type === 'single-choice' || currentQuestion.type === 'dropdown') {
      return currentValue && currentValue !== '';
    } else if (currentQuestion.type === 'numeric') {
      return typeof currentValue === 'number' && currentValue >= 0;
    }
    
    return false;
  };

  const isImmediateHelp = responses.immediate === 'Yes';

  const renderQuestion = () => {
    const currentValue = responses[currentQuestion.id as keyof FunnelResponse];

    if (currentQuestion.type === 'multi-select') {
      const selectedValues = currentValue as string[] || [];
      return (
        <div className="space-y-4">
          {currentQuestion.options.map((option) => (
            <div key={option} className="flex items-center space-x-3">
              <Checkbox
                id={option}
                checked={selectedValues.includes(option)}
                onCheckedChange={(checked) => handleMultiSelectChange(option, checked as boolean)}
              />
              <Label htmlFor={option} className="text-base cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </div>
      );
    }

    if (currentQuestion.type === 'single-choice') {
      return (
        <RadioGroup
          value={currentValue as string || ''}
          onValueChange={handleSingleSelectChange}
        >
          {currentQuestion.options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option} className="text-base cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      );
    }

    if (currentQuestion.type === 'dropdown') {
      return (
        <Select value={currentValue as string || ''} onValueChange={handleSingleSelectChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your state" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {currentQuestion.options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (currentQuestion.type === 'numeric') {
      return (
        <Input
          type="number"
          min="0"
          max="20"
          value={currentValue as number || 0}
          onChange={(e) => handleNumericChange(e.target.value)}
          className="text-lg"
          placeholder="Enter number"
        />
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-hero gradient-hero bg-clip-text text-transparent">
            Nationwide Lifeline Navigator
          </h1>
          <p className="text-subtitle mt-4">
            Get personalized assistance programs for all 50 states
          </p>
        </div>

        {/* Immediate Help Alert */}
        {isImmediateHelp && (
          <Alert className="mb-6 border-destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Emergency Resources:</strong> Call 211 for immediate local assistance, 
              or 988 for mental health crisis support. We'll prioritize emergency programs in your results.
            </AlertDescription>
          </Alert>
        )}

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground text-center mt-2">
            Question {currentStep + 1} of {FUNNEL_QUESTIONS.length}
          </p>
        </div>

        {/* Question Card */}
        <Card className="card-elevated p-6 mb-6">
          <div className="space-y-6">
            <div>
              <Label className="text-xl font-semibold text-foreground block mb-4">
                {currentQuestion.question}
              </Label>
              {currentQuestion.id === 'goal' && (
                <p className="text-sm text-muted-foreground mb-4">
                  Select all that apply - we'll personalize your results based on your needs.
                </p>
              )}
              {currentQuestion.id === 'income' && (
                <p className="text-sm text-muted-foreground mb-4">
                  This helps determine program eligibility. Your information is secure and private.
                </p>
              )}
            </div>
            
            {renderQuestion()}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={currentStep === FUNNEL_QUESTIONS.length - 1}
            >
              Skip
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="btn-hero"
            >
              {currentStep === FUNNEL_QUESTIONS.length - 1 ? 'Find My Programs' : 'Next'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Emergency Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Need immediate help? Call <strong>211</strong> or <strong>988</strong></p>
        </div>
      </div>
    </div>
  );
};

export default FunnelWizard;