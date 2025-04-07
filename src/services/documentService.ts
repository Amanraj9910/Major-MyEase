import { DocumentTemplate } from '@/types/documents';
import i18n from 'i18next';

export const documentTemplates: DocumentTemplate[] = [
  {
    id: 'authorization-letter',
    name: 'Authorization Letter',
    description: 'Authorize someone to act on your behalf for specific purposes',
    type: 'Private',
    fields: [
      { name: 'authorName', label: 'Your Full Name', type: 'text', placeholder: 'Your full name', required: true },
      { name: 'authorAddress', label: 'Your Address', type: 'textarea', placeholder: 'Your complete address', required: true },
      { name: 'authorContact', label: 'Your Contact Number', type: 'text', placeholder: 'Your phone number', required: true },
      { name: 'recipientName', label: 'Name of Authorized Person', type: 'text', placeholder: 'Full name of person you are authorizing', required: true },
      { name: 'recipientRelation', label: 'Relationship to You', type: 'text', placeholder: 'e.g., Friend, Brother, Colleague', required: true },
      { name: 'purpose', label: 'Purpose of Authorization', type: 'textarea', placeholder: 'Describe what actions you are authorizing them to take', required: true },
      { name: 'validityPeriod', label: 'Validity Period', type: 'text', placeholder: 'e.g., Until December 31, 2023', required: true }
    ],
    templateString: `AUTHORIZATION LETTER

Date: [CurrentDate]

FROM:
[authorName]
[authorAddress]
Contact: [authorContact]

SUBJECT: Letter of Authorization

TO WHOM IT MAY CONCERN:

I, [authorName], hereby authorize [recipientName], who is my [recipientRelation], to act on my behalf regarding the following matter(s):

[purpose]

This authorization is valid [validityPeriod].

Please provide [recipientName] with all the necessary assistance and extend the same courtesy as you would to me.

If you need to verify this authorization, please contact me at [authorContact].

Thanking you,

Sincerely,

____________________
[authorName]
(Signature)

____________________
[recipientName]
(Signature of Authorized Person)`,
    disclaimer: 'This is a general authorization letter that does not transfer any legal powers of attorney. For legal power of attorney, consult a legal professional.'
  },
  {
    id: 'job-application',
    name: 'Job Application Letter',
    description: 'A formal letter applying for a job position',
    type: 'Employment',
    fields: [
      { name: 'applicantName', label: 'Your Full Name', type: 'text', placeholder: 'Your full name', required: true },
      { name: 'applicantAddress', label: 'Your Address', type: 'textarea', placeholder: 'Your complete address', required: true },
      { name: 'applicantContact', label: 'Your Contact Number', type: 'text', placeholder: 'Your phone number', required: true },
      { name: 'applicantEmail', label: 'Your Email', type: 'text', placeholder: 'Your email address', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'recipientName', label: 'Recipient Name', type: 'text', placeholder: 'e.g., Hiring Manager, HR Manager', required: true },
      { name: 'companyName', label: 'Company Name', type: 'text', placeholder: 'Name of the company', required: true },
      { name: 'companyAddress', label: 'Company Address', type: 'textarea', placeholder: 'Company address', required: true },
      { name: 'position', label: 'Position Applied For', type: 'text', placeholder: 'Job title', required: true },
      { name: 'source', label: 'Where You Found the Job', type: 'text', placeholder: 'e.g., Company Website, LinkedIn, Newspaper', required: true },
      { name: 'introduction', label: 'Introduction Paragraph', type: 'textarea', placeholder: 'Introduce yourself and express interest in the position', required: true },
      { name: 'qualifications', label: 'Your Qualifications', type: 'textarea', placeholder: 'Describe your qualifications, experience, and skills relevant to the position', required: true },
      { name: 'closing', label: 'Closing Paragraph', type: 'textarea', placeholder: 'Express enthusiasm, request interview, and thank them', required: true }
    ],
    templateString: `[applicantName]
[applicantAddress]
Phone: [applicantContact]
Email: [applicantEmail]

[date]

[recipientName]
[companyName]
[companyAddress]

Subject: Application for the Position of [position]

Dear [recipientName],

[introduction]

[qualifications]

[closing]

Sincerely,

[applicantName]`,
    disclaimer: 'This is a template for a job application letter. Modify it to suit the specific requirements of the position and company you are applying to.'
  },
  {
    id: 'resignation-letter',
    name: 'Resignation Letter',
    description: 'Formal letter to resign from a position',
    type: 'Employment',
    fields: [
      { name: 'employeeName', label: 'Your Full Name', type: 'text', placeholder: 'Your full name', required: true },
      { name: 'employeeAddress', label: 'Your Address', type: 'textarea', placeholder: 'Your complete address', required: false },
      { name: 'employeeContact', label: 'Your Contact Details', type: 'text', placeholder: 'Phone number and/or email', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'managerName', label: 'Manager\'s Name', type: 'text', placeholder: 'Your manager or supervisor\'s name', required: true },
      { name: 'managerTitle', label: 'Manager\'s Title', type: 'text', placeholder: 'e.g., HR Manager, Department Head', required: true },
      { name: 'companyName', label: 'Company Name', type: 'text', placeholder: 'Name of your current employer', required: true },
      { name: 'lastWorkDay', label: 'Last Working Day', type: 'date', required: true },
      { name: 'reason', label: 'Reason for Resignation (Optional)', type: 'textarea', placeholder: 'Brief explanation of why you\'re leaving', required: false },
      { name: 'gratitude', label: 'Expression of Gratitude', type: 'textarea', placeholder: 'Thank the company for the opportunities provided', required: true },
      { name: 'transitionPlan', label: 'Transition Plan', type: 'textarea', placeholder: 'How you plan to hand over your responsibilities', required: true }
    ],
    templateString: `[employeeName]
[employeeAddress]
[employeeContact]

[date]

[managerName]
[managerTitle]
[companyName]

Subject: Letter of Resignation

Dear [managerName],

I am writing to inform you of my decision to resign from my position as [position] with [companyName], effective [lastWorkDay].

[reason]

[gratitude]

[transitionPlan]

Please let me know how I can assist in making this transition as smooth as possible.

Sincerely,

[employeeName]`,
    disclaimer: 'This is a standard resignation letter template. Check your employment contract for any specific resignation requirements.'
  },
  {
    id: 'consent-form',
    name: 'General Consent Form',
    description: 'A form granting permission for a specific activity or purpose',
    type: 'Private',
    fields: [
      { name: 'consentorName', label: 'Name of Person Giving Consent', type: 'text', placeholder: 'Your full name', required: true },
      { name: 'consentorAddress', label: 'Address', type: 'textarea', placeholder: 'Your complete address', required: true },
      { name: 'consentorContact', label: 'Contact Number', type: 'text', placeholder: 'Your phone number', required: true },
      { name: 'recipientName', label: 'Name of Recipient/Organization', type: 'text', placeholder: 'Person/Organization receiving consent', required: true },
      { name: 'purpose', label: 'Purpose of Consent', type: 'textarea', placeholder: 'Detailed description of what you are consenting to', required: true },
      { name: 'conditions', label: 'Conditions or Limitations (Optional)', type: 'textarea', placeholder: 'Any specific conditions for your consent', required: false },
      { name: 'validityPeriod', label: 'Validity Period', type: 'text', placeholder: 'How long this consent is valid for', required: true }
    ],
    templateString: `CONSENT FORM

Date: [CurrentDate]

I, [consentorName], residing at [consentorAddress], contact number [consentorContact], hereby give my consent to [recipientName] for the following purpose:

[purpose]

Conditions or Limitations:
[conditions]

This consent is valid for [validityPeriod].

I understand that I have the right to withdraw my consent at any time by providing written notice.

By signing below, I confirm that I have read and understood this consent form and agree to its terms.

Signed on [CurrentDate]:

____________________
[consentorName]
(Signature)`,
    disclaimer: 'This is a general consent form template. For sensitive matters or legal situations, consult a legal professional to ensure the consent form meets all requirements.'
  },
  {
    id: 'rental',
    name: 'Rental Agreement',
    description: 'Standard rental/lease agreement for residential property',
    type: 'Property',
    fields: [
      { name: 'ownerName', label: 'Owner/Landlord Name', type: 'text', placeholder: 'Full name of the property owner', required: true },
      { name: 'ownerAddress', label: 'Owner Address', type: 'textarea', placeholder: 'Owner\'s complete address', required: true },
      { name: 'ownerContact', label: 'Owner Contact Details', type: 'text', placeholder: 'Phone number and/or email', required: true },
      { name: 'tenantName', label: 'Tenant Name', type: 'text', placeholder: 'Full name of the tenant', required: true },
      { name: 'tenantContact', label: 'Tenant Contact Details', type: 'text', placeholder: 'Phone number and/or email', required: true },
      { name: 'propertyAddress', label: 'Property Address', type: 'textarea', placeholder: 'Complete address of the rental property', required: true },
      { name: 'propertyDetails', label: 'Property Details', type: 'textarea', placeholder: 'Brief description of the property (e.g., 2BHK, amenities)', required: true },
      { name: 'rentAmount', label: 'Monthly Rent (₹)', type: 'text', placeholder: 'Amount in rupees', required: true },
      { name: 'depositAmount', label: 'Security Deposit (₹)', type: 'text', placeholder: 'Amount in rupees', required: true },
      { name: 'leaseStart', label: 'Lease Start Date', type: 'date', required: true },
      { name: 'leaseDuration', label: 'Lease Duration', type: 'text', placeholder: 'e.g., 11 months, 1 year', required: true },
      { name: 'paymentDue', label: 'Rent Payment Due Date', type: 'text', placeholder: 'e.g., 5th of every month', required: true },
      { name: 'utilities', label: 'Utilities Responsibility', type: 'textarea', placeholder: 'Who pays for electricity, water, maintenance, etc.', required: true },
      { name: 'specialTerms', label: 'Special Terms & Conditions', type: 'textarea', placeholder: 'Any additional terms', required: false }
    ],
    templateString: `RENTAL AGREEMENT

THIS RENTAL AGREEMENT is made and executed on [CurrentDate] at [propertyAddress]

BETWEEN

[ownerName], residing at [ownerAddress], Contact: [ownerContact], hereinafter referred to as the "LANDLORD/OWNER" (which expression shall include their heirs, successors, executors, and assigns) of the ONE PART

AND

[tenantName], Contact: [tenantContact], hereinafter referred to as the "TENANT" (which expression shall include their heirs, successors, executors, and assigns) of the OTHER PART.

PROPERTY DETAILS:
The Landlord is the lawful owner of the property located at [propertyAddress] with the following details: [propertyDetails], hereinafter referred to as the "PREMISES".

TERMS AND CONDITIONS:

1. RENT AND DEPOSIT:
   - The Tenant agrees to pay a monthly rent of ₹[rentAmount].
   - The rent shall be payable on or before [paymentDue] of each month.
   - The Tenant has paid a refundable security deposit of ₹[depositAmount], which will be returned at the end of the tenancy, subject to deductions for damages, if any.

2. DURATION:
   - This agreement shall commence from [leaseStart] for a period of [leaseDuration].

3. UTILITIES AND MAINTENANCE:
   [utilities]

4. SPECIAL TERMS:
   [specialTerms]

5. TERMINATION:
   - Either party may terminate this agreement by giving one month's written notice.
   - The Landlord may terminate this agreement immediately if the Tenant fails to pay rent for two consecutive months or breaches any terms of this agreement.

IN WITNESS WHEREOF, the parties have set their hands on the day, month, and year first above written.

LANDLORD/OWNER:                         TENANT:

____________________                    ____________________
[ownerName]                             [tenantName]

WITNESS 1:                              WITNESS 2:

____________________                    ____________________
Name:                                   Name:
Address:                                Address:`,
    disclaimer: 'This is a general rental agreement template. Local rental laws and regulations may require specific clauses or registrations. For long-term or high-value rentals, consider consulting a legal professional.'
  },
  {
    id: 'roommate-agreement',
    name: 'Roommate Agreement',
    description: 'Agreement between roommates sharing living space',
    type: 'Private',
    fields: [
      { name: 'address', label: 'Shared Residence Address', type: 'textarea', placeholder: 'Complete address of the shared residence', required: true },
      { name: 'roommateNames', label: 'Names of All Roommates', type: 'textarea', placeholder: 'List all roommates, one per line', required: true },
      { name: 'moveInDate', label: 'Move-in Date', type: 'date', required: true },
      { name: 'rentTotal', label: 'Total Monthly Rent (₹)', type: 'text', placeholder: 'Total rent for the property', required: true },
      { name: 'rentDivision', label: 'Rent Division', type: 'textarea', placeholder: 'How the rent is divided between roommates', required: true },
      { name: 'utilities', label: 'Utilities Division', type: 'textarea', placeholder: 'How utility bills are divided', required: true },
      { name: 'commonAreas', label: 'Common Areas Use', type: 'textarea', placeholder: 'Rules for using common areas', required: true },
      { name: 'chores', label: 'Household Chores', type: 'textarea', placeholder: 'Division of household chores', required: true },
      { name: 'guests', label: 'Guest Policy', type: 'textarea', placeholder: 'Rules for having guests over', required: true },
      { name: 'noise', label: 'Quiet Hours', type: 'text', placeholder: 'e.g., 10 PM to 7 AM on weekdays', required: true },
      { name: 'disputes', label: 'Dispute Resolution Process', type: 'textarea', placeholder: 'How roommates will resolve disputes', required: true },
      { name: 'moveOut', label: 'Move-out Procedure', type: 'textarea', placeholder: 'Notice period and process for moving out', required: true }
    ],
    templateString: `ROOMMATE AGREEMENT

Date: [CurrentDate]

This Roommate Agreement ("Agreement") is entered into by and between the following roommates:
[roommateNames]

For the shared residence located at:
[address]

Move-in Date: [moveInDate]

1. RENT
Total monthly rent: ₹[rentTotal]
Rent division among roommates:
[rentDivision]

2. UTILITIES
Division of utility bills:
[utilities]

3. COMMON AREAS
Rules for the use of common areas:
[commonAreas]

4. HOUSEHOLD CHORES
Division of household responsibilities:
[chores]

5. GUEST POLICY
[guests]

6. QUIET HOURS
[noise]

7. DISPUTE RESOLUTION
[disputes]

8. MOVE-OUT PROCEDURE
[moveOut]

9. AMENDMENTS
This Agreement may be amended at any time with the written consent of all roommates.

By signing below, each roommate acknowledges that they have read, understood, and agree to abide by the terms of this Agreement.

Signatures:

[Space for each roommate to sign and date]`,
    disclaimer: 'This roommate agreement is not a substitute for a lease with your landlord. It is a private agreement between roommates to establish house rules and responsibilities.'
  },
  {
    id: 'noc-letter',
    name: 'No Objection Certificate (NOC)',
    description: 'General purpose No Objection Certificate',
    type: 'Private',
    fields: [
      { name: 'issuerName', label: 'Name of Issuer/Organization', type: 'text', placeholder: 'Your name or organization name', required: true },
      { name: 'issuerAddress', label: 'Issuer Address', type: 'textarea', placeholder: 'Your complete address', required: true },
      { name: 'issuerContact', label: 'Issuer Contact Information', type: 'text', placeholder: 'Phone number and/or email', required: true },
      { name: 'recipientName', label: 'Recipient Full Name', type: 'text', placeholder: 'Name of person receiving the NOC', required: true },
      { name: 'recipientDesignation', label: 'Recipient Designation/Relation', type: 'text', placeholder: 'e.g., Employee, Student, Tenant', required: true },
      { name: 'recipientId', label: 'Recipient ID (If applicable)', type: 'text', placeholder: 'e.g., Employee ID, Student ID', required: false },
      { name: 'purpose', label: 'Purpose of NOC', type: 'textarea', placeholder: 'Detailed purpose for which NOC is being issued', required: true },
      { name: 'validityPeriod', label: 'Validity Period (If applicable)', type: 'text', placeholder: 'How long this NOC is valid for', required: false },
      { name: 'additionalInfo', label: 'Additional Information', type: 'textarea', placeholder: 'Any other relevant details', required: false },
      { name: 'issuerDesignation', label: 'Issuer Designation', type: 'text', placeholder: 'Your title or position', required: false }
    ],
    templateString: `NO OBJECTION CERTIFICATE

Date: [CurrentDate]

FROM:
[issuerName]
[issuerAddress]
Contact: [issuerContact]

SUBJECT: No Objection Certificate for [purpose]

TO WHOMSOEVER IT MAY CONCERN:

This is to certify that we have no objection to [recipientName], [recipientDesignation] [recipientId] regarding the purpose of [purpose].

[additionalInfo]

[validityPeriod]

For any clarification regarding this NOC, please contact the undersigned.

Yours faithfully,

____________________
[issuerName]
[issuerDesignation]`,
    disclaimer: 'This is a general No Objection Certificate template. The specific format and content may vary based on organizational requirements. This NOC is a private document and may not be valid for purposes that require government-issued NOCs.'
  },
  {
    id: 'demand-letter',
    name: 'Payment Demand Letter',
    description: 'Formal letter demanding payment of outstanding dues',
    type: 'Financial',
    fields: [
      { name: 'senderName', label: 'Your Full Name/Company', type: 'text', placeholder: 'Your name or company name', required: true },
      { name: 'senderAddress', label: 'Your Address', type: 'textarea', placeholder: 'Your complete address', required: true },
      { name: 'senderContact', label: 'Your Contact Details', type: 'text', placeholder: 'Phone number and email', required: true },
      { name: 'receiverName', label: 'Debtor Name', type: 'text', placeholder: 'Person or company that owes you money', required: true },
      { name: 'receiverAddress', label: 'Debtor Address', type: 'textarea', placeholder: 'Complete address of the debtor', required: true },
      { name: 'amountDue', label: 'Amount Due (₹)', type: 'text', placeholder: 'Total amount owed to you', required: true },
      { name: 'dueDate', label: 'Original Due Date', type: 'date', required: true },
      { name: 'invoiceRef', label: 'Invoice/Reference Number', type: 'text', placeholder: 'Reference number of the original transaction', required: false },
      { name: 'paymentDetails', label: 'Payment Details', type: 'textarea', placeholder: 'Details about the debt, services provided, etc.', required: true },
      { name: 'paymentDeadline', label: 'Payment Deadline', type: 'date', required: true },
      { name: 'paymentMethod', label: 'Preferred Payment Method', type: 'textarea', placeholder: 'Bank details or other payment options', required: true },
      { name: 'consequences', label: 'Consequences of Non-payment', type: 'textarea', placeholder: 'What will happen if payment is not made by the deadline', required: false }
    ],
    templateString: `[senderName]
[senderAddress]
[senderContact]

[CurrentDate]

[receiverName]
[receiverAddress]

SUBJECT: DEMAND FOR PAYMENT OF OUTSTANDING DUES - ₹[amountDue]

Dear [receiverName],

This letter serves as a formal demand for payment of the outstanding amount of ₹[amountDue] that was due on [dueDate]. Despite the passage of the due date, we have not received your payment.

Reference: [invoiceRef]

Details of the outstanding payment:
[paymentDetails]

Please note that this amount must be paid in full by [paymentDeadline].

Payment can be made through the following method:
[paymentMethod]

If payment is not received by the deadline:
[consequences]

If you have already made the payment, please disregard this letter and provide us with the payment details for our reference.

If you have any questions or concerns, please contact us at [senderContact].

Sincerely,

[senderName]`,
    disclaimer: 'This is a private demand letter template for requesting payment. While it may serve as a first step in debt collection, it does not constitute formal legal action. For significant amounts or continual non-payment, consider consulting a legal professional.'
  },
  {
    id: 'receipt-acknowledgment',
    name: 'Receipt Acknowledgment',
    description: 'Acknowledge receipt of payment, goods, or documents',
    type: 'Financial',
    fields: [
      { name: 'recipientName', label: 'Your Name/Company', type: 'text', placeholder: 'Person or company receiving payment/items', required: true },
      { name: 'recipientAddress', label: 'Your Address', type: 'textarea', placeholder: 'Your complete address', required: true },
      { name: 'recipientContact', label: 'Your Contact Details', type: 'text', placeholder: 'Phone number and/or email', required: true },
      { name: 'payerName', label: 'Payer/Sender Name', type: 'text', placeholder: 'Person or company that made the payment/sent items', required: true },
      { name: 'payerAddress', label: 'Payer/Sender Address', type: 'textarea', placeholder: 'Complete address of the payer/sender', required: false },
      { name: 'receiptType', label: 'Type of Receipt', type: 'select', options: ['Payment', 'Goods', 'Documents', 'Other'], required: true },
      { name: 'receiptDetails', label: 'Receipt Details', type: 'textarea', placeholder: 'Detailed description of what was received', required: true },
      { name: 'amount', label: 'Amount (if applicable)', type: 'text', placeholder: 'Amount received in rupees', required: false },
      { name: 'receiptDate', label: 'Date Received', type: 'date', required: true },
      { name: 'paymentMethod', label: 'Payment Method (if applicable)', type: 'select', options: ['Cash', 'Cheque', 'Bank Transfer', 'UPI', 'Other'], required: false },
      { name: 'referenceNumber', label: 'Reference/Transaction Number', type: 'text', placeholder: 'Any reference or tracking number', required: false },
      { name: 'additionalNotes', label: 'Additional Notes', type: 'textarea', placeholder: 'Any other relevant information', required: false }
    ],
    templateString: `RECEIPT ACKNOWLEDGMENT

Date: [CurrentDate]

FROM:
[recipientName]
[recipientAddress]
Contact: [recipientContact]

TO:
[payerName]
[payerAddress]

SUBJECT: Acknowledgment of Receipt of [receiptType]

This document acknowledges that I, [recipientName], have received the following from [payerName] on [receiptDate]:

Receipt Details:
[receiptDetails]

Amount Received: ₹[amount]
Payment Method: [paymentMethod]
Reference/Transaction Number: [referenceNumber]

Additional Notes:
[additionalNotes]

Please retain this acknowledgment for your records.

Sincerely,

____________________
[recipientName]
Date: [CurrentDate]`,
    disclaimer: 'This is a basic receipt acknowledgment form. For tax purposes or formal accounting, you may need to use specific formats required by relevant tax authorities.'
  }
];

// Function to generate document text from template and data
export const generateDocumentText = (
  template: DocumentTemplate, 
  formData: Record<string, string>
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      let docText = template.templateString;
      const currentLanguage = i18n.language || 'en';
      
      // Replace field placeholders
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          const value = formData[key] || ''; // Use empty string if data is missing
          // Use a regex to replace all occurrences globally
          docText = docText.replace(new RegExp(`\\[${key}\\]`, 'g'), value);
        }
      }
        
      // Replace [CurrentDate] with formatted date
        const now = new Date();
        let formattedDate;
        try {
          formattedDate = new Intl.DateTimeFormat(currentLanguage, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }).format(now);
        } catch (err) {
        formattedDate = now.toLocaleDateString(); // Fallback
        }
      docText = docText.replace(/\[CurrentDate\]/g, formattedDate);
        
      // Clean up any remaining placeholders
      docText = docText.replace(/\[.*?\]/g, '______');
        
        resolve(docText);
    } catch (error) {
      console.error("Error generating document text:", error);
      reject("Failed to generate document text.");
    }
  });
};
