import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'de-medicaid',
    title: 'Delaware Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Delaware residents',
    benefits: ['Medical services', 'Hospital care', 'Prescriptions'],
    eligibility: ['Delaware residents', 'Income requirements'],
    contact: {
      phone: '1-800-372-2022',
      website: 'https://dhss.delaware.gov'
    }
  },
  {
    id: 'de-snap',
    title: 'Delaware Food Supplement',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Delaware residents'],
    contact: {
      phone: '1-866-843-7212',
      website: 'https://dhss.delaware.gov'
    }
  },
  {
    id: 'de-tanf',
    title: 'Delaware TANF',
    category: 'Family Support',
    description: 'Temporary Assistance for Needy Families',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-866-843-7212',
      website: 'https://dhss.delaware.gov'
    }
  }
];

export default programs;
