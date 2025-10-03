import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'ne-medicaid',
    title: 'Nebraska Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Nebraska residents',
    benefits: ['Medical services', 'Hospital care', 'Prescriptions'],
    eligibility: ['Nebraska residents', 'Income requirements'],
    contact: {
      phone: '1-855-632-7633',
      website: 'https://dhhs.ne.gov'
    }
  },
  {
    id: 'ne-snap',
    title: 'Nebraska SNAP',
    category: 'Food',
    description: 'Food assistance benefits',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Nebraska residents'],
    contact: {
      phone: '1-855-632-7633',
      website: 'https://dhhs.ne.gov'
    }
  },
  {
    id: 'ne-tanf',
    title: 'Nebraska Aid to Dependent Children',
    category: 'Family Support',
    description: 'Cash assistance for families',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-855-632-7633',
      website: 'https://dhhs.ne.gov'
    }
  }
];

export default programs;
