import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'nj-medicaid',
    title: 'New Jersey Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage including NJ FamilyCare',
    benefits: ['Medical care', 'Dental care', 'Vision care', 'Prescriptions'],
    eligibility: ['New Jersey residents', 'Income requirements'],
    contact: {
      phone: '1-800-701-0710',
      website: 'https://www.state.nj.us/humanservices'
    }
  },
  {
    id: 'nj-snap',
    title: 'New Jersey SNAP',
    category: 'Food',
    description: 'Food assistance benefits',
    benefits: ['Monthly food benefits', 'Families First card'],
    eligibility: ['Low income', 'New Jersey residents'],
    contact: {
      phone: '1-800-792-9773',
      website: 'https://www.state.nj.us/humanservices'
    }
  },
  {
    id: 'nj-wfnj',
    title: 'New Jersey WorkFirst',
    category: 'Family Support',
    description: 'Cash assistance and employment services',
    benefits: ['Cash assistance', 'Job training'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-800-792-9773',
      website: 'https://www.state.nj.us/humanservices'
    }
  }
];

export default programs;
