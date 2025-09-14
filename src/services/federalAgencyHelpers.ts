/**
 * Helper functions for federal agency API integrations
 */
import type { BenefitProgram } from './apiClient';

export function normalizeFederalAgencyData(data: any, agency: string, category?: string): BenefitProgram[] {
  const programs: BenefitProgram[] = [];
  
  switch (agency) {
    case 'veterans':
      return normalizeVAData(data, category);
    case 'energy':
      return normalizeEnergyData(data, category);
    case 'grants':
      return normalizeGrantsData(data, category);
    case 'agriculture':
      return normalizeAgricultureData(data, category);
    case 'labor':
      return normalizeLaborData(data, category);
    case 'education':
      return normalizeEducationData(data, category);
    case 'healthcare':
      return normalizeHealthcareData(data, category);
    case 'disaster':
      return normalizeDisasterData(data, category);
    case 'tribal':
      return normalizeTribalData(data, category);
    case 'disability':
      return normalizeDisabilityData(data, category);
    default:
      return [];
  }
}

function normalizeVAData(data: any, category?: string): BenefitProgram[] {
  const programs: BenefitProgram[] = [];
  
  // VA benefits normalization
  const vaPrograms = [
    {
      id: 'va-disability-compensation',
      title: 'VA Disability Compensation',
      category: 'Healthcare',
      description: 'Monthly tax-free payments for veterans with service-connected disabilities',
      benefits: ['Monthly payments', 'Healthcare coverage', 'Vocational rehabilitation'],
      eligibility: ['Military service', 'Service-connected disability', 'Honorable discharge'],
      requirements: ['VA disability rating', 'Medical evidence', 'Service records'],
      contact: {
        phone: '1-800-827-1000',
        website: 'https://www.va.gov/disability',
        hours: '24/7'
      },
      applicationProcess: {
        steps: ['File VA Form 21-526EZ', 'Submit evidence', 'Attend C&P exam', 'Receive decision'],
        estimatedTime: '125.6 days average',
        applicationUrl: 'https://www.va.gov/disability/file-disability-claim-form-21-526ez'
      },
      eligibilityTags: ['veteran', 'disabled', 'service_connected'],
      audienceTier: 'safety_net',
      source: 'Department of Veterans Affairs'
    },
    {
      id: 'va-home-loan',
      title: 'VA Home Loan Program',
      category: 'Housing',
      description: 'Zero down payment home loans for eligible veterans and service members',
      benefits: ['No down payment', 'No PMI', 'Competitive rates', 'No prepayment penalty'],
      eligibility: ['Military service', 'Sufficient entitlement', 'Credit requirements', 'Income requirements'],
      requirements: ['Certificate of Eligibility', 'Qualifying credit score', 'Stable income'],
      contact: {
        phone: '1-877-827-3702',
        website: 'https://www.va.gov/housing-assistance',
        hours: 'Mon-Fri 8AM-6PM ET'
      },
      applicationProcess: {
        steps: ['Get COE', 'Find VA-approved lender', 'Apply for loan', 'Close on home'],
        estimatedTime: '30-45 days',
        applicationUrl: 'https://www.va.gov/housing-assistance/home-loans'
      },
      eligibilityTags: ['veteran', 'home_buyer', 'military'],
      audienceTier: 'worker',
      source: 'Department of Veterans Affairs'
    }
  ];
  
  return vaPrograms.filter(program => 
    !category || program.category.toLowerCase().includes(category.toLowerCase())
  );
}

function normalizeEnergyData(data: any, category?: string): BenefitProgram[] {
  const programs = [
    {
      id: 'weatherization-assistance',
      title: 'Weatherization Assistance Program',
      category: 'Energy',
      description: 'Free weatherization services to improve energy efficiency for low-income households',
      benefits: ['Free insulation', 'Air sealing', 'Heating system improvements', 'Energy savings'],
      eligibility: ['Low income (at or below 200% of poverty level)', 'Homeowner or renter with landlord permission'],
      requirements: ['Income verification', 'Energy audit', 'Property inspection'],
      contact: {
        phone: '1-877-337-3463',
        website: 'https://www.energy.gov/eere/wap',
        hours: 'Mon-Fri 9AM-5PM ET'
      },
      applicationProcess: {
        steps: ['Contact local agency', 'Complete application', 'Schedule audit', 'Complete work'],
        estimatedTime: '2-6 months',
        applicationUrl: 'https://www.energy.gov/eere/wap/weatherization-assistance-program'
      },
      eligibilityTags: ['low_income', 'homeowner', 'energy_efficiency'],
      audienceTier: 'safety_net',
      source: 'Department of Energy'
    },
    {
      id: 'liheap-energy-assistance',
      title: 'Low Income Home Energy Assistance Program (LIHEAP)',
      category: 'Energy',
      description: 'Help with heating and cooling energy costs for low-income households',
      benefits: ['Utility bill assistance', 'Energy crisis intervention', 'Weatherization'],
      eligibility: ['Low income households', 'US citizen or legal resident'],
      requirements: ['Income documentation', 'Utility bills', 'Social Security numbers'],
      contact: {
        phone: '1-866-674-6327',
        website: 'https://www.acf.hhs.gov/ocs/programs/liheap',
        hours: 'Mon-Fri 8AM-5PM local time'
      },
      applicationProcess: {
        steps: ['Contact local LIHEAP office', 'Complete application', 'Provide documentation', 'Receive assistance'],
        estimatedTime: '2-4 weeks',
        applicationUrl: 'https://www.acf.hhs.gov/ocs/programs/liheap'
      },
      eligibilityTags: ['low_income', 'utility_assistance', 'energy_bills'],
      audienceTier: 'safety_net',
      source: 'Department of Health and Human Services'
    }
  ];
  
  return programs.filter(program => 
    !category || program.category.toLowerCase().includes(category.toLowerCase())
  );
}

function normalizeGrantsData(data: any, category?: string): BenefitProgram[] {
  const programs = [
    {
      id: 'pell-grant',
      title: 'Federal Pell Grant',
      category: 'Education',
      description: 'Need-based federal grant for undergraduate students that does not need to be repaid',
      benefits: ['Up to $7,395 per year', 'No repayment required', 'Available for multiple years'],
      eligibility: ['Undergraduate students', 'Exceptional financial need', 'US citizen or eligible non-citizen'],
      requirements: ['FAFSA completion', 'Enrollment in eligible program', 'Satisfactory academic progress'],
      contact: {
        phone: '1-800-433-3243',
        website: 'https://studentaid.gov/understand-aid/types/grants/pell',
        hours: '24/7'
      },
      applicationProcess: {
        steps: ['Complete FAFSA', 'Review Student Aid Report', 'Accept grant offer', 'Maintain eligibility'],
        estimatedTime: '1-3 weeks after FAFSA',
        applicationUrl: 'https://studentaid.gov/h/apply-for-aid/fafsa'
      },
      eligibilityTags: ['student', 'low_income', 'undergraduate', 'education'],
      audienceTier: 'worker',
      source: 'Department of Education'
    }
  ];
  
  return programs.filter(program => 
    !category || program.category.toLowerCase().includes(category.toLowerCase())
  );
}

function normalizeAgricultureData(data: any, category?: string): BenefitProgram[] {
  const programs = [
    {
      id: 'snap-food-assistance',
      title: 'Supplemental Nutrition Assistance Program (SNAP)',
      category: 'Food',
      description: 'Monthly benefits to help low-income families buy nutritious food',
      benefits: ['Monthly food benefits', 'EBT card for purchases', 'Nutrition education'],
      eligibility: ['Low income limits', 'Resource limits', 'Work requirements for able-bodied adults'],
      requirements: ['Income verification', 'Identity proof', 'Residency verification'],
      contact: {
        phone: '1-800-221-5689',
        website: 'https://www.fns.usda.gov/snap',
        hours: 'Mon-Fri 7AM-10PM ET'
      },
      applicationProcess: {
        steps: ['Apply at local office or online', 'Complete interview', 'Provide documents', 'Receive EBT card'],
        estimatedTime: '30 days or less',
        applicationUrl: 'https://www.fns.usda.gov/snap/apply'
      },
      eligibilityTags: ['low_income', 'food_assistance', 'families'],
      audienceTier: 'safety_net',
      source: 'USDA Food and Nutrition Service'
    }
  ];
  
  return programs.filter(program => 
    !category || program.category.toLowerCase().includes(category.toLowerCase())
  );
}

function normalizeLaborData(data: any, category?: string): BenefitProgram[] {
  const programs = [
    {
      id: 'unemployment-insurance',
      title: 'Unemployment Insurance',
      category: 'Employment',
      description: 'Temporary financial assistance for workers who lost their job through no fault of their own',
      benefits: ['Weekly benefit payments', 'Job search assistance', 'Training opportunities'],
      eligibility: ['Lost job through no fault', 'Meet work/wage requirements', 'Able and available to work'],
      requirements: ['File initial claim', 'Complete weekly certifications', 'Actively seek work'],
      contact: {
        phone: 'Varies by state',
        website: 'https://www.dol.gov/general/topic/unemployment-insurance',
        hours: 'Varies by state'
      },
      applicationProcess: {
        steps: ['File claim with state agency', 'Complete weekly certifications', 'Search for work', 'Report earnings'],
        estimatedTime: '2-3 weeks for first payment',
        applicationUrl: 'https://www.careeronestop.org/LocalHelp/UnemploymentBenefits/unemployment-benefits.aspx'
      },
      eligibilityTags: ['unemployed', 'job_loss', 'temporary_assistance'],
      audienceTier: 'worker',
      source: 'Department of Labor'
    }
  ];
  
  return programs.filter(program => 
    !category || program.category.toLowerCase().includes(category.toLowerCase())
  );
}

function normalizeEducationData(data: any, category?: string): BenefitProgram[] {
  const programs = [
    {
      id: 'student-loan-forgiveness',
      title: 'Public Service Loan Forgiveness',
      category: 'Education',
      description: 'Complete loan forgiveness for public service workers after 120 qualifying payments',
      benefits: ['100% loan forgiveness', 'No tax liability', 'All federal loan types eligible'],
      eligibility: ['Full-time public service employment', 'Direct Loans', '120 qualifying payments'],
      requirements: ['Employment certification', 'Income-driven repayment plan', 'On-time payments'],
      contact: {
        phone: '1-855-265-4038',
        website: 'https://studentaid.gov/manage-loans/forgiveness-cancellation/public-service',
        hours: 'Mon-Fri 8AM-8PM ET'
      },
      applicationProcess: {
        steps: ['Submit employment certification', 'Make 120 payments', 'Apply for forgiveness', 'Receive decision'],
        estimatedTime: '10+ years of service',
        applicationUrl: 'https://studentaid.gov/manage-loans/forgiveness-cancellation/public-service'
      },
      eligibilityTags: ['public_service', 'student_loans', 'loan_forgiveness'],
      audienceTier: 'worker',
      source: 'Department of Education'
    }
  ];
  
  return programs.filter(program => 
    !category || program.category.toLowerCase().includes(category.toLowerCase())
  );
}

function normalizeHealthcareData(data: any, category?: string): BenefitProgram[] {
  const programs = [
    {
      id: 'medicare-health-insurance',
      title: 'Medicare Health Insurance',
      category: 'Healthcare',
      description: 'Federal health insurance program for people 65 and older, and some younger people with disabilities',
      benefits: ['Hospital insurance (Part A)', 'Medical insurance (Part B)', 'Prescription drugs (Part D)'],
      eligibility: ['Age 65 or older', 'Under 65 with disabilities', 'End-stage renal disease'],
      requirements: ['Social Security eligibility', 'US citizenship or legal residency'],
      contact: {
        phone: '1-800-MEDICARE',
        website: 'https://www.medicare.gov',
        hours: '24/7'
      },
      applicationProcess: {
        steps: ['Apply online or by phone', 'Choose coverage options', 'Receive Medicare card', 'Enroll in plans'],
        estimatedTime: '1-2 months',
        applicationUrl: 'https://www.medicare.gov/basics/get-started-with-medicare'
      },
      eligibilityTags: ['seniors', 'disabled', 'health_insurance'],
      audienceTier: 'safety_net',
      source: 'Centers for Medicare & Medicaid Services'
    }
  ];
  
  return programs.filter(program => 
    !category || program.category.toLowerCase().includes(category.toLowerCase())
  );
}

function normalizeDisasterData(data: any, category?: string): BenefitProgram[] {
  const programs = [
    {
      id: 'disaster-assistance',
      title: 'Individual and Household Program (IHP)',
      category: 'Emergency',
      description: 'Financial assistance and services for disaster survivors',
      benefits: ['Temporary housing assistance', 'Home repair grants', 'Personal property replacement'],
      eligibility: ['Disaster declaration in area', 'Primary residence affected', 'Uninsured losses'],
      requirements: ['Register with FEMA', 'Insurance claim filed first', 'Occupy damaged dwelling'],
      contact: {
        phone: '1-800-621-3362',
        website: 'https://www.fema.gov/assistance/individual',
        hours: '24/7'
      },
      applicationProcess: {
        steps: ['Register with FEMA', 'Complete inspection', 'Provide documentation', 'Receive assistance'],
        estimatedTime: '10-14 days',
        applicationUrl: 'https://www.disasterassistance.gov'
      },
      eligibilityTags: ['disaster_victim', 'emergency_assistance', 'housing_repair'],
      audienceTier: 'safety_net',
      source: 'Federal Emergency Management Agency'
    }
  ];
  
  return programs.filter(program => 
    !category || program.category.toLowerCase().includes(category.toLowerCase())
  );
}

function normalizeTribalData(data: any, category?: string): BenefitProgram[] {
  const programs = [
    {
      id: 'tribal-assistance',
      title: 'Tribal Social Services',
      category: 'Social Services',
      description: 'Comprehensive social services for American Indian and Alaska Native communities',
      benefits: ['Family services', 'Child welfare', 'Adult services', 'Community development'],
      eligibility: ['Tribal membership', 'Residence in service area', 'Specific program requirements'],
      requirements: ['Tribal enrollment verification', 'Needs assessment', 'Application'],
      contact: {
        phone: 'Contact tribal office',
        website: 'https://www.bia.gov/service/tribal-social-services',
        hours: 'Varies by tribe'
      },
      applicationProcess: {
        steps: ['Contact tribal social services', 'Complete assessment', 'Develop service plan', 'Receive services'],
        estimatedTime: '1-4 weeks',
        applicationUrl: 'Contact local tribal office'
      },
      eligibilityTags: ['tribal_member', 'native_american', 'social_services'],
      audienceTier: 'safety_net',
      source: 'Bureau of Indian Affairs'
    }
  ];
  
  return programs.filter(program => 
    !category || program.category.toLowerCase().includes(category.toLowerCase())
  );
}

function normalizeDisabilityData(data: any, category?: string): BenefitProgram[] {
  const programs = [
    {
      id: 'ssdi-benefits',
      title: 'Social Security Disability Insurance (SSDI)',
      category: 'Disability',
      description: 'Monthly benefits for people who cannot work due to a medical condition',
      benefits: ['Monthly cash payments', 'Medicare after 24 months', 'Dependent benefits'],
      eligibility: ['Severe medical condition', 'Work history requirements', 'Cannot work for 12+ months'],
      requirements: ['Medical evidence', 'Work credits', 'Disability determination'],
      contact: {
        phone: '1-800-772-1213',
        website: 'https://www.ssa.gov/benefits/disability',
        hours: 'Mon-Fri 8AM-7PM local time'
      },
      applicationProcess: {
        steps: ['Complete application', 'Provide medical records', 'Attend consultative exam if needed', 'Receive decision'],
        estimatedTime: '3-5 months',
        applicationUrl: 'https://www.ssa.gov/applyfordisability'
      },
      eligibilityTags: ['disabled', 'work_history', 'medical_condition'],
      audienceTier: 'safety_net',
      source: 'Social Security Administration'
    }
  ];
  
  return programs.filter(program => 
    !category || program.category.toLowerCase().includes(category.toLowerCase())
  );
}

export function getFallbackFederalAgencyPrograms(agency: string, category?: string): BenefitProgram[] {
  // Return fallback data when APIs are unavailable
  switch (agency) {
    case 'veterans':
      return normalizeVAData({}, category);
    case 'energy':
      return normalizeEnergyData({}, category);
    case 'grants':
      return normalizeGrantsData({}, category);
    case 'agriculture':
      return normalizeAgricultureData({}, category);
    case 'labor':
      return normalizeLaborData({}, category);
    case 'education':
      return normalizeEducationData({}, category);
    case 'healthcare':
      return normalizeHealthcareData({}, category);
    case 'disaster':
      return normalizeDisasterData({}, category);
    case 'tribal':
      return normalizeTribalData({}, category);
    case 'disability':
      return normalizeDisabilityData({}, category);
    default:
      return [];
  }
}