
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">About MyEase</h1>
            <p className="text-xl text-muted-foreground">
              Simplifying government processes for every Indian citizen
            </p>
          </div>

          <div className="grid gap-12">
            <section>
              <h2 className="text-2xl font-semibold mb-6">Our Mission</h2>
              <p className="text-lg leading-relaxed mb-6">
                At MyEase, we believe that navigating government procedures should be
                straightforward and accessible for everyone. Our mission is to bridge the gap
                between citizens and government services by providing clear guidance, expert
                assistance, and innovative technology solutions.
              </p>
              <p className="text-lg leading-relaxed">
                We are committed to making administrative processes transparent, efficient, and
                stress-free for all Indians, regardless of their background or technological familiarity.
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium mb-3">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To create a society where every citizen can easily access and navigate government
                    services without confusion, delays, or unnecessary stress. We envision a future
                    where technology and human expertise combine to make bureaucracy simple.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium mb-3">Our Values</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Accessibility for all citizens</li>
                    <li>• Transparency in processes</li>
                    <li>• Empathy-driven service</li>
                    <li>• Continuous innovation</li>
                    <li>• Respect for privacy</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <section>
              <h2 className="text-2xl font-semibold mb-6">Our Story</h2>
              <p className="text-lg leading-relaxed mb-6">
                Founded in 2023, MyEase was born from a personal frustration with complex government
                procedures. Our founder spent weeks navigating the bureaucratic maze to get a simple
                document processed and thought, "There must be a better way."
              </p>
              <p className="text-lg leading-relaxed">
                That's when the idea for MyEase was conceived - a platform that combines technology
                and human expertise to simplify government processes for everyone. Since then, we've
                grown to help thousands of citizens across India navigate everything from passport
                applications to property registrations with ease.
              </p>
            </section>

            <section className="bg-accent/20 p-8 rounded-xl">
              <h2 className="text-2xl font-semibold mb-6 text-center">Our Team</h2>
              <p className="text-lg text-center mb-8">
                We're a diverse team of technologists, former government officials, and customer service
                experts united by a common goal: making government services accessible to all.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {['CEO & Founder', 'Head of Operations', 'Chief Technology Officer', 'Customer Success Lead'].map((role, index) => (
                  <div key={index} className="text-center">
                    <div className="w-24 h-24 bg-secondary/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">👤</span>
                    </div>
                    <h3 className="font-medium">{role}</h3>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
