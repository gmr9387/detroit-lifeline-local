import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'mt-medicaid',
    title: 'Montana Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage including Healthy Montana',
    benefits: ['Medical services', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['Montana residents', 'Income requirements'],
    contact: {
      phone: '1-800-362-8312',
      website: 'https://dphhs.mt.gov'
    }
  },
  {
    id: 'mt-snap',
    title: 'Montana SNAP',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Montana residents'],
    contact: {
      phone: '1-888-706-1535',
      website: 'https://dphhs.mt.gov'
    }
  },
  {
    id: 'mt-tanf',
    title: 'Montana TANF',
    category: 'Family Support',
    description: 'Temporary cash assistance',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-888-706-1535',
      website: 'https://dphhs.mt.gov'
    }
  }
];

export default programs;
