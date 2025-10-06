import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';
import { Program } from './usePrograms';

export function useAdminPrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('title');

      if (error) throw error;
      setPrograms(data || []);
    } catch (error: any) {
      toast({
        title: 'Error loading programs',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createProgram = async (program: any) => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .insert([program])
        .select()
        .single();

      if (error) throw error;

      setPrograms(prev => [...prev, data]);
      toast({
        title: 'Program created',
        description: 'Program has been added successfully',
      });

      return data;
    } catch (error: any) {
      toast({
        title: 'Failed to create program',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateProgram = async (id: string, updates: any) => {
    try {
      const { error } = await supabase
        .from('programs')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setPrograms(prev =>
        prev.map(p => (p.id === id ? { ...p, ...updates } : p))
      );

      toast({
        title: 'Program updated',
        description: 'Changes have been saved',
      });
    } catch (error: any) {
      toast({
        title: 'Failed to update',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const deleteProgram = async (id: string) => {
    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPrograms(prev => prev.filter(p => p.id !== id));
      toast({
        title: 'Program deleted',
        description: 'Program has been removed',
      });
    } catch (error: any) {
      toast({
        title: 'Failed to delete',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const toggleProgramStatus = async (id: string, isActive: boolean) => {
    await updateProgram(id, { is_active: isActive });
  };

  return {
    programs,
    isLoading,
    createProgram,
    updateProgram,
    deleteProgram,
    toggleProgramStatus,
    refreshPrograms: fetchPrograms,
  };
}
