import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Phone, 
  Globe, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  FileText, 
  Calendar,
  ExternalLink,
  Star,
  DollarSign,
  Home,
  Languages
} from 'lucide-react';

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

interface ProgramDetailProps {
  program: Program;
  userProfile: UserProfile;
  onBack: () => void;
}

const ProgramDetail: React.FC<ProgramDetailProps> = ({ program, userProfile, onBack }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      employment: '💼',
      housing: '🏠',
      food: '🍽️',
      healthcare: '🏥',
      childcare: '👶',
      utilities: '💡',
      financial: '💰',
      entrepreneurship: '🚀'
    };
    return icons[category] || '📋';
  };

  const checkEligibility = () => {
    const issues: string[] = [];
    const eligible: string[] = [];

    // Check income eligibility
    if (program.eligibility.income) {
      const incomeCheck = program.eligibility.income;
      if (incomeCheck.includes('130%') || incomeCheck.includes('150%') || incomeCheck.includes('185%')) {
        if (userProfile.incomeLevel === 'Over $75,000') {
          issues.push('Your income may be too high for this program');
        } else {
          eligible.push('Income requirements likely met');
        }
      }
    }

    // Check household type eligibility
    if (program.eligibility.category) {
      if (program.eligibility.category.includes('children') && userProfile.hasChildren) {
        eligible.push('Program is designed for families with children');
      }
      if (program.eligibility.category.includes('60+') && userProfile.householdType === 'senior') {
        eligible.push('Program is designed for seniors');
      }
    }

    // Check language compatibility
    const userLang = userProfile.language === 'spanish' ? 'Spanish' : 
                    userProfile.language === 'arabic' ? 'Arabic' : 'English';
    if (program.languages.includes(userLang)) {
      eligible.push(`Services available in ${userLang}`);
    } else if (!program.languages.includes(userLang)) {
      issues.push(`Services may not be available in ${userLang}`);
    }

    // Check age requirements
    if (program.eligibility.age === '18+') {
      eligible.push('Age requirements met');
    }

    return { eligible, issues };
  };

  const eligibilityCheck = checkEligibility();

  const toggleFavorite = () => {
    const updatedFavorites = favorites.includes(program.id)
      ? favorites.filter(id => id !== program.id)
      : [...favorites, program.id];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const startApplication = () => {
    // Track application start
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const existingApp = applications.find((app: any) => app.programId === program.id);
    
    if (!existingApp) {
      const newApplication = {
        programId: program.id,
        status: 'started',
        dateStarted: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };
      applications.push(newApplication);
      localStorage.setItem('applications', JSON.stringify(applications));
    }

    // Open program's actual website
    window.open(program.contact.website, '_blank');
  };

  const isFavorite = favorites.includes(program.id);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-hero">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
            <Button
              variant="ghost"
              onClick={toggleFavorite}
              className={`text-white hover:bg-white/10 ${isFavorite ? 'text-accent' : ''}`}
            >
              <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </div>
          
          <div className="mt-6">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-3xl">{getCategoryIcon(program.category)}</span>
              <Badge variant="secondary" className="bg-white/20 text-white">
                {program.category}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {program.title}
            </h1>
            <p className="text-lg text-white/90 max-w-3xl">
              {program.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Eligibility Check */}
            <Card className="card-elevated p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-success" />
                Eligibility Check
              </h2>
              
              {eligibilityCheck.eligible.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium text-success mb-2">✓ You likely qualify:</h3>
                  <ul className="space-y-1">
                    {eligibilityCheck.eligible.map((item, index) => (
                      <li key={index} className="text-sm text-success flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {eligibilityCheck.issues.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium text-warning mb-2">⚠ Potential issues:</h3>
                  <ul className="space-y-1">
                    {eligibilityCheck.issues.map((item, index) => (
                      <li key={index} className="text-sm text-warning flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> This is a preliminary check based on your profile. 
                  Final eligibility is determined by the program administrator.
                </p>
              </div>
            </Card>

            {/* Program Benefits */}
            <Card className="card-elevated p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-accent" />
                What You'll Get
              </h2>
              <ul className="space-y-3">
                {program.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 text-success mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Eligibility Requirements */}
            <Card className="card-elevated p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Eligibility Requirements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(program.eligibility).map(([key, value]) => (
                  <div key={key} className="p-3 bg-muted/50 rounded-lg">
                    <div className="font-medium capitalize text-sm text-muted-foreground mb-1">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-sm">{value}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Required Documents */}
            <Card className="card-elevated p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Required Documents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {program.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center p-3 bg-muted/50 rounded-lg">
                    <FileText className="w-4 h-4 mr-3 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm">{requirement}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Application Process */}
            <Card className="card-elevated p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                How to Apply
              </h2>
              <div className="space-y-4">
                {program.applicationProcess.map((step, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold mr-4">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Apply */}
            <Card className="card-elevated p-6">
              <h3 className="font-semibold mb-4">Ready to Apply?</h3>
              <div className="space-y-3">
                <Button 
                  onClick={startApplication}
                  className="w-full btn-hero"
                >
                  Start Application
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.open(`tel:${program.contact.phone}`, '_self')}
                  className="w-full"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call for Help
                </Button>
              </div>
              
              {program.deadlines && (
                <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="flex items-center text-warning mb-1">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    <span className="font-medium text-sm">Important Deadline</span>
                  </div>
                  <p className="text-sm text-warning">{program.deadlines[0]}</p>
                </div>
              )}
            </Card>

            {/* Contact Information */}
            <Card className="card-elevated p-6">
              <h3 className="font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm mb-1">Address</div>
                    <div className="text-sm text-muted-foreground">{program.contact.address}</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm mb-1">Phone</div>
                    <div className="text-sm text-muted-foreground">
                      <a href={`tel:${program.contact.phone}`} className="hover:text-primary">
                        {program.contact.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Globe className="w-5 h-5 mr-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm mb-1">Website</div>
                    <div className="text-sm text-muted-foreground">
                      <a 
                        href={program.contact.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary break-all"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-5 h-5 mr-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm mb-1">Hours</div>
                    <div className="text-sm text-muted-foreground">{program.contact.hours}</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Languages className="w-5 h-5 mr-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm mb-1">Languages</div>
                    <div className="text-sm text-muted-foreground">
                      {program.languages.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Get Directions */}
            <Card className="card-elevated p-6">
              <h3 className="font-semibold mb-4">Get Directions</h3>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  const encodedAddress = encodeURIComponent(program.contact.address);
                  window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
                }}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Open in Maps
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;