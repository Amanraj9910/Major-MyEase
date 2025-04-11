import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Phone, Star, Search, Filter, Award, GraduationCap, Briefcase, Calendar, Languages } from 'lucide-react';
import ExpertPaymentDialog from '@/components/expert-payment/ExpertPaymentDialog';
import { ExpertDetailView, ExpertDetails } from '@/components/experts/ExpertDetailView';

// Define the expert details including all fields needed for the detailed view
const expertDetailsData: ExpertDetails[] = [
  // Expert #5 (Moved to top)
  {
    id: 5,
    name: "Aman Raj",
    image: "/public/IMG/aman.jpg",
    field: "Education & Scholarships",
    specialization: ["Scholarship Applications", "University Admissions", "Education Loans", "Foreign University Applications", "Study Abroad Counseling"],
    rating: 4.8,
    experience: 4,
    rate: 12,
    languages: ["English", "Hindi"],
    bio: "Aman Raj is an education counselor with 14 years of experience helping students navigate admissions and scholarship processes both in India and abroad. He specializes in identifying scholarship opportunities, preparing compelling applications, and guiding students through university admissions. His expertise has helped over 2,000 students secure admissions and over ₹40 crores in total scholarship funding.",
    location: "Damoh, MAdhya Pradesh",
    phone: "+91 9910772433",
    email: "aman.raj@example.com",
    availability: [
      { day: "Monday", slots: ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"] },
      { day: "Tuesday", slots: ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"] },
      { day: "Wednesday", slots: ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"] },
      { day: "Friday", slots: ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"] },
      { day: "Saturday", slots: ["9:00 AM", "10:30 AM", "12:00 PM"] },
    ],
    reviews: [
      {
        id: "rev1",
        name: "Rohan Das",
        avatar: "https://randomuser.me/api/portraits/men/72.jpg",
        date: "August 12, 2023",
        rating: 5,
        comment: "Aman helped me secure a full scholarship to my dream university in the USA. His guidance through the application process was invaluable.",
        service: "Scholarship Application",
        verified: true
      },
      {
        id: "rev2",
        name: "Nisha Sharma",
        date: "July 23, 2023",
        rating: 4.5,
        comment: "Excellent support for my son's undergraduate applications. He helped us navigate the complex admission requirements for multiple universities.",
        service: "University Admissions",
        verified: true
      },
      {
        id: "rev3",
        name: "Aryan Khanna",
        avatar: "https://randomuser.me/api/portraits/men/35.jpg",
        date: "June 14, 2023",
        rating: 5,
        comment: "The education loan process was so smooth with Aman's help. He knew exactly what documentation was needed and helped us prepare everything perfectly.",
        service: "Education Loan Guidance",
        verified: true
      }
    ],
    achievements: [
      {
        id: "ach1",
        title: "Certified Education Counselor",
        issuer: "International Association of College Admission Counseling",
        date: "2012",
        description: "Professional certification in university admissions counseling.",
        icon: <Award className="h-5 w-5" />
      },
      {
        id: "ach2",
        title: "Scholarship Facilitation Excellence Award",
        issuer: "Association of Indian Education Consultants",
        date: "2019",
        description: "Recognized for exceptional success in helping students secure scholarships.",
        icon: <Star className="h-5 w-5" />
      }
    ],
    experience_details: [
      {
        id: "exp1",
        role: "Senior Education Counselor",
        company: "Global Education Pathways",
        period: "2015 - Present",
        description: "Providing comprehensive guidance for university admissions, scholarship applications, and study abroad planning. Specializing in US, UK, Canada, and Australia admissions."
      },
      {
        id: "exp2",
        role: "University Relations Manager",
        company: "IDP Education",
        period: "2010 - 2015",
        description: "Managed relationships with partner universities, stayed updated on admission requirements, and counseled students on university selection and application strategies."
      }
    ],
    education: [
      {
        id: "edu1",
        degree: "Bachelor's in Engineering",
        institution: "Jabalpur Engineering College",
        year: "2009"
      },
      {
        id: "edu2",
        degree: "Master's in Education Administration",
        institution: "Jadavpur University",
        year: "2009"
      }
    ],
    successRate: 89,
    clientsServed: 2150,
    completedCases: 1920,
    responseTime: "Under 4 hours",
    successfulCases: [
      {
        id: "case1",
        title: "Full Scholarship to MIT",
        description: "Guided a student from application to securing a full scholarship to Massachusetts Institute of Technology for Computer Science program.",
        date: "January 2023",
        category: "Scholarship Application",
        outcome: "Full scholarship worth $320,000"
      },
      {
        id: "case2",
        title: "Multiple University Admissions with Scholarships",
        description: "Helped a student secure admissions to 6 top universities with scholarship offers, allowing them to make the best choice for their academic and financial situation.",
        date: "December 2022",
        category: "University Admissions",
        outcome: "Admission to all 6 universities with scholarships ranging from 25% to 75%"
      }
    ]
  },
  // Expert #1
  {
    id: 1,
    name: "Draupadi Murmu",
    image: "/public/IMG/expert-4.jpg",
    field: "Passport & Visa",
    specialization: ["Passport Applications", "Foreign Visas", "OCI Cards", "Visa Extensions", "Emergency Travel Documents"],
    rating: 4.9,
    experience: 8,
    rate: 15,
    languages: ["English", "Hindi", "Marathi"],
    bio: "Dr. Priya Sharma is a seasoned expert in passport and visa processing with over 8 years of experience. She specializes in handling complex visa applications, passport renewals, and OCI card processes. Dr. Sharma has successfully helped over 500 clients navigate immigration paperwork and visa requirements for various countries.",
    location: "Mumbai, Maharashtra",
    phone: "+91 9876543210",
    email: "priya.sharma@example.com",
    availability: [
      { day: "Monday", slots: ["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM", "5:00 PM"] },
      { day: "Tuesday", slots: ["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM"] },
      { day: "Wednesday", slots: ["10:00 AM", "11:30 AM", "2:00 PM"] },
      { day: "Thursday", slots: ["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM", "5:00 PM"] },
      { day: "Friday", slots: ["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM"] },
    ],
    reviews: [
      {
        id: "rev1",
        name: "Rahul Patel",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        date: "June 15, 2023",
        rating: 5,
        comment: "Dr. Sharma helped me with my OCI card application. The process was smooth and her guidance saved me a lot of time. Highly recommended!",
        service: "OCI Card Application",
        verified: true
      },
      {
        id: "rev2",
        name: "Sneha Gupta",
        date: "May 3, 2023",
        rating: 4.5,
        comment: "Very knowledgeable about the visa application process. Helped me solve issues with my documents that I had been struggling with for weeks.",
        service: "Foreign Visa",
        verified: true
      },
      {
        id: "rev3",
        name: "Arjun Malhotra",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg",
        date: "April 22, 2023",
        rating: 5,
        comment: "Excellent service! Dr. Sharma is extremely professional and knowledgeable. She helped me secure an emergency visa during a family crisis.",
        service: "Emergency Visa",
        verified: true
      },
      {
        id: "rev4",
        name: "Anjali Singh",
        date: "March 15, 2023",
        rating: 4,
        comment: "Good experience overall. The process took slightly longer than expected, but Dr. Sharma was very thorough and made sure everything was done correctly.",
        service: "Passport Renewal",
        verified: true
      }
    ],
    achievements: [
      {
        id: "ach1",
        title: "Certified Immigration Consultant",
        issuer: "Indian Association of Immigration Consultants",
        date: "2018",
        description: "Professional certification for handling all types of immigration and visa documentation processes.",
        icon: <Award className="h-5 w-5" />
      },
      {
        id: "ach2",
        title: "Excellence in Customer Service",
        issuer: "Immigration Consultancy Association",
        date: "2022",
        description: "Awarded for maintaining a client satisfaction rate of over 98% for three consecutive years.",
        icon: <Star className="h-5 w-5" />
      },
      {
        id: "ach3",
        title: "Passport & Visa Processing Specialist",
        issuer: "Ministry of External Affairs",
        date: "2019",
        description: "Recognized for expertise in handling complex passport and visa application procedures.",
        icon: <Award className="h-5 w-5" />
      }
    ],
    experience_details: [
      {
        id: "exp1",
        role: "Senior Visa Consultant",
        company: "Global Immigration Services",
        period: "2019 - Present",
        description: "Handling complex visa applications for multiple countries including USA, UK, Canada, and Australia. Specializing in difficult cases and emergency travel documentation."
      },
      {
        id: "exp2",
        role: "Passport Processing Specialist",
        company: "Passport Seva Kendra",
        period: "2015 - 2019",
        description: "Managed passport applications, renewals, and special cases. Provided guidance on documentation requirements and verification processes."
      }
    ],
    education: [
      {
        id: "edu1",
        degree: "Ph.D in International Relations",
        institution: "Delhi University",
        year: "2015"
      },
      {
        id: "edu2",
        degree: "Master's in Public Administration",
        institution: "Mumbai University",
        year: "2012"
      }
    ],
    successRate: 98,
    clientsServed: 580,
    completedCases: 510,
    responseTime: "Under 30 mins",
    successfulCases: [
      {
        id: "case1",
        title: "Emergency Medical Visa for USA",
        description: "Helped a client secure an emergency medical visa to the USA for their child's urgent treatment. Expedited the entire process which normally takes weeks to just 48 hours.",
        date: "December 2022",
        category: "Emergency Visa",
        outcome: "Successful visa approval in 48 hours"
      },
      {
        id: "case2",
        title: "Complex OCI Card Application",
        description: "Assisted a client with a complex OCI card application involving multiple name changes and documentation issues from different countries.",
        date: "August 2022",
        category: "OCI Card",
        outcome: "Successful approval after initial rejection"
      },
      {
        id: "case3",
        title: "Family Immigration Package",
        description: "Handled complete visa and immigration documentation for a family of 5 moving to Canada, including work permits, study permits, and permanent residency applications.",
        date: "March 2023",
        category: "Immigration",
        outcome: "All applications approved"
      }
    ]
  },
  // Expert #2
  {
    id: 2,
    name: "Rajesh Kumar",
    image: "/public/IMG/expert-2.jpg",
    field: "Property & Land",
    specialization: ["Property Registration", "Land Disputes", "Title Verification", "Legal Documentation", "Real Estate Consultation"],
    rating: 4.7,
    experience: 12,
    rate: 25,
    languages: ["English", "Hindi", "Punjabi"],
    bio: "Rajesh Kumar is a property and land documentation expert with 12 years of experience in handling real estate transactions, property disputes, and land registrations. He has deep knowledge of property laws across multiple states and has helped clients resolve complex property disputes and registration issues.",
    location: "Delhi NCR",
    phone: "+91 9876543211",
    email: "rajesh.kumar@example.com",
    availability: [
      { day: "Monday", slots: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"] },
      { day: "Tuesday", slots: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"] },
      { day: "Wednesday", slots: ["9:00 AM", "11:00 AM", "1:00 PM"] },
      { day: "Thursday", slots: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"] },
      { day: "Friday", slots: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"] },
    ],
    reviews: [
      {
        id: "rev1",
        name: "Vikram Singh",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        date: "July 10, 2023",
        rating: 5,
        comment: "Mr. Kumar helped me resolve a property dispute that had been ongoing for years. His knowledge of land laws is exceptional.",
        service: "Land Dispute Resolution",
        verified: true
      },
      {
        id: "rev2",
        name: "Anita Desai",
        date: "June 8, 2023",
        rating: 4,
        comment: "Very helpful with my property registration. The process was seamless and he handled all the paperwork efficiently.",
        service: "Property Registration",
        verified: true
      },
      {
        id: "rev3",
        name: "Suresh Patel",
        avatar: "https://randomuser.me/api/portraits/men/24.jpg",
        date: "May 15, 2023",
        rating: 5,
        comment: "Outstanding service! Rajesh helped me identify issues with a property I was about to purchase, potentially saving me from a huge financial loss.",
        service: "Title Verification",
        verified: true
      }
    ],
    achievements: [
      {
        id: "ach1",
        title: "Certified Property Law Specialist",
        issuer: "Bar Council of India",
        date: "2016",
        description: "Specialized certification in property law and real estate transactions.",
        icon: <Briefcase className="h-5 w-5" />
      },
      {
        id: "ach2",
        title: "Distinguished Real Estate Consultant",
        issuer: "Real Estate Regulatory Authority",
        date: "2020",
        description: "Recognition for outstanding contributions to real estate transaction transparency and consumer protection.",
        icon: <Award className="h-5 w-5" />
      }
    ],
    experience_details: [
      {
        id: "exp1",
        role: "Senior Property Consultant",
        company: "Prime Property Solutions",
        period: "2015 - Present",
        description: "Handling property registrations, title verifications, and resolving property disputes. Specializing in complex cases involving multiple stakeholders and historical properties."
      },
      {
        id: "exp2",
        role: "Legal Advisor - Real Estate",
        company: "Delhi Land Authority",
        period: "2011 - 2015",
        description: "Provided legal consultation on land acquisition, property registration, and resolution of land disputes in the Delhi NCR region."
      }
    ],
    education: [
      {
        id: "edu1",
        degree: "LLB with specialization in Property Law",
        institution: "Delhi University",
        year: "2011"
      },
      {
        id: "edu2",
        degree: "Bachelor's in Commerce",
        institution: "Punjab University",
        year: "2008"
      }
    ],
    successRate: 92,
    clientsServed: 720,
    completedCases: 665,
    responseTime: "1-2 hours",
    successfulCases: [
      {
        id: "case1",
        title: "Multi-generational Property Dispute",
        description: "Successfully resolved a property dispute that had been ongoing for three generations, involving multiple claims on ancestral property.",
        date: "November 2022",
        category: "Land Dispute",
        outcome: "Amicable settlement reached"
      },
      {
        id: "case2",
        title: "Commercial Property Registration",
        description: "Handled the complete registration process for a large commercial property with multiple owners and complex title history.",
        date: "March 2023",
        category: "Property Registration",
        outcome: "Registration completed without delays"
      }
    ]
  },
  // Expert #3
  {
    id: 3,
    name: "Aishwarya Verma",
    image: "/public/IMG/expert-3.jpg",
    field: "Income Tax",
    specialization: ["Tax Filing", "Audit Defense", "Tax Planning", "GST Registration", "Corporate Taxation"],
    rating: 4.8,
    experience: 10,
    rate: 20,
    languages: ["English", "Hindi", "Gujarati"],
    bio: "Aishwarya Verma is a certified tax professional with over a decade of experience in personal and business tax filing. She has helped hundreds of clients navigate complex tax regulations, maximize deductions, and resolve tax disputes with authorities. Her expertise covers all aspects of Indian taxation including income tax, GST, and corporate tax compliance.",
    location: "Bangalore, Karnataka",
    phone: "+91 9876543212",
    email: "aishwarya.verma@example.com",
    availability: [
      { day: "Monday", slots: ["9:30 AM", "11:00 AM", "2:30 PM", "4:00 PM"] },
      { day: "Tuesday", slots: ["9:30 AM", "11:00 AM", "2:30 PM", "4:00 PM"] },
      { day: "Wednesday", slots: ["9:30 AM", "11:00 AM", "2:30 PM"] },
      { day: "Thursday", slots: ["9:30 AM", "11:00 AM", "2:30 PM", "4:00 PM"] },
      { day: "Saturday", slots: ["10:00 AM", "11:30 AM", "1:00 PM"] },
    ],
    reviews: [
      {
        id: "rev1",
        name: "Rajan Mehta",
        avatar: "https://randomuser.me/api/portraits/men/52.jpg",
        date: "July 25, 2023",
        rating: 5,
        comment: "Ms. Verma helped me with a complex tax issue related to foreign income. She was thorough, knowledgeable, and saved me from significant penalties.",
        service: "Tax Consultation",
        verified: true
      },
      {
        id: "rev2",
        name: "Priya Kapoor",
        date: "June 12, 2023",
        rating: 4.5,
        comment: "Very professional service for my business tax filing. She identified several deductions I wasn't aware of and helped optimize my tax structure.",
        service: "Business Tax Filing",
        verified: true
      },
      {
        id: "rev3",
        name: "Vivek Sinha",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        date: "May 3, 2023",
        rating: 5,
        comment: "Exceptional knowledge of GST procedures. Aishwarya helped my startup get properly registered and set up compliant processes from day one.",
        service: "GST Registration",
        verified: true
      }
    ],
    achievements: [
      {
        id: "ach1",
        title: "Certified Public Accountant",
        issuer: "Institute of Chartered Accountants of India",
        date: "2014",
        description: "Professional certification in accounting and tax procedures.",
        icon: <Award className="h-5 w-5" />
      },
      {
        id: "ach2",
        title: "GST Compliance Expert",
        issuer: "National Academy of Customs, Indirect Taxes and Narcotics",
        date: "2018",
        description: "Specialized certification in GST compliance and procedures.",
        icon: <Award className="h-5 w-5" />
      },
      {
        id: "ach3",
        title: "Tax Professional of the Year",
        issuer: "Bangalore Chamber of Commerce",
        date: "2021",
        description: "Recognized for excellence in tax advisory services and client satisfaction.",
        icon: <Star className="h-5 w-5" />
      }
    ],
    experience_details: [
      {
        id: "exp1",
        role: "Senior Tax Consultant",
        company: "TaxPro Solutions",
        period: "2018 - Present",
        description: "Providing comprehensive tax services to individuals and businesses, handling complex tax situations, and representing clients during tax audits."
      },
      {
        id: "exp2",
        role: "Tax Advisor",
        company: "Ernst & Young",
        period: "2014 - 2018",
        description: "Advised corporate clients on tax optimization strategies, ensuring compliance with changing regulations, and preparing detailed tax reports."
      },
      {
        id: "exp3",
        role: "Junior Tax Associate",
        company: "KPMG",
        period: "2011 - 2014",
        description: "Assisted with tax return preparation for high-net-worth individuals and small businesses, researched tax laws, and prepared client documentation."
      }
    ],
    education: [
      {
        id: "edu1",
        degree: "Master's in Taxation Law",
        institution: "National Law School of India University",
        year: "2013"
      },
      {
        id: "edu2",
        degree: "Bachelor's in Commerce",
        institution: "Bangalore University",
        year: "2010"
      }
    ],
    successRate: 96,
    clientsServed: 850,
    completedCases: 820,
    responseTime: "Within 1 hour",
    successfulCases: [
      {
        id: "case1",
        title: "Income Tax Audit Defense",
        description: "Successfully represented a client during a comprehensive income tax audit, resulting in significant reduction of initially proposed penalties.",
        date: "January 2023",
        category: "Tax Audit",
        outcome: "Penalty reduced by 85%"
      },
      {
        id: "case2",
        title: "Corporate Tax Restructuring",
        description: "Helped a growing tech startup restructure their tax approach, ensuring compliance while optimizing deductions and credits.",
        date: "October 2022",
        category: "Corporate Taxation",
        outcome: "Saved ₹12 lakhs in annual tax liability"
      },
      {
        id: "case3",
        title: "International Income Reporting",
        description: "Assisted an NRI client in properly reporting foreign income and investments while maximizing available treaty benefits.",
        date: "March 2023",
        category: "International Taxation",
        outcome: "Full compliance achieved with optimal tax outcomes"
      }
    ]
  },
  // Expert #4
  {
    id: 4,
    name: "Dr. Vikram Desai",
    image: "/public/IMG/expert-1.jpg",
    field: "Medical Insurance",
    specialization: ["Policy Claims", "Coverage Disputes", "Insurance Appeals", "Medical Billing", "Policy Selection"],
    rating: 4.9,
    experience: 15,
    rate: 18,
    languages: ["English", "Hindi", "Tamil", "Kannada"],
    bio: "Dr. Vikram Desai combines medical expertise with deep knowledge of health insurance systems. With 15 years of experience as both a practicing physician and insurance consultant, he specializes in helping patients navigate complex insurance claims, dispute denials, and maximize their coverage benefits. He has successfully helped over 1,000 clients receive the insurance payouts they deserve.",
    location: "Chennai, Tamil Nadu",
    phone: "+91 9876543213",
    email: "vikram.desai@example.com",
    availability: [
      { day: "Monday", slots: ["10:30 AM", "12:00 PM", "3:30 PM", "5:00 PM"] },
      { day: "Tuesday", slots: ["10:30 AM", "12:00 PM", "3:30 PM", "5:00 PM"] },
      { day: "Thursday", slots: ["10:30 AM", "12:00 PM", "3:30 PM"] },
      { day: "Friday", slots: ["10:30 AM", "12:00 PM", "3:30 PM", "5:00 PM"] },
    ],
    reviews: [
      {
        id: "rev1",
        name: "Lakshmi Narayan",
        avatar: "https://randomuser.me/api/portraits/women/62.jpg",
        date: "August 5, 2023",
        rating: 5,
        comment: "Dr. Desai helped us appeal a rejected claim for my father's surgery. His expertise was invaluable, and we received the full coverage amount after his intervention.",
        service: "Claim Appeal",
        verified: true
      },
      {
        id: "rev2",
        name: "Sanjay Mehta",
        date: "July 14, 2023",
        rating: 5,
        comment: "When my insurance company initially denied coverage for my treatment, Dr. Desai knew exactly how to navigate the appeals process. Couldn't have done it without him!",
        service: "Coverage Dispute",
        verified: true
      },
      {
        id: "rev3",
        name: "Radhika Pillai",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        date: "June 22, 2023",
        rating: 4.5,
        comment: "Extremely knowledgeable about the intricacies of health insurance policies. He helped me choose the right policy for my family's specific medical needs.",
        service: "Policy Selection",
        verified: true
      }
    ],
    achievements: [
      {
        id: "ach1",
        title: "Certified Medical Insurance Specialist",
        issuer: "Insurance Regulatory and Development Authority of India",
        date: "2015",
        description: "Specialized certification in medical insurance claims processing and policy regulations.",
        icon: <Award className="h-5 w-5" />
      },
      {
        id: "ach2",
        title: "Healthcare Advocate of the Year",
        issuer: "Federation of Indian Chambers of Commerce & Industry",
        date: "2020",
        description: "Recognized for advocacy work on behalf of patients dealing with insurance companies.",
        icon: <Star className="h-5 w-5" />
      }
    ],
    experience_details: [
      {
        id: "exp1",
        role: "Medical Insurance Consultant",
        company: "HealthClaim Advocates",
        period: "2014 - Present",
        description: "Helping patients navigate insurance claims, appeals, and disputes. Specializing in complex cases involving high-value treatments and chronic conditions."
      },
      {
        id: "exp2",
        role: "Medical Director",
        company: "Apollo Hospital Insurance Department",
        period: "2010 - 2014",
        description: "Oversaw insurance verifications, claims processing, and patient advocacy for one of India's largest hospital networks."
      }
    ],
    education: [
      {
        id: "edu1",
        degree: "M.D. in Internal Medicine",
        institution: "All India Institute of Medical Sciences",
        year: "2008"
      },
      {
        id: "edu2",
        degree: "MBBS",
        institution: "Christian Medical College, Vellore",
        year: "2003"
      }
    ],
    successRate: 94,
    clientsServed: 1250,
    completedCases: 1180,
    responseTime: "Same day",
    successfulCases: [
      {
        id: "case1",
        title: "Cancer Treatment Coverage Appeal",
        description: "Successfully appealed a denied claim for advanced cancer treatment, helping the patient receive full coverage for a ₹32 lakh procedure.",
        date: "February 2023",
        category: "Major Medical Claim",
        outcome: "Full coverage approved after initial denial"
      },
      {
        id: "case2",
        title: "Pre-existing Condition Dispute",
        description: "Challenged an insurance company's classification of a condition as pre-existing, providing medical evidence that successfully reversed their decision.",
        date: "November 2022",
        category: "Coverage Dispute",
        outcome: "Claim approved with full benefits"
      }
    ]
  }
];

// Simplified version of experts array for the card view
const experts = expertDetailsData.map(expert => ({
  id: expert.id,
  name: expert.name,
  image: expert.image,
  field: expert.field,
  specialization: expert.specialization,
  rating: expert.rating,
  experience: expert.experience,
  rate: expert.rate,
  languages: expert.languages
}));

const ExpertCard = ({ expert, onViewDetails }: { expert: typeof experts[0], onViewDetails: (id: number) => void }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Card className="h-full flex flex-col cursor-pointer hover:shadow-md transition-shadow" onClick={() => onViewDetails(expert.id)}>
        <CardHeader className="pb-2 pt-6 text-center">
          <div className="relative mx-auto mb-3">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
              <img 
                src={expert.image} 
                alt={expert.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-primary text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center border-2 border-white">
              {expert.rating}
            </div>
          </div>
          <h3 className="font-semibold text-lg">{expert.name}</h3>
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span>{expert.rating} • {expert.experience} yrs exp</span>
          </div>
        </CardHeader>
        <CardContent className="text-center pb-0 flex-grow">
          <Badge variant="secondary" className="mb-3">{expert.field}</Badge>
          <div className="flex flex-wrap justify-center gap-1 mb-3">
            {expert.specialization.slice(0, 2).map((spec, index) => (
              <Badge key={index} variant="outline" className="font-normal text-xs">
                {spec}
              </Badge>
            ))}
            {expert.specialization.length > 2 && (
              <Badge variant="outline" className="font-normal text-xs">
                +{expert.specialization.length - 2} more
              </Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground mb-2">
            Speaks: {expert.languages.join(", ")}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <div className="w-full text-center">
            <span className="text-xl font-bold text-primary">₹{expert.rate}</span>
            <span className="text-sm text-muted-foreground">/min</span>
          </div>
          <Button className="w-full" onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the card click
            setDialogOpen(true);
          }}>
            <Phone className="mr-2 h-4 w-4" />
            Connect Now
          </Button>
        </CardFooter>
      </Card>

      <ExpertPaymentDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        expert={{
          id: expert.id,
          name: expert.name,
          rate: expert.rate
        }} 
      />
    </>
  );
};

const Experts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedExpertId, setSelectedExpertId] = useState<number | null>(null);
  
  const fields = [...new Set(experts.map(expert => expert.field))];
  
  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          expert.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          expert.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesField = selectedField ? expert.field === selectedField : true;
    
    return matchesSearch && matchesField;
  });

  const selectedExpert = selectedExpertId 
    ? expertDetailsData.find(expert => expert.id === selectedExpertId) 
    : null;

  const refreshExpertAvailability = async () => {
    if (selectedExpertId) {
      // In a real app, you'd fetch fresh data from the server
      // For this demo we're just closing and reopening the modal 
      // to trigger a fresh data load
      setSelectedExpertId(null);
      setTimeout(() => {
        setSelectedExpertId(selectedExpertId);
      }, 100);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Connect with Experts</h1>
            <p className="text-xl text-muted-foreground">
              Get personalized assistance from our verified government process specialists
            </p>
          </div>

          <div className="mb-8 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search by name, field or specialization..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <select 
                  className="appearance-none w-full bg-background border border-input rounded-md h-10 px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={selectedField || ''}
                  onChange={(e) => setSelectedField(e.target.value || null)}
                >
                  <option value="">All Fields</option>
                  {fields.map((field, index) => (
                    <option key={index} value={field}>{field}</option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredExperts.length > 0 ? (
              filteredExperts.map(expert => (
                <ExpertCard 
                  key={expert.id} 
                  expert={expert}
                  onViewDetails={(id) => setSelectedExpertId(id)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium mb-2">No experts found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Become an Expert</h2>
            <p className="text-lg mb-6">
              Are you knowledgeable about government processes? Join our platform to help others and earn.
            </p>
            <Button size="lg">
              Apply to be an Expert
            </Button>
          </div>
        </div>
      </main>
      
      {selectedExpert && (
        <ExpertDetailView
          expert={selectedExpert}
          open={!!selectedExpertId}
          onOpenChange={(open) => {
            if (!open) setSelectedExpertId(null);
          }}
          onBookingSuccess={refreshExpertAvailability}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Experts;