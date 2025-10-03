import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'ok-medicaid',
    title: 'Oklahoma SoonerCare',
    category: 'Healthcare',
    description: 'Oklahoma\'s Medicaid program',
    benefits: ['Medical services', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['Oklahoma residents', 'Income requirements'],
    contact: {
      phone: '1-800-987-7767',
      website: 'https://oklahoma.gov/ohca'
    }
  },
  {
    id: 'ok-snap',
    title: 'Oklahoma SNAP',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Oklahoma residents'],
    contact: {
      phone: '1-877-268-3725',
      website: 'https://oklahoma.gov/okdhs'
    }
  },
  {
    id: 'ok-tanf',
    title: 'Oklahoma TANF',
    category: 'Family Support',
    description: 'Temporary cash assistance',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-877-268-3725',
      website: 'https://oklahoma.gov/okdhs'
    }
  }
];

export default programs;
