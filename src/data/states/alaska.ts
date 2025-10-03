import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'ak-medicaid',
    title: 'Alaska Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Alaska residents',
    benefits: ['Medical services', 'Behavioral health', 'Dental care', 'Prescription drugs'],
    eligibility: ['Alaska residents', 'Low income families', 'Pregnant women', 'Children', 'Elderly', 'Disabled'],
    contact: {
      phone: '1-800-770-5650',
      website: 'https://health.alaska.gov'
    }
  },
  {
    id: 'ak-pfd',
    title: 'Alaska Permanent Fund Dividend',
    category: 'Financial',
    description: 'Annual dividend payment to Alaska residents',
    benefits: ['Annual cash payment', 'No income requirements'],
    eligibility: ['Alaska residents for full calendar year', 'Intent to remain in Alaska'],
    contact: {
      phone: '1-907-465-2323',
      website: 'https://pfd.alaska.gov'
    }
  },
  {
    id: 'ak-snap',
    title: 'Alaska Food Stamps',
    category: 'Food',
    description: 'Monthly food benefits for low-income households',
    benefits: ['Monthly food benefits', 'EBT card', 'Nutrition education'],
    eligibility: ['Low income limits', 'Alaska residents'],
    contact: {
      phone: '1-907-465-3347',
      website: 'https://health.alaska.gov/dpa/Pages/default.aspx'
    }
  },
  {
    id: 'ak-tanf',
    title: 'Alaska Temporary Assistance',
    category: 'Family Support',
    description: 'Cash assistance for families with children',
    benefits: ['Monthly cash assistance', 'Job training', 'Child care assistance'],
    eligibility: ['Families with children', 'Low income', 'Work requirements'],
    contact: {
      phone: '1-907-465-3347',
      website: 'https://health.alaska.gov/dpa'
    }
  },
  {
    id: 'ak-heating',
    title: 'Alaska Heating Assistance',
    category: 'Energy',
    description: 'Help with heating costs',
    benefits: ['Heating bill assistance', 'Weatherization'],
    eligibility: ['Low income', 'Alaska residents'],
    contact: {
      phone: '1-907-269-3666',
      website: 'https://health.alaska.gov/dpa'
    }
  }
];

export default programs;
