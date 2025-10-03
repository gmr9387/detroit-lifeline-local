import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'md-medicaid',
    title: 'Maryland Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Maryland residents',
    benefits: ['Medical services', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['Maryland residents', 'Income requirements'],
    contact: {
      phone: '1-800-492-5231',
      website: 'https://health.maryland.gov'
    }
  },
  {
    id: 'md-snap',
    title: 'Maryland Food Supplement',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'Independence card'],
    eligibility: ['Low income', 'Maryland residents'],
    contact: {
      phone: '1-800-332-6347',
      website: 'https://dhs.maryland.gov'
    }
  },
  {
    id: 'md-tca',
    title: 'Maryland TCA',
    category: 'Family Support',
    description: 'Temporary Cash Assistance',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-800-332-6347',
      website: 'https://dhs.maryland.gov'
    }
  }
];

export default programs;
