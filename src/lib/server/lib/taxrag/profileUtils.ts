/**
 * Profile Utilities for Tax RAG Personalization
 * Updated to match Supabase user_profiles schema
 */

export interface UserProfile {
  province?: string;
  ageRange?: string;
  employmentType?: 'employed' | 'self-employed' | 'retired' | 'student' | 'unemployed' | 'other';
  maritalStatus?: 'single' | 'married' | 'common-law' | 'separated' | 'divorced' | 'widowed';
  hasChildren?: boolean;
  hasChildcareExpenses?: boolean;
  hasRRSP?: boolean;
  hasTFSA?: boolean;
  hasFHSA?: boolean;
  hasRentalIncome?: boolean;
  hasForeignIncome?: boolean;
  hasDisability?: boolean;
  worksFromHome?: boolean;
  hasBusinessIncome?: boolean;
  hasInvestmentIncome?: boolean;
  hasPensionIncome?: boolean;
  hasCapitalGains?: boolean;
  isFirstTimeHomeBuyer?: boolean;
}

const PROFILE_TOPIC_KEYWORDS: Record<string, (keyof UserProfile)[]> = {
  'self-employed': ['employmentType', 'hasBusinessIncome'],
  'self-employment': ['employmentType', 'hasBusinessIncome'],
  'business income': ['employmentType', 'hasBusinessIncome'],
  't2125': ['employmentType', 'hasBusinessIncome'],
  'sole proprietor': ['employmentType', 'hasBusinessIncome'],
  'freelance': ['employmentType', 'hasBusinessIncome'],
  'contractor': ['employmentType', 'hasBusinessIncome'],
  'gst': ['employmentType', 'hasBusinessIncome'],
  'hst': ['employmentType', 'hasBusinessIncome'],
  'child': ['hasChildren'],
  'children': ['hasChildren'],
  'childcare': ['hasChildren', 'hasChildcareExpenses'],
  'daycare': ['hasChildren', 'hasChildcareExpenses'],
  'ccb': ['hasChildren'],
  'canada child benefit': ['hasChildren'],
  'spouse': ['maritalStatus'],
  'spousal': ['maritalStatus'],
  'married': ['maritalStatus'],
  'family': ['maritalStatus', 'hasChildren'],
  'dependent': ['hasChildren'],
  'rrsp': ['hasRRSP'],
  'tfsa': ['hasTFSA'],
  'fhsa': ['hasFHSA', 'isFirstTimeHomeBuyer'],
  'registered': ['hasRRSP', 'hasTFSA'],
  'contribution': ['hasRRSP', 'hasTFSA'],
  'retirement': ['hasRRSP', 'hasPensionIncome'],
  'pension': ['hasPensionIncome'],
  'home office': ['worksFromHome', 'employmentType'],
  'work from home': ['worksFromHome', 'employmentType'],
  'workspace': ['worksFromHome', 'employmentType'],
  'disability': ['hasDisability'],
  'dtc': ['hasDisability'],
  'disability tax credit': ['hasDisability'],
  'rental': ['hasRentalIncome'],
  'rental income': ['hasRentalIncome'],
  'foreign': ['hasForeignIncome'],
  'capital gain': ['hasCapitalGains'],
  'capital loss': ['hasCapitalGains'],
  'investment': ['hasInvestmentIncome', 'hasCapitalGains'],
  'dividend': ['hasInvestmentIncome'],
  'first time': ['isFirstTimeHomeBuyer'],
  'first-time': ['isFirstTimeHomeBuyer'],
  'home buyer': ['isFirstTimeHomeBuyer'],
  'ontario': ['province'],
  'quebec': ['province'],
  'alberta': ['province'],
  'bc': ['province'],
  'provincial': ['province'],
};

export function calculateProfileRelevance(query: string, profile: UserProfile): number {
  const queryLower = query.toLowerCase();
  let matchedFields = new Set<keyof UserProfile>();
  
  for (const [keyword, fields] of Object.entries(PROFILE_TOPIC_KEYWORDS)) {
    if (queryLower.includes(keyword)) {
      fields.forEach(field => {
        if (profile[field] !== undefined && profile[field] !== null && profile[field] !== false) {
          matchedFields.add(field);
        }
      });
    }
  }
  
  const personalPronouns = /\b(my|i|me|our|we)\b/i.test(query);
  
  if (matchedFields.size === 0 && !personalPronouns) {
    return 0;
  }
  
  const fieldScore = Math.min(matchedFields.size / 3, 1);
  const pronounBoost = personalPronouns ? 0.2 : 0;
  
  return Math.min(fieldScore + pronounBoost, 1);
}

export function enrichQueryWithProfile(query: string, profile: UserProfile): string {
  const enrichments: string[] = [];
  const queryLower = query.toLowerCase();
  
  if (profile.employmentType === 'self-employed') {
    const selfEmployedTerms = ['income', 'report', 'deduct', 'expense', 'tax', 'home office', 'instalment'];
    if (selfEmployedTerms.some(term => queryLower.includes(term))) {
      enrichments.push('self-employed business');
    }
  }
  
  if (profile.province) {
    const provincialTerms = ['credit', 'benefit', 'rate', 'bracket', 'provincial'];
    if (provincialTerms.some(term => queryLower.includes(term))) {
      enrichments.push(profile.province);
    }
  }
  
  if (profile.hasChildren) {
    const familyTerms = ['child', 'ccb', 'benefit', 'credit', 'deduct', 'childcare'];
    if (familyTerms.some(term => queryLower.includes(term))) {
      enrichments.push('children');
    }
  }
  
  if (profile.maritalStatus === 'married' || profile.maritalStatus === 'common-law') {
    const spousalTerms = ['rrsp', 'income split', 'credit', 'childcare', 'ccb'];
    if (spousalTerms.some(term => queryLower.includes(term))) {
      enrichments.push('spouse');
    }
  }
  
  if (enrichments.length === 0) {
    return query;
  }
  
  return `${query} ${enrichments.join(' ')}`;
}

export function generateProfileContext(profile: UserProfile): string {
  if (!profile || Object.keys(profile).length === 0) {
    return '';
  }
  
  const lines: string[] = ['## User Profile (MANDATORY - Apply to ALL responses)'];
  lines.push('');
  lines.push('This person\'s specific situation:');
  
  if (profile.province) {
    lines.push(`- **Province**: ${profile.province}`);
  }
  
  if (profile.ageRange) {
    lines.push(`- **Age Range**: ${profile.ageRange}`);
    if (profile.ageRange === '65+') {
      lines.push(`  - May be eligible for Age Amount credit`);
      lines.push(`  - Pension income splitting available`);
    }
  }
  
  if (profile.employmentType) {
    const empType = profile.employmentType.charAt(0).toUpperCase() + profile.employmentType.slice(1);
    lines.push(`- **Employment**: ${empType}`);
    
    if (profile.employmentType === 'self-employed') {
      lines.push(`  - Reports income on T2125`);
      lines.push(`  - Eligible for business expense deductions`);
      lines.push(`  - May need to register for GST/HST`);
      lines.push(`  - Uses T2125 method for home office (NOT T777)`);
    }
  }
  
  if (profile.maritalStatus) {
    lines.push(`- **Marital Status**: ${profile.maritalStatus.charAt(0).toUpperCase() + profile.maritalStatus.slice(1)}`);
    if (profile.maritalStatus === 'married' || profile.maritalStatus === 'common-law') {
      lines.push(`  - Eligible for spousal RRSP contributions`);
      lines.push(`  - CCB based on family net income`);
      lines.push(`  - Childcare expenses claimed by lower-income spouse`);
    }
  }
  
  if (profile.hasChildren) {
    lines.push(`- **Has dependents**: Yes`);
    if (profile.hasChildcareExpenses) {
      lines.push(`  - Has childcare expenses to claim`);
    }
  }
  
  const accounts: string[] = [];
  if (profile.hasRRSP) accounts.push('RRSP');
  if (profile.hasTFSA) accounts.push('TFSA');
  if (profile.hasFHSA) accounts.push('FHSA');
  
  if (accounts.length > 0) {
    lines.push(`- **Registered Accounts**: ${accounts.join(', ')}`);
  }
  
  if (profile.worksFromHome || profile.hasBusinessIncome) {
    lines.push(`- **Works from home**: Yes - eligible for home office deductions`);
  }
  
  if (profile.hasDisability) {
    lines.push(`- **Has disability**: Yes - may be eligible for DTC`);
  }
  
  if (profile.hasRentalIncome) {
    lines.push(`- **Has rental income**: Yes - reports on T776`);
  }
  
  if (profile.hasForeignIncome) {
    lines.push(`- **Has foreign income**: Yes - may need to report and claim foreign tax credits`);
  }
  
  if (profile.hasInvestmentIncome) {
    lines.push(`- **Has investment income**: Yes - dividends/interest`);
  }
  
  if (profile.hasCapitalGains) {
    lines.push(`- **Has capital gains/losses**: Yes - Schedule 3`);
  }
  
  if (profile.hasPensionIncome) {
    lines.push(`- **Has pension income**: Yes`);
  }
  
  if (profile.isFirstTimeHomeBuyer) {
    lines.push(`- **First-time home buyer**: Yes - eligible for HBP, FTHB credit`);
  }
  
  lines.push('');
  lines.push('**You MUST tailor your response to this specific situation. Reference their province, employment type, and family situation where relevant.**');
  lines.push('');
  
  return lines.join('\n');
}

export function getProfileFlags(profile: UserProfile): string[] {
  const flags: string[] = [];
  
  if (profile.employmentType === 'self-employed') flags.push('SELF_EMPLOYED');
  if (profile.hasChildren) flags.push('HAS_CHILDREN');
  if (profile.maritalStatus === 'married' || profile.maritalStatus === 'common-law') flags.push('MARRIED');
  if (profile.hasDisability) flags.push('HAS_DISABILITY');
  if (profile.worksFromHome) flags.push('WORKS_FROM_HOME');
  if (profile.hasRentalIncome) flags.push('HAS_RENTAL');
  if (profile.hasForeignIncome) flags.push('HAS_FOREIGN');
  if (profile.province === 'QC') flags.push('QUEBEC');
  if (profile.isFirstTimeHomeBuyer) flags.push('FIRST_TIME_BUYER');
  if (profile.hasCapitalGains) flags.push('HAS_CAPITAL_GAINS');
  if (profile.hasPensionIncome) flags.push('HAS_PENSION');
  
  return flags;
}

export function mapDBProfileToUserProfile(dbProfile: any): UserProfile {
  if (!dbProfile) return {};
  
  return {
    province: dbProfile.province,
    ageRange: dbProfile.age_range,
    employmentType: dbProfile.employment_status,
    maritalStatus: dbProfile.marital_status,
    hasChildren: dbProfile.has_dependents || false,
    hasChildcareExpenses: dbProfile.has_childcare_expenses || false,
    hasRRSP: dbProfile.has_rrsp_contributions || false,
    hasTFSA: dbProfile.has_tfsa || false,
    hasFHSA: dbProfile.has_fhsa || false,
    hasRentalIncome: dbProfile.has_rental_income || false,
    hasForeignIncome: dbProfile.has_foreign_income || false,
    hasDisability: dbProfile.has_disability || false,
    worksFromHome: dbProfile.has_home_office_expenses || false,
    hasBusinessIncome: dbProfile.has_self_employment_income || false,
    hasInvestmentIncome: dbProfile.has_investment_income || false,
    hasPensionIncome: dbProfile.has_pension_income || false,
    hasCapitalGains: dbProfile.has_capital_gains || false,
    isFirstTimeHomeBuyer: dbProfile.is_first_time_home_buyer || false,
  };
}
