import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'hi-medicaid',
    title: 'Hawaii Med-QUEST',
    category: 'Healthcare',
    description: 'Hawaii\'s Medicaid program',
    benefits: ['Medical care', 'Dental care', 'Vision care', 'Prescriptions'],
    eligibility: ['Hawaii residents', 'Income requirements'],
    contact: {
      phone: '1-800-316-8005',
      website: 'https://medquest.hawaii.gov'
    }
  },
  {
    id: 'hi-snap',
    title: 'Hawaii SNAP',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Hawaii residents'],
    contact: {
      phone: '1-808-643-1643',
      website: 'https://humanservices.hawaii.gov'
    }
  },
  {
    id: 'hi-tanf',
    title: 'Hawaii First-To-Work',
    category: 'Family Support',
    description: 'Cash assistance and employment services',
    benefits: ['Cash assistance', 'Job training'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-808-643-1643',
      website: 'https://humanservices.hawaii.gov'
    }
  }
];

export default programs;
