import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'va-medicaid',
    title: 'Virginia Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Virginians',
    benefits: ['Medical services', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['Virginia residents', 'Income requirements'],
    contact: {
      phone: '1-855-242-8282',
      website: 'https://www.dmas.virginia.gov'
    }
  },
  {
    id: 'va-snap',
    title: 'Virginia SNAP',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Virginia residents'],
    contact: {
      phone: '1-855-635-4370',
      website: 'https://www.dss.virginia.gov'
    }
  },
  {
    id: 'va-tanf',
    title: 'Virginia TANF',
    category: 'Family Support',
    description: 'Temporary cash assistance',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-855-635-4370',
      website: 'https://www.dss.virginia.gov'
    }
  }
];

export default programs;
