import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'ms-medicaid',
    title: 'Mississippi Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Mississippi residents',
    benefits: ['Medical services', 'Hospital care', 'Prescriptions'],
    eligibility: ['Mississippi residents', 'Low income', 'Eligible categories'],
    contact: {
      phone: '1-800-421-2408',
      website: 'https://medicaid.ms.gov'
    }
  },
  {
    id: 'ms-snap',
    title: 'Mississippi SNAP',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Mississippi residents'],
    contact: {
      phone: '1-800-948-3050',
      website: 'https://www.mdhs.ms.gov'
    }
  },
  {
    id: 'ms-tanf',
    title: 'Mississippi TANF',
    category: 'Family Support',
    description: 'Temporary cash assistance',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-800-948-3050',
      website: 'https://www.mdhs.ms.gov'
    }
  }
];

export default programs;
