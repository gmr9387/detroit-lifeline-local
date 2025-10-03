import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'tn-medicaid',
    title: 'Tennessee TennCare',
    category: 'Healthcare',
    description: 'Tennessee\'s Medicaid program',
    benefits: ['Medical care', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['Tennessee residents', 'Income requirements'],
    contact: {
      phone: '1-855-259-0701',
      website: 'https://www.tn.gov/tenncare'
    }
  },
  {
    id: 'tn-snap',
    title: 'Tennessee SNAP',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Tennessee residents'],
    contact: {
      phone: '1-866-311-4287',
      website: 'https://www.tn.gov/humanservices'
    }
  },
  {
    id: 'tn-families-first',
    title: 'Tennessee Families First',
    category: 'Family Support',
    description: 'Cash assistance and employment services',
    benefits: ['Cash assistance', 'Job training'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-866-311-4287',
      website: 'https://www.tn.gov/humanservices'
    }
  }
];

export default programs;
