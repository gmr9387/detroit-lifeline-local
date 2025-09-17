import { Program } from '@/types';

export const programs: Program[] = [
  // Healthcare Programs
  {
    id: 'ca-medi-cal',
    title: 'Medi-Cal',
    category: 'Healthcare',
    description: 'California\'s Medicaid program providing comprehensive healthcare to low-income residents',
    benefits: ['Medical services', 'Dental care', 'Mental health services', 'Prescription drugs', 'Vision care'],
    eligibility: ['California residents', 'Income at or below 138% FPL', 'US citizen or qualified immigrant'],
    requirements: ['Provide income verification', 'Proof of residency', 'Social Security Number'],
    contact: {
      phone: '1-800-300-1506',
      website: 'https://www.dhcs.ca.gov',
      address: '1501 Capitol Avenue, Sacramento, CA 95814'
    },
    applicationProcess: ['Apply online at BenefitsCal.com', 'Submit required documents', 'Complete phone interview if needed'],
    languages: ['English', 'Spanish', 'Chinese', 'Vietnamese', 'Korean', 'Russian', 'Armenian']
  },
  {
    id: 'ca-covered-california',
    title: 'Covered California',
    category: 'Healthcare',
    description: 'California\'s health insurance marketplace with subsidies',
    benefits: ['Health insurance plans', 'Premium tax credits', 'Cost-sharing reductions'],
    eligibility: ['California residents', 'Not eligible for Medi-Cal', 'Income 138-400% FPL'],
    contact: {
      phone: '1-800-300-1506',
      website: 'https://www.coveredca.com'
    }
  },
  
  // Employment & Workforce
  {
    id: 'ca-edd',
    title: 'California Employment Development Department',
    category: 'Employment',
    description: 'Unemployment insurance, disability insurance, and job training programs',
    benefits: ['Unemployment benefits', 'Job training', 'Disability insurance', 'Paid family leave'],
    eligibility: ['California workers', 'Job seekers', 'Disabled workers'],
    contact: {
      phone: '1-800-300-5616',
      website: 'https://edd.ca.gov'
    }
  },
  {
    id: 'ca-wioa',
    title: 'California Workforce Innovation & Opportunity Act',
    category: 'Employment',
    description: 'Job training and career services for adults and youth',
    benefits: ['Skills training', 'Career counseling', 'Job placement assistance', 'Education programs'],
    eligibility: ['Adults seeking employment', 'Low-income individuals', 'Youth 14-24'],
    contact: {
      phone: '1-916-464-1200',
      website: 'https://cwdb.ca.gov'
    }
  },

  // Housing Programs
  {
    id: 'ca-housing-choice',
    title: 'California Housing Choice Voucher Program',
    category: 'Housing',
    description: 'Rental assistance for low-income families',
    benefits: ['Rental vouchers', 'Utility assistance', 'Security deposit help'],
    eligibility: ['Low income (50% AMI)', 'California residents', 'Pass background check'],
    contact: {
      phone: '1-916-263-2771',
      website: 'https://hcd.ca.gov'
    }
  },
  {
    id: 'ca-first-time-homebuyer',
    title: 'California First-Time Homebuyer Program',
    category: 'Housing',
    description: 'Down payment assistance for first-time homebuyers',
    benefits: ['Down payment loans', 'Below-market interest rates', 'Closing cost assistance'],
    eligibility: ['First-time homebuyers', 'Income limits by county', 'Complete homebuyer education'],
    contact: {
      phone: '1-916-263-2771',
      website: 'https://hcd.ca.gov'
    }
  },

  // Nutrition & Food
  {
    id: 'ca-calfresh',
    title: 'CalFresh (SNAP)',
    category: 'Food',
    description: 'Monthly food benefits for low-income households',
    benefits: ['Monthly food benefits', 'EBT card', 'Nutrition education'],
    eligibility: ['Low income limits', 'California residents', 'Resource limits'],
    contact: {
      phone: '1-877-847-3663',
      website: 'https://www.cdss.ca.gov/food-nutrition/calfresh'
    }
  },
  {
    id: 'ca-wic',
    title: 'California WIC Program',
    category: 'Food',
    description: 'Nutrition assistance for pregnant women, mothers, and young children',
    benefits: ['Healthy food vouchers', 'Nutrition education', 'Breastfeeding support', 'Health referrals'],
    eligibility: ['Pregnant/breastfeeding women', 'Children under 5', 'Income at or below 185% FPL'],
    contact: {
      phone: '1-888-942-9675',
      website: 'https://www.cdph.ca.gov/wic'
    }
  },

  // Child Care & Family
  {
    id: 'ca-child-care',
    title: 'California Child Care Program',
    category: 'Childcare',
    description: 'Subsidized child care for working families',
    benefits: ['Subsidized child care', 'After-school programs', 'Preschool programs'],
    eligibility: ['Working parents', 'Income at or below 75% SMI', 'California residents'],
    contact: {
      phone: '1-916-322-6233',
      website: 'https://www.cde.ca.gov/sp/cd'
    }
  },
  {
    id: 'ca-calworks',
    title: 'CalWORKs',
    category: 'Family Support',
    description: 'Cash aid and services for families with children',
    benefits: ['Monthly cash aid', 'Job training', 'Child care assistance', 'Transportation help'],
    eligibility: ['Families with children', 'Low income', 'California residents'],
    contact: {
      phone: '1-877-847-3663',
      website: 'https://www.cdss.ca.gov/calworks'
    }
  },

  // Education
  {
    id: 'ca-cal-grant',
    title: 'Cal Grant Program',
    category: 'Education',
    description: 'Financial aid for California college students',
    benefits: ['Tuition assistance', 'Living allowances', 'Book stipends'],
    eligibility: ['California residents', 'Financial need', 'Academic requirements'],
    contact: {
      phone: '1-888-224-7268',
      website: 'https://www.csac.ca.gov'
    }
  },

  // Energy & Utilities
  {
    id: 'ca-care',
    title: 'California Alternate Rates for Energy (CARE)',
    category: 'Energy',
    description: 'Discounted utility rates for low-income households',
    benefits: ['20% discount on gas and electric bills', 'Medical baseline allowances'],
    eligibility: ['Income at or below 200% FPL', 'California residents'],
    contact: {
      phone: '1-866-675-0239',
      website: 'https://www.cpuc.ca.gov/care'
    }
  },
  {
    id: 'ca-fera',
    title: 'Family Electric Rate Assistance (FERA)',
    category: 'Energy',
    description: 'Discounted electricity rates for families of 3 or more',
    benefits: ['18% discount on electric bills'],
    eligibility: ['Household of 3+ people', 'Income 200-250% FPL'],
    contact: {
      phone: '1-866-675-0239',
      website: 'https://www.cpuc.ca.gov/fera'
    }
  },

  // Transportation
  {
    id: 'ca-reduced-fare',
    title: 'California Reduced Fare Transit',
    category: 'Transportation',
    description: 'Discounted public transportation for seniors and disabled',
    benefits: ['50% off transit fares', 'Paratransit services'],
    eligibility: ['Age 65+', 'Disabled individuals', 'Medicare cardholders'],
    contact: {
      phone: 'Contact local transit agency',
      website: 'https://dot.ca.gov'
    }
  },

  // Mental Health
  {
    id: 'ca-mental-health',
    title: 'California Mental Health Services',
    category: 'Mental Health',
    description: 'Community mental health services and support',
    benefits: ['Counseling services', 'Crisis intervention', 'Peer support', 'Case management'],
    eligibility: ['California residents', 'Uninsured or underinsured', 'Mental health needs'],
    contact: {
      phone: '1-800-854-7771',
      website: 'https://www.dhcs.ca.gov/services/MH'
    }
  },

  // Senior Services
  {
    id: 'ca-aging-services',
    title: 'California Aging and Adult Services',
    category: 'Senior Services',
    description: 'Support services for seniors and adults with disabilities',
    benefits: ['In-home care', 'Adult day care', 'Meals on wheels', 'Transportation'],
    eligibility: ['Age 60+', 'Adults with disabilities', 'Income requirements'],
    contact: {
      phone: '1-916-419-7500',
      website: 'https://www.cdss.ca.gov/adult-protective-services'
    }
  }
];

export default programs;