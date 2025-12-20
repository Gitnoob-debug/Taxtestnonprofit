import { DocumentScanner } from '@/components/DocumentScanner'

export const metadata = {
  title: 'Document Scanner | Tax Radar',
  description: 'Upload any tax document for instant AI-powered analysis. Get plain English explanations of T4s, T5s, pay stubs, receipts, CRA notices, and more.',
}

export default function DocumentScannerPage() {
  return <DocumentScanner />
}
