import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'nc-medicaid',
    title: 'North Carolina Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible North Carolinians',
    benefits: ['Medical services', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['North Carolina residents', 'Income requirements'],
    contact: {
      phone: '1-888-245-0179',
      website: 'https://medicaid.ncdhhs.gov'
    }
  },
  {
    id: 'nc-snap',
    title: 'North Carolina Food & Nutrition',
    category: 'Food',
    description: 'Food assistance benefits',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'North Carolina residents'],
    contact: {
      phone: '1-866-719-0141',
      website: 'https://www.ncdhhs.gov'
    }
  },
  {
    id: 'nc-wf',
    title: 'North Carolina Work First',
    category: 'Family Support',
    description: 'Cash assistance and employment services',
    benefits: ['Cash assistance', 'Job training'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-866-719-0141',
      website: 'https://www.ncdhhs.gov'
    }
  }
];

export default programs;
