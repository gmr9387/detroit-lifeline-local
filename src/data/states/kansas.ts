import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'ks-medicaid',
    title: 'Kansas KanCare',
    category: 'Healthcare',
    description: 'Kansas Medicaid managed care program',
    benefits: ['Medical care', 'Mental health', 'Dental care', 'Prescriptions'],
    eligibility: ['Kansas residents', 'Income requirements'],
    contact: {
      phone: '1-866-305-5147',
      website: 'https://www.kancare.ks.gov'
    }
  },
  {
    id: 'ks-snap',
    title: 'Kansas Food Assistance',
    category: 'Food',
    description: 'Food assistance benefits',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Kansas residents'],
    contact: {
      phone: '1-888-369-4777',
      website: 'https://dcf.ks.gov'
    }
  },
  {
    id: 'ks-tanf',
    title: 'Kansas TANF',
    category: 'Family Support',
    description: 'Temporary cash assistance',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-888-369-4777',
      website: 'https://dcf.ks.gov'
    }
  }
];

export default programs;
