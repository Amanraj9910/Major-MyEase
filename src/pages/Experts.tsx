import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Phone, Star, Search, Filter } from 'lucide-react';
import ExpertPaymentDialog from '@/components/expert-payment/ExpertPaymentDialog';

interface Expert {
  id: number;
  name: string;
  image: string;
  field: string;
  specialization: string[];
  rating: number;
  experience: number;
  rate: number;
  languages: string[];
}

const experts: Expert[] = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
    field: "Passport & Visa",
    specialization: ["Passport Applications", "Foreign Visas", "OCI Cards"],
    rating: 4.9,
    experience: 8,
    rate: 15,
    languages: ["English", "Hindi", "Marathi"]
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    field: "Property & Land",
    specialization: ["Property Registration", "Land Disputes", "Title Verification"],
    rating: 4.7,
    experience: 12,
    rate: 25,
    languages: ["English", "Hindi", "Punjabi"]
  },
  {
    id: 3,
    name: "Anita Desai",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    field: "Tax & Finance",
    specialization: ["Income Tax", "GST Filing", "Tax Planning"],
    rating: 4.8,
    experience: 10,
    rate: 20,
    languages: ["English", "Hindi", "Gujarati"]
  },
  {
    id: 4,
    name: "Vikram Singh",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    field: "Legal Services",
    specialization: ["Legal Documentation", "Court Procedures", "Legal Advice"],
    rating: 4.6,
    experience: 15,
    rate: 30,
    languages: ["English", "Hindi", "Bengali"]
  },
  {
    id: 5,
    name: "Sunita Patel",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
    field: "Education & Admissions",
    specialization: ["School Admissions", "Scholarship Applications", "Education Loans"],
    rating: 4.9,
    experience: 7,
    rate: 12,
    languages: ["English", "Hindi", "Kannada"]
  },
  {
    id: 6,
    name: "Karthik Nair",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    field: "Business & Licensing",
    specialization: ["MSME Registration", "Business Licenses", "Startup Compliance"],
    rating: 4.7,
    experience: 9,
    rate: 18,
    languages: ["English", "Hindi", "Malayalam", "Tamil"]
  },
  {
    id: 7,
    name: "Meera Joshi",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    field: "Healthcare & Insurance",
    specialization: ["Health Insurance", "Medical Documentation", "Senior Benefits"],
    rating: 4.8,
    experience: 11,
    rate: 15,
    languages: ["English", "Hindi", "Marathi"]
  },
  {
    id: 8,
    name: "Arjun Mehta",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
    field: "Immigration",
    specialization: ["Citizenship Applications", "Work Permits", "Residency"],
    rating: 4.9,
    experience: 14,
    rate: 28,
    languages: ["English", "Hindi", "Punjabi"]
  }
];

const ExpertCard = ({ expert }: { expert: Expert }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Card className="h-full flex flex-col">
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
          <Button className="w-full" onClick={() => setDialogOpen(true)}>
            <Phone className="mr-2 h-4 w-4" />
            Connect Now
          </Button>
        </CardFooter>
      </Card>

      <ExpertPaymentDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        expert={expert} 
      />
    </>
  );
};

const Experts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState<string | null>(null);
  
  const fields = [...new Set(experts.map(expert => expert.field))];
  
  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          expert.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          expert.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesField = selectedField ? expert.field === selectedField : true;
    
    return matchesSearch && matchesField;
  });

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
                <ExpertCard key={expert.id} expert={expert} />
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
              Are you knowledgeable about government processes? Join our platform and help others navigate bureaucracy while earning.
            </p>
            <Button size="lg">Apply to Join</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Experts;
