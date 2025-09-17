import { Program } from '@/types';

export const programs: Program[] = [
  // Healthcare Programs
  {
    id: 'al-medicaid',
    title: 'Alabama Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage for eligible Alabama residents',
    benefits: ['Medical care', 'Prescription drugs', 'Hospital services', 'Emergency care'],
    eligibility: ['Low income', 'Pregnant women', 'Children', 'Elderly', 'Disabled'],
    requirements: ['Alabama residency', 'Income verification', 'Asset limits'],
    contact: {
      phone: '1-855-692-5447',
      website: 'https://medicaid.alabama.gov',
      address: '501 Dexter Avenue, Montgomery, AL 36103'
    },
    applicationProcess: ['Apply online or in person', 'Submit required documents', 'Complete eligibility interview'],
    languages: ['English', 'Spanish']
  },
  {
    id: 'al-all-kids',
    title: 'Alabama ALL Kids',
    category: 'Healthcare',
    description: 'Health insurance for children and pregnant women',
    benefits: ['Medical care', 'Dental care', 'Vision care', 'Prescription drugs'],
    eligibility: ['Children under 19', 'Pregnant women', 'Income requirements'],
    contact: {
      phone: '1-888-373-5437',
      website: 'https://www.allkidsinsurance.com'
    }
  },

  // Employment & Workforce
  {
    id: 'al-workforce',
    title: 'Alabama Career Center System',
    category: 'Employment',
    description: 'Job training and employment services',
    benefits: ['Job search assistance', 'Skills training', 'Career counseling', 'Resume help'],
    eligibility: ['Job seekers', 'Career changers', 'Displaced workers'],
    contact: {
      phone: '1-866-234-5627',
      website: 'https://labor.alabama.gov'
    }
  },
  {
    id: 'al-wioa',
    title: 'Alabama WIOA Programs',
    category: 'Employment',
    description: 'Workforce development and training programs',
    benefits: ['Occupational training', 'On-the-job training', 'Career services', 'Supportive services'],
    eligibility: ['Adults seeking employment', 'Dislocated workers', 'Youth'],
    contact: {
      phone: '1-866-234-5627',
      website: 'https://labor.alabama.gov'
    }
  },

  // Housing Programs
  {
    id: 'al-housing',
    title: 'Alabama Housing Finance Authority',
    category: 'Housing',
    description: 'Affordable housing programs for Alabamians',
    benefits: ['First-time homebuyer loans', 'Down payment assistance', 'Affordable rentals'],
    eligibility: ['Low to moderate income', 'Alabama residents', 'Credit requirements'],
    contact: {
      phone: '1-334-244-9200',
      website: 'https://www.ahfa.com'
    }
  },

  // Nutrition & Food
  {
    id: 'al-snap',
    title: 'Alabama SNAP Benefits',
    category: 'Food',
    description: 'Monthly food benefits for low-income households',
    benefits: ['Monthly food benefits', 'EBT card', 'Nutrition education'],
    eligibility: ['Low income limits', 'Alabama residents', 'Work requirements'],
    contact: {
      phone: '1-800-382-0499',
      website: 'https://www.dhr.alabama.gov'
    }
  },
  {
    id: 'al-wic',
    title: 'Alabama WIC Program',
    category: 'Food',
    description: 'Nutrition assistance for women, infants, and children',
    benefits: ['Healthy food packages', 'Nutrition counseling', 'Breastfeeding support', 'Health referrals'],
    eligibility: ['Pregnant/breastfeeding women', 'Children under 5', 'Income at or below 185% FPL'],
    contact: {
      phone: '1-800-627-1461',
      website: 'https://www.alabamapublichealth.gov/wic'
    }
  },

  // Child Care & Family
  {
    id: 'al-tanf',
    title: 'Alabama Temporary Assistance',
    category: 'Family Support',
    description: 'Cash assistance and services for families with children',
    benefits: ['Monthly cash assistance', 'Job training', 'Child care assistance', 'Transportation'],
    eligibility: ['Families with children', 'Very low income', 'Work requirements'],
    contact: {
      phone: '1-800-382-0499',
      website: 'https://www.dhr.alabama.gov'
    }
  },
  {
    id: 'al-child-care',
    title: 'Alabama Child Care Services',
    category: 'Childcare',
    description: 'Subsidized child care for working families',
    benefits: ['Child care subsidies', 'Quality programs', 'Extended hours care'],
    eligibility: ['Working parents', 'Income limits', 'Alabama residents'],
    contact: {
      phone: '1-800-382-0499',
      website: 'https://www.dhr.alabama.gov'
    }
  },

  // Education
  {
    id: 'al-student-grant',
    title: 'Alabama Student Grant Program',
    category: 'Education',
    description: 'Need-based financial aid for Alabama students',
    benefits: ['Tuition assistance', 'Renewable grants', 'Private school eligibility'],
    eligibility: ['Alabama residents', 'Financial need', 'Satisfactory academic progress'],
    contact: {
      phone: '1-334-242-2273',
      website: 'https://www.ache.alabama.gov'
    }
  },

  // Energy & Utilities
  {
    id: 'al-liheap',
    title: 'Alabama Low Income Home Energy Assistance',
    category: 'Energy',
    description: 'Help with energy bills and weatherization',
    benefits: ['Utility bill assistance', 'Weatherization services', 'Energy crisis help'],
    eligibility: ['Income at or below 150% FPL', 'Alabama residents'],
    contact: {
      phone: '1-800-382-0499',
      website: 'https://www.alabamacaa.org'
    }
  },

  // Mental Health
  {
    id: 'al-mental-health',
    title: 'Alabama Department of Mental Health',
    category: 'Mental Health',
    description: 'Community mental health and substance abuse services',
    benefits: ['Counseling services', 'Crisis intervention', 'Substance abuse treatment'],
    eligibility: ['Alabama residents', 'Mental health or substance abuse needs'],
    contact: {
      phone: '1-334-242-3454',
      website: 'https://mh.alabama.gov'
    }
  },

  // Senior Services
  {
    id: 'al-aging',
    title: 'Alabama Department of Senior Services',
    category: 'Senior Services',
    description: 'Support services for seniors',
    benefits: ['In-home services', 'Adult day care', 'Meals programs', 'Transportation'],
    eligibility: ['Age 60+', 'Income requirements for some services'],
    contact: {
      phone: '1-877-425-2243',
      website: 'https://www.alabamaaging.gov'
    }
  }
];

export default programs;