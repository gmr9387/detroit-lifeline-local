import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'sc-medicaid',
    title: 'South Carolina Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible South Carolinians',
    benefits: ['Medical services', 'Hospital care', 'Prescriptions'],
    eligibility: ['South Carolina residents', 'Income requirements'],
    contact: {
      phone: '1-888-549-0820',
      website: 'https://scdhhs.gov'
    }
  },
  {
    id: 'sc-snap',
    title: 'South Carolina SNAP',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'South Carolina residents'],
    contact: {
      phone: '1-800-616-1309',
      website: 'https://dss.sc.gov'
    }
  },
  {
    id: 'sc-tanf',
    title: 'South Carolina Family Independence',
    category: 'Family Support',
    description: 'Cash assistance for families',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-800-616-1309',
      website: 'https://dss.sc.gov'
    }
  }
];

export default programs;
