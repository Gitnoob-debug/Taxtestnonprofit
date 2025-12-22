'use client'

import { TaxReturnHook } from '../../useTaxReturn'
import { Province, MaritalStatus } from '../../types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PROVINCE_NAMES } from '@/lib/canadianTaxData'

interface SituationStepProps {
  hook: TaxReturnHook
}

const MARITAL_STATUS_OPTIONS: { value: MaritalStatus; label: string }[] = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married' },
  { value: 'common-law', label: 'Common-law' },
  { value: 'separated', label: 'Separated' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' }
]

export function SituationStep({ hook }: SituationStepProps) {
  const { taxReturn, updatePersonalInfo, updateAddress, updateSpouse, errors } = hook
  const { personalInfo, spouse } = taxReturn

  const needsSpouseInfo = personalInfo.maritalStatus === 'married' || personalInfo.maritalStatus === 'common-law'

  // Format SIN as user types (xxx-xxx-xxx)
  const formatSIN = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 9)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  // Format postal code (X#X #X#)
  const formatPostalCode = (value: string) => {
    const clean = value.replace(/\s/g, '').toUpperCase().slice(0, 6)
    if (clean.length <= 3) return clean
    return `${clean.slice(0, 3)} ${clean.slice(3)}`
  }

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={personalInfo.firstName}
                onChange={(e) => updatePersonalInfo({ firstName: e.target.value })}
                placeholder="Enter first name"
                className={errors.firstName ? 'border-destructive' : ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={personalInfo.lastName}
                onChange={(e) => updatePersonalInfo({ lastName: e.target.value })}
                placeholder="Enter last name"
                className={errors.lastName ? 'border-destructive' : ''}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sin">Social Insurance Number (SIN) *</Label>
              <Input
                id="sin"
                value={personalInfo.sin}
                onChange={(e) => updatePersonalInfo({ sin: formatSIN(e.target.value) })}
                placeholder="XXX-XXX-XXX"
                maxLength={11}
                className={errors.sin ? 'border-destructive' : ''}
              />
              <p className="text-xs text-muted-foreground">Your SIN is encrypted and secure</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={personalInfo.dateOfBirth}
                onChange={(e) => updatePersonalInfo({ dateOfBirth: e.target.value })}
                className={errors.dateOfBirth ? 'border-destructive' : ''}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maritalStatus">Marital Status on December 31</Label>
              <Select
                value={personalInfo.maritalStatus}
                onValueChange={(value) => updatePersonalInfo({ maritalStatus: value as MaritalStatus })}
              >
                <SelectTrigger id="maritalStatus">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {MARITAL_STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="province">Province of Residence on December 31 *</Label>
              <Select
                value={personalInfo.provinceOfResidence}
                onValueChange={(value) => updatePersonalInfo({ provinceOfResidence: value as Province })}
              >
                <SelectTrigger id="province">
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PROVINCE_NAMES).map(([code, name]) => (
                    <SelectItem key={code} value={code}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader>
          <CardTitle>Mailing Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street Address *</Label>
            <Input
              id="street"
              value={personalInfo.address.street}
              onChange={(e) => updateAddress({ street: e.target.value })}
              placeholder="123 Main Street, Apt 4"
              className={errors.street ? 'border-destructive' : ''}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={personalInfo.address.city}
                onChange={(e) => updateAddress({ city: e.target.value })}
                placeholder="Toronto"
                className={errors.city ? 'border-destructive' : ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="addressProvince">Province</Label>
              <Select
                value={personalInfo.address.province}
                onValueChange={(value) => updateAddress({ province: value as Province })}
              >
                <SelectTrigger id="addressProvince">
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PROVINCE_NAMES).map(([code, name]) => (
                    <SelectItem key={code} value={code}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code *</Label>
              <Input
                id="postalCode"
                value={personalInfo.address.postalCode}
                onChange={(e) => updateAddress({ postalCode: formatPostalCode(e.target.value) })}
                placeholder="M5V 2H1"
                maxLength={7}
                className={errors.postalCode ? 'border-destructive' : ''}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spouse Information (if applicable) */}
      {needsSpouseInfo && (
        <Card>
          <CardHeader>
            <CardTitle>
              {personalInfo.maritalStatus === 'married' ? 'Spouse' : 'Common-law Partner'} Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We need some information about your {personalInfo.maritalStatus === 'married' ? 'spouse' : 'common-law partner'}
              to calculate certain credits and benefits.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="spouseFirstName">First Name</Label>
                <Input
                  id="spouseFirstName"
                  value={spouse?.firstName || ''}
                  onChange={(e) => updateSpouse({
                    ...spouse,
                    firstName: e.target.value,
                    lastName: spouse?.lastName || '',
                    sin: spouse?.sin || '',
                    dateOfBirth: spouse?.dateOfBirth || '',
                    netIncome: spouse?.netIncome || 0,
                    isFilingReturn: spouse?.isFilingReturn ?? true
                  })}
                  placeholder="Enter first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="spouseLastName">Last Name</Label>
                <Input
                  id="spouseLastName"
                  value={spouse?.lastName || ''}
                  onChange={(e) => updateSpouse({
                    ...spouse,
                    firstName: spouse?.firstName || '',
                    lastName: e.target.value,
                    sin: spouse?.sin || '',
                    dateOfBirth: spouse?.dateOfBirth || '',
                    netIncome: spouse?.netIncome || 0,
                    isFilingReturn: spouse?.isFilingReturn ?? true
                  })}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="spouseSin">SIN</Label>
                <Input
                  id="spouseSin"
                  value={spouse?.sin || ''}
                  onChange={(e) => updateSpouse({
                    ...spouse,
                    firstName: spouse?.firstName || '',
                    lastName: spouse?.lastName || '',
                    sin: formatSIN(e.target.value),
                    dateOfBirth: spouse?.dateOfBirth || '',
                    netIncome: spouse?.netIncome || 0,
                    isFilingReturn: spouse?.isFilingReturn ?? true
                  })}
                  placeholder="XXX-XXX-XXX"
                  maxLength={11}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="spouseNetIncome">Net Income (Line 23600)</Label>
                <Input
                  id="spouseNetIncome"
                  type="number"
                  value={spouse?.netIncome || ''}
                  onChange={(e) => updateSpouse({
                    ...spouse,
                    firstName: spouse?.firstName || '',
                    lastName: spouse?.lastName || '',
                    sin: spouse?.sin || '',
                    dateOfBirth: spouse?.dateOfBirth || '',
                    netIncome: parseFloat(e.target.value) || 0,
                    isFilingReturn: spouse?.isFilingReturn ?? true
                  })}
                  placeholder="0.00"
                />
                <p className="text-xs text-muted-foreground">
                  Enter their net income from their tax return (or estimate)
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="spouseFiling"
                checked={spouse?.isFilingReturn ?? true}
                onCheckedChange={(checked) => updateSpouse({
                  ...spouse,
                  firstName: spouse?.firstName || '',
                  lastName: spouse?.lastName || '',
                  sin: spouse?.sin || '',
                  dateOfBirth: spouse?.dateOfBirth || '',
                  netIncome: spouse?.netIncome || 0,
                  isFilingReturn: checked as boolean
                })}
              />
              <Label htmlFor="spouseFiling" className="text-sm font-normal">
                My {personalInfo.maritalStatus === 'married' ? 'spouse' : 'common-law partner'} is filing a tax return for this year
              </Label>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Elections Canada */}
      <Card>
        <CardHeader>
          <CardTitle>Elections Canada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-2">
            <Checkbox
              id="electionsCanada"
              checked={personalInfo.electionsCanada ?? false}
              onCheckedChange={(checked) => updatePersonalInfo({ electionsCanada: checked as boolean })}
            />
            <div>
              <Label htmlFor="electionsCanada" className="text-sm font-normal">
                I authorize the CRA to provide my name, address, date of birth, and citizenship to Elections Canada
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                This is used to update the National Register of Electors
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
