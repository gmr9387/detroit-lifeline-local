import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'liheap',
    title: 'Low Income Home Energy Assistance Program',
    category: 'Energy',
    description: 'Help with heating and cooling costs',
    benefits: ['Heating assistance', 'Cooling assistance', 'Energy crisis intervention', 'Weatherization referrals'],
    eligibility: ['Income at or below 150% of poverty level', 'US citizens or qualified aliens'],
    contact: {
      phone: 'Contact state LIHEAP office',
      website: 'https://www.acf.hhs.gov/ocs/liheap'
    }
  },
  {
    id: 'weatherization',
    title: 'Weatherization Assistance Program',
    category: 'Energy',
    description: 'Free home energy efficiency improvements',
    benefits: ['Insulation installation', 'Air sealing', 'HVAC repairs', 'Energy audits'],
    eligibility: ['Income at or below 200% of poverty level', 'Priority for elderly and disabled'],
    contact: {
      phone: 'Contact state weatherization office',
      website: 'https://www.energy.gov/wap'
    }
  },
  {
    id: 'lifeline',
    title: 'Lifeline Program',
    category: 'Energy',
    description: 'Discounted phone and internet service',
    benefits: ['$9.25 monthly discount', 'Phone or internet service', 'One per household'],
    eligibility: ['Income at or below 135% of poverty', 'Participation in qualifying programs'],
    contact: {
      phone: '1-800-234-9473',
      website: 'https://www.fcc.gov/lifeline'
    }
  },
  {
    id: 'acp',
    title: 'Affordable Connectivity Program',
    category: 'Energy',
    description: 'Discount on internet service and devices',
    benefits: ['Up to $30/month internet discount', 'Up to $100 device discount', 'Enhanced tribal benefit'],
    eligibility: ['Income at or below 200% of poverty', 'Participation in qualifying programs'],
    contact: {
      phone: '1-877-384-2575',
      website: 'https://www.fcc.gov/acp'
    }
  }
];

export default programs;
