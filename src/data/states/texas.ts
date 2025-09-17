import { Program } from '@/types';

export const programs: Program[] = [
  // Healthcare Programs
  {
    id: 'tx-medicaid',
    title: 'Texas Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Texas residents',
    benefits: ['Medical care', 'Emergency services', 'Long-term care', 'Prescription drugs'],
    eligibility: ['Low income families', 'Pregnant women', 'Children', 'Elderly', 'Disabled'],
    requirements: ['Texas residency', 'Income verification', 'Asset limits'],
    contact: {
      phone: '1-800-252-8263',
      website: 'https://hhs.texas.gov',
      address: '4900 N Lamar Blvd, Austin, TX 78751'
    },
    applicationProcess: ['Apply at YourTexasBenefits.com', 'Submit documents', 'Complete interview'],
    languages: ['English', 'Spanish']
  },
  {
    id: 'tx-chip',
    title: 'Texas CHIP',
    category: 'Healthcare',
    description: 'Health insurance for children in working families',
    benefits: ['Medical care', 'Dental care', 'Vision care', 'Mental health services'],
    eligibility: ['Children under 19', 'Family income too high for Medicaid', 'Not eligible for employer insurance'],
    contact: {
      phone: '1-800-647-6558',
      website: 'https://chipmedicaid.org'
    }
  },

  // Employment & Workforce
  {
    id: 'tx-workforce',
    title: 'Texas Workforce Commission',
    category: 'Employment',
    description: 'Employment services and workforce development',
    benefits: ['Job search assistance', 'Skills training', 'Unemployment benefits', 'Career counseling'],
    eligibility: ['Texas residents', 'Job seekers', 'Displaced workers'],
    contact: {
      phone: '1-800-939-6631',
      website: 'https://www.twc.texas.gov'
    }
  },
  {
    id: 'tx-choices',
    title: 'Texas CHOICES',
    category: 'Employment',
    description: 'Job training and education for TANF recipients',
    benefits: ['Job training', 'Education programs', 'Work experience', 'Supportive services'],
    eligibility: ['TANF recipients', 'Meet work requirements'],
    contact: {
      phone: '1-877-541-7905',
      website: 'https://www.twc.texas.gov'
    }
  },

  // Housing Programs
  {
    id: 'tx-housing',
    title: 'Texas Department of Housing and Community Affairs',
    category: 'Housing',
    description: 'Housing assistance programs for Texans',
    benefits: ['Rental assistance', 'Homebuyer programs', 'Energy assistance', 'Weatherization'],
    eligibility: ['Low to moderate income', 'Texas residents'],
    contact: {
      phone: '1-512-475-3800',
      website: 'https://www.tdhca.state.tx.us'
    }
  },
  {
    id: 'tx-section8',
    title: 'Texas Section 8 Housing Choice Voucher',
    category: 'Housing',
    description: 'Rental assistance vouchers for low-income families',
    benefits: ['Rental vouchers', 'Utility allowances', 'Portability'],
    eligibility: ['Very low income (50% AMI)', 'Pass background check'],
    contact: {
      phone: 'Contact local housing authority',
      website: 'https://www.tdhca.state.tx.us'
    }
  },

  // Nutrition & Food
  {
    id: 'tx-snap',
    title: 'Texas SNAP (Lone Star Card)',
    category: 'Food',
    description: 'Monthly food benefits for low-income households',
    benefits: ['Monthly food benefits', 'Lone Star Card', 'Nutrition education'],
    eligibility: ['Low income limits', 'Texas residents', 'Work requirements'],
    contact: {
      phone: '1-877-541-7905',
      website: 'https://yourtexasbenefits.hhsc.texas.gov'
    }
  },
  {
    id: 'tx-wic',
    title: 'Texas WIC Program',
    category: 'Food',
    description: 'Nutrition assistance for women, infants, and children',
    benefits: ['Healthy food vouchers', 'Nutrition counseling', 'Breastfeeding support', 'Health screenings'],
    eligibility: ['Pregnant/breastfeeding women', 'Children under 5', 'Income at or below 185% FPL'],
    contact: {
      phone: '1-800-942-3678',
      website: 'https://www.dshs.texas.gov/wic'
    }
  },

  // Child Care & Family
  {
    id: 'tx-tanf',
    title: 'Texas TANF (Temporary Assistance for Needy Families)',
    category: 'Family Support',
    description: 'Cash assistance and services for families with children',
    benefits: ['Monthly cash assistance', 'Job training', 'Child care assistance', 'Transportation'],
    eligibility: ['Families with children', 'Very low income', 'Work requirements'],
    contact: {
      phone: '1-877-541-7905',
      website: 'https://yourtexasbenefits.hhsc.texas.gov'
    }
  },
  {
    id: 'tx-child-care',
    title: 'Texas Child Care Services',
    category: 'Childcare',
    description: 'Subsidized child care for working families',
    benefits: ['Child care subsidies', 'Quality programs', 'Extended hours'],
    eligibility: ['Working parents', 'Income at or below 85% SMI', 'Texas residents'],
    contact: {
      phone: '1-877-541-7905',
      website: 'https://yourtexasbenefits.hhsc.texas.gov'
    }
  },

  // Education
  {
    id: 'tx-grant',
    title: 'Texas Grant Program',
    category: 'Education',
    description: 'Financial aid for Texas college students',
    benefits: ['Tuition assistance', 'Renewable grants', 'Priority funding'],
    eligibility: ['Texas residents', 'Financial need', 'Academic requirements'],
    contact: {
      phone: '1-800-242-3062',
      website: 'https://www.thecb.state.tx.us'
    }
  },
  {
    id: 'tx-top10',
    title: 'Texas Top 10% Scholarship',
    category: 'Education',
    description: 'Automatic admission and scholarships for top students',
    benefits: ['Guaranteed admission', 'Scholarship opportunities', 'Priority registration'],
    eligibility: ['Top 10% of Texas high school class', 'Texas residents'],
    contact: {
      phone: '1-800-242-3062',
      website: 'https://www.thecb.state.tx.us'
    }
  },

  // Energy & Utilities
  {
    id: 'tx-comprehensive-energy',
    title: 'Texas Comprehensive Energy Assistance Program',
    category: 'Energy',
    description: 'Help with energy bills and weatherization',
    benefits: ['Utility bill assistance', 'Weatherization services', 'Energy education'],
    eligibility: ['Income at or below 60% SMI', 'Texas residents'],
    contact: {
      phone: '1-877-399-8939',
      website: 'https://www.tdhca.state.tx.us'
    }
  },

  // Mental Health
  {
    id: 'tx-mental-health',
    title: 'Texas Mental Health Services',
    category: 'Mental Health',
    description: 'Community mental health and substance abuse services',
    benefits: ['Counseling services', 'Crisis intervention', 'Substance abuse treatment'],
    eligibility: ['Texas residents', 'Mental health or substance abuse needs'],
    contact: {
      phone: '1-800-252-8263',
      website: 'https://hhs.texas.gov'
    }
  },

  // Senior Services
  {
    id: 'tx-aging-disability',
    title: 'Texas Aging and Disability Services',
    category: 'Senior Services',
    description: 'Support services for seniors and people with disabilities',
    benefits: ['In-home care', 'Adult day services', 'Respite care', 'Case management'],
    eligibility: ['Age 60+', 'Adults with disabilities', 'Income requirements'],
    contact: {
      phone: '1-800-252-9240',
      website: 'https://hhs.texas.gov'
    }
  },

  // Veterans
  {
    id: 'tx-veterans',
    title: 'Texas Veterans Services',
    category: 'Veterans',
    description: 'Comprehensive services for Texas veterans',
    benefits: ['Benefits counseling', 'Claims assistance', 'Employment services', 'Housing assistance'],
    eligibility: ['Texas veterans', 'Military service members', 'Dependents'],
    contact: {
      phone: '1-800-252-8387',
      website: 'https://www.tvc.texas.gov'
    }
  }
];

export default programs;