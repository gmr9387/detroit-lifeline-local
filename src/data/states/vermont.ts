import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'vt-medicaid',
    title: 'Vermont Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage including Green Mountain Care',
    benefits: ['Medical services', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['Vermont residents', 'Income requirements'],
    contact: {
      phone: '1-855-899-9600',
      website: 'https://dvha.vermont.gov'
    }
  },
  {
    id: 'vt-snap',
    title: 'Vermont 3SquaresVT',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Vermont residents'],
    contact: {
      phone: '1-800-479-6151',
      website: 'https://dcf.vermont.gov'
    }
  },
  {
    id: 'vt-reach-up',
    title: 'Vermont Reach Up',
    category: 'Family Support',
    description: 'Cash assistance and employment services',
    benefits: ['Cash assistance', 'Job training'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-800-479-6151',
      website: 'https://dcf.vermont.gov'
    }
  }
];

export default programs;
