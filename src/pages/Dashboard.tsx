import React from 'react';
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

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Don't render anything while redirecting
  }

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your recent actions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="text-sm">• Logged in - {new Date().toLocaleDateString()}</li>
              <li className="text-sm">• Viewed document - Sample Document</li>
              <li className="text-sm">• Created process - Sample Process</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="px-0">View all activities</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" onClick={() => navigate('/process-generator')}>
              Generate Process
            </Button>
            <Button className="w-full" onClick={() => navigate('/document-creator')}>
              Create Document
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stats</CardTitle>
            <CardDescription>Your usage statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Processes Created:</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span>Documents Generated:</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span>API Calls:</span>
                <span className="font-medium">43</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 