import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'az-ahcccs',
    title: 'Arizona AHCCCS',
    category: 'Healthcare',
    description: 'Arizona\'s Medicaid program',
    benefits: ['Medical care', 'Mental health services', 'Dental care', 'Vision care'],
    eligibility: ['Arizona residents', 'Income requirements', 'Age/disability criteria'],
    contact: {
      phone: '1-855-432-7587',
      website: 'https://www.azahcccs.gov'
    }
  },
  {
    id: 'az-snap',
    title: 'Arizona Nutrition Assistance',
    category: 'Food',
    description: 'Food assistance for low-income families',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Arizona residents'],
    contact: {
      phone: '1-855-432-7587',
      website: 'https://des.az.gov'
    }
  },
  {
    id: 'az-tanf',
    title: 'Arizona Cash Assistance',
    category: 'Family Support',
    description: 'Temporary assistance for needy families',
    benefits: ['Cash assistance', 'Job training', 'Child care'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-855-432-7587',
      website: 'https://des.az.gov'
    }
  },
  {
    id: 'az-liheap',
    title: 'Arizona Energy Assistance',
    category: 'Energy',
    description: 'Help with utility bills',
    benefits: ['Utility assistance', 'Crisis intervention'],
    eligibility: ['Low income', 'Arizona residents'],
    contact: {
      phone: '1-855-432-7587',
      website: 'https://des.az.gov'
    }
  }
];

export default programs;
