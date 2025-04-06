import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is MyEase?",
    answer: "MyEase is a platform designed to simplify complex administrative and government procedures. We provide step-by-step guides, document generation tools, and access to verified experts to make these processes easier for everyone."
  },
  {
    question: "Is MyEase free to use?",
    answer: "MyEase offers a free tier with access to basic process guides. We also have premium subscription plans that unlock advanced features like document creation, expert assistance booking, and more comprehensive support."
  },
  {
    question: "How accurate is the information provided?",
    answer: "We strive to keep our information up-to-date and accurate based on official government sources. However, regulations can change. While MyEase is a powerful tool, it's always recommended to verify critical information with the relevant government agency or consult a professional for legal advice."
  },
  {
    question: "Can I generate legal documents?",
    answer: "MyEase offers document templates for common needs like affidavits, rental agreements, and NOCs. These are intended as starting points. For legally binding documents, especially complex ones, consulting a legal professional is highly recommended."
  },
  {
    question: "How does the expert assistance work?",
    answer: "Our platform connects you with verified professionals (like CAs, lawyers, consultants) specializing in various administrative areas. You can browse profiles, check expertise, and book consultation sessions directly through MyEase (available on premium plans)."
  }
];

const FAQ: React.FC = () => {
  return (
    <section className="py-20 bg-accent/10 dark:bg-accent/20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-foreground/90 dark:text-foreground/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 