import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'mn-medicaid',
    title: 'Minnesota Medical Assistance',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Minnesotans',
    benefits: ['Medical services', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['Minnesota residents', 'Income requirements'],
    contact: {
      phone: '1-800-657-3739',
      website: 'https://mn.gov/dhs'
    }
  },
  {
    id: 'mn-snap',
    title: 'Minnesota SNAP',
    category: 'Food',
    description: 'Food assistance benefits',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Minnesota residents'],
    contact: {
      phone: '1-651-431-4670',
      website: 'https://mn.gov/dhs'
    }
  },
  {
    id: 'mn-mfip',
    title: 'Minnesota Family Investment',
    category: 'Family Support',
    description: 'Cash assistance and employment services',
    benefits: ['Cash assistance', 'Job training', 'Child care'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-651-431-4670',
      website: 'https://mn.gov/dhs'
    }
  }
];

export default programs;
