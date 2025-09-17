import { Program } from '@/types';

export const programs: Program[] = [
  // Healthcare Programs
  {
    id: 'fl-medicaid',
    title: 'Florida Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Florida residents',
    benefits: ['Medical services', 'Hospital care', 'Prescription drugs', 'Mental health services'],
    eligibility: ['Low income families', 'Pregnant women', 'Children', 'Elderly', 'Disabled'],
    requirements: ['Florida residency', 'Income verification', 'Asset limits'],
    contact: {
      phone: '1-866-762-2237',
      website: 'https://ahca.myflorida.com',
      address: '2727 Mahan Drive, Tallahassee, FL 32308'
    },
    applicationProcess: ['Apply at MyAccess.flDHS.gov', 'Submit documents', 'Complete interview'],
    languages: ['English', 'Spanish', 'Haitian Creole']
  },
  {
    id: 'fl-healthy-kids',
    title: 'Florida Healthy Kids',
    category: 'Healthcare',
    description: 'Health insurance for children in working families',
    benefits: ['Medical care', 'Dental care', 'Vision care', 'Prescription drugs'],
    eligibility: ['Children under 19', 'Family income too high for Medicaid', 'Florida residents'],
    contact: {
      phone: '1-888-540-5437',
      website: 'https://www.healthykids.org'
    }
  },

  // Employment & Workforce
  {
    id: 'fl-workforce',
    title: 'CareerSource Florida',
    category: 'Employment',
    description: 'Workforce development and employment services',
    benefits: ['Job placement', 'Skills training', 'Career counseling', 'Unemployment assistance'],
    eligibility: ['Florida residents', 'Job seekers', 'Employers'],
    contact: {
      phone: '1-866-352-2345',
      website: 'https://floridajobs.org'
    }
  },
  {
    id: 'fl-wioa',
    title: 'Florida WIOA Programs',
    category: 'Employment',
    description: 'Workforce Innovation and Opportunity Act programs',
    benefits: ['Job training', 'Education programs', 'Career services', 'Supportive services'],
    eligibility: ['Adults seeking employment', 'Dislocated workers', 'Youth 14-24'],
    contact: {
      phone: '1-866-352-2345',
      website: 'https://floridajobs.org'
    }
  },

  // Housing Programs
  {
    id: 'fl-housing',
    title: 'Florida Housing Finance Corporation',
    category: 'Housing',
    description: 'Affordable housing programs for Floridians',
    benefits: ['First-time homebuyer programs', 'Rental assistance', 'Down payment assistance'],
    eligibility: ['Low to moderate income', 'Florida residents', 'Credit requirements'],
    contact: {
      phone: '1-850-488-4197',
      website: 'https://floridahousing.org'
    }
  },
  {
    id: 'fl-ship',
    title: 'Florida State Housing Initiatives Partnership',
    category: 'Housing',
    description: 'Local housing assistance programs',
    benefits: ['Down payment assistance', 'Rehabilitation assistance', 'New construction'],
    eligibility: ['Very low to moderate income', 'First-time homebuyers'],
    contact: {
      phone: '1-850-488-4197',
      website: 'https://floridahousing.org'
    }
  },

  // Nutrition & Food
  {
    id: 'fl-snap',
    title: 'Florida SNAP Benefits',
    category: 'Food',
    description: 'Monthly food benefits for low-income households',
    benefits: ['Monthly food benefits', 'EBT card', 'Nutrition education'],
    eligibility: ['Low income limits', 'Florida residents', 'Work requirements'],
    contact: {
      phone: '1-866-762-2237',
      website: 'https://www.myflfamilies.com'
    }
  },
  {
    id: 'fl-wic',
    title: 'Florida WIC Program',
    category: 'Food',
    description: 'Nutrition assistance for women, infants, and children',
    benefits: ['Healthy food packages', 'Nutrition education', 'Breastfeeding support', 'Health referrals'],
    eligibility: ['Pregnant/breastfeeding women', 'Children under 5', 'Income at or below 185% FPL'],
    contact: {
      phone: '1-800-342-3556',
      website: 'https://wicflorida.com'
    }
  },

  // Child Care & Family
  {
    id: 'fl-tanf',
    title: 'Florida Temporary Cash Assistance',
    category: 'Family Support',
    description: 'Cash assistance and services for families with children',
    benefits: ['Monthly cash assistance', 'Job training', 'Child care assistance', 'Transportation'],
    eligibility: ['Families with children', 'Very low income', 'Work requirements'],
    contact: {
      phone: '1-866-762-2237',
      website: 'https://www.myflfamilies.com'
    }
  },
  {
    id: 'fl-school-readiness',
    title: 'Florida School Readiness Program',
    category: 'Childcare',
    description: 'Subsidized child care for working families',
    benefits: ['Child care subsidies', 'Quality programs', 'Extended hours'],
    eligibility: ['Working parents', 'Income at or below 150% FPL', 'Florida residents'],
    contact: {
      phone: '1-866-357-3239',
      website: 'https://www.floridaearlylearning.com'
    }
  },

  // Education
  {
    id: 'fl-bright-futures',
    title: 'Florida Bright Futures Scholarship',
    category: 'Education',
    description: 'Merit-based scholarships for Florida students',
    benefits: ['Tuition assistance', 'Renewable awards', 'Multiple award levels'],
    eligibility: ['Florida residents', 'Academic requirements', 'Community service'],
    contact: {
      phone: '1-888-827-2004',
      website: 'https://www.floridastudentfinancialaid.org'
    }
  },
  {
    id: 'fl-ease',
    title: 'Florida Effective Access to Student Education (EASE)',
    category: 'Education',
    description: 'Need-based financial aid for private college students',
    benefits: ['Tuition assistance', 'Need-based awards'],
    eligibility: ['Florida residents', 'Attend eligible private institutions', 'Financial need'],
    contact: {
      phone: '1-888-827-2004',
      website: 'https://www.floridastudentfinancialaid.org'
    }
  },

  // Energy & Utilities
  {
    id: 'fl-liheap',
    title: 'Florida Low Income Home Energy Assistance',
    category: 'Energy',
    description: 'Help with energy bills and weatherization',
    benefits: ['Utility bill assistance', 'Weatherization services', 'Energy crisis help'],
    eligibility: ['Income at or below 150% FPL', 'Florida residents'],
    contact: {
      phone: '1-866-762-2237',
      website: 'https://www.floridacommunityaction.org'
    }
  },

  // Mental Health
  {
    id: 'fl-mental-health',
    title: 'Florida Mental Health Services',
    category: 'Mental Health',
    description: 'Community mental health and substance abuse services',
    benefits: ['Counseling services', 'Crisis intervention', 'Substance abuse treatment'],
    eligibility: ['Florida residents', 'Mental health or substance abuse needs'],
    contact: {
      phone: '1-850-717-9000',
      website: 'https://www.myflfamilies.com'
    }
  },

  // Senior Services
  {
    id: 'fl-aging',
    title: 'Florida Department of Elder Affairs',
    category: 'Senior Services',
    description: 'Support services for seniors',
    benefits: ['In-home care', 'Adult day care', 'Meals programs', 'Transportation'],
    eligibility: ['Age 60+', 'Income requirements for some services'],
    contact: {
      phone: '1-850-414-2000',
      website: 'https://elderaffairs.org'
    }
  },

  // Disability Services
  {
    id: 'fl-apo',
    title: 'Florida Agency for Persons with Disabilities',
    category: 'Disability',
    description: 'Services for people with developmental disabilities',
    benefits: ['Residential services', 'Day programs', 'Support coordination', 'Respite care'],
    eligibility: ['Developmental disabilities', 'Florida residents'],
    contact: {
      phone: '1-850-488-4257',
      website: 'https://apd.myflorida.com'
    }
  },

  // Veterans Services
  {
    id: 'fl-veterans',
    title: 'Florida Department of Veterans Affairs',
    category: 'Veterans',
    description: 'Comprehensive services for Florida veterans',
    benefits: ['Benefits assistance', 'Claims help', 'Employment services', 'Healthcare'],
    eligibility: ['Florida veterans', 'Military service members', 'Dependents'],
    contact: {
      phone: '1-727-319-7440',
      website: 'https://floridavets.org'
    }
  }
];

export default programs;