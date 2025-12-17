import { Metadata } from 'next'

const baseUrl = 'https://taxradar.ca'

export function generateMetadata({
  title,
  description,
  path,
  type = 'default',
}: {
  title: string
  description: string
  path: string
  type?: 'default' | 'calculator' | 'academy'
}): Metadata {
  const fullTitle = `${title} | Tax Radar`
  const url = `${baseUrl}${path}`
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(title)}&type=${type}`

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Tax Radar',
      locale: 'en_CA',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  }
}

// FAQ data for calculators
export const calculatorFAQs = {
  'tax-calculator': [
    {
      question: 'How is Canadian income tax calculated?',
      answer: 'Canadian income tax is calculated using a progressive tax system. You pay federal tax plus provincial tax based on your province of residence on December 31st. Tax brackets increase as your income rises, but only the income within each bracket is taxed at that rate.',
    },
    {
      question: 'What is the Basic Personal Amount in Canada for 2025?',
      answer: 'The federal Basic Personal Amount (BPA) for 2025 is $16,129. This is the amount of income you can earn before paying federal income tax. Provincial BPAs vary by province.',
    },
    {
      question: 'What is the difference between marginal and effective tax rate?',
      answer: 'Your marginal tax rate is the rate you pay on your last dollar of income. Your effective (or average) tax rate is your total tax divided by your total income. The effective rate is always lower than the marginal rate due to progressive taxation.',
    },
    {
      question: 'Do I have to pay both federal and provincial tax?',
      answer: 'Yes, Canadians pay both federal income tax and provincial/territorial income tax. The combined rate varies by province, with Quebec having the highest combined rates and Alberta having among the lowest.',
    },
  ],
  'rrsp-calculator': [
    {
      question: 'What is an RRSP and how does it save tax?',
      answer: 'An RRSP (Registered Retirement Savings Plan) is a tax-deferred retirement account. Contributions reduce your taxable income now, investments grow tax-free, and you pay tax when you withdraw in retirement (usually at a lower tax rate).',
    },
    {
      question: 'What is my RRSP contribution limit for 2025?',
      answer: 'Your 2025 RRSP contribution limit is 18% of your 2024 earned income, up to $32,490, plus any unused room from previous years. Check your Notice of Assessment for your exact limit.',
    },
    {
      question: 'When is the RRSP contribution deadline?',
      answer: 'The RRSP contribution deadline for the 2024 tax year is March 3, 2025. Contributions made by this date can be deducted on your 2024 tax return.',
    },
    {
      question: 'Should I contribute to RRSP or TFSA?',
      answer: 'Generally, RRSPs are better if you expect to be in a lower tax bracket in retirement, while TFSAs are better if you expect the same or higher bracket. RRSPs also make sense for immediate tax refunds on high-income years.',
    },
  ],
  'tfsa-room-calculator': [
    {
      question: 'What is TFSA contribution room?',
      answer: 'TFSA contribution room is the total amount you can contribute to your TFSA. It accumulates each year you\'re 18+ and a Canadian resident. The 2025 annual limit is $7,000, and unused room carries forward indefinitely.',
    },
    {
      question: 'How much TFSA room do I have in 2025?',
      answer: 'If you\'ve been eligible since 2009 and never contributed, your total room is $102,000 (as of 2025). Your actual room depends on when you turned 18 and became a Canadian resident.',
    },
    {
      question: 'What happens if I over-contribute to my TFSA?',
      answer: 'Over-contributions to a TFSA are subject to a 1% penalty tax per month on the excess amount. If you over-contribute, withdraw the excess immediately to minimize penalties.',
    },
    {
      question: 'Do TFSA withdrawals get added back to contribution room?',
      answer: 'Yes, TFSA withdrawals are added back to your contribution room, but not until the following calendar year. If you withdraw $5,000 in 2025, that room becomes available again on January 1, 2026.',
    },
  ],
  'capital-gains-calculator': [
    {
      question: 'How are capital gains taxed in Canada?',
      answer: 'In Canada, only 50% of capital gains (the inclusion rate) is added to your taxable income. For example, a $10,000 gain means $5,000 is taxable at your marginal tax rate.',
    },
    {
      question: 'What is the capital gains inclusion rate for 2025?',
      answer: 'The capital gains inclusion rate remains 50% for individuals in 2025. This means half of your capital gains are added to your taxable income.',
    },
    {
      question: 'Can I use capital losses to reduce my taxes?',
      answer: 'Yes, capital losses can offset capital gains in the current year. Unused losses can be carried back 3 years or carried forward indefinitely to offset future gains.',
    },
    {
      question: 'Is my primary residence subject to capital gains tax?',
      answer: 'No, your principal residence is generally exempt from capital gains tax under the Principal Residence Exemption. You must designate it as your principal residence on your tax return when you sell.',
    },
  ],
  'fhsa-calculator': [
    {
      question: 'What is an FHSA?',
      answer: 'The First Home Savings Account (FHSA) is a registered account that combines RRSP and TFSA benefits for first-time home buyers. Contributions are tax-deductible, growth is tax-free, and withdrawals for a home purchase are tax-free.',
    },
    {
      question: 'What is the FHSA contribution limit?',
      answer: 'The FHSA annual contribution limit is $8,000, with a lifetime maximum of $40,000. Unused room carries forward up to $8,000 per year.',
    },
    {
      question: 'Who qualifies for an FHSA?',
      answer: 'You qualify for an FHSA if you\'re a Canadian resident, at least 18 years old, and haven\'t owned a home where you lived in the current year or the previous 4 calendar years.',
    },
    {
      question: 'Can I use FHSA and HBP together?',
      answer: 'Yes, you can use both the FHSA and the Home Buyers\' Plan (HBP) for the same home purchase, maximizing your tax-advantaged funds for a down payment.',
    },
  ],
  'dividend-tax-calculator': [
    {
      question: 'How are dividends taxed in Canada?',
      answer: 'Canadian dividends are taxed using a gross-up and tax credit system. Eligible dividends are grossed up by 38% then receive a tax credit. Non-eligible dividends are grossed up by 15% with a smaller credit. This integration system aims to avoid double taxation.',
    },
    {
      question: 'What is the difference between eligible and non-eligible dividends?',
      answer: 'Eligible dividends come from large corporations that paid high corporate tax rates and receive preferential tax treatment. Non-eligible dividends come from small businesses using the small business deduction and receive a smaller tax credit.',
    },
    {
      question: 'Are dividends better than salary for business owners?',
      answer: 'It depends on your situation. Dividends avoid CPP contributions but don\'t create RRSP room. Salary is a business expense but requires CPP payments. Many business owners use a combination for optimal tax planning.',
    },
  ],
  'self-employment-tax-calculator': [
    {
      question: 'How is self-employment income taxed in Canada?',
      answer: 'Self-employment income is taxed as regular income at your marginal tax rate. You report business income and expenses on Form T2125. You also pay both the employee and employer portions of CPP (11.9% total up to the maximum).',
    },
    {
      question: 'What expenses can self-employed individuals deduct?',
      answer: 'Common deductions include home office expenses, vehicle costs, equipment, supplies, professional fees, advertising, insurance, and meals/entertainment (50%). All expenses must be reasonable and directly related to earning business income.',
    },
    {
      question: 'Do self-employed people pay EI?',
      answer: 'Self-employed individuals are not required to pay EI premiums, but they can opt in for access to special benefits like maternity, parental, sickness, and compassionate care benefits.',
    },
  ],
}

// Metadata for all calculator pages
export const calculatorMetadata = {
  'tax-calculator': {
    title: 'Canadian Income Tax Calculator 2025',
    description: 'Free Canadian income tax calculator for 2025. Calculate your federal and provincial taxes, CPP, EI, and take-home pay. All provinces and territories included.',
    path: '/tools/tax-calculator',
  },
  'marginal-tax-calculator': {
    title: 'Marginal Tax Rate Calculator Canada 2025',
    description: 'Calculate your marginal tax rate for 2025. See exactly how much tax you\'ll pay on your next dollar of income in any Canadian province or territory.',
    path: '/tools/marginal-tax-calculator',
  },
  'tax-refund-estimator': {
    title: 'Tax Refund Estimator Canada 2025',
    description: 'Estimate your Canadian tax refund or amount owing for 2025. Factor in deductions, credits, and withholdings to see if you\'ll get money back.',
    path: '/tools/tax-refund-estimator',
  },
  'rrsp-calculator': {
    title: 'RRSP Calculator Canada 2025 - Tax Savings & Contribution Room',
    description: 'Calculate your RRSP contribution room and tax savings for 2025. See how much you can contribute and how much tax you\'ll save.',
    path: '/tools/rrsp-calculator',
  },
  'rrsp-vs-tfsa': {
    title: 'RRSP vs TFSA Calculator - Which is Better for You?',
    description: 'Compare RRSP and TFSA to see which is better for your situation. Factor in your current and expected retirement tax brackets.',
    path: '/tools/rrsp-vs-tfsa',
  },
  'tfsa-room-calculator': {
    title: 'TFSA Contribution Room Calculator 2025',
    description: 'Calculate your total TFSA contribution room for 2025. See your cumulative room based on when you turned 18 and became a Canadian resident.',
    path: '/tools/tfsa-room-calculator',
  },
  'rrsp-withholding-calculator': {
    title: 'RRSP Withholding Tax Calculator',
    description: 'Calculate the withholding tax on RRSP withdrawals. See how much tax is deducted based on withdrawal amount and province.',
    path: '/tools/rrsp-withholding-calculator',
  },
  'hbp-repayment-calculator': {
    title: 'Home Buyers\' Plan (HBP) Repayment Calculator',
    description: 'Calculate your HBP repayment schedule. Track annual minimum payments and see what happens if you miss a payment.',
    path: '/tools/hbp-repayment-calculator',
  },
  'capital-gains-calculator': {
    title: 'Capital Gains Tax Calculator Canada 2025',
    description: 'Calculate capital gains tax on investments, real estate, and other assets in Canada. See your tax using the 50% inclusion rate.',
    path: '/tools/capital-gains-calculator',
  },
  'dividend-tax-calculator': {
    title: 'Dividend Tax Calculator Canada 2025',
    description: 'Calculate tax on eligible and non-eligible Canadian dividends. See the gross-up, tax credit, and effective tax rate for your province.',
    path: '/tools/dividend-tax-calculator',
  },
  'rental-property-calculator': {
    title: 'Rental Property Tax Calculator Canada',
    description: 'Calculate taxes and cash flow on rental property income in Canada. Factor in mortgage interest, depreciation, and expenses.',
    path: '/tools/rental-property-calculator',
  },
  'fhsa-calculator': {
    title: 'FHSA Calculator 2025 - First Home Savings Account',
    description: 'Calculate your FHSA contribution room and tax savings. See how much you can save for your first home with tax-free growth.',
    path: '/tools/fhsa-calculator',
  },
  'self-employment-tax-calculator': {
    title: 'Self-Employment Tax Calculator Canada 2025',
    description: 'Calculate taxes on self-employment income including CPP contributions. See your net income after federal and provincial taxes.',
    path: '/tools/self-employment-tax-calculator',
  },
  'salary-vs-dividend-calculator': {
    title: 'Salary vs Dividend Calculator for Business Owners',
    description: 'Compare paying yourself salary vs dividends from your corporation. See the total tax impact and optimal mix for your situation.',
    path: '/tools/salary-vs-dividend-calculator',
  },
  'cpp-retirement-calculator': {
    title: 'CPP Retirement Calculator - Estimate Your Pension',
    description: 'Estimate your CPP retirement pension at age 60, 65, or 70. See how delaying or taking early CPP affects your monthly payment.',
    path: '/tools/cpp-retirement-calculator',
  },
  'oas-clawback-calculator': {
    title: 'OAS Clawback Calculator 2025',
    description: 'Calculate Old Age Security clawback based on your income. See if you\'ll have to repay OAS and strategies to minimize clawback.',
    path: '/tools/oas-clawback-calculator',
  },
}

// Related tools for internal linking
export const relatedTools = {
  'tax-calculator': ['marginal-tax-calculator', 'tax-refund-estimator', 'rrsp-calculator'],
  'marginal-tax-calculator': ['tax-calculator', 'capital-gains-calculator', 'dividend-tax-calculator'],
  'tax-refund-estimator': ['tax-calculator', 'rrsp-calculator', 'tfsa-room-calculator'],
  'rrsp-calculator': ['rrsp-vs-tfsa', 'tfsa-room-calculator', 'tax-calculator'],
  'rrsp-vs-tfsa': ['rrsp-calculator', 'tfsa-room-calculator', 'fhsa-calculator'],
  'tfsa-room-calculator': ['rrsp-calculator', 'rrsp-vs-tfsa', 'fhsa-calculator'],
  'rrsp-withholding-calculator': ['rrsp-calculator', 'hbp-repayment-calculator', 'tax-calculator'],
  'hbp-repayment-calculator': ['fhsa-calculator', 'rrsp-calculator', 'rrsp-withholding-calculator'],
  'capital-gains-calculator': ['dividend-tax-calculator', 'tax-calculator', 'rental-property-calculator'],
  'dividend-tax-calculator': ['capital-gains-calculator', 'salary-vs-dividend-calculator', 'tax-calculator'],
  'rental-property-calculator': ['capital-gains-calculator', 'self-employment-tax-calculator', 'tax-calculator'],
  'fhsa-calculator': ['hbp-repayment-calculator', 'rrsp-vs-tfsa', 'tfsa-room-calculator'],
  'self-employment-tax-calculator': ['salary-vs-dividend-calculator', 'tax-calculator', 'cpp-retirement-calculator'],
  'salary-vs-dividend-calculator': ['self-employment-tax-calculator', 'dividend-tax-calculator', 'tax-calculator'],
  'cpp-retirement-calculator': ['oas-clawback-calculator', 'rrsp-calculator', 'tax-calculator'],
  'oas-clawback-calculator': ['cpp-retirement-calculator', 'rrsp-calculator', 'tax-calculator'],
}

// Related academy articles for tools
export const relatedAcademyArticles = {
  'tax-calculator': ['how-to-file-taxes-canada', 'tax-deductions-credits', 'tax-filing-deadlines'],
  'rrsp-calculator': ['rrsp-complete-guide', 'rrsp-guide', 'rrsp-meltdown-strategies'],
  'tfsa-room-calculator': ['tfsa-guide', 'rrsp-vs-tfsa', 'tax-deductions-credits'],
  'capital-gains-calculator': ['capital-gains-tax-canada', 'tax-loss-harvesting', 'principal-residence-exemption'],
  'fhsa-calculator': ['first-time-home-buyer-tax-benefits', 'rrsp-complete-guide', 'tfsa-guide'],
  'dividend-tax-calculator': ['dividend-tax-credit', 'stock-options-tax', 'interest-income-tax'],
  'self-employment-tax-calculator': ['self-employment-taxes', 'gst-hst-guide', 'home-office-deduction'],
  'cpp-retirement-calculator': ['cpp-benefits-tax', 'retirement-income-planning', 'oas-benefits-tax'],
  'oas-clawback-calculator': ['oas-benefits-tax', 'pension-income-splitting', 'retirement-income-planning'],
}
