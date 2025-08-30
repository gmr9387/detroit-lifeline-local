import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Star, MapPin, Clock, Users, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import programsData from '@/data/programs.json';
import spiritOfDetroitImage from '@/assets/spirit-of-detroit.jpg';


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

interface DashboardProps {
  userProfile: UserProfile;
  onProgramSelect: (program: Program) => void;
  onShowOnboarding: () => void;
}

interface Application {
  programId: string;
  status: 'started' | 'submitted' | 'approved' | 'denied';
  dateStarted: string;
  lastUpdated: string;
  nextDeadline?: string;
}

const QUICK_ACTIONS = [
  { 
    title: 'Apply for SNAP Benefits', 
    description: 'Get food assistance today',
    icon: '🍽️',
    url: 'https://www.michigan.gov/mdhhs/assistance-programs/food-assistance',
    category: 'food'
  },
  { 
    title: 'Find Jobs', 
    description: 'Search employment opportunities',
    icon: '💼',
    url: 'https://michiganworksse.org',
    category: 'employment'
  },
  { 
    title: 'Housing Assistance', 
    description: 'Get help with rent or utilities',
    icon: '🏠',
    url: 'https://detroitmi.gov/erap',
    category: 'housing'
  },
  { 
    title: 'Healthcare Enrollment', 
    description: 'Apply for health insurance',
    icon: '🏥',
    url: 'https://www.michigan.gov/mdhhs/assistance-programs/healthcare',
    category: 'healthcare'
  }
];

const Dashboard: React.FC<DashboardProps> = ({ userProfile, onProgramSelect, onShowOnboarding }) => {
  const [programs] = useState<Program[]>(programsData as Program[]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [applications, setApplications] = useState<Application[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Load saved applications and favorites from localStorage
    const savedApplications = localStorage.getItem('applications');
    const savedFavorites = localStorage.getItem('favorites');
    
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const getRecommendedPrograms = () => {
    return programs.filter(program => {
      // Match user's primary needs
      if (!userProfile.primaryNeeds.includes(program.category)) {
        return false;
      }

      // Basic language compatibility
      const userLang = userProfile.language === 'spanish' ? 'Spanish' : 
                      userProfile.language === 'arabic' ? 'Arabic' : 'English';
      if (!program.languages.includes(userLang)) {
        return false;
      }

      return true;
    }).slice(0, 6);
  };

  const getFilteredPrograms = () => {
    return programs.filter(program => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        if (!program.title.toLowerCase().includes(searchLower) &&
            !program.description.toLowerCase().includes(searchLower) &&
            !program.benefits.some(benefit => benefit.toLowerCase().includes(searchLower))) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && program.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  };

  const getApplicationStatus = (programId: string) => {
    return applications.find(app => app.programId === programId);
  };

  const startApplication = (program: Program) => {
    const newApplication: Application = {
      programId: program.id,
      status: 'started',
      dateStarted: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    const updatedApplications = [...applications, newApplication];
    setApplications(updatedApplications);
    localStorage.setItem('applications', JSON.stringify(updatedApplications));

    // Open program's actual website
    window.open(program.contact.website, '_blank');
  };

  const toggleFavorite = (programId: string) => {
    const updatedFavorites = favorites.includes(programId)
      ? favorites.filter(id => id !== programId)
      : [...favorites, programId];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

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

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      started: { label: 'In Progress', variant: 'secondary' as const },
      submitted: { label: 'Submitted', variant: 'default' as const },
      approved: { label: 'Approved', variant: 'default' as const },
      denied: { label: 'Denied', variant: 'destructive' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config?.variant}>{config?.label}</Badge>;
  };

  const recommendedPrograms = getRecommendedPrograms();
  const filteredPrograms = getFilteredPrograms();
  const categories = [...new Set(programs.map(p => p.category))];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-hero relative overflow-hidden min-h-[200px]">
        <div className="container mx-auto px-4 py-8 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="text-primary-foreground flex-1 z-10 relative">
              <h1 className="text-3xl font-bold mb-2">
                Welcome back! 
              </h1>
              <p className="text-primary-foreground/90">
                {userProfile.neighborhood && `${userProfile.neighborhood}, `}Detroit • Household of {userProfile.householdSize}
              </p>
            </div>
            <div className="hidden md:flex items-center justify-end flex-1 relative z-10">
              <div className="mr-8 opacity-70 flex items-center space-x-4">
                <img 
                  src={spiritOfDetroitImage} 
                  alt="Spirit of Detroit" 
                  className="w-20 h-16 object-cover rounded-lg shadow-lg border-2 border-white/20"
                />
                <div className="text-primary-foreground/80 text-sm">
                  <div className="font-semibold">Spirit of Detroit</div>
                  <div className="text-xs">Inspiring Progress</div>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={onShowOnboarding}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Update Profile
              </Button>
            </div>
            <Button 
              variant="outline" 
              onClick={onShowOnboarding}
              className="md:hidden mt-4 bg-white/10 border-white/20 text-white hover:bg-white/20 w-full"
            >
              Update Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_ACTIONS
              .filter(action => userProfile.primaryNeeds.includes(action.category))
              .slice(0, 4)
              .map((action, index) => (
              <Card key={index} className="card-elevated p-4 hover:shadow-strong transition-smooth cursor-pointer">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{action.icon}</span>
                  <h3 className="font-semibold">{action.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open(action.url, '_blank')}
                >
                  Start Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* My Applications */}
        {applications.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">My Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {applications.slice(0, 3).map((application) => {
                const program = programs.find(p => p.id === application.programId);
                if (!program) return null;

                return (
                  <Card key={application.programId} className="card-elevated p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getCategoryIcon(program.category)}</span>
                        <h3 className="font-semibold">{program.title}</h3>
                      </div>
                      {getStatusBadge(application.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Started: {new Date(application.dateStarted).toLocaleDateString()}
                    </p>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => onProgramSelect(program)}
                        className="flex-1"
                      >
                        View Details
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => window.open(program.contact.website, '_blank')}
                        className="flex-1"
                      >
                        Check Status
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Recommended Programs */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedPrograms.map((program) => {
              const applicationStatus = getApplicationStatus(program.id);
              const isFavorite = favorites.includes(program.id);

              return (
                <Card key={program.id} className="card-elevated p-6 hover:shadow-strong transition-smooth">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getCategoryIcon(program.category)}</span>
                      <Badge variant="secondary" className="text-xs">
                        {program.category}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(program.id)}
                      className={isFavorite ? 'text-accent' : 'text-muted-foreground'}
                    >
                      <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </Button>
                  </div>

                  <h3 className="font-semibold text-lg mb-2">{program.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {program.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{program.contact.address.split(',').slice(-2).join(',')}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{program.contact.hours}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => onProgramSelect(program)}
                      className="flex-1"
                    >
                      Learn More
                    </Button>
                    {applicationStatus ? (
                      <Button 
                        variant="secondary"
                        onClick={() => window.open(program.contact.website, '_blank')}
                        className="flex-1"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Check Status
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => startApplication(program)}
                        className="flex-1"
                      >
                        Apply Now
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Browse All Programs */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">Browse All Programs</h2>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-64"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => {
              const applicationStatus = getApplicationStatus(program.id);
              const isFavorite = favorites.includes(program.id);

              return (
                <Card key={program.id} className="card-elevated p-6 hover:shadow-strong transition-smooth">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getCategoryIcon(program.category)}</span>
                      <Badge variant="outline" className="text-xs">
                        {program.category}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(program.id)}
                      className={isFavorite ? 'text-accent' : 'text-muted-foreground'}
                    >
                      <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </Button>
                  </div>

                  <h3 className="font-semibold text-lg mb-2">{program.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {program.description}
                  </p>

                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Users className="w-4 h-4 mr-2" />
                    <span>Languages: {program.languages.join(', ')}</span>
                  </div>

                  {program.deadlines && (
                    <div className="flex items-center text-sm text-warning mb-4 p-2 bg-warning/10 rounded">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      <span className="text-xs">{program.deadlines[0]}</span>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => onProgramSelect(program)}
                      className="flex-1"
                    >
                      Details
                    </Button>
                    {applicationStatus ? (
                      getStatusBadge(applicationStatus.status)
                    ) : (
                      <Button 
                        onClick={() => startApplication(program)}
                        className="flex-1"
                      >
                        Apply
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No programs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default Dashboard;