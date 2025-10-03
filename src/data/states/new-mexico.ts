import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'nm-medicaid',
    title: 'New Mexico Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible New Mexicans',
    benefits: ['Medical services', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['New Mexico residents', 'Income requirements'],
    contact: {
      phone: '1-888-997-2583',
      website: 'https://www.hsd.state.nm.us'
    }
  },
  {
    id: 'nm-snap',
    title: 'New Mexico SNAP',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'New Mexico residents'],
    contact: {
      phone: '1-800-283-4465',
      website: 'https://www.hsd.state.nm.us'
    }
  },
  {
    id: 'nm-tanf',
    title: 'New Mexico NMW',
    category: 'Family Support',
    description: 'New Mexico Works cash assistance',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-800-283-4465',
      website: 'https://www.hsd.state.nm.us'
    }
  }
];

export default programs;
