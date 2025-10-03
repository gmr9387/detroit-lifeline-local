import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'nv-medicaid',
    title: 'Nevada Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Nevada residents',
    benefits: ['Medical care', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['Nevada residents', 'Income requirements'],
    contact: {
      phone: '1-800-992-0900',
      website: 'https://dhcfp.nv.gov'
    }
  },
  {
    id: 'nv-snap',
    title: 'Nevada SNAP',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Nevada residents'],
    contact: {
      phone: '1-702-486-1646',
      website: 'https://dwss.nv.gov'
    }
  },
  {
    id: 'nv-tanf',
    title: 'Nevada TANF',
    category: 'Family Support',
    description: 'Temporary cash assistance',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-702-486-1646',
      website: 'https://dwss.nv.gov'
    }
  }
];

export default programs;
