import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'wy-medicaid',
    title: 'Wyoming Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Wyoming residents',
    benefits: ['Medical services', 'Hospital care', 'Prescriptions'],
    eligibility: ['Wyoming residents', 'Income requirements'],
    contact: {
      phone: '1-855-294-2127',
      website: 'https://health.wyo.gov'
    }
  },
  {
    id: 'wy-snap',
    title: 'Wyoming SNAP',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Wyoming residents'],
    contact: {
      phone: '1-307-777-7561',
      website: 'https://health.wyo.gov'
    }
  },
  {
    id: 'wy-power',
    title: 'Wyoming POWER',
    category: 'Family Support',
    description: 'Personal Opportunities with Employment Responsibilities',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-307-777-7561',
      website: 'https://health.wyo.gov'
    }
  }
];

export default programs;
