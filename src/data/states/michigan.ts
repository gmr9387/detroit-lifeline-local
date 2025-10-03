import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'mi-medicaid',
    title: 'Michigan Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage including Healthy Michigan Plan',
    benefits: ['Medical care', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['Michigan residents', 'Income requirements'],
    contact: {
      phone: '1-800-642-3195',
      website: 'https://www.michigan.gov/mdhhs'
    }
  },
  {
    id: 'mi-snap',
    title: 'Michigan Food Assistance',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'Bridge card'],
    eligibility: ['Low income', 'Michigan residents'],
    contact: {
      phone: '1-855-275-6424',
      website: 'https://www.michigan.gov/mdhhs'
    }
  },
  {
    id: 'mi-fip',
    title: 'Michigan Family Independence',
    category: 'Family Support',
    description: 'Cash assistance for families',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-855-275-6424',
      website: 'https://www.michigan.gov/mdhhs'
    }
  }
];

export default programs;
