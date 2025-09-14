/**
 * Helper functions for state-specific API integrations
 */
import type { BenefitProgram } from './apiClient';

export async function fetchFromStateHealth(apiUrl: string, state: string, category?: string): Promise<BenefitProgram[]> {
  try {
    const response = await fetch(`${apiUrl}/programs`, {
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) throw new Error('State health API unavailable');
    
    const data = await response.json();
    return normalizeStateHealthData(data, state, category);
  } catch (error) {
    return getStateHealthFallback(state, category);
  }
}

export async function fetchFromStateWorkforce(apiUrl: string, state: string, category?: string): Promise<BenefitProgram[]> {
  try {
    const response = await fetch(`${apiUrl}/jobs`, {
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) throw new Error('State workforce API unavailable');
    
    const data = await response.json();
    return normalizeStateWorkforceData(data, state, category);
  } catch (error) {
    return getStateWorkforceFallback(state, category);
  }
}

export async function fetchFromStateHousing(apiUrl: string, state: string, category?: string): Promise<BenefitProgram[]> {
  try {
    const response = await fetch(`${apiUrl}/housing`, {
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) throw new Error('State housing API unavailable');
    
    const data = await response.json();
    return normalizeStateHousingData(data, state, category);
  } catch (error) {
    return getStateHousingFallback(state, category);
  }
}

function normalizeStateHealthData(data: any, state: string, category?: string): BenefitProgram[] {
  // Comprehensive state health program normalization
  const programs: BenefitProgram[] = [];
  
  if (data.programs) {
    data.programs.forEach((program: any) => {
      if (!category || program.category?.toLowerCase().includes(category.toLowerCase())) {
        programs.push({
          id: `${state}-health-${program.id || Math.random()}`,
          title: program.name || program.title || 'State Health Program',
          category: 'Healthcare',
          description: program.description || 'State healthcare assistance program',
          benefits: program.benefits || ['Health insurance coverage', 'Medical services'],
          eligibility: program.eligibility || ['State resident', 'Income requirements'],
          requirements: program.requirements || ['Application', 'Documentation'],
          contact: {
            phone: program.phone || '1-800-MEDICAID',
            website: program.website || `https://medicaid.${state.toLowerCase()}.gov`,
            email: program.email,
            address: program.address,
            hours: program.hours || 'Mon-Fri 8AM-5PM'
          },
          applicationProcess: {
            steps: program.steps || ['Apply online', 'Submit documents', 'Wait for approval'],
            estimatedTime: program.timeframe || '30-45 days',
            applicationUrl: program.applyUrl || `https://medicaid.${state.toLowerCase()}.gov/apply`
          },
          eligibilityTags: ['low_income', 'healthcare', 'state_resident'],
          audienceTier: 'safety_net',
          source: `${state} Department of Health`
        });
      }
    });
  }
  
  return programs;
}

function normalizeStateWorkforceData(data: any, state: string, category?: string): BenefitProgram[] {
  const programs: BenefitProgram[] = [];
  
  if (data.programs || data.services) {
    const items = data.programs || data.services;
    items.forEach((program: any) => {
      if (!category || program.category?.toLowerCase().includes(category.toLowerCase())) {
        programs.push({
          id: `${state}-workforce-${program.id || Math.random()}`,
          title: program.name || program.title || 'Workforce Development Program',
          category: 'Employment',
          description: program.description || 'Job training and employment assistance',
          benefits: program.benefits || ['Job training', 'Career counseling', 'Job placement'],
          eligibility: program.eligibility || ['State resident', 'Unemployed or underemployed'],
          requirements: program.requirements || ['Registration', 'Attendance'],
          contact: {
            phone: program.phone || '1-800-JOBS',
            website: program.website || `https://jobs.${state.toLowerCase()}.gov`,
            email: program.email,
            address: program.address,
            hours: program.hours || 'Mon-Fri 8AM-5PM'
          },
          applicationProcess: {
            steps: program.steps || ['Register online', 'Assessment', 'Program enrollment'],
            estimatedTime: program.duration || '2-12 weeks',
            applicationUrl: program.applyUrl || `https://jobs.${state.toLowerCase()}.gov/register`
          },
          eligibilityTags: ['unemployed', 'job_training', 'career_development'],
          audienceTier: 'worker',
          source: `${state} Department of Labor`
        });
      }
    });
  }
  
  return programs;
}

function normalizeStateHousingData(data: any, state: string, category?: string): BenefitProgram[] {
  const programs: BenefitProgram[] = [];
  
  if (data.programs) {
    data.programs.forEach((program: any) => {
      if (!category || program.category?.toLowerCase().includes(category.toLowerCase())) {
        programs.push({
          id: `${state}-housing-${program.id || Math.random()}`,
          title: program.name || program.title || 'State Housing Assistance',
          category: 'Housing',
          description: program.description || 'Housing assistance and support services',
          benefits: program.benefits || ['Rental assistance', 'Down payment help', 'Housing counseling'],
          eligibility: program.eligibility || ['State resident', 'Income limits apply'],
          requirements: program.requirements || ['Application', 'Income verification'],
          contact: {
            phone: program.phone || '1-800-HOUSING',
            website: program.website || `https://housing.${state.toLowerCase()}.gov`,
            email: program.email,
            address: program.address,
            hours: program.hours || 'Mon-Fri 8AM-5PM'
          },
          applicationProcess: {
            steps: program.steps || ['Apply online', 'Documentation review', 'Approval process'],
            estimatedTime: program.timeframe || '60-90 days',
            applicationUrl: program.applyUrl || `https://housing.${state.toLowerCase()}.gov/apply`
          },
          eligibilityTags: ['low_income', 'housing_assistance', 'rental_help'],
          audienceTier: 'safety_net',
          source: `${state} Housing Authority`
        });
      }
    });
  }
  
  return programs;
}

// Fallback data for when APIs are unavailable
function getStateHealthFallback(state: string, category?: string): BenefitProgram[] {
  if (category && category !== 'Healthcare') return [];
  
  return [{
    id: `${state}-medicaid-fallback`,
    title: `${state} Medicaid Program`,
    category: 'Healthcare',
    description: 'State Medicaid program providing health insurance for eligible residents',
    benefits: ['Medical care coverage', 'Prescription drugs', 'Hospital services'],
    eligibility: ['Low income families', 'Pregnant women', 'Children', 'Elderly', 'Disabled'],
    requirements: ['State residency', 'Income verification', 'Application'],
    contact: {
      phone: '1-800-MEDICAID',
      website: `https://medicaid.${state.toLowerCase()}.gov`,
      hours: 'Mon-Fri 8AM-5PM'
    },
    applicationProcess: {
      steps: ['Complete application', 'Submit documents', 'Interview (if required)', 'Receive decision'],
      estimatedTime: '30-45 days',
      applicationUrl: `https://medicaid.${state.toLowerCase()}.gov/apply`
    },
    eligibilityTags: ['low_income', 'healthcare', 'families', 'children'],
    audienceTier: 'safety_net',
    source: `${state} Department of Health Services`
  }];
}

function getStateWorkforceFallback(state: string, category?: string): BenefitProgram[] {
  if (category && category !== 'Employment') return [];
  
  return [{
    id: `${state}-workforce-fallback`,
    title: `${state} Workforce Development`,
    category: 'Employment',
    description: 'Job training and employment services for state residents',
    benefits: ['Career counseling', 'Job search assistance', 'Skills training', 'Resume help'],
    eligibility: ['State residents', 'Job seekers', 'Career changers'],
    requirements: ['Registration', 'Assessment participation'],
    contact: {
      phone: '1-800-JOBS',
      website: `https://jobs.${state.toLowerCase()}.gov`,
      hours: 'Mon-Fri 8AM-5PM'
    },
    applicationProcess: {
      steps: ['Register for services', 'Complete assessment', 'Develop employment plan', 'Participate in services'],
      estimatedTime: '1-4 weeks to start',
      applicationUrl: `https://jobs.${state.toLowerCase()}.gov/register`
    },
    eligibilityTags: ['unemployed', 'job_training', 'career_services'],
    audienceTier: 'worker',
    source: `${state} Department of Labor`
  }];
}

function getStateHousingFallback(state: string, category?: string): BenefitProgram[] {
  if (category && category !== 'Housing') return [];
  
  return [{
    id: `${state}-housing-fallback`,
    title: `${state} Housing Choice Voucher Program`,
    category: 'Housing',
    description: 'Housing assistance for low-income families and individuals',
    benefits: ['Rental assistance', 'Housing choice', 'Affordable housing options'],
    eligibility: ['Low income families', 'Elderly persons', 'Disabled persons'],
    requirements: ['Income limits', 'Background check', 'State residency'],
    contact: {
      phone: '1-800-HOUSING',
      website: `https://housing.${state.toLowerCase()}.gov`,
      hours: 'Mon-Fri 8AM-5PM'
    },
    applicationProcess: {
      steps: ['Submit application', 'Wait for opening', 'Complete screening', 'Receive voucher'],
      estimatedTime: 'Varies by waiting list',
      applicationUrl: `https://housing.${state.toLowerCase()}.gov/apply`
    },
    eligibilityTags: ['low_income', 'housing_voucher', 'rental_assistance'],
    audienceTier: 'safety_net',
    source: `${state} Housing Authority`
  }];
}