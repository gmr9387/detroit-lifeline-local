import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'or-medicaid',
    title: 'Oregon Health Plan',
    category: 'Healthcare',
    description: 'Oregon\'s Medicaid program',
    benefits: ['Medical care', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['Oregon residents', 'Income requirements'],
    contact: {
      phone: '1-800-699-9075',
      website: 'https://www.oregon.gov/oha'
    }
  },
  {
    id: 'or-snap',
    title: 'Oregon SNAP',
    category: 'Food',
    description: 'Food assistance benefits',
    benefits: ['Monthly food benefits', 'Oregon Trail card'],
    eligibility: ['Low income', 'Oregon residents'],
    contact: {
      phone: '1-800-699-9075',
      website: 'https://www.oregon.gov/dhs'
    }
  },
  {
    id: 'or-tanf',
    title: 'Oregon TANF',
    category: 'Family Support',
    description: 'Temporary cash assistance',
    benefits: ['Cash assistance', 'Job training'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-800-699-9075',
      website: 'https://www.oregon.gov/dhs'
    }
  }
];

export default programs;
