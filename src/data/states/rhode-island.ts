import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'ri-medicaid',
    title: 'Rhode Island Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Rhode Islanders',
    benefits: ['Medical care', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['Rhode Island residents', 'Income requirements'],
    contact: {
      phone: '1-855-840-4774',
      website: 'https://eohhs.ri.gov'
    }
  },
  {
    id: 'ri-snap',
    title: 'Rhode Island SNAP',
    category: 'Food',
    description: 'Food assistance benefits',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Rhode Island residents'],
    contact: {
      phone: '1-401-462-5300',
      website: 'https://dhs.ri.gov'
    }
  },
  {
    id: 'ri-riwp',
    title: 'Rhode Island Works',
    category: 'Family Support',
    description: 'Cash assistance and employment services',
    benefits: ['Cash assistance', 'Job training'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-401-462-5300',
      website: 'https://dhs.ri.gov'
    }
  }
];

export default programs;
