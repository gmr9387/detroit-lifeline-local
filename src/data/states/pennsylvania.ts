import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'pa-medicaid',
    title: 'Pennsylvania Medical Assistance',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Pennsylvanians',
    benefits: ['Medical services', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['Pennsylvania residents', 'Income requirements'],
    contact: {
      phone: '1-866-550-4355',
      website: 'https://www.dhs.pa.gov'
    }
  },
  {
    id: 'pa-snap',
    title: 'Pennsylvania SNAP',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Pennsylvania residents'],
    contact: {
      phone: '1-800-692-7462',
      website: 'https://www.dhs.pa.gov'
    }
  },
  {
    id: 'pa-tanf',
    title: 'Pennsylvania TANF',
    category: 'Family Support',
    description: 'Temporary cash assistance',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-800-692-7462',
      website: 'https://www.dhs.pa.gov'
    }
  }
];

export default programs;
