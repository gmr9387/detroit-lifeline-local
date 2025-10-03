import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'nd-medicaid',
    title: 'North Dakota Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible North Dakotans',
    benefits: ['Medical services', 'Hospital care', 'Prescriptions'],
    eligibility: ['North Dakota residents', 'Income requirements'],
    contact: {
      phone: '1-844-854-4825',
      website: 'https://www.hhs.nd.gov'
    }
  },
  {
    id: 'nd-snap',
    title: 'North Dakota SNAP',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'North Dakota residents'],
    contact: {
      phone: '1-800-755-2604',
      website: 'https://www.hhs.nd.gov'
    }
  },
  {
    id: 'nd-tanf',
    title: 'North Dakota TANF',
    category: 'Family Support',
    description: 'Temporary cash assistance',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-800-755-2604',
      website: 'https://www.hhs.nd.gov'
    }
  }
];

export default programs;
