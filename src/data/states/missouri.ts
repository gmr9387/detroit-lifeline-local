import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'mo-medicaid',
    title: 'Missouri MO HealthNet',
    category: 'Healthcare',
    description: 'Missouri\'s Medicaid program',
    benefits: ['Medical care', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['Missouri residents', 'Income requirements'],
    contact: {
      phone: '1-855-373-4636',
      website: 'https://dss.mo.gov/mhd'
    }
  },
  {
    id: 'mo-snap',
    title: 'Missouri Food Stamps',
    category: 'Food',
    description: 'Food assistance benefits',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Missouri residents'],
    contact: {
      phone: '1-855-373-4636',
      website: 'https://dss.mo.gov'
    }
  },
  {
    id: 'mo-tanf',
    title: 'Missouri Temporary Assistance',
    category: 'Family Support',
    description: 'Cash assistance for families',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-855-373-4636',
      website: 'https://dss.mo.gov'
    }
  }
];

export default programs;
