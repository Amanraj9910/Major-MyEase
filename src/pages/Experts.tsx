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
  {
    id: 1,
    name: "Dr. Priya Sharma",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
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
  {
    id: 2,
    name: "Rajesh Kumar",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
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
  // Additional experts data would go here...
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
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Experts;