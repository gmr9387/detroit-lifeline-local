import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'ssdi',
    title: 'Social Security Disability Insurance',
    category: 'Disability',
    description: 'Monthly benefits for disabled workers',
    benefits: ['Monthly cash benefits', 'Medicare after 24 months', 'Work incentives', 'Family benefits'],
    eligibility: ['Work history (20 of 40 quarters)', 'Medical disability', 'Unable to work'],
    contact: {
      phone: '1-800-772-1213',
      website: 'https://www.ssa.gov/disability'
    }
  },
  {
    id: 'ssi',
    title: 'Supplemental Security Income',
    category: 'Disability',
    description: 'Monthly payments for aged, blind, or disabled with limited income',
    benefits: ['Monthly cash payments', 'Medicaid eligibility', 'SNAP eligibility', 'State supplements'],
    eligibility: ['Age 65+, blind, or disabled', 'Limited income and resources', 'US citizen or qualified alien'],
    contact: {
      phone: '1-800-772-1213',
      website: 'https://www.ssa.gov/ssi'
    }
  },
  {
    id: 'ticket-to-work',
    title: 'Ticket to Work',
    category: 'Disability',
    description: 'Free employment support for disability beneficiaries',
    benefits: ['Career counseling', 'Job training', 'Job placement', 'Benefits while working'],
    eligibility: ['SSDI or SSI recipients', 'Ages 18-64', 'Want to work'],
    contact: {
      phone: '1-866-968-7842',
      website: 'https://choosework.ssa.gov'
    }
  },
  {
    id: 'vocational-rehab',
    title: 'Vocational Rehabilitation',
    category: 'Disability',
    description: 'Employment services for people with disabilities',
    benefits: ['Job training', 'Education assistance', 'Job placement', 'Assistive technology'],
    eligibility: ['Physical or mental disability', 'Barrier to employment', 'Can benefit from services'],
    contact: {
      phone: 'Contact state VR agency',
      website: 'https://www.ed.gov/rehabilitation-services'
    }
  },
  {
    id: 'independent-living',
    title: 'Independent Living Services',
    category: 'Disability',
    description: 'Services to help people with disabilities live independently',
    benefits: ['Peer counseling', 'Skills training', 'Advocacy', 'Information and referral'],
    eligibility: ['Significant disability', 'All ages', 'No income requirements'],
    contact: {
      phone: 'Contact local IL center',
      website: 'https://www.acl.gov/programs/aging-and-disability-networks/independent-living'
    }
  }
];

export default programs;
