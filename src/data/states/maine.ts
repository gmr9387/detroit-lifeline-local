import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'me-mainecare',
    title: 'MaineCare',
    category: 'Healthcare',
    description: 'Maine\'s Medicaid program',
    benefits: ['Medical services', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['Maine residents', 'Income requirements'],
    contact: {
      phone: '1-866-796-2463',
      website: 'https://www.maine.gov/dhhs'
    }
  },
  {
    id: 'me-snap',
    title: 'Maine SNAP',
    category: 'Food',
    description: 'Food supplement benefits',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Maine residents'],
    contact: {
      phone: '1-855-797-4357',
      website: 'https://www.maine.gov/dhhs'
    }
  },
  {
    id: 'me-tanf',
    title: 'Maine TANF',
    category: 'Family Support',
    description: 'Temporary assistance for families',
    benefits: ['Cash assistance', 'Job training'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-855-797-4357',
      website: 'https://www.maine.gov/dhhs'
    }
  }
];

export default programs;
