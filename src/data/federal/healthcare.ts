import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'medicare',
    title: 'Medicare Health Insurance',
    category: 'Healthcare',
    description: 'Federal health insurance for 65+ and disabled Americans',
    benefits: [
      'Hospital insurance (Part A)',
      'Medical insurance (Part B)', 
      'Prescription drug coverage (Part D)',
      'Medicare Advantage plans (Part C)'
    ],
    eligibility: [
      'Age 65 or older',
      'Under 65 with qualifying disabilities',
      'End-stage renal disease',
      'ALS diagnosis'
    ],
    requirements: [
      'Social Security eligibility',
      'US citizenship or legal residency for 5+ years'
    ],
    contact: {
      phone: '1-800-MEDICARE (1-800-633-4227)',
      website: 'https://www.medicare.gov',
      address: '7500 Security Boulevard, Baltimore, MD 21244'
    },
    applicationProcess: [
      'Apply online at SSA.gov or Medicare.gov',
      'Visit local Social Security office',
      'Call 1-800-MEDICARE for assistance'
    ],
    languages: ['English', 'Spanish', 'Chinese', 'Vietnamese', 'Korean', 'Russian']
  },
  {
    id: 'medicaid',
    title: 'Medicaid',
    category: 'Healthcare',
    description: 'Joint federal-state program providing healthcare to low-income individuals',
    benefits: [
      'Doctor visits and hospital stays',
      'Prescription medications',
      'Mental health services',
      'Long-term care services',
      'Preventive care'
    ],
    eligibility: [
      'Low income requirements (varies by state)',
      'US citizens or qualified immigrants',
      'State residency requirements'
    ],
    contact: {
      phone: 'Contact your state Medicaid office',
      website: 'https://www.medicaid.gov'
    }
  },
  {
    id: 'chip',
    title: 'Children\'s Health Insurance Program (CHIP)',
    category: 'Healthcare',
    description: 'Low-cost health coverage for children in families that earn too much for Medicaid',
    benefits: [
      'Medical and dental care',
      'Vision care',
      'Inpatient and outpatient hospital care',
      'Prescription medications',
      'Emergency services'
    ],
    eligibility: [
      'Children under 19',
      'Family income too high for Medicaid but too low for marketplace',
      'US citizens or qualified immigrants'
    ],
    contact: {
      phone: 'Contact your state CHIP program',
      website: 'https://www.insurekidsnow.gov'
    }
  },
  {
    id: 'community-health-centers',
    title: 'Federally Qualified Health Centers (FQHCs)',
    category: 'Healthcare',
    description: 'Community-based healthcare providers offering services regardless of ability to pay',
    benefits: [
      'Primary medical care',
      'Dental services',
      'Mental health counseling',
      'Substance abuse treatment',
      'Pharmacy services'
    ],
    eligibility: [
      'All individuals regardless of insurance status',
      'Sliding fee scale based on income',
      'No one turned away for inability to pay'
    ],
    contact: {
      phone: '1-888-ASK-HRSA (1-888-275-4772)',
      website: 'https://findahealthcenter.hrsa.gov'
    }
  },
  {
    id: 'ryan-white',
    title: 'Ryan White HIV/AIDS Program',
    category: 'Healthcare',
    description: 'Comprehensive HIV care and treatment services for low-income individuals',
    benefits: [
      'HIV medical care',
      'Prescription drug assistance',
      'Mental health services',
      'Substance abuse treatment',
      'Case management'
    ],
    eligibility: [
      'HIV-positive diagnosis',
      'Low income requirements',
      'Uninsured or underinsured'
    ],
    contact: {
      phone: '1-888-ASK-HRSA (1-888-275-4772)',
      website: 'https://hab.hrsa.gov'
    }
  },
  {
    id: 'maternal-child-health',
    title: 'Maternal and Child Health Services',
    category: 'Healthcare',
    description: 'Services to improve health of mothers, children, and families',
    benefits: [
      'Prenatal care',
      'Well-child checkups',
      'Immunizations',
      'Health screenings',
      'Family planning services'
    ],
    eligibility: [
      'Pregnant women',
      'Children and adolescents',
      'Families with special healthcare needs'
    ],
    contact: {
      phone: '1-888-ASK-HRSA (1-888-275-4772)',
      website: 'https://mchb.hrsa.gov'
    }
  },
  {
    id: 'indian-health-service',
    title: 'Indian Health Service',
    category: 'Healthcare',
    description: 'Healthcare services for American Indians and Alaska Natives',
    benefits: [
      'Medical care',
      'Dental services',
      'Mental health services',
      'Substance abuse treatment',
      'Traditional healing practices'
    ],
    eligibility: [
      'Members of federally recognized tribes',
      'Descendants of tribal members',
      'Alaska Natives'
    ],
    contact: {
      phone: '1-301-443-3593',
      website: 'https://www.ihs.gov'
    }
  },
  {
    id: 'vaccine-for-children',
    title: 'Vaccines for Children Program',
    category: 'Healthcare',
    description: 'Free vaccines for children who might not otherwise be vaccinated',
    benefits: [
      'All CDC-recommended vaccines',
      'No cost to families',
      'Available at multiple locations'
    ],
    eligibility: [
      'Children 18 years and younger',
      'Medicaid-eligible, uninsured, or underinsured',
      'American Indian or Alaska Native'
    ],
    contact: {
      phone: '1-800-CDC-INFO (1-800-232-4636)',
      website: 'https://www.cdc.gov/vaccines/programs/vfc'
    }
  }
];

export default programs;