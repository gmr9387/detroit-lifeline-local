import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'ut-medicaid',
    title: 'Utah Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Utah residents',
    benefits: ['Medical services', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['Utah residents', 'Income requirements'],
    contact: {
      phone: '1-800-662-9651',
      website: 'https://medicaid.utah.gov'
    }
  },
  {
    id: 'ut-snap',
    title: 'Utah SNAP',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Utah residents'],
    contact: {
      phone: '1-866-435-7414',
      website: 'https://jobs.utah.gov'
    }
  },
  {
    id: 'ut-fep',
    title: 'Utah Family Employment',
    category: 'Family Support',
    description: 'Cash assistance and employment services',
    benefits: ['Cash assistance', 'Job training'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-866-435-7414',
      website: 'https://jobs.utah.gov'
    }
  }
];

export default programs;
