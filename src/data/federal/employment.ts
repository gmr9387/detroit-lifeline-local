import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'wioa-adult',
    title: 'WIOA Adult Program',
    category: 'Employment',
    description: 'Job training and employment services for adults',
    benefits: ['Career counseling', 'Job search assistance', 'Skills training', 'Supportive services'],
    eligibility: ['Adults 18 and older', 'Priority for low-income individuals', 'US work authorization'],
    contact: {
      phone: '1-877-872-5627',
      website: 'https://www.dol.gov/wioa'
    }
  },
  {
    id: 'wioa-youth',
    title: 'WIOA Youth Program',
    category: 'Employment',
    description: 'Employment and education services for youth',
    benefits: ['Job training', 'Education programs', 'Leadership development', 'Mentoring'],
    eligibility: ['Youth ages 14-24', 'Low income', 'Barriers to employment'],
    contact: {
      phone: '1-877-872-5627',
      website: 'https://www.dol.gov/wioa'
    }
  },
  {
    id: 'wioa-dislocated',
    title: 'WIOA Dislocated Worker Program',
    category: 'Employment',
    description: 'Services for workers who lost jobs',
    benefits: ['Career counseling', 'Job training', 'Relocation assistance', 'Income support'],
    eligibility: ['Laid off workers', 'Displaced homemakers', 'Self-employed with business closure'],
    contact: {
      phone: '1-877-872-5627',
      website: 'https://www.dol.gov/wioa'
    }
  },
  {
    id: 'job-corps',
    title: 'Job Corps',
    category: 'Employment',
    description: 'Free education and vocational training for young people',
    benefits: ['Career training', 'Education', 'Room and board', 'Job placement assistance'],
    eligibility: ['Ages 16-24', 'Low income', 'US citizen or legal resident'],
    contact: {
      phone: '1-800-733-5627',
      website: 'https://www.jobcorps.gov'
    }
  },
  {
    id: 'apprenticeship',
    title: 'Registered Apprenticeship Programs',
    category: 'Employment',
    description: 'Earn while you learn training programs',
    benefits: ['On-the-job training', 'Classroom instruction', 'Wages while learning', 'Industry credentials'],
    eligibility: ['Varies by program', 'Usually 16 or 18 and older', 'Physically able to perform job'],
    contact: {
      phone: '1-877-872-5627',
      website: 'https://www.apprenticeship.gov'
    }
  },
  {
    id: 'reemployment-services',
    title: 'Reemployment Services and Eligibility Assessment',
    category: 'Employment',
    description: 'Services for unemployment insurance recipients',
    benefits: ['Job search assistance', 'Resume help', 'Interview preparation', 'Labor market information'],
    eligibility: ['Receiving unemployment insurance', 'Identified as likely to exhaust benefits'],
    contact: {
      phone: 'Contact state workforce agency',
      website: 'https://www.dol.gov/general/topic/unemployment-insurance'
    }
  }
];

export default programs;
