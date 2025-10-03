import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'section-8-voucher',
    title: 'Section 8 Housing Choice Voucher',
    category: 'Housing',
    description: 'Rental assistance for very low-income families',
    benefits: ['Rental vouchers', 'Utility allowances', 'Portability between locations'],
    eligibility: ['Very low income (50% AMI)', 'US citizens or eligible immigrants', 'Background check'],
    contact: {
      phone: '1-800-955-2232',
      website: 'https://www.hud.gov/voucher'
    }
  },
  {
    id: 'public-housing',
    title: 'Public Housing',
    category: 'Housing',
    description: 'Affordable rental housing for low-income families',
    benefits: ['Low-cost apartments', 'Rent based on income', 'Stable housing'],
    eligibility: ['Low income (80% AMI)', 'US citizens or eligible immigrants'],
    contact: {
      phone: '1-800-955-2232',
      website: 'https://www.hud.gov/publichousing'
    }
  },
  {
    id: 'project-based-rental',
    title: 'Project-Based Rental Assistance',
    category: 'Housing',
    description: 'Rental assistance tied to specific properties',
    benefits: ['Reduced rent', 'Quality housing standards', 'Utility assistance'],
    eligibility: ['Low income families', 'Elderly', 'Disabled'],
    contact: {
      phone: '1-800-955-2232',
      website: 'https://www.hud.gov/pbra'
    }
  },
  {
    id: 'home-program',
    title: 'HOME Investment Partnerships',
    category: 'Housing',
    description: 'Funding for affordable housing development and assistance',
    benefits: ['Homebuyer assistance', 'Rental assistance', 'Rehabilitation programs'],
    eligibility: ['Low to moderate income', 'Varies by locality'],
    contact: {
      phone: '1-800-245-2691',
      website: 'https://www.hud.gov/home'
    }
  },
  {
    id: 'cdbg',
    title: 'Community Development Block Grants',
    category: 'Housing',
    description: 'Community development and housing assistance',
    benefits: ['Home repair assistance', 'Down payment assistance', 'Affordable housing development'],
    eligibility: ['Low to moderate income', 'Administered by local communities'],
    contact: {
      phone: '1-800-245-2691',
      website: 'https://www.hud.gov/cdbg'
    }
  },
  {
    id: 'hud-counseling',
    title: 'HUD Housing Counseling',
    category: 'Housing',
    description: 'Free housing counseling services',
    benefits: ['Homebuyer education', 'Foreclosure prevention', 'Rental counseling', 'Financial management'],
    eligibility: ['All income levels', 'Anyone seeking housing assistance'],
    contact: {
      phone: '1-800-569-4287',
      website: 'https://www.hud.gov/counseling'
    }
  },
  {
    id: 'native-american-housing',
    title: 'Native American Housing Programs',
    category: 'Housing',
    description: 'Housing assistance for Native Americans and Alaska Natives',
    benefits: ['Homeownership assistance', 'Rental assistance', 'Housing development'],
    eligibility: ['Native Americans', 'Alaska Natives', 'Tribal members'],
    contact: {
      phone: '1-800-955-2232',
      website: 'https://www.hud.gov/codetalk'
    }
  }
];

export default programs;
