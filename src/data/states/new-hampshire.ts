import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'nh-medicaid',
    title: 'New Hampshire Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage including NH Healthy Families',
    benefits: ['Medical services', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['New Hampshire residents', 'Income requirements'],
    contact: {
      phone: '1-844-275-3447',
      website: 'https://www.dhhs.nh.gov'
    }
  },
  {
    id: 'nh-snap',
    title: 'New Hampshire Food Stamps',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'New Hampshire residents'],
    contact: {
      phone: '1-844-275-3447',
      website: 'https://www.dhhs.nh.gov'
    }
  },
  {
    id: 'nh-tanf',
    title: 'New Hampshire FAP',
    category: 'Family Support',
    description: 'Financial Assistance Program',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-844-275-3447',
      website: 'https://www.dhhs.nh.gov'
    }
  }
];

export default programs;
