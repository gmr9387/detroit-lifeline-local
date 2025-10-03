import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'ct-medicaid',
    title: 'HUSKY Health',
    category: 'Healthcare',
    description: 'Connecticut\'s health coverage programs',
    benefits: ['Medical care', 'Dental care', 'Vision care', 'Prescriptions'],
    eligibility: ['Connecticut residents', 'Income requirements'],
    contact: {
      phone: '1-877-284-8759',
      website: 'https://www.ctdssmap.com'
    }
  },
  {
    id: 'ct-snap',
    title: 'Connecticut SNAP',
    category: 'Food',
    description: 'Food assistance benefits',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Connecticut residents'],
    contact: {
      phone: '1-855-626-6632',
      website: 'https://portal.ct.gov'
    }
  },
  {
    id: 'ct-tanf',
    title: 'Connecticut TFA',
    category: 'Family Support',
    description: 'Temporary Family Assistance',
    benefits: ['Cash assistance', 'Employment services'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-855-626-6632',
      website: 'https://portal.ct.gov'
    }
  }
];

export default programs;
