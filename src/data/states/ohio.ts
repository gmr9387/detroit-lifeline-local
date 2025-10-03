import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'oh-medicaid',
    title: 'Ohio Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Ohio residents',
    benefits: ['Medical care', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['Ohio residents', 'Income requirements'],
    contact: {
      phone: '1-800-324-8680',
      website: 'https://medicaid.ohio.gov'
    }
  },
  {
    id: 'oh-snap',
    title: 'Ohio SNAP',
    category: 'Food',
    description: 'Food assistance benefits',
    benefits: ['Monthly food benefits', 'Ohio Direction card'],
    eligibility: ['Low income', 'Ohio residents'],
    contact: {
      phone: '1-844-640-6446',
      website: 'https://jfs.ohio.gov'
    }
  },
  {
    id: 'oh-owf',
    title: 'Ohio Works First',
    category: 'Family Support',
    description: 'Cash assistance and employment services',
    benefits: ['Cash assistance', 'Job training'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-844-640-6446',
      website: 'https://jfs.ohio.gov'
    }
  }
];

export default programs;
