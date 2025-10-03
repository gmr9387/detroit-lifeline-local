import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'ky-medicaid',
    title: 'Kentucky Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Kentuckians',
    benefits: ['Medical services', 'Hospital care', 'Prescriptions', 'Mental health'],
    eligibility: ['Kentucky residents', 'Income requirements'],
    contact: {
      phone: '1-855-459-6328',
      website: 'https://chfs.ky.gov'
    }
  },
  {
    id: 'ky-snap',
    title: 'Kentucky SNAP',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Kentucky residents'],
    contact: {
      phone: '1-855-306-8959',
      website: 'https://chfs.ky.gov'
    }
  },
  {
    id: 'ky-ktap',
    title: 'Kentucky Transitional Assistance',
    category: 'Family Support',
    description: 'Cash assistance for families',
    benefits: ['Cash assistance', 'Job training'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-855-306-8959',
      website: 'https://chfs.ky.gov'
    }
  }
];

export default programs;
