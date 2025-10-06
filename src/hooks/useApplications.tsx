import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface Application {
  id: string;
  user_id: string;
  program_id: string;
  status: 'draft' | 'submitted' | 'pending' | 'approved' | 'denied';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  applied_date: string | null;
  deadline_date: string | null;
  notes: string | null;
  documents: any;
  created_at: string;
  updated_at: string;
}

export function useApplications() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setApplications([]);
      setIsLoading(false);
      return;
    }

    fetchApplications();
  }, [user]);

  const fetchApplications = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error: any) {
      console.error('Error fetching applications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createApplication = async (programId: string) => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to start an application',
        variant: 'destructive',
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('applications')
        .insert({
          user_id: user.id,
          program_id: programId,
          status: 'draft',
          priority: 'medium',
        })
        .select()
        .single();

      if (error) throw error;

      setApplications(prev => [data, ...prev]);
      toast({
        title: 'Application started',
        description: 'Your application has been saved',
      });

      return data;
    } catch (error: any) {
      toast({
        title: 'Failed to start application',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateApplication = async (id: string, updates: Partial<Application>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('applications')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setApplications(prev =>
        prev.map(app => (app.id === id ? { ...app, ...updates } : app))
      );

      toast({
        title: 'Application updated',
        description: 'Your changes have been saved',
      });
    } catch (error: any) {
      toast({
        title: 'Failed to update',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const deleteApplication = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setApplications(prev => prev.filter(app => app.id !== id));
      toast({
        title: 'Application deleted',
        description: 'Your application has been removed',
      });
    } catch (error: any) {
      toast({
        title: 'Failed to delete',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const getApplicationByProgramId = (programId: string) => {
    return applications.find(app => app.program_id === programId);
  };

  return {
    applications,
    isLoading,
    createApplication,
    updateApplication,
    deleteApplication,
    getApplicationByProgramId,
    refreshApplications: fetchApplications,
  };
}
