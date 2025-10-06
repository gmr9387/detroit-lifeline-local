import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Program {
  id: string;
  title: string;
  category: string;
  description: string;
  state: string | null;
  benefits: string[];
  eligibility: string[];
  contact_phone: string | null;
  contact_website: string | null;
  application_url: string | null;
  audience_tier: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function usePrograms(filters?: {
  category?: string;
  state?: string;
  audienceTier?: string;
  searchTerm?: string;
}) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPrograms();
  }, [filters?.category, filters?.state, filters?.audienceTier, filters?.searchTerm]);

  const fetchPrograms = async () => {
    try {
      let query = supabase
        .from('programs')
        .select('*')
        .eq('is_active', true);

      // Apply filters
      if (filters?.category && filters.category !== 'all') {
        query = query.ilike('category', filters.category);
      }

      if (filters?.state) {
        query = query.or(`state.eq.${filters.state},state.is.null`);
      }

      if (filters?.audienceTier) {
        query = query.or(`audience_tier.eq.${filters.audienceTier},audience_tier.is.null`);
      }

      if (filters?.searchTerm) {
        query = query.or(`title.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`);
      }

      const { data, error } = await query.order('title');

      if (error) throw error;
      setPrograms(data || []);
    } catch (error: any) {
      console.error('Error fetching programs:', error);
      toast({
        title: 'Error loading programs',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    programs,
    isLoading,
    refreshPrograms: fetchPrograms,
  };
}
