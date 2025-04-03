import { toast } from "@/components/ui/use-toast";

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

// This is a mock service until connected to real Gemini API
export const getProcessSteps = async (task: string): Promise<GeminiResponse> => {
  try {
    // In a real implementation, this would call the Gemini API
    // For now, we'll return mock data based on the task
    console.log("Generating steps for task:", task);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return mock data based on task type
    if (task.toLowerCase().includes("passport")) {
      return mockPassportProcess;
    } else if (task.toLowerCase().includes("aadhar") || task.toLowerCase().includes("aadhaar")) {
      return mockAadharProcess;
    } else if (task.toLowerCase().includes("pan")) {
      return mockPanCardProcess;
    } else if (task.toLowerCase().includes("driving") || task.toLowerCase().includes("license")) {
      return mockDrivingLicenseProcess;
    } else {
      // Generic process for other tasks
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
      description: "Book an appointment at your nearest Passport Seva Kendra (PSK) or Post Office Passport Seva Kendra (POPSK).",
      timeframe: "Varies based on availability",
      tips: "Early morning slots typically have shorter waiting times."
    },
    {
      title: "Visit PSK for Verification",
      description: "Visit the PSK on your appointment date with all original documents and a printout of your application.",
      documents: ["Application printout", "Original documents for verification", "Appointment confirmation"],
      timeframe: "2-3 hours"
    },
    {
      title: "Police Verification",
      description: "Police verification will be conducted at your residential address after your PSK visit.",
      timeframe: "7-21 days",
      tips: "Keep all your address proofs ready for verification."
    },
    {
      title: "Receive Passport",
      description: "After successful verification, your passport will be printed and dispatched to your address.",
      timeframe: "1-3 weeks after police verification"
    }
  ]
};

const mockAadharProcess: GeminiResponse = {
  overview: "Complete guide to applying for Aadhaar Card in India",
  steps: [
    {
      title: "Find an Enrollment Center",
      description: "Locate your nearest Aadhaar enrollment center through the UIDAI website or by calling the toll-free number 1947.",
      timeframe: "1 day",
      tips: "Check the working hours of the center before visiting."
    },
    {
      title: "Fill Enrollment Form",
      description: "Collect and fill the Aadhaar enrollment form with your personal details.",
      documents: ["Identity proof (Voter ID, Driving License, etc.)", "Address proof (Utility bill, Rental agreement, etc.)", "Birth certificate (for children)"],
      timeframe: "20-30 minutes"
    },
    {
      title: "Biometric Data Collection",
      description: "Provide your biometric information including fingerprints, iris scan, and photograph at the enrollment center.",
      timeframe: "30-45 minutes",
      fees: "Free for first-time enrollment or mandatory biometric updates"
    },
    {
      title: "Receive Acknowledgment Slip",
      description: "Collect the acknowledgment slip with your Enrollment ID (EID) for tracking your application.",
      timeframe: "Immediate after enrollment",
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
