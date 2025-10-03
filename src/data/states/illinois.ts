import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'il-medicaid',
    title: 'Illinois Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Illinois residents',
    benefits: ['Medical care', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['Illinois residents', 'Income requirements'],
    contact: {
      phone: '1-877-805-3556',
      website: 'https://www.illinois.gov/hfs'
    }
  },
  {
    id: 'il-snap',
    title: 'Illinois SNAP',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'Link card'],
    eligibility: ['Low income', 'Illinois residents'],
    contact: {
      phone: '1-800-843-6154',
      website: 'https://abe.illinois.gov'
    }
  },
  {
    id: 'il-tanf',
    title: 'Illinois TANF',
    category: 'Family Support',
    description: 'Temporary cash assistance',
    benefits: ['Cash assistance', 'Job training'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-800-843-6154',
      website: 'https://www.dhs.state.il.us'
    }
  },
  {
    id: 'il-liheap',
    title: 'Illinois Energy Assistance',
    category: 'Energy',
    description: 'Help with energy bills',
    benefits: ['Utility assistance', 'Weatherization'],
    eligibility: ['Low income', 'Illinois residents'],
    contact: {
      phone: '1-877-411-9276',
      website: 'https://www.illinois.gov/dceo'
    }
  }
];

export default programs;
