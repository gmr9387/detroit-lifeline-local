import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'va-disability',
    title: 'VA Disability Compensation',
    category: 'Veterans',
    description: 'Monthly tax-free payments for veterans with service-connected disabilities',
    benefits: [
      'Monthly tax-free payments',
      'Healthcare coverage',
      'Vocational rehabilitation',
      'Dependent benefits',
      'Cost of living adjustments'
    ],
    eligibility: [
      'Military service in active duty, National Guard, or Reserves',
      'Service-connected disability or injury',
      'Honorable discharge or other qualifying discharge'
    ],
    requirements: [
      'Medical evidence of disability',
      'Service medical records',
      'Current medical examination'
    ],
    contact: {
      phone: '1-800-827-1000',
      website: 'https://www.va.gov/disability',
      address: '810 Vermont Avenue, NW, Washington, DC 20420'
    },
    applicationProcess: [
      'File claim online at VA.gov',
      'Submit supporting evidence',
      'Attend C&P examination if scheduled',
      'Receive decision letter'
    ],
    languages: ['English', 'Spanish']
  },
  {
    id: 'va-home-loan',
    title: 'VA Home Loan Guaranty',
    category: 'Housing',
    description: 'Zero down payment home loans for eligible veterans and service members',
    benefits: [
      'No down payment required',
      'No private mortgage insurance',
      'Competitive interest rates',
      'Reusable benefit',
      'Assumable loans'
    ],
    eligibility: [
      'Qualifying military service',
      'Certificate of Eligibility',
      'Sufficient income and credit',
      'Intent to occupy as primary residence'
    ],
    contact: {
      phone: '1-877-827-3702',
      website: 'https://www.va.gov/housing-assistance'
    }
  },
  {
    id: 'gi-bill',
    title: 'Post-9/11 GI Bill',
    category: 'Education',
    description: 'Education benefits for veterans and their families',
    benefits: [
      'Tuition and fees',
      'Monthly housing allowance',
      'Books and supplies stipend',
      'Transferability to dependents',
      'Yellow Ribbon Program'
    ],
    eligibility: [
      '90 days of active duty service after 9/10/2001',
      'Honorable discharge',
      'Currently serving on active duty'
    ],
    contact: {
      phone: '1-888-442-4551',
      website: 'https://www.va.gov/education'
    }
  },
  {
    id: 'va-healthcare',
    title: 'VA Healthcare',
    category: 'Healthcare',
    description: 'Comprehensive healthcare services for eligible veterans',
    benefits: [
      'Primary care services',
      'Specialty care',
      'Mental health services',
      'Prescription medications',
      'Emergency care'
    ],
    eligibility: [
      'Qualifying military service',
      'Honorable discharge or qualifying discharge',
      'Enrollment in VA healthcare system'
    ],
    contact: {
      phone: '1-877-222-8387',
      website: 'https://www.va.gov/health-care'
    }
  },
  {
    id: 'va-pension',
    title: 'VA Pension',
    category: 'Veterans',
    description: 'Need-based benefit for wartime veterans with limited income',
    benefits: [
      'Monthly payments',
      'Aid and Attendance benefits',
      'Housebound benefits',
      'Survivor benefits'
    ],
    eligibility: [
      'Wartime service',
      '65 years or older OR permanently disabled',
      'Low income and limited assets',
      'Discharge other than dishonorable'
    ],
    contact: {
      phone: '1-800-827-1000',
      website: 'https://www.va.gov/pension'
    }
  },
  {
    id: 'va-vocational-rehab',
    title: 'Vocational Rehabilitation and Employment (VR&E)',
    category: 'Employment',
    description: 'Job training and placement services for disabled veterans',
    benefits: [
      'Career counseling',
      'Job training',
      'Education assistance',
      'Job placement support',
      'Small business loans'
    ],
    eligibility: [
      'Service-connected disability rating of 20% or higher',
      'Honorable discharge',
      'Employment handicap due to disability'
    ],
    contact: {
      phone: '1-800-827-1000',
      website: 'https://www.va.gov/careers-employment'
    }
  },
  {
    id: 'va-life-insurance',
    title: 'VA Life Insurance',
    category: 'Insurance',
    description: 'Low-cost life insurance for veterans and service members',
    benefits: [
      'Competitive premium rates',
      'No medical exam required (SGLI)',
      'Coverage up to $400,000',
      'Permanent and term options'
    ],
    eligibility: [
      'Current or former military service',
      'Good health (for some programs)',
      'Within application timeframes'
    ],
    contact: {
      phone: '1-800-669-8477',
      website: 'https://www.va.gov/life-insurance'
    }
  },
  {
    id: 'va-burial-benefits',
    title: 'VA Burial and Memorial Benefits',
    category: 'Veterans',
    description: 'Burial and memorial services for eligible veterans',
    benefits: [
      'Burial in national cemetery',
      'Grave marker or headstone',
      'Burial flag',
      'Burial allowance',
      'Presidential Memorial Certificate'
    ],
    eligibility: [
      'Qualifying military service',
      'Discharge other than dishonorable',
      'Death related to military service (for some benefits)'
    ],
    contact: {
      phone: '1-800-827-1000',
      website: 'https://www.va.gov/burials-memorials'
    }
  }
];

export default programs;