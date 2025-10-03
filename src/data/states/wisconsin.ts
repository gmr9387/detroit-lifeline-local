import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'wi-medicaid',
    title: 'Wisconsin BadgerCare Plus',
    category: 'Healthcare',
    description: 'Wisconsin\'s Medicaid program',
    benefits: ['Medical care', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['Wisconsin residents', 'Income requirements'],
    contact: {
      phone: '1-800-362-3002',
      website: 'https://www.dhs.wisconsin.gov'
    }
  },
  {
    id: 'wi-snap',
    title: 'Wisconsin FoodShare',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'Quest card'],
    eligibility: ['Low income', 'Wisconsin residents'],
    contact: {
      phone: '1-888-794-5556',
      website: 'https://www.dhs.wisconsin.gov'
    }
  },
  {
    id: 'wi-w2',
    title: 'Wisconsin Works',
    category: 'Family Support',
    description: 'Cash assistance and employment services',
    benefits: ['Cash assistance', 'Job training'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-888-794-5556',
      website: 'https://www.dhs.wisconsin.gov'
    }
  }
];

export default programs;
