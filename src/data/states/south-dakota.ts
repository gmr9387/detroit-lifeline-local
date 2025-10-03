import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'sd-medicaid',
    title: 'South Dakota Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible South Dakotans',
    benefits: ['Medical services', 'Hospital care', 'Prescriptions'],
    eligibility: ['South Dakota residents', 'Income requirements'],
    contact: {
      phone: '1-866-854-5465',
      website: 'https://dss.sd.gov'
    }
  },
  {
    id: 'sd-snap',
    title: 'South Dakota SNAP',
    category: 'Food',
    description: 'Food assistance benefits',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'South Dakota residents'],
    contact: {
      phone: '1-877-999-5612',
      website: 'https://dss.sd.gov'
    }
  },
  {
    id: 'sd-tanf',
    title: 'South Dakota TANF',
    category: 'Family Support',
    description: 'Temporary cash assistance',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-877-999-5612',
      website: 'https://dss.sd.gov'
    }
  }
];

export default programs;
