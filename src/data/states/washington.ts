import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'wa-medicaid',
    title: 'Washington Apple Health',
    category: 'Healthcare',
    description: 'Washington\'s Medicaid program',
    benefits: ['Medical care', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['Washington residents', 'Income requirements'],
    contact: {
      phone: '1-855-923-4633',
      website: 'https://www.hca.wa.gov'
    }
  },
  {
    id: 'wa-snap',
    title: 'Washington Basic Food',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Washington residents'],
    contact: {
      phone: '1-877-501-2233',
      website: 'https://www.dshs.wa.gov'
    }
  },
  {
    id: 'wa-worffirst',
    title: 'Washington WorkFirst',
    category: 'Family Support',
    description: 'Cash assistance and employment services',
    benefits: ['Cash assistance', 'Job training'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-877-501-2233',
      website: 'https://www.dshs.wa.gov'
    }
  }
];

export default programs;
