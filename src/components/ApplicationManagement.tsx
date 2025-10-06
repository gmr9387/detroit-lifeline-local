import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useApplications } from '@/hooks/useApplications';
import { usePrograms } from '@/hooks/usePrograms';
import LoadingSpinner from './LoadingSpinner';
import { Calendar, FileText, Trash2, ExternalLink } from 'lucide-react';

export const ApplicationManagement: React.FC = () => {
  const { applications, isLoading: appsLoading, deleteApplication, updateApplication } = useApplications();
  const { programs, isLoading: programsLoading } = usePrograms();

  if (appsLoading || programsLoading) {
    return <LoadingSpinner />;
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'denied':
        return 'destructive';
      case 'submitted':
      case 'pending':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'destructive';
      case 'high':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>

      {applications.length === 0 ? (
        <Card className="p-12 text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">No Applications Yet</h2>
          <p className="text-muted-foreground">
            Start applying to programs to track your applications here.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((application) => {
            const program = programs.find(p => p.id === application.program_id);
            if (!program) return null;

            return (
              <Card key={application.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg">{program.title}</h3>
                  <Badge variant={getStatusVariant(application.status)}>
                    {application.status}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {program.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>Started: {new Date(application.created_at).toLocaleDateString()}</span>
                  </div>
                  
                  {application.deadline_date && (
                    <div className="flex items-center text-sm text-warning">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Deadline: {new Date(application.deadline_date).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Priority:</span>
                    <Badge variant={getPriorityVariant(application.priority)} className="text-xs">
                      {application.priority}
                    </Badge>
                  </div>
                </div>

                {application.notes && (
                  <div className="mb-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm">{application.notes}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => window.open(program.contact_website || '#', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Visit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this application?')) {
                        deleteApplication(application.id);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
