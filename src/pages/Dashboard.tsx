import React, { useState } from 'react';
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
import { 
  Calendar, 
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
  Download
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstrations - in a real app, these would come from API calls
  const recentProcesses = [
    { id: 'proc-001', name: 'Passport Application', status: 'Completed', date: '2024-11-10', progress: 100 },
    { id: 'proc-002', name: 'Visa Extension', status: 'In Progress', date: '2024-11-05', progress: 65 },
    { id: 'proc-003', name: 'Property Registration', status: 'Pending', date: '2024-10-28', progress: 30 }
  ];

  const upcomingAppointments = [
    { id: 'apt-001', expertName: 'Dr. Priya Sharma', service: 'Passport Consultation', date: '2024-11-15', time: '10:00 AM' },
    { id: 'apt-002', expertName: 'Rajesh Kumar', service: 'Property Guidance', date: '2024-11-20', time: '2:30 PM' }
  ];

  const paymentHistory = [
    { id: 'pay-001', amount: 750, service: 'Expert Consultation', date: '2024-11-01', status: 'Completed' },
    { id: 'pay-002', amount: 1200, service: 'Document Processing', date: '2024-10-15', status: 'Completed' },
    { id: 'pay-003', amount: 500, service: 'Application Fee', date: '2024-10-10', status: 'Refunded' }
  ];

  const documents = [
    { id: 'doc-001', name: 'Passport Application Form', date: '2024-11-05', type: 'PDF' },
    { id: 'doc-002', name: 'Property Deed', date: '2024-10-25', type: 'PDF' },
    { id: 'doc-003', name: 'Visa Support Letter', date: '2024-10-15', type: 'DOCX' }
  ];

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  // Helper function to render status badges
  const renderStatusBadge = (status) => {
    let variant = 'outline';
    let icon = null;
    
    switch(status.toLowerCase()) {
      case 'completed':
        variant = 'success';
        icon = <CheckCircle2 className="h-3.5 w-3.5 mr-1" />;
        break;
      case 'in progress':
        variant = 'secondary';
        icon = <Clock3 className="h-3.5 w-3.5 mr-1" />;
        break;
      case 'pending':
        variant = 'outline';
        icon = <AlertCircle className="h-3.5 w-3.5 mr-1" />;
        break;
      case 'refunded':
        variant = 'destructive';
        icon = <Check className="h-3.5 w-3.5 mr-1" />;
        break;
      default:
        variant = 'outline';
    }
    
    return (
      <Badge variant={variant} className="flex items-center">
        {icon}
        {status}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
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
            <Calendar className="h-4 w-4 mr-2" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Processes</CardTitle>
                <CardDescription>Your ongoing processes</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[220px]">
                  <div className="space-y-4">
                    {recentProcesses.map(process => (
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
                            <Calendar className="h-3.5 w-3.5 mr-1" />
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
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" onClick={() => navigate('/process-generator')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Process
                </Button>
                <Button className="w-full" onClick={() => navigate('/experts')}>
                  <Users className="h-4 w-4 mr-2" />
                  Find Experts
                </Button>
                <Button className="w-full" onClick={() => navigate('/')}>
                  <Home className="h-4 w-4 mr-2" />
                  Return Home
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Processes Tab */}
        <TabsContent value="processes">
          <Card>
            <CardHeader>
              <CardTitle>My Processes</CardTitle>
              <CardDescription>Track all your government processes</CardDescription>
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
                  {recentProcesses.map(process => (
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
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
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
                              <Button variant="outline" size="sm">Reschedule</Button>
                              <Button variant="ghost" size="sm">Cancel</Button>
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
                          <Button variant="ghost" size="sm">View Summary</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => navigate('/experts')}>
                Book New Appointment
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Record of all your transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
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
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Receipt
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>My Documents</CardTitle>
              <CardDescription>All your generated and uploaded documents</CardDescription>
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
                  {documents.map(doc => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.type}</Badge>
                      </TableCell>
                      <TableCell>{new Date(doc.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="ghost" size="sm">
                            Share
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2">
                Upload Document
              </Button>
              <Button>
                Generate New Document
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard; 