import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'ma-masshealth',
    title: 'MassHealth',
    category: 'Healthcare',
    description: 'Massachusetts Medicaid and CHIP program',
    benefits: ['Medical care', 'Dental care', 'Vision care', 'Prescriptions'],
    eligibility: ['Massachusetts residents', 'Income requirements'],
    contact: {
      phone: '1-800-841-2900',
      website: 'https://www.mass.gov/masshealth'
    }
  },
  {
    id: 'ma-snap',
    title: 'Massachusetts SNAP',
    category: 'Food',
    description: 'Food assistance benefits',
    benefits: ['Monthly food benefits', 'EBT card'],
    eligibility: ['Low income', 'Massachusetts residents'],
    contact: {
      phone: '1-877-382-2363',
      website: 'https://www.mass.gov/dta'
    }
  },
  {
    id: 'ma-tafdc',
    title: 'Massachusetts TAFDC',
    category: 'Family Support',
    description: 'Transitional Aid to Families with Dependent Children',
    benefits: ['Cash assistance', 'Job training'],
    eligibility: ['Families with children', 'Low income'],
    contact: {
      phone: '1-877-382-2363',
      website: 'https://www.mass.gov/dta'
    }
  },
  {
    id: 'ma-fuel',
    title: 'Massachusetts Fuel Assistance',
    category: 'Energy',
    description: 'Help with heating costs',
    benefits: ['Heating assistance', 'Crisis intervention'],
    eligibility: ['Low income', 'Massachusetts residents'],
    contact: {
      phone: '1-800-632-8175',
      website: 'https://www.mass.gov/tafdc'
    }
  }
];

export default programs;
