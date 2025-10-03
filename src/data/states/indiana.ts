import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'in-medicaid',
    title: 'Indiana Medicaid',
    category: 'Healthcare',
    description: 'Healthcare coverage including Hoosier Healthwise and HIP',
    benefits: ['Medical care', 'Dental care', 'Vision care', 'Prescriptions'],
    eligibility: ['Indiana residents', 'Income requirements'],
    contact: {
      phone: '1-800-889-9949',
      website: 'https://www.in.gov/fssa/ompp'
    }
  },
  {
    id: 'in-snap',
    title: 'Indiana SNAP',
    category: 'Food',
    description: 'Food assistance benefits',
    benefits: ['Monthly food benefits', 'Hoosier Works card'],
    eligibility: ['Low income', 'Indiana residents'],
    contact: {
      phone: '1-800-403-0864',
      website: 'https://www.in.gov/fssa'
    }
  },
  {
    id: 'in-tanf',
    title: 'Indiana TANF',
    category: 'Family Support',
    description: 'Temporary cash assistance',
    benefits: ['Cash assistance', 'Work programs'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-800-403-0864',
      website: 'https://www.in.gov/fssa'
    }
  }
];

export default programs;
