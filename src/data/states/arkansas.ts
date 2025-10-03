import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'ar-medicaid',
    title: 'Arkansas Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Arkansas residents',
    benefits: ['Medical services', 'Prescription drugs', 'Hospital care'],
    eligibility: ['Arkansas residents', 'Low income', 'Eligible categories'],
    contact: {
      phone: '1-800-482-5431',
      website: 'https://humanservices.arkansas.gov'
    }
  },
  {
    id: 'ar-snap',
    title: 'Arkansas SNAP',
    category: 'Food',
    description: 'Food assistance benefits',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Arkansas residents'],
    contact: {
      phone: '1-800-482-8988',
      website: 'https://humanservices.arkansas.gov'
    }
  },
  {
    id: 'ar-tanf',
    title: 'Arkansas TEA',
    category: 'Family Support',
    description: 'Transitional Employment Assistance',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-800-482-8988',
      website: 'https://humanservices.arkansas.gov'
    }
  }
];

export default programs;
