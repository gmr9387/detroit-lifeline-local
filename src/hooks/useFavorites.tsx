import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export function useFavorites() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setIsLoading(false);
      return;
    }

    fetchFavorites();
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('program_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setFavorites(data.map(f => f.program_id));
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addFavorite = async (programId: string) => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to save programs',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('favorites')
        .insert({ user_id: user.id, program_id: programId });

      if (error) throw error;

      setFavorites(prev => [...prev, programId]);
      toast({
        title: 'Program saved',
        description: 'Added to your favorites',
      });
    } catch (error: any) {
      toast({
        title: 'Failed to save',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const removeFavorite = async (programId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('program_id', programId);

      if (error) throw error;

      setFavorites(prev => prev.filter(id => id !== programId));
      toast({
        title: 'Program removed',
        description: 'Removed from your favorites',
      });
    } catch (error: any) {
      toast({
        title: 'Failed to remove',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const isFavorite = (programId: string) => favorites.includes(programId);

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    isFavorite,
    refreshFavorites: fetchFavorites,
  };
}
