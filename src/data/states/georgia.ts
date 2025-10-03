import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'ga-medicaid',
    title: 'Georgia Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Georgians',
    benefits: ['Medical care', 'Hospital services', 'Prescriptions'],
    eligibility: ['Georgia residents', 'Low income', 'Eligible categories'],
    contact: {
      phone: '1-877-423-4746',
      website: 'https://medicaid.georgia.gov'
    }
  },
  {
    id: 'ga-snap',
    title: 'Georgia Food Stamps',
    category: 'Food',
    description: 'Food assistance benefits',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Georgia residents'],
    contact: {
      phone: '1-877-423-4746',
      website: 'https://gateway.ga.gov'
    }
  },
  {
    id: 'ga-tanf',
    title: 'Georgia TANF',
    category: 'Family Support',
    description: 'Temporary cash assistance',
    benefits: ['Cash assistance', 'Job training'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-877-423-4746',
      website: 'https://dfcs.georgia.gov'
    }
  },
  {
    id: 'ga-peachcare',
    title: 'PeachCare for Kids',
    category: 'Healthcare',
    description: 'Health insurance for children',
    benefits: ['Medical care', 'Dental care', 'Vision care'],
    eligibility: ['Children under 19', 'Income requirements'],
    contact: {
      phone: '1-877-427-3224',
      website: 'https://dch.georgia.gov'
    }
  }
];

export default programs;
