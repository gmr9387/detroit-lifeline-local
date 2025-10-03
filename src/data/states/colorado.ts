import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'co-medicaid',
    title: 'Health First Colorado',
    category: 'Healthcare',
    description: 'Colorado\'s Medicaid program',
    benefits: ['Medical care', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['Colorado residents', 'Income requirements'],
    contact: {
      phone: '1-800-221-3943',
      website: 'https://www.healthfirstcolorado.com'
    }
  },
  {
    id: 'co-snap',
    title: 'Colorado SNAP',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Colorado residents'],
    contact: {
      phone: '1-855-855-4626',
      website: 'https://cdhs.colorado.gov'
    }
  },
  {
    id: 'co-tanf',
    title: 'Colorado Works',
    category: 'Family Support',
    description: 'Cash assistance and employment services',
    benefits: ['Cash assistance', 'Job training', 'Child care'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-855-855-4626',
      website: 'https://cdhs.colorado.gov'
    }
  },
  {
    id: 'co-leap',
    title: 'Colorado LEAP',
    category: 'Energy',
    description: 'Low-income Energy Assistance Program',
    benefits: ['Heating assistance', 'Weatherization'],
    eligibility: ['Low income', 'Colorado residents'],
    contact: {
      phone: '1-866-432-8435',
      website: 'https://cdhs.colorado.gov'
    }
  }
];

export default programs;
