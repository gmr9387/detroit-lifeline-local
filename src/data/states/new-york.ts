import { Program } from '@/types';

export const programs: Program[] = [
  // Healthcare Programs
  {
    id: 'ny-medicaid',
    title: 'New York State Medicaid',
    category: 'Healthcare',
    description: 'Comprehensive healthcare coverage for eligible New Yorkers',
    benefits: ['Medical services', 'Prescription drugs', 'Mental health care', 'Dental care', 'Vision care'],
    eligibility: ['New York residents', 'Income requirements', 'Citizenship/immigration status'],
    requirements: ['Proof of income', 'Proof of residency', 'Social Security Number'],
    contact: {
      phone: '1-855-355-5777',
      website: 'https://health.ny.gov',
      address: 'Empire State Plaza, Albany, NY 12237'
    },
    applicationProcess: ['Apply at NY State of Health', 'Submit documents', 'Complete enrollment'],
    languages: ['English', 'Spanish', 'Chinese', 'Russian', 'Korean']
  },
  {
    id: 'ny-essential-plan',
    title: 'New York Essential Plan',
    category: 'Healthcare',
    description: 'Low-cost health insurance for New Yorkers',
    benefits: ['Comprehensive health coverage', 'Low monthly premiums', 'Prescription drug coverage'],
    eligibility: ['Income 138-200% FPL', 'Not eligible for Medicaid'],
    contact: {
      phone: '1-855-355-5777',
      website: 'https://nystateofhealth.ny.gov'
    }
  },

  // Employment & Workforce
  {
    id: 'ny-dol',
    title: 'New York State Department of Labor',
    category: 'Employment',
    description: 'Employment services and workforce development programs',
    benefits: ['Unemployment insurance', 'Job training', 'Career services', 'Disability benefits'],
    eligibility: ['New York workers', 'Job seekers'],
    contact: {
      phone: '1-888-469-7365',
      website: 'https://dol.ny.gov'
    }
  },
  {
    id: 'ny-wioa',
    title: 'New York WIOA Programs',
    category: 'Employment',
    description: 'Workforce development and training programs',
    benefits: ['Skills training', 'On-the-job training', 'Career counseling', 'Supportive services'],
    eligibility: ['Adults seeking employment', 'Dislocated workers', 'Youth'],
    contact: {
      phone: '1-518-457-6821',
      website: 'https://labor.ny.gov'
    }
  },

  // Housing Programs
  {
    id: 'ny-housing',
    title: 'New York State Homes and Community Renewal',
    category: 'Housing',
    description: 'Affordable housing programs and rental assistance',
    benefits: ['Public housing', 'Section 8 vouchers', 'First-time homebuyer programs', 'Rent stabilization'],
    eligibility: ['Low income households', 'New York residents'],
    contact: {
      phone: '1-866-275-3427',
      website: 'https://hcr.ny.gov'
    }
  },
  {
    id: 'ny-erap',
    title: 'New York Emergency Rental Assistance Program',
    category: 'Housing',
    description: 'Emergency rental and utility assistance',
    benefits: ['Back rent assistance', 'Utility assistance', 'Future rent payments'],
    eligibility: ['COVID-19 impact', 'Income at or below 80% AMI', 'Risk of homelessness'],
    contact: {
      phone: '1-844-691-7368',
      website: 'https://otda.ny.gov/programs/emergency-rental-assistance'
    }
  },

  // Nutrition & Food
  {
    id: 'ny-snap',
    title: 'New York SNAP Benefits',
    category: 'Food',
    description: 'Monthly food benefits for low-income households',
    benefits: ['Monthly food benefits', 'EBT card', 'Nutrition education'],
    eligibility: ['Low income limits', 'New York residents', 'Work requirements'],
    contact: {
      phone: '1-800-342-3009',
      website: 'https://otda.ny.gov/programs/snap'
    }
  },
  {
    id: 'ny-wic',
    title: 'New York WIC Program',
    category: 'Food',
    description: 'Nutrition assistance for women, infants, and children',
    benefits: ['Healthy food packages', 'Nutrition counseling', 'Breastfeeding support', 'Health referrals'],
    eligibility: ['Pregnant/breastfeeding women', 'Children under 5', 'Income at or below 185% FPL'],
    contact: {
      phone: '1-800-522-5006',
      website: 'https://www.health.ny.gov/prevention/nutrition/wic'
    }
  },

  // Child Care & Family
  {
    id: 'ny-tanf',
    title: 'New York Temporary Assistance',
    category: 'Family Support',
    description: 'Cash assistance and services for families',
    benefits: ['Monthly cash assistance', 'Job training', 'Child care assistance', 'Transportation'],
    eligibility: ['Families with children', 'Low income', 'Work requirements'],
    contact: {
      phone: '1-800-342-3009',
      website: 'https://otda.ny.gov/programs/temporary-assistance'
    }
  },
  {
    id: 'ny-child-care',
    title: 'New York Child Care Assistance',
    category: 'Childcare',
    description: 'Subsidized child care for working families',
    benefits: ['Child care subsidies', 'Quality programs', 'Extended hours care'],
    eligibility: ['Working parents', 'Income limits', 'New York residents'],
    contact: {
      phone: '1-800-342-3009',
      website: 'https://otda.ny.gov/programs/child-care'
    }
  },

  // Education
  {
    id: 'ny-tap',
    title: 'New York Tuition Assistance Program (TAP)',
    category: 'Education',
    description: 'Financial aid for New York college students',
    benefits: ['Tuition assistance', 'Renewable awards', 'No repayment required'],
    eligibility: ['New York residents', 'Attend approved NY schools', 'Financial need'],
    contact: {
      phone: '1-888-697-4372',
      website: 'https://www.hesc.ny.gov'
    }
  },
  {
    id: 'ny-excelsior',
    title: 'New York Excelsior Scholarship',
    category: 'Education',
    description: 'Free tuition at SUNY and CUNY schools',
    benefits: ['Full tuition coverage', 'SUNY/CUNY eligibility', 'Stay-in-state commitment'],
    eligibility: ['New York residents', 'Family income under $125,000', 'Academic requirements'],
    contact: {
      phone: '1-888-697-4372',
      website: 'https://www.hesc.ny.gov'
    }
  },

  // Energy & Utilities
  {
    id: 'ny-heap',
    title: 'New York Home Energy Assistance Program',
    category: 'Energy',
    description: 'Help with heating and cooling costs',
    benefits: ['Heating assistance', 'Cooling assistance', 'Energy crisis intervention'],
    eligibility: ['Income at or below 60% SMI', 'New York residents'],
    contact: {
      phone: '1-800-342-3009',
      website: 'https://otda.ny.gov/programs/heap'
    }
  },

  // Mental Health
  {
    id: 'ny-mental-health',
    title: 'New York State Mental Health Services',
    category: 'Mental Health',
    description: 'Community mental health and addiction services',
    benefits: ['Counseling services', 'Crisis intervention', 'Substance abuse treatment', 'Peer support'],
    eligibility: ['New York residents', 'Mental health or substance abuse needs'],
    contact: {
      phone: '1-800-597-8481',
      website: 'https://omh.ny.gov'
    }
  },

  // Senior Services
  {
    id: 'ny-aging',
    title: 'New York State Office for the Aging',
    category: 'Senior Services',
    description: 'Support services for seniors',
    benefits: ['In-home services', 'Adult day care', 'Meals programs', 'Transportation'],
    eligibility: ['Age 60+', 'Income requirements for some services'],
    contact: {
      phone: '1-800-342-9871',
      website: 'https://aging.ny.gov'
    }
  },

  // Transportation
  {
    id: 'ny-reduced-fare',
    title: 'New York Reduced Fare MetroCard',
    category: 'Transportation',
    description: 'Discounted public transportation for seniors and disabled',
    benefits: ['50% off subway and bus fares', 'Access-A-Ride eligibility'],
    eligibility: ['Age 65+', 'Disabled individuals', 'Medicare recipients'],
    contact: {
      phone: '1-718-243-4999',
      website: 'https://new.mta.info/fares/reduced-fare'
    }
  }
];

export default programs;