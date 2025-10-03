import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'pell-grant',
    title: 'Federal Pell Grant',
    category: 'Education',
    description: 'Need-based grants for undergraduate students',
    benefits: ['Up to $7,395 per year', 'Does not need to be repaid', 'Available for eligible programs'],
    eligibility: ['Undergraduate students', 'Exceptional financial need', 'US citizens or eligible non-citizens'],
    contact: {
      phone: '1-800-433-3243',
      website: 'https://studentaid.gov/pell-grants'
    }
  },
  {
    id: 'fseog',
    title: 'Federal Supplemental Educational Opportunity Grant',
    category: 'Education',
    description: 'Additional grant for students with exceptional need',
    benefits: ['$100 to $4,000 per year', 'Priority for Pell Grant recipients', 'No repayment required'],
    eligibility: ['Undergraduate students', 'Exceptional financial need', 'Pell-eligible students prioritized'],
    contact: {
      phone: '1-800-433-3243',
      website: 'https://studentaid.gov/fseog'
    }
  },
  {
    id: 'teach-grant',
    title: 'TEACH Grant',
    category: 'Education',
    description: 'Grants for students who agree to teach in high-need fields',
    benefits: ['Up to $4,000 per year', 'For future teachers', 'Specific teaching requirements'],
    eligibility: ['Students in teaching programs', 'Commitment to teach 4 years', 'High-need subject areas'],
    contact: {
      phone: '1-800-433-3243',
      website: 'https://studentaid.gov/teach-grant'
    }
  },
  {
    id: 'federal-work-study',
    title: 'Federal Work-Study',
    category: 'Education',
    description: 'Part-time jobs for students with financial need',
    benefits: ['Part-time employment', 'On or off campus', 'Related to course of study when possible'],
    eligibility: ['Undergraduate and graduate students', 'Financial need', 'Enrolled at least half-time'],
    contact: {
      phone: '1-800-433-3243',
      website: 'https://studentaid.gov/work-study'
    }
  },
  {
    id: 'head-start',
    title: 'Head Start',
    category: 'Education',
    description: 'Early childhood education for low-income families',
    benefits: ['Preschool education', 'Health screenings', 'Nutrition services', 'Parent involvement programs'],
    eligibility: ['Children ages 3-5', 'Income at or below poverty line', 'Children with disabilities'],
    contact: {
      phone: '1-866-763-6481',
      website: 'https://www.acf.hhs.gov/ohs'
    }
  },
  {
    id: 'trio-programs',
    title: 'TRIO Programs',
    category: 'Education',
    description: 'Educational opportunity programs for disadvantaged students',
    benefits: ['Academic tutoring', 'College preparation', 'Financial aid guidance', 'Mentoring'],
    eligibility: ['Low-income students', 'First-generation college students', 'Students with disabilities'],
    contact: {
      phone: '1-800-872-5327',
      website: 'https://www2.ed.gov/trio'
    }
  },
  {
    id: 'adult-education',
    title: 'Adult Education and Literacy',
    category: 'Education',
    description: 'Basic education and literacy programs for adults',
    benefits: ['GED preparation', 'English as Second Language', 'Basic literacy', 'Workforce preparation'],
    eligibility: ['Adults 16 and older', 'Not enrolled in school', 'No high school diploma'],
    contact: {
      phone: '1-800-872-5327',
      website: 'https://www.ed.gov/adult-education'
    }
  }
];

export default programs;
