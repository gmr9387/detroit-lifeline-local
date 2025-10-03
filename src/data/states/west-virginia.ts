import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'wv-medicaid',
    title: 'West Virginia Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible West Virginians',
    benefits: ['Medical services', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['West Virginia residents', 'Income requirements'],
    contact: {
      phone: '1-877-982-8822',
      website: 'https://dhhr.wv.gov'
    }
  },
  {
    id: 'wv-snap',
    title: 'West Virginia SNAP',
    category: 'Food',
    description: 'Food assistance benefits',
    benefits: ['Monthly food benefits', 'Mountain State card'],
    eligibility: ['Low income', 'West Virginia residents'],
    contact: {
      phone: '1-877-716-1212',
      website: 'https://dhhr.wv.gov'
    }
  },
  {
    id: 'wv-wvworks',
    title: 'West Virginia WV Works',
    category: 'Family Support',
    description: 'Cash assistance and employment services',
    benefits: ['Cash assistance', 'Job training'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-877-716-1212',
      website: 'https://dhhr.wv.gov'
    }
  }
];

export default programs;
