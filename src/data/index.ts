// Central data loader for all government assistance programs
import { Program } from '@/types';

// All 50 US states + DC
const statePrograms: Record<string, () => Promise<any>> = {
  AL: () => import('./states/alabama'),
  AK: () => import('./states/alaska'),
  AZ: () => import('./states/arizona'),
  AR: () => import('./states/arkansas'),
  CA: () => import('./states/california'),
  CO: () => import('./states/colorado'),
  CT: () => import('./states/connecticut'),
  DE: () => import('./states/delaware'),
  FL: () => import('./states/florida'),
  GA: () => import('./states/georgia'),
  HI: () => import('./states/hawaii'),
  ID: () => import('./states/idaho'),
  IL: () => import('./states/illinois'),
  IN: () => import('./states/indiana'),
  IA: () => import('./states/iowa'),
  KS: () => import('./states/kansas'),
  KY: () => import('./states/kentucky'),
  LA: () => import('./states/louisiana'),
  ME: () => import('./states/maine'),
  MD: () => import('./states/maryland'),
  MA: () => import('./states/massachusetts'),
  MI: () => import('./states/michigan'),
  MN: () => import('./states/minnesota'),
  MS: () => import('./states/mississippi'),
  MO: () => import('./states/missouri'),
  MT: () => import('./states/montana'),
  NE: () => import('./states/nebraska'),
  NV: () => import('./states/nevada'),
  NH: () => import('./states/new-hampshire'),
  NJ: () => import('./states/new-jersey'),
  NM: () => import('./states/new-mexico'),
  NY: () => import('./states/new-york'),
  NC: () => import('./states/north-carolina'),
  ND: () => import('./states/north-dakota'),
  OH: () => import('./states/ohio'),
  OK: () => import('./states/oklahoma'),
  OR: () => import('./states/oregon'),
  PA: () => import('./states/pennsylvania'),
  RI: () => import('./states/rhode-island'),
  SC: () => import('./states/south-carolina'),
  SD: () => import('./states/south-dakota'),
  TN: () => import('./states/tennessee'),
  TX: () => import('./states/texas'),
  UT: () => import('./states/utah'),
  VT: () => import('./states/vermont'),
  VA: () => import('./states/virginia'),
  WA: () => import('./states/washington'),
  WV: () => import('./states/west-virginia'),
  WI: () => import('./states/wisconsin'),
  WY: () => import('./states/wyoming'),
};

// All federal program categories
const federalPrograms = {
  veterans: () => import('./federal/veterans'),
  healthcare: () => import('./federal/healthcare'),
  nutrition: () => import('./federal/nutrition'),
  housing: () => import('./federal/housing'),
  education: () => import('./federal/education'),
  employment: () => import('./federal/employment'),
  energy: () => import('./federal/energy'),
  disability: () => import('./federal/disability'),
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