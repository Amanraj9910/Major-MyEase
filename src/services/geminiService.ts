import { toast } from "@/components/ui/use-toast";
import i18n from "i18next";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface GeminiResponse {
  steps: {
    title: string;
    description: string;
    documents?: string[];
    timeframe?: string;
    fees?: string;
    tips?: string;
  }[];
  overview: string;
}

// Initialize Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyCOBdUeowwRTQUP7a0dBvrfrhB2A95LuIY");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// This function generates a prompt for the Gemini API
const generatePrompt = (task: string, language: string): string => {
  const prompt = `Generate a detailed step-by-step guide for the process: "${task}"
  The response should be in ${language} language and follow this EXACT JSON structure:
  {
    "overview": "A brief overview of the entire process",
    "steps": [
      {
        "title": "Clear step title",
        "description": "Detailed description of what needs to be done",
        "documents": ["List of required documents"],
        "timeframe": "Estimated time required",
        "fees": "Any applicable fees",
        "tips": "Helpful tips for this step"
      }
    ]
  }

  Important requirements:
  1. The response must be valid JSON
  2. Include 4-6 steps in total
  3. Each step must have at least a title and description
  4. Include documents, timeframe, fees, and tips where relevant
  5. Make the steps practical and actionable
  6. Keep descriptions clear and concise
  7. Ensure all text is in ${language} language

  Example format for a step:
  {
    "title": "Submit Application",
    "description": "Visit the office with all required documents",
    "documents": ["ID proof", "Address proof"],
    "timeframe": "30 minutes",
    "fees": "₹500",
    "tips": "Go early morning to avoid crowds"
  }`;
  
  return prompt;
};

// Mock data for common processes
const mockPassportProcess: GeminiResponse = {
  overview: "Complete guide to applying for a new passport in India",
  steps: [
    {
      title: "Register on Passport Seva Portal",
      description: "Create an account on the official Passport Seva Portal (www.passportindia.gov.in).",
      timeframe: "15-20 minutes",
      tips: "Keep a valid email ID and phone number handy for verification."
    },
    {
      title: "Fill Online Application Form",
      description: "Complete the online application form (Form-1) with personal details, address, family information, etc.",
      documents: ["Aadhaar Card", "PAN Card", "Voter ID", "Birth Certificate"],
      timeframe: "30-45 minutes",
      fees: "₹1,500 for normal application (36 pages), ₹2,000 for jumbo passport (60 pages)"
    },
    {
      title: "Schedule Appointment",
      description: "Book an appointment at your nearest Passport Seva Kendra (PSK) or Passport Office.",
      timeframe: "1-2 days",
      tips: "Choose a time slot that's convenient for you and keep the appointment letter ready."
    },
    {
      title: "Visit PSK/Passport Office",
      description: "Visit the PSK/Passport Office with all original documents and their photocopies.",
      documents: ["Appointment letter", "Original documents", "Photocopies of all documents", "Passport-size photographs"],
      timeframe: "2-3 hours",
      tips: "Arrive 30 minutes before your appointment time."
    },
    {
      title: "Track Application Status",
      description: "Track your passport application status using the file number on the Passport Seva website.",
      timeframe: "3-7 days for normal applications, 1-3 days for tatkal",
      tips: "You can also track via SMS by sending 'STATUS FILE_NO' to 9704100100."
    }
  ]
};

const mockAadharProcess: GeminiResponse = {
  overview: "Complete guide to applying for Aadhaar Card in India",
  steps: [
    {
      title: "Visit Aadhaar Enrolment Center",
      description: "Find and visit your nearest Aadhaar Enrolment Center. No appointment needed.",
      documents: ["Identity proof", "Address proof", "Date of birth proof"],
      timeframe: "1-2 hours",
      tips: "Go early morning to avoid long queues."
    },
    {
      title: "Fill Application Form",
      description: "Fill the Aadhaar enrolment form with your personal details.",
      timeframe: "15-20 minutes",
      tips: "Double-check all information before submission."
    },
    {
      title: "Biometric Data Collection",
      description: "Your photograph, fingerprints, and iris scan will be captured.",
      timeframe: "10-15 minutes",
      tips: "Keep your fingers clean and remove contact lenses if wearing any."
    },
    {
      title: "Get Acknowledgment Slip",
      description: "Receive an acknowledgment slip containing your 14-digit Enrolment ID (EID).",
      timeframe: "5-10 minutes",
      tips: "Keep the acknowledgment slip safe as it contains your EID."
    },
    {
      title: "Track Application Status",
      description: "Check your Aadhaar card status online using the EID number from the acknowledgment slip.",
      timeframe: "90 days for Aadhaar generation"
    },
    {
      title: "Download e-Aadhaar",
      description: "Download your e-Aadhaar from the UIDAI website or mAadhaar app once generated.",
      timeframe: "Available immediately after generation",
      tips: "e-Aadhaar is legally valid for all purposes."
    },
    {
      title: "Receive Physical Aadhaar Card",
      description: "The physical Aadhaar card will be delivered to your registered address through post.",
      timeframe: "10-15 days after generation"
    }
  ]
};

const mockPanCardProcess: GeminiResponse = {
  overview: "Complete guide to applying for PAN Card in India",
  steps: [
    {
      title: "Choose Application Method",
      description: "Decide whether to apply online through NSDL/UTITSL portals or offline through PAN service centers.",
      timeframe: "1 day",
      tips: "Online application is faster and more convenient."
    },
    {
      title: "Fill Application Form",
      description: "For online: Fill Form 49A (for Indian citizens) on the NSDL/UTITSL website. For offline: Obtain and fill physical Form 49A.",
      documents: ["Identity proof", "Address proof", "Date of birth proof", "Passport-size photographs"],
      timeframe: "30-45 minutes",
      fees: "₹93-₹103 for Indian citizens (e-PAN), ₹851-₹1,022 for physical PAN card"
    },
    {
      title: "Upload Documents",
      description: "Scan and upload all required documents in the specified format and size.",
      timeframe: "15-20 minutes",
      tips: "Ensure all documents are clearly visible and within the required file size limits."
    },
    {
      title: "Make Payment",
      description: "Pay the application fee using credit/debit card, net banking, or UPI.",
      timeframe: "5-10 minutes"
    },
    {
      title: "Track Application Status",
      description: "Use the acknowledgment number to check the status of your PAN application on the NSDL/UTITSL website.",
      timeframe: "7-15 days for processing"
    },
    {
      title: "Receive PAN Card",
      description: "The physical PAN card will be delivered to your address, or you can download the e-PAN immediately.",
      timeframe: "2-4 weeks for physical delivery"
    }
  ]
};

const mockDrivingLicenseProcess: GeminiResponse = {
  overview: "Complete guide to obtaining a Driving License in India",
  steps: [
    {
      title: "Apply for Learner's License",
      description: "Apply for a Learner's License online through the Sarathi portal or visit your nearest RTO.",
      documents: ["Identity proof", "Address proof", "Age proof", "Passport-size photographs", "Medical certificate"],
      timeframe: "1 day",
      fees: "₹200-₹500 depending on vehicle category"
    },
    {
      title: "Take Learner's License Test",
      description: "Appear for a test on traffic rules and regulations at the RTO.",
      timeframe: "Same day as appointment",
      tips: "Study the traffic signs and rules thoroughly before the test."
    },
    {
      title: "Practice Driving",
      description: "Learn and practice driving with a certified instructor or at a driving school for at least 30 days.",
      timeframe: "30 days minimum",
      fees: "₹1,500-₹5,000 for driving school (varies by location)"
    },
    {
      title: "Apply for Permanent License",
      description: "Apply for the permanent driving license through the Sarathi portal after 30 days but before 180 days of obtaining the Learner's License.",
      documents: ["Learner's License", "Application form", "Fee payment receipt"],
      timeframe: "1 day",
      fees: "₹200-₹1,000 depending on vehicle category"
    },
    {
      title: "Take Driving Test",
      description: "Demonstrate your driving skills in a practical test conducted by the RTO inspector.",
      timeframe: "1 day",
      tips: "Practice reverse parking, figure-of-eight, and uphill driving."
    },
    {
      title: "Receive Driving License",
      description: "Collect your permanent Driving License from the RTO or receive it by post.",
      timeframe: "7-30 days"
    }
  ]
};

const mockHostelApplicationProcess: GeminiResponse = {
  overview: "Complete guide to applying for hostel accommodation at JEC Jabalpur",
  steps: [
    {
      title: "Check Eligibility",
      description: "Verify that you meet the eligibility criteria: regular JEC student (1st year to final year), outstation student (not from Jabalpur). Preference is given to SC/ST/OBC (NCL) and low-income families.",
      timeframe: "1 day",
      tips: "Make sure you have all required documents ready before starting the application process."
    },
    {
      title: "Collect Hostel Form",
      description: "Visit the Hostel Office (Men's or Women's hostel block) and ask for the Hostel Admission Form.",
      timeframe: "15-30 minutes",
      tips: "Check the working hours of the hostel office before visiting."
    },
    {
      title: "Fill the Form",
      description: "Enter personal, academic, and income details in the form. Mention your category and prepare supporting documents.",
      documents: [
        "JEC Admission Receipt or College ID Card",
        "Aadhaar Card (Photocopy)",
        "Domicile Certificate (Madhya Pradesh)",
        "Caste Certificate (if applicable)",
        "Income Certificate (Current year, from Tehsildar)",
        "Medical Fitness Certificate",
        "2-3 Passport Size Photographs",
        "Character Certificate (Previous Institution/JEC)",
        "Previous Year Marksheet (for 2nd/3rd/4th year students)"
      ],
      timeframe: "30-45 minutes",
      tips: "Take extra copies of all documents for your records."
    },
    {
      title: "Submit Form",
      description: "Submit the completed form along with all required documents to the Hostel Warden's Office.",
      timeframe: "15-20 minutes",
      tips: "Keep the acknowledgment receipt safe for future reference."
    },
    {
      title: "Wait for Allotment",
      description: "Wait for the allotment list to be displayed on the notice board. Allotment is based on category, distance, and family income.",
      timeframe: "1-2 weeks",
      tips: "Check the notice board regularly for updates."
    },
    {
      title: "Pay Fees and Confirm Room",
      description: "Pay the hostel fees at the Accounts Section and collect your room key and rules booklet from the hostel office.",
      timeframe: "30-45 minutes",
      fees: "Total: ₹3700-₹4000 (Security Deposit: ₹1000 refundable, Hostel Admission Fee: ₹200-₹500, Room Rent Annual: ₹2500)",
      tips: "Keep all payment receipts safe. You'll need them for refunds when leaving the hostel."
    }
  ]
};

const mockCollegeCounselingProcess: GeminiResponse = {
  overview: "Complete step-by-step guide for MPDTE College Counseling process",
  steps: [
    {
      title: "Registration on DTE MP Portal",
      description: "Go to the official portal, click on 'Online Counseling', select the relevant course (B.E., Diploma, etc.), fill in personal details, academic details, and exam details. Upload required documents and pay the counseling registration fee.",
      documents: [
        "JEE Score Card (if applicable)",
        "10th & 12th Marksheet",
        "Domicile Certificate (MP residents)",
        "Income Certificate (for TFW or reservation)",
        "Caste Certificate (if applicable)",
        "Aadhaar Card",
        "Passport-size Photo & Signature"
      ],
      timeframe: "20-30 minutes (form filling)",
      fees: "₹1530 (approx. ₹130 for registration + ₹1400 for counseling)",
      tips: "Keep soft copies of all documents ready before starting the registration process."
    },
    {
      title: "Document Verification",
      description: "Documents are verified online based on uploaded copies. For errors or issues, you may need to visit a help center. For a more detailed guide on the document verification process at centers like JEC, search for 'Document Verification' in the search bar.",
      timeframe: "1-2 working days after document submission",
      tips: "Check status regularly on the portal to confirm successful verification."
    },
    {
      title: "Choice Filling",
      description: "Login after verification is complete, click on 'Choice Filling', select preferred colleges and branches in order of preference, and lock your choices before the deadline. For a more detailed guide, search for 'Choice Filling' in the search bar.",
      timeframe: "3-5 days window for filling",
      tips: "Don't forget to LOCK choices - otherwise, the system won't consider them."
    },
    {
      title: "Seat Allotment",
      description: "Seats are allotted based on your merit (e.g., JEE rank), reservation category, and preferences given. Check the seat allotment result from your login.",
      timeframe: "Usually declared within 4-5 days after choice locking",
      tips: "Keep checking the portal regularly for results."
    },
    {
      title: "Admission & Reporting",
      description: "If allotted a seat, choose to either accept and freeze the seat or opt for upgradation in the next round. Download the Provisional Allotment Letter, pay the part admission fee online, and report to the allotted college physically with documents.",
      documents: [
        "Provisional Seat Allotment Letter",
        "Fee Payment Receipt",
        "Original Documents (for verification)",
        "Passport-size Photographs"
      ],
      timeframe: "1-2 days for reporting",
      fees: "Part admission fee (varies by college, typically ₹10,000-₹20,000)",
      tips: "Keep all original documents ready for verification at the college."
    }
  ]
};

const mockChoiceFillingProcess: GeminiResponse = {
  overview: "Complete step-by-step guide for DTE MP Choice Filling Process",
  steps: [
    {
      title: "Log in to Counseling Portal",
      description: "Visit the official website https://dte.mponline.gov.in and use your counseling registration number and password to log in. Note that this step is only available after your document verification has been successfully completed.",
      documents: ["Counseling registration number", "Password"],
      timeframe: "5-10 minutes",
      tips: "Keep your counseling registration details handy. This step is only accessible after document verification is complete."
    },
    {
      title: "Access the Choice Filling Section",
      description: "Once logged in, click on the 'Choice Filling' tab. You will see a list of colleges and available branches based on your eligibility and exam score (if applicable, like JEE).",
      timeframe: "2-5 minutes",
      tips: "Make sure you're in the correct section for your program (BE/BTech/Diploma/etc)."
    },
    {
      title: "View College & Branch Options",
      description: "Filter or sort colleges by city/district, by course (e.g., B.E. in CSE, ECE, etc.), or based on intake capacity, fees, reputation, etc. You can view the seat matrix to check how many seats are available in each college and branch.",
      timeframe: "15-30 minutes for research",
      tips: "The seat matrix shows available seats in each category (General, OBC, SC, ST, etc.) which can help you understand your chances better."
    },
    {
      title: "Add Preferences",
      description: "Select colleges and branches one by one and add them to your preference list. The order of your list matters — higher preferences are considered first during allotment. You can reorder your list by dragging options up/down or using arrow buttons.",
      timeframe: "30-60 minutes",
      tips: "Be strategic with your ordering - put your dream college/branch first, but also include realistic options throughout your list."
    },
    {
      title: "Save and Lock Choices",
      description: "Once you have finalized your list, click on 'Save Choices' (which allows you to edit again later). When you are completely sure, click on 'Lock Choices'. IMPORTANT: If you don't lock your choices, the system may not consider your preferences at all.",
      timeframe: "5-10 minutes",
      tips: "Double-check your preference order before locking. Once locked, changes cannot typically be made."
    },
    {
      title: "Download/Print Confirmation",
      description: "After locking, download your Choice Filling Receipt (PDF). It will show your locked preferences and the time & date of locking. Keep this for your records.",
      timeframe: "2-5 minutes",
      tips: "Save both a digital copy and a printed copy of your confirmation for reference and in case of any disputes."
    },
    {
      title: "Wait for Seat Allotment",
      description: "After the choice filling window closes, the system will process all candidates' preferences and announce seat allotments. This is based on your rank, category, and the preferences you submitted.",
      timeframe: "Usually 4-5 days after choice filling deadline",
      tips: "Check the counseling schedule for the exact date of seat allotment results."
    }
  ]
};

const mockDocumentVerificationProcess: GeminiResponse = {
  overview: "Complete step-by-step guide for Document Verification at JEC for MPDTE Counseling",
  steps: [
    {
      title: "Register for Counseling on MPDTE Portal",
      description: "Visit the official website https://dte.mponline.gov.in and complete the counseling registration process. Pay the counseling fee and download the Counseling Registration Slip.",
      documents: ["Counseling Registration Slip"],
      timeframe: "30-45 minutes",
      fees: "₹1,530 (approx.)",
      tips: "Keep a soft copy of your registration slip saved on your phone as backup."
    },
    {
      title: "Check Nearest Document Verification Centers (DVCs)",
      description: "JEC Jabalpur is one of the official Document Verification Centers. You can select JEC as your preferred center or visit it directly based on instructions provided on the MPDTE portal.",
      timeframe: "5-10 minutes",
      tips: "Check the working hours of the center before visiting. JEC typically handles document verification on weekdays during office hours."
    },
    {
      title: "Visit JEC for Document Verification",
      description: "Go to the Document Verification Center at JEC with all your required documents. You need to bring the original documents plus 2 sets of photocopies for verification.",
      documents: [
        "Counseling Registration Slip",
        "JEE Main Scorecard (if applicable)",
        "Class 10th Marksheet & Certificate",
        "Class 12th Marksheet",
        "Domicile Certificate (MP)",
        "Income Certificate (for TFW/Scholarship) if applicable",
        "Caste Certificate (SC/ST/OBC) if applicable",
        "Transfer Certificate (TC)",
        "Character Certificate",
        "Gap Certificate (if applicable)",
        "Migration Certificate (if from other board)",
        "Aadhaar Card",
        "Passport size photos (4-6)",
        "PWD/KM/FF/NCC Certificates (if applicable)"
      ],
      timeframe: "30-45 minutes (may take longer during peak days)",
      tips: "Organize your documents in order before arriving. Carry everything in a file folder arranged according to the checklist to save time."
    },
    {
      title: "On-the-Spot Process at JEC",
      description: "Proceed to the Document Verification Hall or counseling cell at JEC. Submit your original documents along with photocopies. The staff will verify the authenticity, signatures, and seals on all your documents. If everything is correct, they will update your online profile status as 'Verified'.",
      timeframe: "20-30 minutes",
      tips: "Be patient during the verification process. The staff needs to thoroughly check each document."
    },
    {
      title: "Get Acknowledgment",
      description: "After successful verification, collect the Verification Acknowledgment Slip. This document is extremely important as it will allow you to proceed to the Choice Filling stage of the counseling process.",
      documents: ["Verification Acknowledgment Slip"],
      timeframe: "5-10 minutes",
      tips: "Take a photo of your verification slip immediately in case you misplace the physical copy."
    },
    {
      title: "Handle Missing Documents (If Applicable)",
      description: "If any document is missing or incomplete, you may be marked as 'Provisionally Verified.' In such cases, you'll be given a few days to upload or submit the missing documents. You might need to revisit the center to update your verification status once you have the complete set.",
      timeframe: "Varies based on missing documents",
      tips: "If you know in advance that certain documents are missing, consider bringing an affidavit or a written explanation to help your case."
    },
    {
      title: "Check Online Verification Status",
      description: "After completing the verification process, log in to the MPDTE portal to confirm that your online status shows as 'Verified'. Only then can you proceed to the next steps of counseling.",
      timeframe: "Usually updated within 24 hours",
      tips: "If your status doesn't update within 48 hours, contact the helpline number provided on the MPDTE portal."
    }
  ]
};

const mockScholarshipFormsProcess: GeminiResponse = {
  overview: "Complete guide to applying for scholarships for SC/ST and OBC students in Madhya Pradesh",
  steps: [
    {
      title: "Check Eligibility for SC/ST Post Matric Scholarship",
      description: "Verify that you meet the following criteria: SC/ST category, MP domicile, family income below ₹2.5 Lakhs per annum, admitted in a recognized institute (Government or Private), and have an Aadhaar-linked bank account.",
      timeframe: "1 day",
      tips: "Confirm your eligibility before starting the application process to avoid wasting time on forms you don't qualify for."
    },
    {
      title: "Gather Documents for SC/ST Scholarship",
      description: "Collect all required documents for SC/ST Post Matric Scholarship application.",
      documents: [
        "Domicile Certificate",
        "Caste Certificate (SC/ST)",
        "Income Certificate (issued by Tehsildar/SDM)",
        "Bank Passbook (1st Page)",
        "Aadhaar Card",
        "Samagra ID",
        "Fee Receipt / Admission Letter",
        "Last Exam Marksheet",
        "Passport Size Photo"
      ],
      timeframe: "3-7 days",
      tips: "Make digital scans of all documents before starting the application process. Ensure all documents are clearly legible."
    },
    {
      title: "Apply for SC/ST Scholarship Online",
      description: "Visit the MP Scholarship Portal (https://scholarshipportal.mp.nic.in), register or login with your Samagra ID, select 'Post Matric SC/ST Scholarship', fill in your academic, personal, and bank details, and upload all required documents.",
      timeframe: "20 minutes",
      tips: "Use a reliable internet connection while filling the form. Save your application ID for future reference."
    },
    {
      title: "Submit Physical Copy to College",
      description: "After submitting the online application, print the completed form and submit the hard copy along with photocopies of all documents to your college's scholarship cell.",
      timeframe: "1-2 days",
      tips: "Keep a photocopy of the complete application package for your records. Get an acknowledgment receipt from the college."
    },
    {
      title: "Check Eligibility for OBC Scholarships",
      description: "For OBC students, verify your eligibility for either Post Matric Scholarship or Medhavi Chatra Protsahan Yojana. Requirements include: OBC category, MP domicile, family income below ₹3 Lakhs per annum, enrolled in an eligible course/college. For Medhavi Yojana specifically: 75% in 12th (MP Board) or 85% (CBSE), and enrollment in an eligible course as per Medhavi list (Engineering, Medical, CA, CLAT, etc.).",
      timeframe: "1 day",
      tips: "The Medhavi Yojana typically offers higher benefits but has stricter academic requirements."
    },
    {
      title: "Gather Documents for OBC Scholarship",
      description: "Collect all required documents for OBC scholarship application.",
      documents: [
        "Domicile Certificate",
        "Caste Certificate (OBC)",
        "Income Certificate",
        "Bank Passbook (Aadhaar-linked)",
        "Aadhaar Card",
        "Samagra ID",
        "12th Marksheet (Medhavi Only)",
        "Course Admission Proof",
        "Passport Size Photo"
      ],
      timeframe: "3-7 days",
      tips: "For Medhavi Yojana, make sure your 12th marksheet clearly shows your percentage or CGPA."
    },
    {
      title: "Apply for OBC Scholarship Online",
      description: "Visit the MP Scholarship Portal (https://scholarshipportal.mp.nic.in), register or login using your Samagra ID, choose either 'Post Matric OBC Scholarship' or 'Medhavi Chatra Protsahan Yojana', fill in your academic, bank, and income details, and upload all required documents.",
      timeframe: "15-30 minutes",
      fees: "Free of cost",
      tips: "Double-check all information before final submission as corrections may not be allowed later."
    },
    {
      title: "Submit Physical Copy and Track Status",
      description: "Print the completed application form, submit the physical copy to your college, and regularly check the scholarship portal to track your application status. Wait for verification by college (5-10 working days), approval by department (20-30 days), and fund transfer (1-2 months).",
      timeframe: "2-3 months for complete process",
      tips: "If your application is pending for more than the expected time, contact your college scholarship cell or the helpline number provided on the scholarship portal."
    }
  ]
};

const mockExamFormProcess: GeminiResponse = {
  overview: "Complete guide to filling the Exam Form for JEC Jabalpur students",
  steps: [
    {
      title: "Prepare Required Documents",
      description: "Gather all necessary documents including College ID Card, University Enrollment Number, passport size photo (soft copy), signature (soft copy), latest fee receipt, and previous mark sheets (for backlogs).",
      documents: [
        "College ID Card",
        "University Enrollment Number",
        "Passport Size Photo (soft copy)",
        "Signature (soft copy)",
        "Latest Fee Receipt (college fee)",
        "Email ID & Mobile Number",
        "Previous mark sheets (for backlogs)"
      ],
      timeframe: "1-2 days",
      tips: "Ensure all documents are in the correct format and size. Keep both soft and hard copies ready."
    },
    {
      title: "Access JEC Portal",
      description: "Visit the JEC website (https://jecjabalpur.ac.in) and log in using your student ID or enrollment number.",
      timeframe: "5-10 minutes",
      tips: "Bookmark the portal URL for easy access. Keep your login credentials handy."
    },
    {
      title: "Fill the Exam Form Online",
      description: "Select your current semester, tick the subjects (regular + backlog if any), and upload your photo and signature.",
      timeframe: "15-20 minutes",
      tips: "Double-check all subject selections to avoid errors. Make sure your photo and signature meet the size and format requirements."
    },
    {
      title: "Submit Form for HOD Approval",
      description: "Submit the completed form online for Head of Department review. The status will show as 'Pending Approval'.",
      timeframe: "1-2 days",
      tips: "Submit well before the deadline to avoid late fees. The HOD will not forward forms with incorrect subject selections or pending dues."
    },
    {
      title: "Wait for HOD Verification",
      description: "The Head of Department will verify your details and forward your form. You'll receive a status update as 'Approved by HOD'.",
      timeframe: "1-3 days",
      tips: "Check your email and the portal regularly for status updates. Contact your HOD if the approval is taking longer than expected."
    },
    {
      title: "Pay Exam Fee",
      description: "Once approved, pay the exam fee online using UPI, Netbanking, or Debit Card. The fee varies based on the number of subjects.",
      timeframe: "10-15 minutes",
      fees: "Regular (per sem): ₹1500–₹2000, Backlog (per subject): ₹200–₹300, Late Fee: ₹100–₹500",
      tips: "Keep the payment receipt for your records. The payment link is activated only after HOD approval."
    },
    {
      title: "Download Final Form and Receipt",
      description: "After successful payment, download the payment receipt and final exam form for your records.",
      timeframe: "5-10 minutes",
      tips: "Save both documents as PDFs and keep printed copies for your records."
    },
    {
      title: "Submit Hardcopy (if required)",
      description: "If instructed, submit a hardcopy of the form and payment receipt to the Exam Cell.",
      timeframe: "Within 2 days of payment",
      tips: "Only required if specifically mentioned by the Exam Cell. Keep a copy of the submitted documents for your records."
    }
  ]
};

const mockCourseRegistrationProcess: GeminiResponse = {
  overview: "Complete guide to Course Registration process at JEC Jabalpur",
  steps: [
    {
      title: "Check Course Registration Schedule",
      description: "Visit the JEC website or notice board to check the course registration schedule for your semester. This typically happens at the beginning of each semester.",
      timeframe: "1-2 days before registration",
      tips: "Keep track of important dates and deadlines to avoid late registration fees."
    },
    {
      title: "Prepare Required Documents",
      description: "Gather all necessary documents including your College ID Card, previous semester mark sheets, and any other documents specified by your department.",
      documents: [
        "College ID Card",
        "Previous Semester Mark Sheets",
        "Department-specific Documents",
        "No Dues Certificate (if applicable)"
      ],
      timeframe: "1-2 days",
      tips: "Ensure all documents are in the correct format and size. Keep both soft and hard copies ready."
    },
    {
      title: "Access Course Registration Portal",
      description: "Log in to the JEC Course Registration Portal using your student credentials. The portal URL will be provided by your department.",
      timeframe: "5-10 minutes",
      tips: "Bookmark the portal URL for easy access. Keep your login credentials handy."
    },
    {
      title: "Select Courses",
      description: "Choose your courses for the semester based on your curriculum. Make sure to select both core and elective courses as per your program requirements.",
      timeframe: "15-20 minutes",
      tips: "Consult with your academic advisor or department head if you're unsure about course selection. Check for prerequisites before selecting courses."
    },
    {
      title: "Submit Course Registration Form",
      description: "Submit the completed course registration form online. You may need to upload certain documents or provide additional information.",
      timeframe: "10-15 minutes",
      tips: "Double-check all course selections before final submission. Once submitted, changes may require approval from the department."
    },
    {
      title: "Pay Registration Fee (if applicable)",
      description: "Some courses may require additional fees. Pay the registration fee online using the provided payment gateway.",
      timeframe: "5-10 minutes",
      fees: "Varies based on courses selected",
      tips: "Keep the payment receipt for your records. The payment link is activated only after course selection."
    },
    {
      title: "Download Course Registration Confirmation",
      description: "After successful registration, download the course registration confirmation for your records.",
      timeframe: "5-10 minutes",
      tips: "Save the confirmation as a PDF and keep a printed copy for your records."
    },
    {
      title: "Attend Course Orientation (if scheduled)",
      description: "Some departments may schedule orientation sessions for newly registered courses. Attend these sessions to understand course requirements and expectations.",
      timeframe: "1-2 hours per course",
      tips: "Take notes during orientation sessions. This is a good opportunity to meet your professors and clarify any doubts."
    }
  ]
};

// Main function to get process steps
export const getProcessSteps = async (task: string): Promise<GeminiResponse> => {
  try {
    const currentLanguage = i18n.language || 'en';
    console.log("Generating steps for task:", task, "in language:", currentLanguage);
    
    // Check for predefined processes first
    if (task.toLowerCase().includes("passport")) {
      return mockPassportProcess;
    } else if (task.toLowerCase().includes("aadhar") || task.toLowerCase().includes("aadhaar")) {
      return mockAadharProcess;
    } else if (task.toLowerCase().includes("pan")) {
      return mockPanCardProcess;
    } else if (task.toLowerCase().includes("driving") || task.toLowerCase().includes("license")) {
      return mockDrivingLicenseProcess;
    } else if (task.toLowerCase().includes("college counseling") || task.toLowerCase().includes("dte") || task.toLowerCase().includes("mpdte")) {
      return mockCollegeCounselingProcess;
    } else if (task.toLowerCase().includes("choice filling")) {
      return mockChoiceFillingProcess;
    } else if (task.toLowerCase().includes("document verification")) {
      return mockDocumentVerificationProcess;
    } else if (task.toLowerCase().includes("scholarship") || task.toLowerCase().includes("scholarship forms")) {
      return mockScholarshipFormsProcess;
    } else if (task.toLowerCase().includes("hostel") || task.toLowerCase().includes("hostel application")) {
      return mockHostelApplicationProcess;
    } else if (task.toLowerCase().includes("exam form")) {
      return mockExamFormProcess;
    } else if (task.toLowerCase().includes("course registration")) {
      return mockCourseRegistrationProcess;
    } else {
      // Use Gemini API for non-predefined processes
      try {
        const prompt = generatePrompt(task, currentLanguage);
        console.log("Sending prompt to Gemini API:", prompt);
        
        const result = await model.generateContent(prompt);
        console.log("Raw Gemini API response:", result);
        
        if (!result.response) {
          console.error("No response received from Gemini API");
          throw new Error("No response received from Gemini API");
        }
        
        const response = result.response;
        const text = response.text();
        console.log("Gemini API text response:", text);
        
        try {
          // Clean the text response to ensure it's valid JSON
          const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
          console.log("Cleaned text response:", cleanedText);
          
          // Parse the JSON response
          const processData = JSON.parse(cleanedText);
          console.log("Parsed process data:", processData);
          
          // Validate the response structure
          if (!processData.overview || !Array.isArray(processData.steps)) {
            console.error("Invalid response structure:", processData);
            throw new Error("Invalid response structure from Gemini API");
          }
          
          // Ensure each step has at least title and description
          processData.steps = processData.steps.map((step: any) => ({
            title: step.title || "Untitled Step",
            description: step.description || "No description provided",
            documents: step.documents || [],
            timeframe: step.timeframe || "Time not specified",
            fees: step.fees || "No fees specified",
            tips: step.tips || "No tips provided"
          }));
          
          console.log("Final processed data:", processData);
          return processData as GeminiResponse;
        } catch (parseError) {
          console.error("Error parsing Gemini API response:", parseError);
          console.error("Invalid JSON response:", text);
          throw new Error("Failed to parse Gemini API response");
        }
      } catch (aiError) {
        console.error("Gemini API Error:", aiError);
        // Fallback to generic process if API fails
        return {
          overview: `Step-by-step guide for ${task}`,
          steps: [
            {
              title: "Research Requirements",
              description: "Gather information about the necessary documents and procedures.",
              timeframe: "1-2 days"
            },
            {
              title: "Collect Required Documents",
              description: "Obtain all the necessary forms, identification, and supporting materials.",
              documents: ["Identity proof", "Address proof", "Application form"],
              timeframe: "3-7 days"
            },
            {
              title: "Submit Application",
              description: "Visit the appropriate government office or online portal to submit your application.",
              fees: "Varies based on service",
              timeframe: "1 day"
            },
            {
              title: "Track Application Status",
              description: "Use the provided reference number to monitor your application progress.",
              timeframe: "Ongoing"
            },
            {
              title: "Receive Confirmation",
              description: "Obtain the final document or approval notification.",
              timeframe: "7-30 days depending on complexity"
            }
          ]
        };
      }
    }
  } catch (error) {
    console.error("Error generating process steps:", error);
    toast({
      title: "Error",
      description: "Failed to generate process steps. Please try again.",
      variant: "destructive"
    });
    throw error;
  }
};
