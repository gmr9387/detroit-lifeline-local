/**
 * Browser-native API client for government benefit programs
 * Handles CORS-enabled endpoints and client-side data fetching
 */

import { 
  fetchFromStateHealth, 
  fetchFromStateWorkforce, 
  fetchFromStateHousing 
} from './stateApiHelpers';
import { 
  normalizeFederalAgencyData, 
  getFallbackFederalAgencyPrograms 
} from './federalAgencyHelpers';

export interface BenefitProgram {
  id: string;
  title: string;
  category: string;
  description: string;
  benefits: string[];
  eligibility: string[];
  requirements: string[];
  contact: {
    phone: string;
    website: string;
    email?: string;
    address?: string;
    hours?: string;
  };
  applicationProcess: {
    steps: string[];
    estimatedTime: string;
    applicationUrl: string;
  };
  eligibilityTags: string[];
  audienceTier: string;
  source: string;
}

class APIClient {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  // Comprehensive state-specific API endpoints
  private readonly STATE_APIS = {
    'AL': { health: 'https://medicaid.alabama.gov/api', workforce: 'https://labor.alabama.gov/api' },
    'AK': { health: 'https://dhss.alaska.gov/api', workforce: 'https://labor.alaska.gov/api' },
    'AZ': { health: 'https://des.az.gov/api', workforce: 'https://des.az.gov/api/workforce' },
    'AR': { health: 'https://medicaid.arkansas.gov/api', workforce: 'https://commerce.arkansas.gov/api' },
    'CA': { health: 'https://www.dhcs.ca.gov/api', workforce: 'https://edd.ca.gov/api', housing: 'https://hcd.ca.gov/api' },
    'CO': { health: 'https://hcpf.colorado.gov/api', workforce: 'https://cdle.colorado.gov/api' },
    'CT': { health: 'https://portal.ct.gov/dss/api', workforce: 'https://portal.ct.gov/dol/api' },
    'DE': { health: 'https://dhss.delaware.gov/api', workforce: 'https://dol.delaware.gov/api' },
    'FL': { health: 'https://ahca.myflorida.com/api', workforce: 'https://floridajobs.org/api' },
    'GA': { health: 'https://medicaid.georgia.gov/api', workforce: 'https://dol.georgia.gov/api' },
    'HI': { health: 'https://medquest.hawaii.gov/api', workforce: 'https://labor.hawaii.gov/api' },
    'ID': { health: 'https://healthandwelfare.idaho.gov/api', workforce: 'https://labor.idaho.gov/api' },
    'IL': { health: 'https://www2.illinois.gov/hfs/api', workforce: 'https://ides.illinois.gov/api' },
    'IN': { health: 'https://www.in.gov/fssa/api', workforce: 'https://www.in.gov/dwd/api' },
    'IA': { health: 'https://dhs.iowa.gov/api', workforce: 'https://www.iowaworkforcedevelopment.gov/api' },
    'KS': { health: 'https://www.kancare.ks.gov/api', workforce: 'https://www.dol.ks.gov/api' },
    'KY': { health: 'https://chfs.ky.gov/api', workforce: 'https://kcc.ky.gov/api' },
    'LA': { health: 'https://ldh.la.gov/api', workforce: 'https://www.laworks.net/api' },
    'ME': { health: 'https://www.maine.gov/dhhs/api', workforce: 'https://www.maine.gov/labor/api' },
    'MD': { health: 'https://health.maryland.gov/api', workforce: 'https://www.dllr.state.md.us/api' },
    'MA': { health: 'https://www.mass.gov/api/health', workforce: 'https://www.mass.gov/api/labor' },
    'MI': { health: 'https://www.michigan.gov/mdhhs/api', workforce: 'https://www.michigan.gov/leo/api' },
    'MN': { health: 'https://mn.gov/dhs/api', workforce: 'https://mn.gov/deed/api' },
    'MS': { health: 'https://medicaid.ms.gov/api', workforce: 'https://mdes.ms.gov/api' },
    'MO': { health: 'https://dss.mo.gov/api', workforce: 'https://jobs.mo.gov/api' },
    'MT': { health: 'https://dphhs.mt.gov/api', workforce: 'https://dli.mt.gov/api' },
    'NE': { health: 'https://dhhs.ne.gov/api', workforce: 'https://dol.nebraska.gov/api' },
    'NV': { health: 'https://dhhs.nv.gov/api', workforce: 'https://detr.nv.gov/api' },
    'NH': { health: 'https://www.dhhs.nh.gov/api', workforce: 'https://www.nhes.nh.gov/api' },
    'NJ': { health: 'https://www.nj.gov/humanservices/api', workforce: 'https://www.nj.gov/labor/api' },
    'NM': { health: 'https://www.hsd.state.nm.us/api', workforce: 'https://www.dws.state.nm.us/api' },
    'NY': { health: 'https://health.ny.gov/api', workforce: 'https://dol.ny.gov/api', housing: 'https://hcr.ny.gov/api' },
    'NC': { health: 'https://www.ncdhhs.gov/api', workforce: 'https://des.nc.gov/api' },
    'ND': { health: 'https://www.nd.gov/dhs/api', workforce: 'https://www.jobsnd.com/api' },
    'OH': { health: 'https://medicaid.ohio.gov/api', workforce: 'https://jfs.ohio.gov/api' },
    'OK': { health: 'https://okhca.org/api', workforce: 'https://www.ok.gov/oesc/api' },
    'OR': { health: 'https://www.oregon.gov/dhs/api', workforce: 'https://www.oregon.gov/employ/api' },
    'PA': { health: 'https://www.dhs.pa.gov/api', workforce: 'https://www.dli.pa.gov/api' },
    'RI': { health: 'https://www.eohhs.ri.gov/api', workforce: 'https://dlt.ri.gov/api' },
    'SC': { health: 'https://scdhhs.gov/api', workforce: 'https://dew.sc.gov/api' },
    'SD': { health: 'https://dss.sd.gov/api', workforce: 'https://dlr.sd.gov/api' },
    'TN': { health: 'https://www.tn.gov/tenncare/api', workforce: 'https://www.tn.gov/labor/api' },
    'TX': { health: 'https://hhs.texas.gov/api', workforce: 'https://www.twc.texas.gov/api', housing: 'https://www.tdhca.state.tx.us/api' },
    'UT': { health: 'https://medicaid.utah.gov/api', workforce: 'https://jobs.utah.gov/api' },
    'VT': { health: 'https://dvha.vermont.gov/api', workforce: 'https://labor.vermont.gov/api' },
    'VA': { health: 'https://www.dmas.virginia.gov/api', workforce: 'https://www.vec.virginia.gov/api' },
    'WA': { health: 'https://www.hca.wa.gov/api', workforce: 'https://esd.wa.gov/api', housing: 'https://www.commerce.wa.gov/api' },
    'WV': { health: 'https://dhhr.wv.gov/api', workforce: 'https://workforcewv.org/api' },
    'WI': { health: 'https://www.dhs.wisconsin.gov/api', workforce: 'https://dwd.wisconsin.gov/api' },
    'WY': { health: 'https://health.wyo.gov/api', workforce: 'https://wyomingworkforce.org/api' },
    'DC': { health: 'https://dhcf.dc.gov/api', workforce: 'https://does.dc.gov/api' }
  };

  // Federal agency APIs for comprehensive coverage
  private readonly FEDERAL_APIS = {
    veterans: 'https://api.va.gov/services',
    energy: 'https://api.energy.gov/v1',
    grants: 'https://api.grants.gov/v1',
    agriculture: 'https://api.usda.gov/nass',
    labor: 'https://api.bls.gov/publicAPI/v2',
    education: 'https://api.ed.gov/data',
    healthcare: 'https://api.cms.gov',
    disaster: 'https://api.fema.gov/open',
    tribal: 'https://api.bia.gov/tribal',
    disability: 'https://api.ssa.gov/disability'
  };

  private getCached<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  private setCache<T>(key: string, data: T, ttl = this.CACHE_TTL): void {
    this.cache.set(key, { data, timestamp: Date.now(), ttl });
  }

  // Benefits.gov API (CORS-enabled endpoints)
  async fetchFederalBenefits(category?: string): Promise<BenefitProgram[]> {
    const cacheKey = `federal-benefits-${category || 'all'}`;
    const cached = this.getCached<BenefitProgram[]>(cacheKey);
    if (cached) return cached;

    try {
      // Using Benefits.gov public endpoints that support CORS
      const response = await fetch(`https://www.benefits.gov/api/categories`, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch federal benefits');
      }

      const data = await response.json();
      const programs = this.normalizeBenefitsGovData(data, category);
      this.setCache(cacheKey, programs);
      return programs;
    } catch (error) {
      console.warn('Benefits.gov API unavailable, using fallback data');
      return this.getFallbackFederalPrograms(category);
    }
  }

  // 211.org API for local resources
  async fetch211Resources(state: string, category?: string): Promise<BenefitProgram[]> {
    const cacheKey = `211-resources-${state}-${category || 'all'}`;
    const cached = this.getCached<BenefitProgram[]>(cacheKey);
    if (cached) return cached;

    try {
      // Using 211.org open data endpoints
      const response = await fetch(`https://api.211.org/v1/resources`, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'LifelineNavigator/1.0',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch 211 resources');
      }

      const data = await response.json();
      const programs = this.normalize211Data(data, state, category);
      this.setCache(cacheKey, programs);
      return programs;
    } catch (error) {
      console.warn('211.org API unavailable, using fallback data');
      return this.getFallbackStatePrograms(state, category);
    }
  }

  // SBA.gov API for business programs
  async fetchSBAPrograms(): Promise<BenefitProgram[]> {
    const cacheKey = 'sba-programs';
    const cached = this.getCached<BenefitProgram[]>(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch('https://api.sba.gov/v1/loans/programs', {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch SBA programs');
      }

      const data = await response.json();
      const programs = this.normalizeSBAData(data);
      this.setCache(cacheKey, programs);
      return programs;
    } catch (error) {
      console.warn('SBA API unavailable, using fallback data');
      return this.getFallbackSBAPrograms();
    }
  }

  // HUD API for housing programs
  async fetchHousingPrograms(state: string): Promise<BenefitProgram[]> {
    const cacheKey = `housing-programs-${state}`;
    const cached = this.getCached<BenefitProgram[]>(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`https://www.hud.gov/api/public_housing_authorities`, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch housing programs');
      }

      const data = await response.json();
      const programs = this.normalizeHUDData(data, state);
      this.setCache(cacheKey, programs);
      return programs;
    } catch (error) {
      console.warn('HUD API unavailable, using fallback data');
      return this.getFallbackHousingPrograms(state);
    }
  }

  // Aggregate search across all sources
  // Enhanced state-specific program fetcher
  async fetchStatePrograms(state: string, category?: string): Promise<BenefitProgram[]> {
    const cacheKey = `state-programs-${state}-${category || 'all'}`;
    const cached = this.getCached<BenefitProgram[]>(cacheKey);
    if (cached) return cached;

    const stateApis = this.STATE_APIS[state as keyof typeof this.STATE_APIS];
    if (!stateApis) {
      return this.getFallbackStatePrograms(state, category);
    }

    const programs: BenefitProgram[] = [];

    try {
      // Fetch from multiple state endpoints
      await Promise.allSettled([
        fetchFromStateHealth(stateApis.health, state, category),
        fetchFromStateWorkforce(stateApis.workforce, state, category),
        (stateApis as any).housing && fetchFromStateHousing((stateApis as any).housing, state, category)
      ]).then(results => {
        results.forEach(result => {
          if (result.status === 'fulfilled' && result.value) {
            programs.push(...result.value);
          }
        });
      });

      this.setCache(cacheKey, programs);
      return programs;
    } catch (error) {
      console.warn(`State API unavailable for ${state}, using fallback data`);
      return this.getFallbackStatePrograms(state, category);
    }
  }

  // Federal agencies comprehensive search
  async fetchFederalAgencyPrograms(agency: string, category?: string): Promise<BenefitProgram[]> {
    const cacheKey = `federal-${agency}-${category || 'all'}`;
    const cached = this.getCached<BenefitProgram[]>(cacheKey);
    if (cached) return cached;

    const apiUrl = this.FEDERAL_APIS[agency as keyof typeof this.FEDERAL_APIS];
    if (!apiUrl) {
      return [];
    }

    try {
      const response = await fetch(`${apiUrl}/programs`, {
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${agency} programs`);
      }

      const data = await response.json();
      const programs = normalizeFederalAgencyData(data, agency, category);
      this.setCache(cacheKey, programs);
      return programs;
    } catch (error) {
      console.warn(`${agency} API unavailable, using fallback data`);
      return getFallbackFederalAgencyPrograms(agency, category);
    }
  }

  async searchPrograms(query: string, filters: {
    state?: string;
    category?: string;
    audienceTier?: string;
    eligibilityTags?: string[];
  }): Promise<BenefitProgram[]> {
    const promises = [
      this.fetchFederalBenefits(filters.category),
      filters.state ? this.fetch211Resources(filters.state, filters.category) : Promise.resolve([]),
      filters.audienceTier === 'small_business' ? this.fetchSBAPrograms() : Promise.resolve([]),
      filters.category === 'Housing' && filters.state ? this.fetchHousingPrograms(filters.state) : Promise.resolve([]),
    ];

    try {
      const results = await Promise.allSettled(promises);
      const allPrograms = results
        .filter((result): result is PromiseFulfilledResult<BenefitProgram[]> => result.status === 'fulfilled')
        .flatMap(result => result.value);

      return this.filterAndRankPrograms(allPrograms, query, filters);
    } catch (error) {
      console.error('Error searching programs:', error);
      return [];
    }
  }

  // Data normalization methods
  private normalizeBenefitsGovData(data: any, category?: string): BenefitProgram[] {
    // Transform Benefits.gov API response to our schema
    if (!data?.categories) return [];
    
    return data.categories.map((item: any) => ({
      id: `benefits-gov-${item.id}`,
      title: item.title || 'Federal Benefit Program',
      category: category || this.categorizeProgram(item.title),
      description: item.description || 'Federal assistance program',
      benefits: item.benefits || ['Financial assistance'],
      eligibility: item.eligibility || ['Income-based eligibility'],
      requirements: item.requirements || ['Application required'],
      contact: {
        phone: '1-800-333-4636',
        website: item.url || 'https://www.benefits.gov',
        hours: 'Monday-Friday 8AM-8PM ET',
      },
      applicationProcess: {
        steps: ['Visit Benefits.gov', 'Complete screening', 'Apply directly'],
        estimatedTime: '30-60 minutes',
        applicationUrl: item.applicationUrl || 'https://www.benefits.gov',
      },
      eligibilityTags: this.extractEligibilityTags(item),
      audienceTier: this.determineAudienceTier(item),
      source: 'Benefits.gov',
    }));
  }

  private normalize211Data(data: any, state: string, category?: string): BenefitProgram[] {
    // Transform 211.org API response to our schema
    if (!data?.resources) return [];
    
    return data.resources.map((item: any) => ({
      id: `211-${item.id}`,
      title: item.name || 'Local Resource',
      category: category || this.categorizeProgram(item.name),
      description: item.description || 'Local assistance program',
      benefits: item.services || ['Community support'],
      eligibility: item.eligibility || ['Local residents'],
      requirements: item.requirements || ['Contact for details'],
      contact: {
        phone: item.phone || '2-1-1',
        website: item.website || 'https://www.211.org',
        email: item.email,
        address: item.address,
        hours: item.hours || 'Call 2-1-1 for hours',
      },
      applicationProcess: {
        steps: ['Call 2-1-1', 'Speak with specialist', 'Get referral'],
        estimatedTime: '15-30 minutes',
        applicationUrl: item.website || 'https://www.211.org',
      },
      eligibilityTags: this.extractEligibilityTags(item),
      audienceTier: 'safety_net',
      source: '211.org',
    }));
  }

  private normalizeSBAData(data: any): BenefitProgram[] {
    // Transform SBA API response to our schema
    if (!data?.programs) return [];
    
    return data.programs.map((item: any) => ({
      id: `sba-${item.id}`,
      title: item.name || 'SBA Business Program',
      category: 'Small Business',
      description: item.description || 'Small business assistance program',
      benefits: item.benefits || ['Business loans', 'Technical assistance'],
      eligibility: item.eligibility || ['Small business owners'],
      requirements: item.requirements || ['Business plan required'],
      contact: {
        phone: '1-800-827-5722',
        website: item.url || 'https://www.sba.gov',
        hours: 'Monday-Friday 9AM-5PM ET',
      },
      applicationProcess: {
        steps: ['Visit SBA.gov', 'Complete application', 'Submit documentation'],
        estimatedTime: '2-4 weeks',
        applicationUrl: item.applicationUrl || 'https://www.sba.gov',
      },
      eligibilityTags: ['business_owner', 'entrepreneur'],
      audienceTier: 'small_business',
      source: 'SBA.gov',
    }));
  }

  private normalizeHUDData(data: any, state: string): BenefitProgram[] {
    // Transform HUD API response to our schema
    if (!data?.housing_authorities) return [];
    
    return data.housing_authorities
      .filter((item: any) => item.state === state)
      .map((item: any) => ({
        id: `hud-${item.id}`,
        title: `${item.name} Housing Authority`,
        category: 'Housing',
        description: 'Public housing assistance and Section 8 vouchers',
        benefits: ['Affordable housing', 'Rental assistance', 'Housing vouchers'],
        eligibility: ['Low-income families', 'Elderly', 'Disabled persons'],
        requirements: ['Income verification', 'Background check', 'Application'],
        contact: {
          phone: item.phone || 'Contact local office',
          website: item.website || 'https://www.hud.gov',
          address: item.address,
          hours: 'Contact for office hours',
        },
        applicationProcess: {
          steps: ['Contact housing authority', 'Submit application', 'Join waiting list'],
          estimatedTime: 'Varies by location',
          applicationUrl: item.website || 'https://www.hud.gov',
        },
        eligibilityTags: ['low_income', 'family', 'elderly', 'disabled'],
        audienceTier: 'safety_net',
        source: 'HUD.gov',
      }));
  }

  // Utility methods
  private categorizeProgram(title: string): string {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('food') || titleLower.includes('snap') || titleLower.includes('wic')) return 'Food & Nutrition';
    if (titleLower.includes('health') || titleLower.includes('medical')) return 'Healthcare';
    if (titleLower.includes('housing') || titleLower.includes('rent')) return 'Housing';
    if (titleLower.includes('child') || titleLower.includes('family')) return 'Family Support';
    if (titleLower.includes('job') || titleLower.includes('work')) return 'Employment';
    if (titleLower.includes('business') || titleLower.includes('loan')) return 'Small Business';
    if (titleLower.includes('tax') || titleLower.includes('credit')) return 'Tax Benefits';
    if (titleLower.includes('education') || titleLower.includes('student')) return 'Education';
    return 'Other';
  }

  private extractEligibilityTags(item: any): string[] {
    const tags: string[] = [];
    const text = (item.description + ' ' + (item.eligibility || '')).toLowerCase();
    
    if (text.includes('low income') || text.includes('poverty')) tags.push('low_income');
    if (text.includes('veteran')) tags.push('veteran');
    if (text.includes('senior') || text.includes('elderly')) tags.push('elderly');
    if (text.includes('disabled') || text.includes('disability')) tags.push('disabled');
    if (text.includes('family') || text.includes('child')) tags.push('family');
    if (text.includes('student')) tags.push('student');
    if (text.includes('business')) tags.push('business_owner');
    if (text.includes('unemployed')) tags.push('unemployed');
    
    return tags;
  }

  private determineAudienceTier(item: any): string {
    const text = (item.description + ' ' + (item.title || '')).toLowerCase();
    
    if (text.includes('business') || text.includes('entrepreneur')) return 'small_business';
    if (text.includes('worker') || text.includes('employed')) return 'worker';
    if (text.includes('high income') || text.includes('investment')) return 'high_income';
    return 'safety_net';
  }

  private filterAndRankPrograms(programs: BenefitProgram[], query: string, filters: any): BenefitProgram[] {
    let filtered = programs;

    // Apply filters
    if (filters.audienceTier) {
      filtered = filtered.filter(p => p.audienceTier === filters.audienceTier);
    }

    if (filters.eligibilityTags?.length) {
      filtered = filtered.filter(p => 
        filters.eligibilityTags.some((tag: string) => p.eligibilityTags.includes(tag))
      );
    }

    // Apply text search
    if (query) {
      const queryLower = query.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(queryLower) ||
        p.description.toLowerCase().includes(queryLower) ||
        p.category.toLowerCase().includes(queryLower)
      );
    }

    // Rank by relevance (prioritize federal programs, then by match quality)
    return filtered.sort((a, b) => {
      if (a.source === 'Benefits.gov' && b.source !== 'Benefits.gov') return -1;
      if (b.source === 'Benefits.gov' && a.source !== 'Benefits.gov') return 1;
      return 0;
    });
  }

  // Fallback data methods (when APIs are unavailable)
  private getFallbackFederalPrograms(category?: string): BenefitProgram[] {
    const fallbackPrograms = [
      {
        id: 'snap-fallback',
        title: 'SNAP (Food Stamps)',
        category: 'Food & Nutrition',
        description: 'Monthly benefits to help buy food for good health',
        benefits: ['Monthly food assistance', 'EBT card for grocery purchases'],
        eligibility: ['Income below 130% federal poverty level', 'U.S. citizen or legal resident'],
        requirements: ['Application', 'Income verification', 'Identity verification'],
        contact: {
          phone: '1-800-221-5689',
          website: 'https://www.fns.usda.gov/snap',
          hours: 'Monday-Friday 8AM-5PM ET',
        },
        applicationProcess: {
          steps: ['Apply online or in person', 'Interview with caseworker', 'Receive benefits'],
          estimatedTime: '30 days',
          applicationUrl: 'https://www.fns.usda.gov/snap/apply',
        },
        eligibilityTags: ['low_income', 'family'],
        audienceTier: 'safety_net',
        source: 'USDA/FNS',
      },
      // Add more fallback programs as needed
    ];

    return category ? 
      fallbackPrograms.filter(p => p.category === category) : 
      fallbackPrograms;
  }

  private getFallbackStatePrograms(state: string, category?: string): BenefitProgram[] {
    return []; // Implement state-specific fallback programs
  }

  private getFallbackSBAPrograms(): BenefitProgram[] {
    return []; // Implement SBA fallback programs
  }

  private getFallbackHousingPrograms(state: string): BenefitProgram[] {
    return []; // Implement housing fallback programs
  }
}

export const apiClient = new APIClient();