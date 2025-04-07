import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Phone,
  Mail,
  MessageSquare,
  Star,
  Clock,
  Calendar,
  Award,
  FileText,
  User,
  MapPin,
  Briefcase,
  GraduationCap,
  Languages,
  ThumbsUp,
  Check,
  X,
  ArrowRight,
  Download,
  Share2,
  Tag,
  Clock4
} from 'lucide-react';
import ExpertPaymentDialog from '@/components/expert-payment/ExpertPaymentDialog';
import { AppointmentBooking } from './AppointmentBooking';
import { toast } from '@/hooks/use-toast';

// Types
interface Review {
  id: string;
  name: string;
  avatar?: string;
  date: string;
  rating: number;
  comment: string;
  service: string;
  verified: boolean;
}

interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon: React.ReactNode;
}

interface Availability {
  day: string;
  slots: string[];
}

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

interface Case {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  outcome: string;
}

export interface ExpertDetails {
  id: number;
  name: string;
  image: string;
  field: string;
  specialization: string[];
  rating: number;
  experience: number;
  rate: number;
  languages: string[];
  bio: string;
  location: string;
  phone?: string;
  email?: string;
  availability: Availability[];
  reviews: Review[];
  achievements: Achievement[];
  experience_details: Experience[];
  education: Education[];
  successRate: number;
  clientsServed: number;
  completedCases: number;
  responseTime: string;
  successfulCases: Case[];
}

interface ExpertDetailViewProps {
  expert: ExpertDetails;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookingSuccess?: () => Promise<void>;
}

export const ExpertDetailView: React.FC<ExpertDetailViewProps> = ({ 
  expert, 
  open, 
  onOpenChange,
  onBookingSuccess
}) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  // Helper to render star rating
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < Math.floor(rating) 
                ? 'text-yellow-400 fill-yellow-400' 
                : index < rating 
                  ? 'text-yellow-400 fill-yellow-400 opacity-50' 
                  : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  // Group reviews by rating
  const reviewsByRating = expert.reviews.reduce((acc, review) => {
    const rating = Math.floor(review.rating);
    if (!acc[rating]) {
      acc[rating] = [];
    }
    acc[rating].push(review);
    return acc;
  }, {} as Record<number, Review[]>);

  // Calculate review percentages
  const reviewStats = [5, 4, 3, 2, 1].map(rating => {
    const count = reviewsByRating[rating]?.length || 0;
    const percentage = expert.reviews.length > 0 
      ? (count / expert.reviews.length) * 100 
      : 0;
    
    return { rating, count, percentage };
  });

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
          <div className="flex flex-col h-full overflow-hidden">
            <DialogHeader className="px-6 pt-6 pb-2">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarImage src={expert.image} alt={expert.name} />
                  <AvatarFallback>{expert.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    {expert.name}
                    {expert.rating >= 4.5 && (
                      <Badge className="bg-yellow-400 hover:bg-yellow-500 text-black ml-1 h-5">
                        <Star className="h-3 w-3 mr-1 fill-black" />
                        Top Rated
                      </Badge>
                    )}
                  </DialogTitle>
                  <DialogDescription className="text-base mt-1">
                    {expert.field} Specialist • {expert.experience} years experience
                  </DialogDescription>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <div className="flex items-center">
                      <StarRating rating={expert.rating} />
                      <span className="ml-1 font-medium">{expert.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground ml-1">({expert.reviews.length} reviews)</span>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="mr-1 h-3.5 w-3.5" />
                      {expert.location}
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center text-muted-foreground">
                      <Languages className="mr-1 h-3.5 w-3.5" />
                      {expert.languages.join(", ")}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-xl font-bold text-primary">₹{expert.rate}<span className="text-sm font-normal text-muted-foreground">/min</span></div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-1" onClick={() => setBookingOpen(true)}>
                      <Calendar className="h-4 w-4" />
                      Book
                    </Button>
                    <Button className="gap-1" onClick={() => setPaymentDialogOpen(true)}>
                      <Phone className="h-4 w-4" />
                      Connect Now
                    </Button>
                  </div>
                </div>
              </div>
            </DialogHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
              <div className="px-6 border-b">
                <TabsList className="grid grid-cols-5 h-12">
                  <TabsTrigger value="profile" className="text-sm">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="text-sm">
                    <Star className="h-4 w-4 mr-2" />
                    Reviews
                  </TabsTrigger>
                  <TabsTrigger value="achievements" className="text-sm">
                    <Award className="h-4 w-4 mr-2" />
                    Achievements
                  </TabsTrigger>
                  <TabsTrigger value="cases" className="text-sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Cases
                  </TabsTrigger>
                  <TabsTrigger value="availability" className="text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Availability
                  </TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="flex-1 px-6 pt-4 pb-6">
                {/* Profile Tab */}
                <TabsContent value="profile" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">About</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{expert.bio}</p>
                          
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                              <ThumbsUp className="h-5 w-5 mr-2 text-primary" />
                              <div>
                                <div className="font-medium">{expert.successRate}%</div>
                                <div className="text-xs text-muted-foreground">Success Rate</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <User className="h-5 w-5 mr-2 text-primary" />
                              <div>
                                <div className="font-medium">{expert.clientsServed}+</div>
                                <div className="text-xs text-muted-foreground">Clients Served</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-2 text-primary" />
                              <div>
                                <div className="font-medium">{expert.completedCases}</div>
                                <div className="text-xs text-muted-foreground">Completed Cases</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 mr-2 text-primary" />
                              <div>
                                <div className="font-medium">{expert.responseTime}</div>
                                <div className="text-xs text-muted-foreground">Avg. Response Time</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Specializations</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {expert.specialization.map((spec, index) => (
                              <Badge key={index} variant="outline" className="px-3 py-1">
                                <Tag className="h-3.5 w-3.5 mr-1.5" />
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Experience</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {expert.experience_details.map((exp) => (
                            <div key={exp.id} className="relative pl-6 border-l-2 border-muted pb-4 last:pb-0">
                              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                              <h3 className="font-medium">{exp.role}</h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Briefcase className="h-3.5 w-3.5 mr-1.5" />
                                {exp.company}
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                <Clock4 className="inline h-3.5 w-3.5 mr-1.5" />
                                {exp.period}
                              </div>
                              <p className="text-sm mt-2">{exp.description}</p>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Education</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {expert.education.map((edu) => (
                            <div key={edu.id} className="relative pl-6 border-l-2 border-muted pb-4 last:pb-0">
                              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                              <h3 className="font-medium">{edu.degree}</h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <GraduationCap className="h-3.5 w-3.5 mr-1.5" />
                                {edu.institution}
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                <Calendar className="inline h-3.5 w-3.5 mr-1.5" />
                                {edu.year}
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {expert.phone && (
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                              <span>{expert.phone}</span>
                            </div>
                          )}
                          {expert.email && (
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                              <span>{expert.email}</span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-3 text-muted-foreground" />
                            <span>Message via app</span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button className="w-full" onClick={() => setPaymentDialogOpen(true)}>
                              <Phone className="h-4 w-4 mr-2" />
                              Call Now
                            </Button>
                            <Button variant="outline" className="w-full" onClick={() => setBookingOpen(true)}>
                              <Calendar className="h-4 w-4 mr-2" />
                              Book Appointment
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Latest Reviews</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {expert.reviews.slice(0, 2).map((review) => (
                            <div key={review.id} className="border-b pb-3 last:border-0 last:pb-0">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center">
                                  <Avatar className="h-6 w-6 mr-2">
                                    {review.avatar ? (
                                      <AvatarImage src={review.avatar} alt={review.name} />
                                    ) : (
                                      <AvatarFallback>{review.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    )}
                                  </Avatar>
                                  <span className="font-medium text-sm">{review.name}</span>
                                </div>
                                <StarRating rating={review.rating} />
                              </div>
                              <p className="text-sm mt-2 line-clamp-2">{review.comment}</p>
                              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                                <span>{review.date}</span>
                                {review.verified && (
                                  <Badge variant="outline" className="text-xs px-1 py-0 h-5">
                                    <Check className="h-3 w-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                          <Button 
                            variant="ghost" 
                            className="w-full text-xs" 
                            onClick={() => setActiveTab('reviews')}
                          >
                            View all {expert.reviews.length} reviews
                            <ArrowRight className="h-3.5 w-3.5 ml-1" />
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Client Reviews</CardTitle>
                      <CardDescription>
                        {expert.reviews.length} reviews from verified clients
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-5xl font-bold">{expert.rating.toFixed(1)}</div>
                            <div className="flex justify-center my-2">
                              <StarRating rating={expert.rating} />
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {expert.reviews.length} reviews
                            </div>
                          </div>
                          <div className="space-y-2">
                            {reviewStats.map((stat) => (
                              <div key={stat.rating} className="flex items-center gap-2">
                                <div className="w-12 text-sm font-medium">{stat.rating} stars</div>
                                <Progress value={stat.percentage} className="h-2 flex-1" />
                                <div className="w-10 text-xs text-right text-muted-foreground">
                                  {stat.count}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="md:col-span-2">
                          <div className="space-y-4">
                            {expert.reviews.length > 0 ? (
                              expert.reviews.map((review) => (
                                <Card key={review.id} className="border-muted">
                                  <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                      <div className="flex items-center">
                                        <Avatar className="h-10 w-10 mr-3">
                                          {review.avatar ? (
                                            <AvatarImage src={review.avatar} alt={review.name} />
                                          ) : (
                                            <AvatarFallback>{review.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                          )}
                                        </Avatar>
                                        <div>
                                          <div className="font-medium">{review.name}</div>
                                          <div className="text-xs text-muted-foreground">{review.date}</div>
                                        </div>
                                      </div>
                                      <div className="flex items-center">
                                        <StarRating rating={review.rating} />
                                        <span className="ml-2 font-medium">{review.rating.toFixed(1)}</span>
                                      </div>
                                    </div>
                                    <div className="mt-3">
                                      <Badge variant="outline" className="mb-2">
                                        {review.service}
                                      </Badge>
                                      <p className="text-sm">{review.comment}</p>
                                    </div>
                                    {review.verified && (
                                      <div className="mt-3 flex items-center text-xs text-muted-foreground">
                                        <Check className="h-3.5 w-3.5 mr-1 text-green-500" />
                                        Verified Client
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              ))
                            ) : (
                              <div className="text-center py-6">
                                <div className="text-muted-foreground">No reviews yet</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Achievements Tab */}
                <TabsContent value="achievements" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Professional Achievements</CardTitle>
                      <CardDescription>
                        Certifications, awards, and professional milestones
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {expert.achievements.map((achievement) => (
                          <Card key={achievement.id} className="border-muted">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className="bg-primary/10 p-2.5 rounded-full text-primary">
                                  {achievement.icon || <Award className="h-5 w-5" />}
                                </div>
                                <div>
                                  <h3 className="font-medium">{achievement.title}</h3>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <span>{achievement.issuer}</span>
                                    <Separator orientation="vertical" className="mx-2 h-3" />
                                    <span>{achievement.date}</span>
                                  </div>
                                  <p className="text-sm mt-2">{achievement.description}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Cases Tab */}
                <TabsContent value="cases" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Successful Cases</CardTitle>
                      <CardDescription>
                        Examples of successfully completed client work
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {expert.successfulCases.map((caseItem) => (
                          <Card key={caseItem.id} className="border-muted">
                            <CardContent className="p-5">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium">{caseItem.title}</h3>
                                <Badge>{caseItem.category}</Badge>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {caseItem.date}
                              </div>
                              <p className="text-sm mt-3">{caseItem.description}</p>
                              <div className="mt-4 flex items-center">
                                <div className="text-sm font-medium">Outcome:</div>
                                <div className={`ml-2 text-sm ${
                                  caseItem.outcome.toLowerCase().includes('success') 
                                    ? 'text-green-500' 
                                    : 'text-amber-500'
                                }`}>
                                  {caseItem.outcome}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Availability Tab */}
                <TabsContent value="availability" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Availability Schedule</CardTitle>
                      <CardDescription>
                        Book a slot that works for your schedule
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {expert.availability.map((day) => (
                          <Card key={day.day} className="border-muted">
                            <CardHeader className="py-3 px-4">
                              <CardTitle className="text-base">{day.day}</CardTitle>
                            </CardHeader>
                            <CardContent className="py-3 px-4">
                              <div className="grid grid-cols-2 gap-2">
                                {day.slots.map((slot, index) => (
                                  <Button key={index} variant="outline" className="text-xs justify-start" onClick={() => setBookingOpen(true)}>
                                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                                    {slot}
                                  </Button>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </ScrollArea>
            </Tabs>

            <DialogFooter className="px-6 py-4 border-t">
              <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Save as PDF
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setBookingOpen(true)}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                  <Button size="sm" onClick={() => setPaymentDialogOpen(true)}>
                    <Phone className="h-4 w-4 mr-2" />
                    Connect Now
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-hidden p-0">
          <div className="flex flex-col h-full">
            <DialogHeader className="px-6 pt-6 pb-2">
              <DialogTitle>Book an Appointment</DialogTitle>
              <DialogDescription>
                Select a date and time to book with {expert.name}
              </DialogDescription>
            </DialogHeader>
            
            <ScrollArea className="flex-1 px-6 py-4">
              <AppointmentBooking 
                expertId={expert.id} 
                expertName={expert.name}
                onSuccess={() => {
                  toast({
                    title: "Appointment booked!",
                    description: `Your appointment with ${expert.name} has been confirmed.`,
                    variant: "default"
                  });
                  
                  // Close booking dialog
                  setBookingOpen(false);
                  
                  // Call the callback if provided
                  onBookingSuccess?.();
                }}
              />
            </ScrollArea>
            
            <DialogFooter className="px-6 py-4 border-t">
              <Button variant="outline" onClick={() => setBookingOpen(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment dialog */}
      {expert && (
        <ExpertPaymentDialog
          open={paymentDialogOpen}
          onOpenChange={setPaymentDialogOpen}
          expert={{
            id: expert.id,
            name: expert.name,
            rate: expert.rate
          }}
        />
      )}
    </>
  );
}; 