import { DocumentTemplate } from '@/types/documents';
import i18n from 'i18next';

export const documentTemplates: DocumentTemplate[] = [
  {
    id: 'authorization-letter',
    name: 'Authorization Letter',
    description: 'Authorize someone to act on your behalf for specific purposes',
    type: 'Personal',
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
    type: 'Personal',
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
    type: 'Personal',
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
    type: 'Personal',
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
  },
  {
    id: 'medical-certificate',
    name: 'Medical Certificate (Format)',
    description: 'Standard format for a medical certificate issued by a doctor',
    type: 'College',
    fields: [
      { name: 'doctorName', label: 'Doctor\'s Name', type: 'text', placeholder: 'Full name of the doctor', required: true },
      { name: 'doctorQualification', label: 'Doctor\'s Qualification', type: 'text', placeholder: 'e.g., MBBS, MD', required: true },
      { name: 'hospitalName', label: 'Hospital/Clinic Name', type: 'text', placeholder: 'Name of the hospital or clinic', required: true },
      { name: 'hospitalAddress', label: 'Hospital/Clinic Address', type: 'textarea', placeholder: 'Complete address of the hospital or clinic', required: true },
      { name: 'registerNumber', label: 'Doctor\'s Registration Number', type: 'text', placeholder: 'Medical registration number', required: true },
      { name: 'patientName', label: 'Patient\'s Name', type: 'text', placeholder: 'Full name of the patient/student', required: true },
      { name: 'patientAge', label: 'Patient\'s Age', type: 'text', placeholder: 'Age of the patient', required: true },
      { name: 'patientGender', label: 'Patient\'s Gender', type: 'text', placeholder: 'Gender of the patient', required: true },
      { name: 'diagnosis', label: 'Diagnosis/Condition', type: 'textarea', placeholder: 'Medical condition or diagnosis', required: true },
      { name: 'treatmentPeriod', label: 'Treatment Period', type: 'text', placeholder: 'e.g., 10th Jan 2023 to 15th Jan 2023', required: true },
      { name: 'restPeriod', label: 'Recommended Rest Period', type: 'text', placeholder: 'e.g., 7 days from date of issue', required: true },
      { name: 'additionalRemarks', label: 'Additional Remarks', type: 'textarea', placeholder: 'Any additional medical remarks', required: false }
    ],
    templateString: `MEDICAL CERTIFICATE

Date: [CurrentDate]

TO WHOM IT MAY CONCERN

This is to certify that [patientName], aged [patientAge] years, [patientGender], was under my treatment from [treatmentPeriod] for [diagnosis].

The patient has been advised rest for [restPeriod] and may not be able to attend college/work during this period.

Additional Remarks: [additionalRemarks]

This certificate is issued at the request of the patient for the purpose of leave/absence from college/work.

Signature:
Dr. [doctorName], [doctorQualification]
Registration No.: [registerNumber]

Seal:
[hospitalName]
[hospitalAddress]`,
    disclaimer: 'This is a format for a medical certificate. In real scenarios, a valid certificate must be issued by a registered medical practitioner with proper signature and stamp.'
  },
  {
    id: 'undertaking-backlogs',
    name: 'Undertaking for Backlogs/Attendance',
    description: 'Formal undertaking by a student regarding academic backlogs or attendance shortage',
    type: 'College',
    fields: [
      { name: 'studentName', label: 'Student\'s Full Name', type: 'text', placeholder: 'Your full name', required: true },
      { name: 'studentId', label: 'Student ID/Roll Number', type: 'text', placeholder: 'Your college ID or roll number', required: true },
      { name: 'course', label: 'Course/Program', type: 'text', placeholder: 'e.g., B.Tech Computer Science', required: true },
      { name: 'semester', label: 'Current Semester', type: 'text', placeholder: 'e.g., 5th Semester', required: true },
      { name: 'undertakingType', label: 'Type of Undertaking', type: 'select', options: ['Attendance Shortage', 'Academic Backlogs', 'Both'], required: true },
      { name: 'attendanceDetails', label: 'Attendance Details (if applicable)', type: 'textarea', placeholder: 'Details of attendance shortage, subjects, and percentages', required: false },
      { name: 'backlogDetails', label: 'Backlog Details (if applicable)', type: 'textarea', placeholder: 'List of backlog subjects and exam attempts', required: false },
      { name: 'reason', label: 'Reason for Shortage/Backlogs', type: 'textarea', placeholder: 'Explain the reasons for attendance shortage or backlogs', required: true },
      { name: 'improvement', label: 'Improvement Plan', type: 'textarea', placeholder: 'How you plan to improve attendance or clear backlogs', required: true },
      { name: 'parentName', label: 'Parent/Guardian Name', type: 'text', placeholder: 'Full name of parent or guardian', required: true },
      { name: 'parentContact', label: 'Parent/Guardian Contact', type: 'text', placeholder: 'Phone number of parent or guardian', required: true }
    ],
    templateString: `UNDERTAKING

Date: [CurrentDate]

To,
The Principal/HOD,
[course] Department,
College Name

Subject: Undertaking for [undertakingType]

I, [studentName], Roll No. [studentId], a student of [course], [semester], do hereby submit this undertaking:

[attendanceDetails]

[backlogDetails]

Reason:
[reason]

Improvement Plan:
[improvement]

I understand that failure to comply with this undertaking may result in action as per the college rules, including but not limited to detention from examinations or termination from the course.

My parent/guardian is aware of this situation, and their contact details are provided below.

Student's Signature:
Name: [studentName]
Date: [CurrentDate]

Parent's/Guardian's Acknowledgement:
Name: [parentName]
Contact: [parentContact]
Signature:
Date: [CurrentDate]`,
    disclaimer: 'This is a general undertaking format. Check with your educational institution for specific format requirements.'
  },
  {
    id: 'internship-permission',
    name: 'Internship Permission Letter',
    description: 'Letter requesting permission from college/university to pursue an internship',
    type: 'College',
    fields: [
      { name: 'studentName', label: 'Student\'s Full Name', type: 'text', placeholder: 'Your full name', required: true },
      { name: 'studentId', label: 'Student ID/Roll Number', type: 'text', placeholder: 'Your college ID or roll number', required: true },
      { name: 'course', label: 'Course/Program', type: 'text', placeholder: 'e.g., B.Tech Computer Science', required: true },
      { name: 'semester', label: 'Current Semester', type: 'text', placeholder: 'e.g., 6th Semester', required: true },
      { name: 'hod', label: 'Head of Department Name', type: 'text', placeholder: 'Full name of your HOD', required: true },
      { name: 'companyName', label: 'Company/Organization Name', type: 'text', placeholder: 'Where you will intern', required: true },
      { name: 'companyAddress', label: 'Company Address', type: 'textarea', placeholder: 'Complete address of the company', required: true },
      { name: 'internshipRole', label: 'Internship Role/Position', type: 'text', placeholder: 'e.g., Software Development Intern', required: true },
      { name: 'internshipDuration', label: 'Internship Duration', type: 'text', placeholder: 'e.g., 2 months (1st June to 31st July 2023)', required: true },
      { name: 'workingHours', label: 'Working Hours', type: 'text', placeholder: 'e.g., 9 AM to 5 PM, Monday to Friday', required: true },
      { name: 'stipend', label: 'Stipend (if any)', type: 'text', placeholder: 'e.g., ₹15,000 per month', required: false },
      { name: 'relevance', label: 'Relevance to Course', type: 'textarea', placeholder: 'Explain how this internship relates to your academic course', required: true },
      { name: 'contactPerson', label: 'Contact Person at Company', type: 'text', placeholder: 'Name and designation of your supervisor', required: true },
      { name: 'contactEmail', label: 'Contact Email/Phone', type: 'text', placeholder: 'Email or phone of contact person', required: true }
    ],
    templateString: `Date: [CurrentDate]

To,
The Head of Department,
[course] Department,
College Name

Subject: Permission for Internship

Respected [hod],

I, [studentName], Roll No. [studentId], a student of [course], [semester], would like to request your permission to undertake an internship opportunity that has been offered to me.

Internship Details:
- Company Name: [companyName]
- Address: [companyAddress]
- Position: [internshipRole]
- Duration: [internshipDuration]
- Working Hours: [workingHours]
- Stipend: [stipend]

Relevance to my course:
[relevance]

Company Contact Person:
[contactPerson]
[contactEmail]

I assure you that this internship will not affect my academic performance, and I will ensure to complete all college assignments and attend any mandatory sessions as required.

I have attached the offer letter from the company for your reference. I request you to kindly grant me permission and provide me with a No Objection Certificate (NOC) that I can submit to the company.

Thanking you in anticipation.

Yours sincerely,

[studentName]
Roll No.: [studentId]
Contact: [contactEmail]`,
    disclaimer: 'This is a general template. Your college may have a specific format or additional requirements for internship permission.'
  },
  {
    id: 'leave-application',
    name: 'Leave Application',
    description: 'Formal application for leave from college/university',
    type: 'College',
    fields: [
      { name: 'studentName', label: 'Student\'s Full Name', type: 'text', placeholder: 'Your full name', required: true },
      { name: 'studentId', label: 'Student ID/Roll Number', type: 'text', placeholder: 'Your college ID or roll number', required: true },
      { name: 'course', label: 'Course/Program', type: 'text', placeholder: 'e.g., B.Tech Computer Science', required: true },
      { name: 'semester', label: 'Current Semester', type: 'text', placeholder: 'e.g., 3rd Semester', required: true },
      { name: 'recipientDesignation', label: 'Recipient\'s Designation', type: 'text', placeholder: 'e.g., Class Teacher, HOD, Principal', required: true },
      { name: 'leaveType', label: 'Type of Leave', type: 'select', options: ['Medical Leave', 'Personal Leave', 'Family Emergency', 'Event Participation', 'Other'], required: true },
      { name: 'leaveDuration', label: 'Leave Duration', type: 'text', placeholder: 'e.g., 3 days (15th to 17th October 2023)', required: true },
      { name: 'reason', label: 'Reason for Leave', type: 'textarea', placeholder: 'Detailed explanation for the leave request', required: true },
      { name: 'missedActivities', label: 'Academic Activities Missed', type: 'textarea', placeholder: 'List classes, labs, or exams that will be missed', required: true },
      { name: 'makeup', label: 'Plan to Make Up for Missed Work', type: 'textarea', placeholder: 'How you plan to complete missed assignments/classes', required: true },
      { name: 'attachments', label: 'Attachments (if any)', type: 'text', placeholder: 'e.g., Medical certificate, Event invitation', required: false },
      { name: 'parentContact', label: 'Parent/Guardian Contact', type: 'text', placeholder: 'Phone number for verification', required: true }
    ],
    templateString: `Date: [CurrentDate]

To,
The [recipientDesignation],
College Name

Subject: Application for [leaveType]

Respected Sir/Madam,

I, [studentName], Roll No. [studentId], a student of [course], [semester], am writing to request leave for [leaveDuration].

Reason for Leave:
[reason]

During this period, I will miss the following academic activities:
[missedActivities]

I plan to make up for the missed work as follows:
[makeup]

I have attached the following documents for your reference:
[attachments]

My parent/guardian is aware of this leave application and can be contacted at [parentContact] for verification.

I would be grateful if you could grant me leave for the mentioned period.

Thanking you.

Yours obediently,

[studentName]
Roll No.: [studentId]

Parent's/Guardian's Acknowledgement:
Name:
Signature:
Date: [CurrentDate]`,
    disclaimer: 'This is a general leave application format. Your institution may have specific procedures or forms for leave applications.'
  },
  {
    id: 'gap-year-affidavit',
    name: 'Affidavit for Gap Year',
    description: 'Legal affidavit explaining the gap in education for admission purposes',
    type: 'College',
    fields: [
      { name: 'studentName', label: 'Student\'s Full Name', type: 'text', placeholder: 'Your full name', required: true },
      { name: 'fatherName', label: 'Father\'s Name', type: 'text', placeholder: 'Your father\'s full name', required: true },
      { name: 'address', label: 'Permanent Address', type: 'textarea', placeholder: 'Your complete permanent address', required: true },
      { name: 'lastQualification', label: 'Last Qualification', type: 'text', placeholder: 'e.g., Higher Secondary (12th)', required: true },
      { name: 'lastInstitution', label: 'Last Institution Attended', type: 'text', placeholder: 'Name of school/college last attended', required: true },
      { name: 'completionYear', label: 'Year of Completion', type: 'text', placeholder: 'When you completed your last education', required: true },
      { name: 'gapDuration', label: 'Gap Duration', type: 'text', placeholder: 'e.g., 1 year (2022-2023)', required: true },
      { name: 'gapReason', label: 'Reason for Gap', type: 'textarea', placeholder: 'Detailed explanation of what you did during the gap year', required: true },
      { name: 'currentAdmission', label: 'Current Admission Sought', type: 'text', placeholder: 'e.g., B.Tech Computer Science at ABC Institute', required: true },
      { name: 'declaration', label: 'Additional Declaration', type: 'textarea', placeholder: 'Any additional declaration about your activities', required: false }
    ],
    templateString: `AFFIDAVIT

(To be executed on appropriate non-judicial stamp paper and notarized)

I, [studentName], son/daughter of [fatherName], resident of [address], do hereby solemnly affirm and declare as under:

1. That I have passed my [lastQualification] examination from [lastInstitution] in the year [completionYear].

2. That there is a gap of [gapDuration] in my academic career before seeking admission to [currentAdmission].

3. That during this gap period, I was engaged in the following activities:
   [gapReason]

4. That during this gap period, I have not joined any College/Institution/Course or appeared in any examination.

5. [declaration]

6. That I was not involved in any criminal offense or unlawful activities during this gap period, and no criminal case is pending against me in any court of law.

I declare that the above statement is true to the best of my knowledge and belief.

Place: _________________
Date: [CurrentDate]

DEPONENT

VERIFICATION:
Verified that the contents of this affidavit are true and correct to the best of my knowledge and belief and nothing has been concealed therein.

Place: _________________
Date: [CurrentDate]

DEPONENT

(To be signed in the presence of a Notary Public)`,
    disclaimer: 'This is a general format for a gap year affidavit. The exact format and requirements may vary by institution and legal jurisdiction. This document should be executed on appropriate stamp paper and notarized.'
  },
  {
    id: 'hostel-leave-form',
    name: 'Hostel Leave Form',
    description: 'Application form for hostel residents to request leave/absence',
    type: 'College',
    fields: [
      { name: 'studentName', label: 'Student\'s Full Name', type: 'text', placeholder: 'Your full name', required: true },
      { name: 'studentId', label: 'Student ID/Roll Number', type: 'text', placeholder: 'Your college ID or roll number', required: true },
      { name: 'course', label: 'Course/Program', type: 'text', placeholder: 'e.g., B.Tech Computer Science', required: true },
      { name: 'semester', label: 'Current Semester', type: 'text', placeholder: 'e.g., 4th Semester', required: true },
      { name: 'hostelName', label: 'Hostel Name/Number', type: 'text', placeholder: 'e.g., Boys Hostel A, Girls Hostel 2', required: true },
      { name: 'roomNumber', label: 'Room Number', type: 'text', placeholder: 'Your hostel room number', required: true },
      { name: 'leaveType', label: 'Type of Leave', type: 'select', options: ['Weekend Leave', 'Holiday Leave', 'Home Visit', 'Medical Leave', 'Other'], required: true },
      { name: 'leaveDuration', label: 'Leave Duration', type: 'text', placeholder: 'e.g., 3 days (15th to 17th October 2023)', required: true },
      { name: 'leaveFrom', label: 'Leaving Date & Time', type: 'text', placeholder: 'e.g., 15th October 2023, 5:00 PM', required: true },
      { name: 'returnDate', label: 'Expected Return Date & Time', type: 'text', placeholder: 'e.g., 17th October 2023, 7:00 PM', required: true },
      { name: 'destination', label: 'Destination Address', type: 'textarea', placeholder: 'Complete address where you will stay', required: true },
      { name: 'purpose', label: 'Purpose of Leave', type: 'textarea', placeholder: 'Detailed reason for leave', required: true },
      { name: 'travelMode', label: 'Mode of Travel', type: 'text', placeholder: 'e.g., Bus, Train, Parents picking up', required: true },
      { name: 'contactWhileAway', label: 'Contact Number While Away', type: 'text', placeholder: 'Your phone number during leave', required: true },
      { name: 'parentName', label: 'Parent/Guardian Name', type: 'text', placeholder: 'Full name of parent or guardian', required: true },
      { name: 'parentContact', label: 'Parent/Guardian Contact', type: 'text', placeholder: 'Phone number for verification', required: true }
    ],
    templateString: `HOSTEL LEAVE APPLICATION FORM

Date: [CurrentDate]

To,
The Warden,
[hostelName],
College Name

Student Details:
Name: [studentName]
Roll No.: [studentId]
Course & Semester: [course], [semester]
Hostel & Room No.: [hostelName], [roomNumber]

Leave Details:
Type of Leave: [leaveType]
Duration: [leaveDuration]
Leaving Date & Time: [leaveFrom]
Expected Return Date & Time: [returnDate]

Destination Address:
[destination]

Purpose of Leave:
[purpose]

Mode of Travel: [travelMode]
Contact Number While Away: [contactWhileAway]

I undertake to follow all hostel rules regarding leave and will return on the specified date. I understand that violation of hostel rules may result in disciplinary action.

Student's Signature:
Date: [CurrentDate]

Parent's/Guardian's Authorization:
I, [parentName] (parent/guardian), am aware of and authorize this leave. I can be contacted at [parentContact] for verification.

Parent's Signature:
Date: [CurrentDate]

FOR OFFICE USE ONLY:
( ) Approved  ( ) Not Approved

Remarks:

Warden's Signature:
Date:`,
    disclaimer: 'This is a general hostel leave application format. Your institution may have specific forms or digital systems for leave applications.'
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
