import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'snap',
    title: 'Supplemental Nutrition Assistance Program (SNAP)',
    category: 'Food',
    description: 'Monthly benefits to help low-income families buy nutritious food',
    benefits: [
      'Monthly food benefits on EBT card',
      'Nutrition education',
      'Farmers market benefits',
      'Restaurant meals (in some areas)',
      'Online grocery purchasing'
    ],
    eligibility: [
      'Income at or below 130% of Federal Poverty Level',
      'Asset limits ($2,750 for most households)',
      'US citizens or qualified immigrants',
      'Work requirements for able-bodied adults'
    ],
    requirements: [
      'Complete application',
      'Provide income verification',
      'Interview (phone or in-person)',
      'Recertification every 6-12 months'
    ],
    contact: {
      phone: '1-800-221-5689',
      website: 'https://www.fns.usda.gov/snap',
      address: '1320 Braddock Place, Alexandria, VA 22314'
    },
    applicationProcess: [
      'Apply at local SNAP office or online',
      'Submit required documents',
      'Complete eligibility interview',
      'Receive EBT card if approved'
    ],
    languages: ['English', 'Spanish', 'Multiple languages available by state']
  },
  {
    id: 'wic',
    title: 'Women, Infants, and Children (WIC)',
    category: 'Food',
    description: 'Nutrition assistance for pregnant women, new mothers, and young children',
    benefits: [
      'Healthy food packages',
      'Nutrition education and counseling',
      'Breastfeeding support',
      'Health screenings and referrals',
      'Immunization screening'
    ],
    eligibility: [
      'Pregnant, breastfeeding, or postpartum women',
      'Infants and children up to age 5',
      'Income at or below 185% of Federal Poverty Level',
      'Nutritional risk assessment'
    ],
    contact: {
      phone: '1-703-305-2746',
      website: 'https://www.fns.usda.gov/wic'
    }
  },
  {
    id: 'school-breakfast',
    title: 'School Breakfast Program',
    category: 'Food',
    description: 'Free or reduced-price breakfast for eligible school children',
    benefits: [
      'Free breakfast for qualifying students',
      'Reduced-price breakfast for moderate-income families',
      'Nutritious meal standards',
      'Summer meal programs'
    ],
    eligibility: [
      'Students in participating schools',
      'Free meals: income at or below 130% FPL',
      'Reduced-price meals: income 130-185% FPL'
    ],
    contact: {
      phone: 'Contact your school or school district',
      website: 'https://www.fns.usda.gov/sbp'
    }
  },
  {
    id: 'school-lunch',
    title: 'National School Lunch Program',
    category: 'Food',
    description: 'Free or reduced-price lunch for eligible school children',
    benefits: [
      'Free lunch for qualifying students',
      'Reduced-price lunch for moderate-income families',
      'Nutritious meal standards',
      'After-school snacks and meals'
    ],
    eligibility: [
      'Students in participating schools',
      'Free meals: income at or below 130% FPL',
      'Reduced-price meals: income 130-185% FPL'
    ],
    contact: {
      phone: 'Contact your school or school district',
      website: 'https://www.fns.usda.gov/nslp'
    }
  },
  {
    id: 'cacfp',
    title: 'Child and Adult Care Food Program',
    category: 'Food',
    description: 'Meals and snacks for children and adults in care settings',
    benefits: [
      'Nutritious meals and snacks',
      'Reimbursement for care providers',
      'Nutrition education',
      'Menu planning assistance'
    ],
    eligibility: [
      'Children in participating child care centers',
      'Adults 60+ or with disabilities in adult day care',
      'Children in after-school programs',
      'Income requirements vary by setting'
    ],
    contact: {
      phone: '1-703-305-2590',
      website: 'https://www.fns.usda.gov/cacfp'
    }
  },
  {
    id: 'summer-food',
    title: 'Summer Food Service Program',
    category: 'Food',
    description: 'Free meals for children during summer months when school is out',
    benefits: [
      'Free breakfast, lunch, and snacks',
      'Meals served at community sites',
      'No application required',
      'Open to all children 18 and under'
    ],
    eligibility: [
      'Children 18 years and under',
      'Served in low-income areas',
      'No income requirements for children'
    ],
    contact: {
      phone: '1-703-305-2590',
      website: 'https://www.fns.usda.gov/sfsp'
    }
  },
  {
    id: 'farmers-market-nutrition',
    title: 'Farmers Market Nutrition Program',
    category: 'Food',
    description: 'Fresh produce coupons for WIC participants and seniors',
    benefits: [
      'Coupons for fresh fruits and vegetables',
      'Access to local farmers markets',
      'Nutrition education',
      'Support for local agriculture'
    ],
    eligibility: [
      'WIC participants (WIC FMNP)',
      'Seniors 60+ with low income (SFMNP)',
      'State program availability varies'
    ],
    contact: {
      phone: 'Contact your state WIC or aging office',
      website: 'https://www.fns.usda.gov/fmnp'
    }
  },
  {
    id: 'commodity-supplemental',
    title: 'Commodity Supplemental Food Program',
    category: 'Food',
    description: 'Monthly food packages for low-income seniors',
    benefits: [
      'Monthly package of nutritious foods',
      'Canned fruits and vegetables',
      'Protein foods',
      'Dairy products',
      'Grains'
    ],
    eligibility: [
      'Adults 60 years and older',
      'Income at or below 130% of Federal Poverty Level',
      'Resident of participating area'
    ],
    contact: {
      phone: 'Contact your state agency',
      website: 'https://www.fns.usda.gov/csfp'
    }
  },
  {
    id: 'food-distribution-indian-reservations',
    title: 'Food Distribution Program on Indian Reservations',
    category: 'Food',
    description: 'USDA commodities for eligible households on reservations',
    benefits: [
      'Monthly food packages',
      'Variety of nutritious foods',
      'Alternative to SNAP',
      'Nutrition education'
    ],
    eligibility: [
      'Live on or near Indian reservation',
      'Member of federally recognized tribe',
      'Income at or below 130% of Federal Poverty Level',
      'Cannot receive both FDPIR and SNAP'
    ],
    contact: {
      phone: 'Contact tribal organization',
      website: 'https://www.fns.usda.gov/fdpir'
    }
  }
];

export default programs;