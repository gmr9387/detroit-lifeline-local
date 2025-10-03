import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'ia-medicaid',
    title: 'Iowa Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Iowa residents',
    benefits: ['Medical services', 'Dental care', 'Mental health', 'Prescriptions'],
    eligibility: ['Iowa residents', 'Income requirements'],
    contact: {
      phone: '1-800-338-8366',
      website: 'https://dhs.iowa.gov'
    }
  },
  {
    id: 'ia-snap',
    title: 'Iowa Food Assistance',
    category: 'Food',
    description: 'Food assistance program',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Iowa residents'],
    contact: {
      phone: '1-877-347-5678',
      website: 'https://dhs.iowa.gov'
    }
  },
  {
    id: 'ia-fip',
    title: 'Iowa Family Investment Program',
    category: 'Family Support',
    description: 'Cash assistance and support services',
    benefits: ['Cash assistance', 'Job training', 'Child care'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-877-347-5678',
      website: 'https://dhs.iowa.gov'
    }
  }
];

export default programs;
