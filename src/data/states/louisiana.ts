import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'la-medicaid',
    title: 'Louisiana Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage including Healthy Louisiana',
    benefits: ['Medical care', 'Dental care', 'Vision care', 'Prescriptions'],
    eligibility: ['Louisiana residents', 'Income requirements'],
    contact: {
      phone: '1-888-342-6207',
      website: 'https://ldh.la.gov'
    }
  },
  {
    id: 'la-snap',
    title: 'Louisiana SNAP',
    category: 'Food',
    description: 'Food assistance benefits',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Louisiana residents'],
    contact: {
      phone: '1-888-524-3578',
      website: 'https://www.dcfs.louisiana.gov'
    }
  },
  {
    id: 'la-fitap',
    title: 'Louisiana FITAP',
    category: 'Family Support',
    description: 'Family Independence Temporary Assistance',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-888-524-3578',
      website: 'https://www.dcfs.louisiana.gov'
    }
  }
];

export default programs;
