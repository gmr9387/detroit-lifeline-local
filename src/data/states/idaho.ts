import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'id-medicaid',
    title: 'Idaho Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Idaho residents',
    benefits: ['Medical services', 'Hospital care', 'Prescriptions'],
    eligibility: ['Idaho residents', 'Low income'],
    contact: {
      phone: '1-877-456-1233',
      website: 'https://healthandwelfare.idaho.gov'
    }
  },
  {
    id: 'id-snap',
    title: 'Idaho Food Stamps',
    category: 'Food',
    description: 'Food assistance benefits',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Idaho residents'],
    contact: {
      phone: '1-877-456-1233',
      website: 'https://healthandwelfare.idaho.gov'
    }
  },
  {
    id: 'id-tanf',
    title: 'Idaho TAFI',
    category: 'Family Support',
    description: 'Temporary Assistance for Families in Idaho',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-877-456-1233',
      website: 'https://healthandwelfare.idaho.gov'
    }
  }
];

export default programs;
