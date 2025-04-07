import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CreditCard, 
  FileText, 
  Home, 
  LayoutDashboard, 
  Users, 
  AlertCircle, 
  CheckCircle2, 
  Clock3,
  Check,
  Download,
  Filter,
  Search,
  ArrowUpDown,
  RefreshCw,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState<Date>();
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);

  // Mock data for demonstrations - in a real app, these would come from API calls
  const recentProcesses = [
    { id: 'proc-001', name: 'Passport Application', status: 'Completed', date: '2024-11-10', progress: 100 },
    { id: 'proc-002', name: 'Visa Extension', status: 'In Progress', date: '2024-11-05', progress: 65 },
    { id: 'proc-003', name: 'Property Registration', status: 'Pending', date: '2024-10-28', progress: 30 },
    { id: 'proc-004', name: 'Tax Filing', status: 'In Progress', date: '2024-11-02', progress: 45 },
    { id: 'proc-005', name: 'Medical Insurance Claim', status: 'Completed', date: '2024-10-15', progress: 100 },
  ];

  const upcomingAppointments = [
    { id: 'apt-001', expertName: 'Dr. Priya Sharma', service: 'Passport Consultation', date: '2024-11-15', time: '10:00 AM' },
    { id: 'apt-002', expertName: 'Rajesh Kumar', service: 'Property Guidance', date: '2024-11-20', time: '2:30 PM' },
    { id: 'apt-003', expertName: 'Aishwarya Verma', service: 'Tax Planning', date: '2024-11-18', time: '11:00 AM' },
  ];

  const paymentHistory = [
    { id: 'pay-001', amount: 750, service: 'Expert Consultation', date: '2024-11-01', status: 'Completed' },
    { id: 'pay-002', amount: 1200, service: 'Document Processing', date: '2024-10-15', status: 'Completed' },
    { id: 'pay-003', amount: 500, service: 'Application Fee', date: '2024-10-10', status: 'Refunded' },
    { id: 'pay-004', amount: 2500, service: 'Property Consultation', date: '2024-09-28', status: 'Completed' },
    { id: 'pay-005', amount: 350, service: 'Document Verification', date: '2024-09-15', status: 'Completed' },
  ];

  const documents = [
    { id: 'doc-001', name: 'Passport Application Form', date: '2024-11-05', type: 'PDF' },
    { id: 'doc-002', name: 'Property Deed', date: '2024-10-25', type: 'PDF' },
    { id: 'doc-003', name: 'Visa Support Letter', date: '2024-10-15', type: 'DOCX' },
    { id: 'doc-004', name: 'Tax Filing Receipt', date: '2024-09-30', type: 'PDF' },
    { id: 'doc-005', name: 'Medical Insurance Policy', date: '2024-09-12', type: 'PDF' },
  ];

  // Stats data
  const stats = {
    processesCreated: 5,
    documentsGenerated: 12,
    appointmentsScheduled: 3,
    paymentsProcessed: 8,
    activeConsultations: 2
  };

  // Simulate data loading
  useEffect(() => {
    if (refreshKey > 0) {
      const loadData = async () => {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        toast({
          title: 'Dashboard refreshed',
          description: 'Latest data has been loaded successfully.',
        });
      };
      
      loadData();
    }
  }, [refreshKey]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Filter processes based on status and search term
  const filteredProcesses = recentProcesses.filter(process => {
    const matchesFilter = filter === 'all' || process.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch = process.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Filter documents based on search term and selected date
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !date || new Date(doc.date).toDateString() === date.toDateString();
    return matchesSearch && matchesDate;
  });

  // Helper function to render status badges
  const renderStatusBadge = (status) => {
    let variant: "default" | "destructive" | "outline" | "secondary" | "success" = "outline";
    let icon = null;
    
    switch(status.toLowerCase()) {
      case 'completed':
        variant = "success";
        icon = <CheckCircle2 className="h-3.5 w-3.5 mr-1" />;
        break;
      case 'in progress':
        variant = "secondary";
        icon = <Clock3 className="h-3.5 w-3.5 mr-1" />;
        break;
      case 'pending':
        variant = "outline";
        icon = <AlertCircle className="h-3.5 w-3.5 mr-1" />;
        break;
      case 'refunded':
        variant = "destructive";
        icon = <Check className="h-3.5 w-3.5 mr-1" />;
        break;
      default:
        variant = "outline";
    }
    
    return (
      <Badge variant={variant} className="flex items-center">
        {icon}
        {status}
      </Badge>
    );
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Statistics Card
  const StatCard = ({ title, value, description, icon }) => (
    <Card>
      <CardContent className="flex items-center p-6">
        <div className="bg-primary/10 p-3 rounded-full mr-4">
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-sm text-muted-foreground">{title}</div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-xs text-muted-foreground mt-1">{description}</div>
        </div>
      </CardContent>
    </Card>
  );

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <Button variant="outline" className="gap-2" onClick={handleRefresh}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button variant="outline" onClick={() => navigate('/profile')}>
            My Profile
          </Button>
          <Button variant="destructive" onClick={() => {
            logout();
            navigate('/login');
          }}>
            Logout
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl mx-auto">
          <TabsTrigger value="overview" className="flex items-center">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="processes" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            My Processes
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Appointments
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <StatCard 
              title="Processes" 
              value={stats.processesCreated}
              description="Total created" 
              icon={<FileText className="h-5 w-5 text-primary" />}
            />
            <StatCard 
              title="Documents" 
              value={stats.documentsGenerated}
              description="Total generated" 
              icon={<FileText className="h-5 w-5 text-primary" />}
            />
            <StatCard 
              title="Appointments" 
              value={stats.appointmentsScheduled}
              description="Currently scheduled" 
              icon={<CalendarIcon className="h-5 w-5 text-primary" />}
            />
            <StatCard 
              title="Payments" 
              value={stats.paymentsProcessed}
              description="Successfully processed" 
              icon={<CreditCard className="h-5 w-5 text-primary" />}
            />
            <StatCard 
              title="Consultations" 
              value={stats.activeConsultations}
              description="Active consultations" 
              icon={<Users className="h-5 w-5 text-primary" />}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Processes</CardTitle>
                <CardDescription>Your ongoing processes</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[220px]">
                  <div className="space-y-4">
                    {recentProcesses.filter(p => p.status !== 'Completed').map(process => (
                      <div key={process.id} className="flex justify-between items-start border-b pb-3 last:border-0 last:pb-0">
                        <div>
                          <h3 className="font-medium">{process.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Started on {new Date(process.date).toLocaleDateString()}
                          </p>
                        </div>
                        {renderStatusBadge(process.status)}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab('processes')}>
                  View All Processes
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Scheduled consultations with experts</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[220px]">
                  <div className="space-y-4">
                    {upcomingAppointments.map(appointment => (
                      <div key={appointment.id} className="border-b pb-3 last:border-0 last:pb-0">
                        <h3 className="font-medium">{appointment.service}</h3>
                        <p className="text-sm">With {appointment.expertName}</p>
                        <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                            {new Date(appointment.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {appointment.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab('appointments')}>
                  View All Appointments
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[220px]">
                  <div className="space-y-4">
                    <div className="relative pl-6 border-l-2 border-muted pb-4">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <p className="text-sm font-medium">Appointment scheduled</p>
                      <p className="text-xs text-muted-foreground">You booked a consultation with Aishwarya Verma for tax planning</p>
                      <p className="text-xs text-muted-foreground mt-1">Just now</p>
                    </div>
                    <div className="relative pl-6 border-l-2 border-muted pb-4">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <p className="text-sm font-medium">Payment completed</p>
                      <p className="text-xs text-muted-foreground">You successfully paid ₹750 for expert consultation</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                    <div className="relative pl-6 border-l-2 border-muted pb-4">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <p className="text-sm font-medium">Process status update</p>
                      <p className="text-xs text-muted-foreground">Your passport application is now in progress</p>
                      <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                    </div>
                    <div className="relative pl-6 border-l-2 border-muted pb-4">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <p className="text-sm font-medium">Document generated</p>
                      <p className="text-xs text-muted-foreground">You created a new passport application form</p>
                      <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-xs">
                  View all activity
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Processes Tab */}
        <TabsContent value="processes">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:items-center">
              <div>
                <CardTitle>My Processes</CardTitle>
                <CardDescription>Track all your government processes</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search processes..." 
                    className="pl-8 w-full sm:w-[200px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      {filter === 'all' ? 'All Status' : filter}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setFilter('all')}>
                      All Status
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter('completed')}>
                      Completed
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter('in progress')}>
                      In Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter('pending')}>
                      Pending
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Process Name</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProcesses.length > 0 ? (
                    filteredProcesses.map(process => (
                      <TableRow key={process.id}>
                        <TableCell className="font-medium">{process.name}</TableCell>
                        <TableCell>{new Date(process.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-muted rounded-full h-2.5">
                              <div 
                                className="bg-primary h-2.5 rounded-full" 
                                style={{ width: `${process.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium">{process.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{renderStatusBadge(process.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <FileText className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View Details</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Download Documents</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                        {searchTerm || filter !== 'all' 
                          ? 'No matching processes found. Try adjusting your filters.' 
                          : 'No processes found. Start a new one!'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => navigate('/process-generator')}>
                Start New Process
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>My Appointments</CardTitle>
              <CardDescription>All your scheduled and past expert consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Expert</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingAppointments.map(appointment => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium">{appointment.expertName}</TableCell>
                          <TableCell>{appointment.service}</TableCell>
                          <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  toast({
                                    title: "Reschedule requested",
                                    description: "We'll contact you shortly to confirm a new time."
                                  });
                                }}
                              >
                                Reschedule
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  toast({
                                    title: "Appointment cancelled",
                                    description: "Your appointment has been cancelled successfully."
                                  });
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Past Appointments</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Expert</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Anil Kapoor</TableCell>
                        <TableCell>Visa Consultation</TableCell>
                        <TableCell>{new Date('2024-10-05').toLocaleDateString()}</TableCell>
                        <TableCell>{renderStatusBadge('Completed')}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Appointment Summary",
                                description: "Viewing summary of your consultation with Anil Kapoor"
                              });
                            }}
                          >
                            View Summary
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={() => navigate('/experts')}
              >
                Book New Appointment
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:items-center">
              <div>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Record of all your transactions</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => toast({
                    title: "Payment report generated",
                    description: "A report of your payment history has been generated."
                  })}
                >
                  <Download className="h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer" onClick={() => toast({ title: "Sorting by ID" })}>
                      <div className="flex items-center">
                        Transaction ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => toast({ title: "Sorting by Date" })}>
                      <div className="flex items-center">
                        Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => toast({ title: "Sorting by Amount" })}>
                      <div className="flex items-center">
                        Amount
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map(payment => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.service}</TableCell>
                      <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                      <TableCell>₹{payment.amount.toFixed(2)}</TableCell>
                      <TableCell>{renderStatusBadge(payment.status)}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toast({
                            title: "Receipt downloaded",
                            description: `Receipt for ${payment.id} has been downloaded.`
                          })}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Receipt
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {paymentHistory.length} transactions
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:items-center">
              <div>
                <CardTitle>My Documents</CardTitle>
                <CardDescription>All your generated and uploaded documents</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search documents..." 
                    className="pl-8 w-full sm:w-[200px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto justify-start gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {date && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setDate(undefined)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.length > 0 ? (
                    filteredDocuments.map(doc => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{doc.type}</Badge>
                        </TableCell>
                        <TableCell>{new Date(doc.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toast({
                                title: "Document downloaded",
                                description: `${doc.name} has been downloaded.`
                              })}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toast({
                                title: "Sharing options",
                                description: "Choose how you want to share this document."
                              })}
                            >
                              Share
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                        {searchTerm || date 
                          ? 'No matching documents found. Try adjusting your filters.' 
                          : 'No documents found.'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                variant="outline" 
                className="mr-2"
                onClick={() => toast({
                  title: "Upload Document",
                  description: "Choose a document to upload.",
                })}
              >
                Upload Document
              </Button>
              <Button
                onClick={() => navigate('/document-creator')}
              >
                Generate New Document
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Process details dialog */}
      <Dialog open={selectedProcess !== null} onOpenChange={() => setSelectedProcess(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center justify-between">
              Process Details
              <Button variant="ghost" size="icon" onClick={() => setSelectedProcess(null)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard; 