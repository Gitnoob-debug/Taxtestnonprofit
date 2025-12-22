/**
 * PDF Generator for T1 Tax Forms
 * Generates a printable summary document with line-by-line instructions
 *
 * Note: For actual CRA PDF form filling, you would need:
 * 1. The official T1 PDF templates
 * 2. A PDF library like pdf-lib to fill form fields
 * 3. CRA's field mapping specifications
 *
 * This implementation generates a custom summary PDF that users can reference
 * when filling out their actual CRA forms or using NETFILE software.
 */

import { TaxReturn, T1FormData, TaxCalculation } from './types'
import { formatCurrency, formatPercent } from './tax-engine'
import { PROVINCE_NAMES } from '../canadianTaxData'

export interface PDFGeneratorOptions {
  includeInstructions?: boolean
  includeWorksheets?: boolean
}

/**
 * Generate a printable HTML summary that can be printed to PDF
 * This creates a well-formatted document the user can print (Ctrl+P / Cmd+P)
 */
export function generatePrintableHTML(
  taxReturn: TaxReturn,
  t1FormData: T1FormData,
  calculation: TaxCalculation,
  options: PDFGeneratorOptions = {}
): string {
  const { includeInstructions = true } = options
  const { personalInfo } = taxReturn
  const year = taxReturn.taxYear

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>T1 Tax Return Summary - ${year}</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      font-size: 11pt;
      line-height: 1.4;
      color: #1a1a1a;
      padding: 0.5in;
      max-width: 8.5in;
      margin: 0 auto;
    }

    @media print {
      body {
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
      .page-break {
        page-break-before: always;
      }
    }

    header {
      text-align: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 2px solid #dc2626;
    }

    h1 {
      font-size: 20pt;
      color: #dc2626;
      margin-bottom: 4px;
    }

    .subtitle {
      font-size: 12pt;
      color: #666;
    }

    .taxpayer-info {
      background: #f5f5f5;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 24px;
    }

    .taxpayer-info h2 {
      font-size: 11pt;
      color: #666;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .taxpayer-name {
      font-size: 16pt;
      font-weight: bold;
    }

    .taxpayer-details {
      display: flex;
      gap: 24px;
      margin-top: 8px;
      font-size: 10pt;
      color: #666;
    }

    .result-box {
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      border: 2px solid #22c55e;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      margin-bottom: 24px;
    }

    .result-box.owing {
      background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
      border-color: #f97316;
    }

    .result-label {
      font-size: 12pt;
      color: #666;
      margin-bottom: 4px;
    }

    .result-amount {
      font-size: 32pt;
      font-weight: bold;
      color: #22c55e;
    }

    .result-box.owing .result-amount {
      color: #f97316;
    }

    .rates {
      display: flex;
      justify-content: center;
      gap: 32px;
      margin-top: 12px;
      font-size: 10pt;
      color: #666;
    }

    section {
      margin-bottom: 24px;
    }

    section h2 {
      font-size: 13pt;
      color: #1a1a1a;
      padding-bottom: 8px;
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 12px;
    }

    .line-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
      border-bottom: 1px dotted #e5e5e5;
    }

    .line-item:last-child {
      border-bottom: none;
    }

    .line-number {
      display: inline-block;
      background: #e5e5e5;
      color: #666;
      padding: 2px 8px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 9pt;
      margin-right: 8px;
    }

    .line-label {
      flex: 1;
    }

    .line-value {
      font-weight: 500;
      font-family: monospace;
      text-align: right;
      min-width: 100px;
    }

    .line-item.total {
      font-weight: bold;
      background: #f5f5f5;
      padding: 8px;
      margin: 8px -8px;
      border-radius: 4px;
    }

    .line-item.total .line-number {
      background: #dc2626;
      color: white;
    }

    .instructions {
      background: #fffbeb;
      border: 1px solid #fbbf24;
      border-radius: 8px;
      padding: 16px;
      margin-top: 24px;
    }

    .instructions h3 {
      color: #92400e;
      font-size: 11pt;
      margin-bottom: 8px;
    }

    .instructions ol {
      margin-left: 20px;
      color: #78350f;
    }

    .instructions li {
      margin-bottom: 8px;
    }

    .disclaimer {
      margin-top: 24px;
      padding: 16px;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      font-size: 9pt;
      color: #991b1b;
    }

    footer {
      margin-top: 32px;
      text-align: center;
      font-size: 9pt;
      color: #999;
      padding-top: 16px;
      border-top: 1px solid #e5e5e5;
    }

    .print-button {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #dc2626;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .print-button:hover {
      background: #b91c1c;
    }
  </style>
</head>
<body>
  <button class="print-button no-print" onclick="window.print()">Print / Save as PDF</button>

  <header>
    <h1>T1 Tax Return Summary</h1>
    <div class="subtitle">${year} Tax Year</div>
  </header>

  <div class="taxpayer-info">
    <h2>Taxpayer Information</h2>
    <div class="taxpayer-name">${personalInfo.firstName} ${personalInfo.lastName}</div>
    <div class="taxpayer-details">
      <span>SIN: ${personalInfo.sin.slice(0, 3)}-***-${personalInfo.sin.slice(-3)}</span>
      <span>Province: ${PROVINCE_NAMES[personalInfo.provinceOfResidence]}</span>
      <span>DOB: ${personalInfo.dateOfBirth}</span>
    </div>
  </div>

  <div class="result-box ${calculation.balanceOwing > 0 ? 'owing' : ''}">
    <div class="result-label">
      ${calculation.refund > 0 ? 'Estimated Refund' : calculation.balanceOwing > 0 ? 'Balance Owing' : 'Balance'}
    </div>
    <div class="result-amount">
      ${formatCurrency(calculation.refund > 0 ? calculation.refund : calculation.balanceOwing)}
    </div>
    <div class="rates">
      <span>Effective Rate: ${formatPercent(calculation.effectiveRate)}</span>
      <span>Marginal Rate: ${formatPercent(calculation.marginalRate)}</span>
    </div>
  </div>

  <section>
    <h2>Total Income</h2>
    ${t1FormData.income.line10100_employmentIncome > 0 ? `
    <div class="line-item">
      <span><span class="line-number">10100</span><span class="line-label">Employment income</span></span>
      <span class="line-value">${formatCurrency(t1FormData.income.line10100_employmentIncome)}</span>
    </div>` : ''}
    ${t1FormData.income.line11300_oasPension > 0 ? `
    <div class="line-item">
      <span><span class="line-number">11300</span><span class="line-label">Old Age Security pension</span></span>
      <span class="line-value">${formatCurrency(t1FormData.income.line11300_oasPension)}</span>
    </div>` : ''}
    ${t1FormData.income.line11400_cppBenefits > 0 ? `
    <div class="line-item">
      <span><span class="line-number">11400</span><span class="line-label">CPP/QPP benefits</span></span>
      <span class="line-value">${formatCurrency(t1FormData.income.line11400_cppBenefits)}</span>
    </div>` : ''}
    ${t1FormData.income.line11500_otherPensions > 0 ? `
    <div class="line-item">
      <span><span class="line-number">11500</span><span class="line-label">Other pensions and superannuation</span></span>
      <span class="line-value">${formatCurrency(t1FormData.income.line11500_otherPensions)}</span>
    </div>` : ''}
    ${t1FormData.income.line11900_eiBenefits > 0 ? `
    <div class="line-item">
      <span><span class="line-number">11900</span><span class="line-label">Employment Insurance benefits</span></span>
      <span class="line-value">${formatCurrency(t1FormData.income.line11900_eiBenefits)}</span>
    </div>` : ''}
    ${t1FormData.income.line12000_taxableDividends > 0 ? `
    <div class="line-item">
      <span><span class="line-number">12000</span><span class="line-label">Taxable amount of dividends</span></span>
      <span class="line-value">${formatCurrency(t1FormData.income.line12000_taxableDividends)}</span>
    </div>` : ''}
    ${t1FormData.income.line12100_interestIncome > 0 ? `
    <div class="line-item">
      <span><span class="line-number">12100</span><span class="line-label">Interest and other investment income</span></span>
      <span class="line-value">${formatCurrency(t1FormData.income.line12100_interestIncome)}</span>
    </div>` : ''}
    ${t1FormData.income.line12700_capitalGains > 0 ? `
    <div class="line-item">
      <span><span class="line-number">12700</span><span class="line-label">Taxable capital gains</span></span>
      <span class="line-value">${formatCurrency(t1FormData.income.line12700_capitalGains)}</span>
    </div>` : ''}
    ${t1FormData.income.line13700_selfEmploymentNet !== 0 ? `
    <div class="line-item">
      <span><span class="line-number">13700</span><span class="line-label">Net self-employment income</span></span>
      <span class="line-value">${formatCurrency(t1FormData.income.line13700_selfEmploymentNet)}</span>
    </div>` : ''}
    ${t1FormData.income.line12900_rrifIncome > 0 ? `
    <div class="line-item">
      <span><span class="line-number">12900</span><span class="line-label">RRIF income</span></span>
      <span class="line-value">${formatCurrency(t1FormData.income.line12900_rrifIncome)}</span>
    </div>` : ''}
    <div class="line-item total">
      <span><span class="line-number">15000</span><span class="line-label">Total income</span></span>
      <span class="line-value">${formatCurrency(t1FormData.income.line15000_totalIncome)}</span>
    </div>
  </section>

  <section>
    <h2>Net Income</h2>
    ${t1FormData.netIncome.line20800_rrspDeduction > 0 ? `
    <div class="line-item">
      <span><span class="line-number">20800</span><span class="line-label">RRSP deduction</span></span>
      <span class="line-value">${formatCurrency(t1FormData.netIncome.line20800_rrspDeduction)}</span>
    </div>` : ''}
    ${t1FormData.netIncome.line21200_unionDues > 0 ? `
    <div class="line-item">
      <span><span class="line-number">21200</span><span class="line-label">Union, professional dues</span></span>
      <span class="line-value">${formatCurrency(t1FormData.netIncome.line21200_unionDues)}</span>
    </div>` : ''}
    ${t1FormData.netIncome.line21400_childCare > 0 ? `
    <div class="line-item">
      <span><span class="line-number">21400</span><span class="line-label">Child care expenses</span></span>
      <span class="line-value">${formatCurrency(t1FormData.netIncome.line21400_childCare)}</span>
    </div>` : ''}
    ${t1FormData.netIncome.line21900_movingExpenses > 0 ? `
    <div class="line-item">
      <span><span class="line-number">21900</span><span class="line-label">Moving expenses</span></span>
      <span class="line-value">${formatCurrency(t1FormData.netIncome.line21900_movingExpenses)}</span>
    </div>` : ''}
    ${t1FormData.netIncome.line22000_supportPayments > 0 ? `
    <div class="line-item">
      <span><span class="line-number">22000</span><span class="line-label">Support payments made</span></span>
      <span class="line-value">${formatCurrency(t1FormData.netIncome.line22000_supportPayments)}</span>
    </div>` : ''}
    ${t1FormData.netIncome.line22100_carryingCharges > 0 ? `
    <div class="line-item">
      <span><span class="line-number">22100</span><span class="line-label">Carrying charges and interest expenses</span></span>
      <span class="line-value">${formatCurrency(t1FormData.netIncome.line22100_carryingCharges)}</span>
    </div>` : ''}
    ${t1FormData.netIncome.line22200_cppSelfEmployed > 0 ? `
    <div class="line-item">
      <span><span class="line-number">22200</span><span class="line-label">CPP contributions on self-employment</span></span>
      <span class="line-value">${formatCurrency(t1FormData.netIncome.line22200_cppSelfEmployed)}</span>
    </div>` : ''}
    <div class="line-item total">
      <span><span class="line-number">23600</span><span class="line-label">Net income</span></span>
      <span class="line-value">${formatCurrency(t1FormData.netIncome.line23600_netIncome)}</span>
    </div>
  </section>

  <section>
    <h2>Taxable Income</h2>
    <div class="line-item total">
      <span><span class="line-number">26000</span><span class="line-label">Taxable income</span></span>
      <span class="line-value">${formatCurrency(t1FormData.taxableIncome.line26000_taxableIncome)}</span>
    </div>
  </section>

  <section>
    <h2>Tax Calculation</h2>
    <div class="line-item">
      <span><span class="line-number">30000</span><span class="line-label">Basic personal amount</span></span>
      <span class="line-value">${formatCurrency(t1FormData.summary.line30000_basicPersonalAmount)}</span>
    </div>
    <div class="line-item">
      <span><span class="line-number">42000</span><span class="line-label">Net federal tax</span></span>
      <span class="line-value">${formatCurrency(t1FormData.summary.line42000_netFederalTax)}</span>
    </div>
    ${t1FormData.summary.line42100_cppSelfEmployedContrib > 0 ? `
    <div class="line-item">
      <span><span class="line-number">42100</span><span class="line-label">CPP contributions (self-employed)</span></span>
      <span class="line-value">${formatCurrency(t1FormData.summary.line42100_cppSelfEmployedContrib)}</span>
    </div>` : ''}
    <div class="line-item total">
      <span><span class="line-number">43500</span><span class="line-label">Total payable</span></span>
      <span class="line-value">${formatCurrency(t1FormData.summary.line43500_totalPayable)}</span>
    </div>
    <div class="line-item">
      <span><span class="line-number">43700</span><span class="line-label">Total income tax deducted</span></span>
      <span class="line-value">${formatCurrency(t1FormData.summary.line43700_totalIncomeDeducted)}</span>
    </div>
    <div class="line-item total">
      <span><span class="line-number">48400</span><span class="line-label">${t1FormData.summary.line48400_refundOrOwing < 0 ? 'Refund' : 'Balance owing'}</span></span>
      <span class="line-value">${formatCurrency(Math.abs(t1FormData.summary.line48400_refundOrOwing))}</span>
    </div>
  </section>

  ${includeInstructions ? `
  <div class="instructions">
    <h3>How to File Your Return</h3>
    <ol>
      <li><strong>Online via NETFILE:</strong> Use CRA-certified software (like Wealthsimple Tax, TurboTax, or H&R Block) and enter these values</li>
      <li><strong>CRA My Account:</strong> File directly through the CRA website using these line numbers</li>
      <li><strong>Paper filing:</strong> Download T1 forms from CRA and fill in these values manually</li>
    </ol>
    <p style="margin-top: 12px; font-size: 9pt;">
      <strong>Filing Deadline:</strong> April 30, ${year + 1} (June 15, ${year + 1} if self-employed, but any balance is due April 30)
    </p>
  </div>
  ` : ''}

  <div class="disclaimer">
    <strong>Important Disclaimer:</strong> This summary is for informational purposes only and does not constitute professional tax advice.
    The calculations are estimates based on the information provided. Please verify all amounts and consult a qualified tax professional
    for complex situations. Tax laws change frequently and this tool may not reflect the most current regulations.
  </div>

  <footer>
    <p>Generated by Tax Filing Assistant on ${new Date().toLocaleDateString('en-CA')}</p>
    <p>This document is not a substitute for official CRA tax forms</p>
  </footer>
</body>
</html>
`

  return html
}

/**
 * Opens the printable summary in a new window
 */
export function openPrintableSummary(
  taxReturn: TaxReturn,
  t1FormData: T1FormData,
  calculation: TaxCalculation,
  options?: PDFGeneratorOptions
) {
  const html = generatePrintableHTML(taxReturn, t1FormData, calculation, options)
  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(html)
    printWindow.document.close()
  }
}

/**
 * Downloads the printable summary as an HTML file
 */
export function downloadPrintableSummary(
  taxReturn: TaxReturn,
  t1FormData: T1FormData,
  calculation: TaxCalculation,
  options?: PDFGeneratorOptions
) {
  const html = generatePrintableHTML(taxReturn, t1FormData, calculation, options)
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `tax-return-${taxReturn.taxYear}-${taxReturn.personalInfo.lastName}.html`
  a.click()
  URL.revokeObjectURL(url)
}

/**
 * Generate CSV export of key values
 */
export function generateCSVExport(
  taxReturn: TaxReturn,
  t1FormData: T1FormData,
  calculation: TaxCalculation
): string {
  const lines = [
    ['Line', 'Description', 'Amount'],
    ['', 'TOTAL INCOME', ''],
    ['10100', 'Employment income', t1FormData.income.line10100_employmentIncome.toFixed(2)],
    ['12000', 'Taxable dividends', t1FormData.income.line12000_taxableDividends.toFixed(2)],
    ['12100', 'Interest income', t1FormData.income.line12100_interestIncome.toFixed(2)],
    ['12700', 'Taxable capital gains', t1FormData.income.line12700_capitalGains.toFixed(2)],
    ['13700', 'Self-employment (net)', t1FormData.income.line13700_selfEmploymentNet.toFixed(2)],
    ['15000', 'Total income', t1FormData.income.line15000_totalIncome.toFixed(2)],
    ['', 'NET INCOME', ''],
    ['20800', 'RRSP deduction', t1FormData.netIncome.line20800_rrspDeduction.toFixed(2)],
    ['21400', 'Child care expenses', t1FormData.netIncome.line21400_childCare.toFixed(2)],
    ['23600', 'Net income', t1FormData.netIncome.line23600_netIncome.toFixed(2)],
    ['', 'TAXABLE INCOME', ''],
    ['26000', 'Taxable income', t1FormData.taxableIncome.line26000_taxableIncome.toFixed(2)],
    ['', 'TAX CALCULATION', ''],
    ['30000', 'Basic personal amount', t1FormData.summary.line30000_basicPersonalAmount.toFixed(2)],
    ['42000', 'Net federal tax', t1FormData.summary.line42000_netFederalTax.toFixed(2)],
    ['43500', 'Total payable', t1FormData.summary.line43500_totalPayable.toFixed(2)],
    ['43700', 'Tax deducted', t1FormData.summary.line43700_totalIncomeDeducted.toFixed(2)],
    ['48400', 'Refund/Balance owing', t1FormData.summary.line48400_refundOrOwing.toFixed(2)]
  ]

  return lines.map(row => row.join(',')).join('\n')
}

/**
 * Download CSV export
 */
export function downloadCSVExport(
  taxReturn: TaxReturn,
  t1FormData: T1FormData,
  calculation: TaxCalculation
) {
  const csv = generateCSVExport(taxReturn, t1FormData, calculation)
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `tax-return-${taxReturn.taxYear}-lines.csv`
  a.click()
  URL.revokeObjectURL(url)
}
