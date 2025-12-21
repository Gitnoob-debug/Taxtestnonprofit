'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useSidebar, PageContext } from '@/contexts/SidebarContext'

// Map routes to human-readable names
const PAGE_NAMES: Record<string, string> = {
  '/profile': 'Your Profile',
  '/profile/dashboard': 'Tax Dashboard',
  '/profile/command-center': 'Tax Command Center',
  '/profile/scanner': 'Document Scanner',
  '/profile/documents': 'My Documents',
  '/tools': 'Tax Calculators',
  '/tools/tax-calculator': 'Income Tax Calculator',
  '/tools/rrsp-calculator': 'RRSP Calculator',
  '/tools/tfsa-room-calculator': 'TFSA Room Calculator',
  '/tools/capital-gains-calculator': 'Capital Gains Calculator',
  '/tools/dividend-tax-calculator': 'Dividend Tax Calculator',
  '/tools/fhsa-calculator': 'FHSA Calculator',
  '/tools/hbp-repayment-calculator': 'HBP Repayment Calculator',
  '/tools/home-buyers-tax-credit-calculator': 'Home Buyers Tax Credit Calculator',
  '/tools/income-splitting-calculator': 'Income Splitting Calculator',
  '/tools/llp-repayment-calculator': 'LLP Repayment Calculator',
  '/tools/marginal-rate-calculator': 'Marginal Rate Calculator',
  '/tools/medical-expense-calculator': 'Medical Expense Calculator',
  '/tools/net-income-calculator': 'Net Income Calculator',
  '/tools/payroll-calculator': 'Payroll Calculator',
  '/tools/rrsp-withdrawal-tax-calculator': 'RRSP Withdrawal Tax Calculator',
  '/tools/self-employment-calculator': 'Self-Employment Calculator',
  '/chat': 'Tax AI Chat'
}

export function usePageContext() {
  const pathname = usePathname()
  const { setPageContext, pageContext } = useSidebar()

  // Update basic page context when route changes
  useEffect(() => {
    if (!pathname) return

    const pageName = PAGE_NAMES[pathname] || 'Unknown Page'

    // Only update if we're on a different page
    if (pageContext?.page !== pathname) {
      setPageContext({
        page: pathname,
        pageName,
        data: pageContext?.data || {}, // Preserve existing data
        timestamp: Date.now()
      })
    }
  }, [pathname, setPageContext, pageContext?.page])

  // Helper function to update page context with data
  const updatePageData = (data: Partial<PageContext['data']>) => {
    setPageContext({
      page: pathname || '',
      pageName: PAGE_NAMES[pathname || ''] || 'Unknown Page',
      data: {
        ...pageContext?.data,
        ...data
      },
      timestamp: Date.now()
    })
  }

  return {
    pageContext,
    updatePageData,
    pathname,
    pageName: PAGE_NAMES[pathname || ''] || 'Unknown Page'
  }
}

// Specific hooks for different page types
export function useCommandCenterContext() {
  const { updatePageData } = usePageContext()

  const setCommandCenterData = (data: {
    taxPosition?: PageContext['data']['taxPosition']
    opportunities?: PageContext['data']['opportunities']
    taxScore?: PageContext['data']['taxScore']
    bracketPosition?: PageContext['data']['bracketPosition']
    deadlines?: PageContext['data']['deadlines']
    moneyLeftOnTable?: number
  }) => {
    updatePageData(data)
  }

  return { setCommandCenterData }
}

export function useCalculatorContext() {
  const { updatePageData } = usePageContext()

  const setCalculatorData = (data: {
    calculatorType: string
    calculatorFields: Record<string, string | number>
    calculatorResult?: Record<string, string | number>
  }) => {
    updatePageData(data)
  }

  return { setCalculatorData }
}

export function useProfileContext() {
  const { updatePageData } = usePageContext()

  const setProfileData = (data: PageContext['data']['profile']) => {
    updatePageData({ profile: data })
  }

  return { setProfileData }
}

export function useDocumentScannerContext() {
  const { updatePageData } = usePageContext()

  const setScannedDocumentData = (data: PageContext['data']['scannedDocument']) => {
    updatePageData({ scannedDocument: data })
  }

  return { setScannedDocumentData }
}
