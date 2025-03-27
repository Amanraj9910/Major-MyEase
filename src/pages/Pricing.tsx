
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { subscriptionPlans, paymentService } from '@/services/paymentService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import SubscriptionDialog from '@/components/SubscriptionDialog';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Pricing = () => {
  const { user, isAuthenticated } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[0]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubscribe = (plan: typeof subscriptionPlans[0]) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login or create an account to subscribe",
        variant: "destructive"
      });
      return;
    }
    
    if (user && paymentService.getUserSubscription(user.id) === plan.id) {
      toast({
        title: "Already Subscribed",
        description: `You are already subscribed to the ${plan.name} plan`,
        variant: "default"
      });
      return;
    }
    
    setSelectedPlan(plan);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {subscriptionPlans.map((plan) => {
              const isCurrentPlan = user && paymentService.getUserSubscription(user.id) === plan.id;
              
              return (
                <Card key={plan.id} className={`flex flex-col ${plan.id === 'premium' ? 'border-primary shadow-lg' : ''}`}>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.interval ? `Billed ${plan.interval}ly` : 'Free forever'}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="mb-6">
                      <span className="text-4xl font-bold">₹{plan.price}</span>
                      {plan.interval && <span className="text-muted-foreground">/{plan.interval}</span>}
                    </div>
                    
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleSubscribe(plan)} 
                      className="w-full"
                      variant={plan.id === 'premium' ? 'default' : 'outline'}
                    >
                      {isCurrentPlan ? 'Current Plan' : 'Subscribe'}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Can I cancel my subscription?</h3>
                <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. Your plan will remain active until the end of the current billing period.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">How do expert consultations work?</h3>
                <p className="text-muted-foreground">Premium and Enterprise plans include free expert consultations. You can connect with experts directly without additional payment.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">We accept all major credit/debit cards and UPI payments through secure payment gateways.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Is there a refund policy?</h3>
                <p className="text-muted-foreground">We offer a 7-day money-back guarantee if you're not satisfied with our premium services.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      <SubscriptionDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        plan={selectedPlan}
      />
    </div>
  );
};

export default Pricing;
