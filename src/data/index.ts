// Central data loader for all government assistance programs
import { Program } from '@/types';

// Available state programs (only files that exist)
const statePrograms: Record<string, () => Promise<any>> = {
  AL: () => import('./states/alabama'),
  CA: () => import('./states/california'),
  FL: () => import('./states/florida'),
  NY: () => import('./states/new-york'),
  TX: () => import('./states/texas'),
};

// Available federal programs (only files that exist)
const federalPrograms = {
  veterans: () => import('./federal/veterans'),
  healthcare: () => import('./federal/healthcare'),
  nutrition: () => import('./federal/nutrition'),
};

// Load state programs
export async function loadStatePrograms(stateCode: string): Promise<Program[]> {
  try {
    const loader = statePrograms[stateCode.toUpperCase()];
    if (!loader) {
      console.warn(`No programs found for state: ${stateCode}`);
      return [];
    }
    
    const module = await loader();
    return module.default || module.programs || [];
  } catch (error) {
    console.error(`Error loading programs for ${stateCode}:`, error);
    return [];
  }
}

// Load federal programs
export async function loadFederalPrograms(category?: string): Promise<Program[]> {
  try {
    if (category && federalPrograms[category as keyof typeof federalPrograms]) {
      const module = await federalPrograms[category as keyof typeof federalPrograms]();
      return module.default || module.programs || [];
    }
    
    // Load all federal programs
    const allPrograms: Program[] = [];
    for (const loader of Object.values(federalPrograms)) {
      try {
        const module = await loader();
        const programs = module.default || module.programs || [];
        allPrograms.push(...programs);
      } catch (error) {
        console.error('Error loading federal program category:', error);
      }
    }
    
    return allPrograms;
  } catch (error) {
    console.error('Error loading federal programs:', error);
    return [];
  }
}

// Load all programs for a user's location
export async function loadProgramsForUser(stateCode: string, category?: string): Promise<Program[]> {
  const [statePrograms, federalPrograms] = await Promise.all([
    loadStatePrograms(stateCode),
    loadFederalPrograms(category)
  ]);
  
  return [...statePrograms, ...federalPrograms];
}

// Get available states
export function getAvailableStates(): string[] {
  return Object.keys(statePrograms);
}

// Get available federal categories
export function getFederalCategories(): string[] {
  return Object.keys(federalPrograms);
}