import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Small Business Owner",
    image: "https://placehold.co/100x100/EBF4FF/3B82F6?text=PS",
    text: "MyEase se business registration bahut simple ho gaya! Jo kaam pehle confusing lagta tha, ab ghanton mein ho gaya. Highly recommend!",
    rating: 5
  },
  {
    name: "Amit Singh",
    role: "Student Applying for Passport",
    image: "https://placehold.co/100x100/FEF9C3/CA8A04?text=AS",
    text: "Pehla passport apply karna thoda darawna tha, but MyEase ne clear steps diye aur forms sahi se generate karne mein help ki. Bahut stress bach gaya.",
    rating: 5
  },
  {
    name: "Sunita Patel",
    role: "Home Buyer",
    image: "https://placehold.co/100x100/ECFDF5/10B981?text=SP",
    text: "Property registration samajhna mushkil lag raha tha. MyEase ne process ko easy kar diya aur document templates toh lifesaver the.",
    rating: 4
  },
  {
    name: "Rajesh Kumar",
    role: "Freelancer",
    image: "https://placehold.co/100x100/FEE2E2/DC2626?text=RK",
    text: "PAN card application guide ekdum clear tha. Platform use karna aasan hai aur center jaane ka time bach gaya.",
    rating: 5
  },
  {
    name: "Deepa Iyer",
    role: "Parent Applying for Child's Aadhaar",
    image: "https://placehold.co/100x100/F5F3FF/8B5CF6?text=DI",
    text: "Bachhe ka Aadhaar banwana kaafi easy ho gaya diye gaye steps se. MyEase ne poora process simplify kar diya.",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
          What Our <span className="text-gradient">Users Say</span>
        </h2>
        
        <Carousel 
          opts={{ 
            align: "start",
            loop: true,
          }}
          className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="flex flex-col h-full justify-between border-border/60 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-card overflow-hidden">
                    <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
                      <Avatar className="w-16 h-16 mb-4 border-2 border-primary/30">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} className="object-cover" />
                        <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm text-foreground/80 mb-4 italic flex-grow">"{testimonial.text}"</p>
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} />
                        ))}
                      </div>
                      <h3 className="font-semibold text-base">{testimonial.name}</h3>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 fill-background hidden sm:flex" />
          <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 fill-background hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials; 