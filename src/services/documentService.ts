
import { DocumentTemplate } from '@/types/documents';

export const documentTemplates: DocumentTemplate[] = [
  {
    id: 'affidavit',
    name: 'General Affidavit',
    description: 'A general purpose affidavit for legal declarations',
    type: 'Legal',
    fields: [
      { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Enter your full name', required: true },
      { name: 'address', label: 'Complete Address', type: 'textarea', placeholder: 'Enter your full address', required: true },
      { name: 'purpose', label: 'Purpose of Affidavit', type: 'textarea', placeholder: 'Describe the purpose of this affidavit', required: true },
      { name: 'state', label: 'State', type: 'select', options: ['Delhi', 'Maharashtra', 'Tamil Nadu', 'Karnataka', 'Uttar Pradesh'], required: true }
    ],
    sampleDocument: `AFFIDAVIT

I, [fullName], son/daughter of ____________, resident of [address], do hereby solemnly affirm and declare as follows:

1. That I am a citizen of India.
2. [purpose]

I solemnly declare that the information provided above is true to the best of my knowledge and belief.

Place: [state]
Date: [Current Date]

Deponent

Verification: Verified at [state] on this [Current Date] that the contents of the above affidavit are true and correct to the best of my knowledge and belief.

Deponent`
  },
  {
    id: 'noc',
    name: 'No Objection Certificate',
    description: 'NOC for various purposes like employment, education, etc.',
    type: 'Employment/Education',
    fields: [
      { name: 'issuerName', label: 'Issuer Name/Organization', type: 'text', placeholder: 'Name of person/organization issuing NOC', required: true },
      { name: 'issuerAddress', label: 'Issuer Address', type: 'textarea', placeholder: 'Complete address of issuer', required: true },
      { name: 'recipientName', label: 'Recipient Name', type: 'text', placeholder: 'Name of person receiving NOC', required: true },
      { name: 'purpose', label: 'Purpose of NOC', type: 'select', options: ['Employment', 'Education', 'Travel', 'Property', 'Other'], required: true },
      { name: 'details', label: 'Specific Details', type: 'textarea', placeholder: 'Specific details regarding the NOC', required: true }
    ],
    sampleDocument: `NO OBJECTION CERTIFICATE

Date: [Current Date]

TO WHOMSOEVER IT MAY CONCERN

This is to certify that [issuerName], having its office at [issuerAddress], has no objection to [recipientName] for the purpose of [purpose].

[details]

We wish them all the best in their future endeavors.

For [issuerName],

Authorized Signatory
(Name and Designation)
Contact: _____________`
  },
  {
    id: 'rental',
    name: 'Rental Agreement',
    description: 'Standard rental/lease agreement for residential property',
    type: 'Property',
    fields: [
      { name: 'ownerName', label: 'Owner/Landlord Name', type: 'text', placeholder: 'Full name of the property owner', required: true },
      { name: 'tenantName', label: 'Tenant Name', type: 'text', placeholder: 'Full name of the tenant', required: true },
      { name: 'propertyAddress', label: 'Property Address', type: 'textarea', placeholder: 'Complete address of the rental property', required: true },
      { name: 'rentAmount', label: 'Monthly Rent (₹)', type: 'text', placeholder: 'Amount in rupees', required: true },
      { name: 'depositAmount', label: 'Security Deposit (₹)', type: 'text', placeholder: 'Amount in rupees', required: true },
      { name: 'tenancyPeriod', label: 'Tenancy Period (months)', type: 'select', options: ['3', '6', '11', '12', '24', '36'], required: true }
    ],
    sampleDocument: `RENTAL AGREEMENT

This RENTAL AGREEMENT is made on [Current Date] between [ownerName] (hereinafter referred to as the "LANDLORD") and [tenantName] (hereinafter referred to as the "TENANT").

PROPERTY:
The Landlord hereby agrees to rent the residential property located at [propertyAddress] to the Tenant.

TERM:
The term of this agreement shall be for a period of [tenancyPeriod] months, commencing from [Current Date].

RENT:
The Tenant agrees to pay a monthly rent of ₹[rentAmount] payable on or before the 5th day of each month.

SECURITY DEPOSIT:
The Tenant has paid a security deposit of ₹[depositAmount] which will be refunded at the end of the tenancy, subject to deductions for damages if any.

SIGNATORIES:

__________________
(Landlord)
[ownerName]

__________________
(Tenant)
[tenantName]

__________________
(Witness 1)

__________________
(Witness 2)`
  },
  {
    id: 'will',
    name: 'Simple Will',
    description: 'Basic last will and testament document',
    type: 'Legal',
    fields: [
      { name: 'testatorName', label: 'Full Name of Testator', type: 'text', placeholder: 'Your full legal name', required: true },
      { name: 'testatorAddress', label: 'Testator Address', type: 'textarea', placeholder: 'Your full current address', required: true },
      { name: 'executorName', label: 'Name of Executor', type: 'text', placeholder: 'Full name of the person executing your will', required: true },
      { name: 'executorAddress', label: 'Executor Address', type: 'textarea', placeholder: 'Full address of the executor', required: true },
      { name: 'bequests', label: 'Bequests and Distribution', type: 'textarea', placeholder: 'Describe how your assets should be distributed', required: true }
    ],
    sampleDocument: `LAST WILL AND TESTAMENT

I, [testatorName], residing at [testatorAddress], being of sound mind and memory, do hereby make, publish, and declare this to be my Last Will and Testament, hereby revoking all previous wills and codicils made by me.

1. I appoint [executorName], residing at [executorAddress], as the Executor of this my Last Will and Testament.

2. BEQUESTS:
[bequests]

3. I direct that all my just debts, funeral expenses, and administration expenses be paid as soon as practicable after my death.

IN WITNESS WHEREOF, I have hereunto set my hand this [Current Date].

__________________
[testatorName]
(Testator)

SIGNED by the above-named Testator as their Last Will in our presence, and we, at their request and in their presence, and in the presence of each other, have hereunto subscribed our names as witnesses.

__________________
Witness 1
Name:
Address:

__________________
Witness 2
Name:
Address:`
  },
  {
    id: 'promissory',
    name: 'Promissory Note',
    description: 'Document acknowledging a debt with promise to repay',
    type: 'Financial',
    fields: [
      { name: 'borrowerName', label: 'Borrower Name', type: 'text', placeholder: 'Full name of the borrower', required: true },
      { name: 'borrowerAddress', label: 'Borrower Address', type: 'textarea', placeholder: 'Full address of the borrower', required: true },
      { name: 'lenderName', label: 'Lender Name', type: 'text', placeholder: 'Full name of the lender', required: true },
      { name: 'lenderAddress', label: 'Lender Address', type: 'textarea', placeholder: 'Full address of the lender', required: true },
      { name: 'loanAmount', label: 'Loan Amount (₹)', type: 'text', placeholder: 'Amount in rupees', required: true },
      { name: 'interestRate', label: 'Annual Interest Rate (%)', type: 'text', placeholder: 'Interest rate percentage', required: true },
      { name: 'repaymentTerms', label: 'Repayment Terms', type: 'textarea', placeholder: 'Describe the repayment schedule', required: true }
    ],
    sampleDocument: `PROMISSORY NOTE

Date: [Current Date]
Amount: ₹[loanAmount]

FOR VALUE RECEIVED, the undersigned [borrowerName], residing at [borrowerAddress] (the "Borrower"), promises to pay to the order of [lenderName], residing at [lenderAddress] (the "Lender"), the principal sum of ₹[loanAmount] with interest thereon at the rate of [interestRate]% per annum on the unpaid balance until paid or until default, both principal and interest payable in lawful money of India.

REPAYMENT TERMS:
[repaymentTerms]

If any installment payment due under this Note is not received by Lender within 10 calendar days of its due date, the entire amount of unpaid principal and accrued interest shall, at the option of the Lender, become immediately due and payable without prior notice.

IN WITNESS WHEREOF, the Borrower has executed this Promissory Note as of the date first written above.

__________________
[borrowerName]
(Borrower)

__________________
Witness
Name:
Address:`
  }
];

export const generateDocument = (
  template: DocumentTemplate, 
  formData: Record<string, string>
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // Simulate API call and processing delay
      setTimeout(() => {
        let docText = template.sampleDocument;
        
        // Replace placeholders with form data
        Object.entries(formData).forEach(([key, value]) => {
          docText = docText.replace(new RegExp(`\\[${key}\\]`, 'g'), value);
        });
        
        // Replace current date placeholder
        const currentDate = new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        docText = docText.replace(/\[Current Date\]/g, currentDate);
        
        resolve(docText);
      }, 1500);
    } catch (error) {
      reject(error);
    }
  });
};
