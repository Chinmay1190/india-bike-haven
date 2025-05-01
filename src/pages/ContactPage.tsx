
import { useState } from "react";
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { PhoneCall, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      subject: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Thank you for contacting us! We'll respond shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="page-transition">
        {/* Hero Section */}
        <section className="relative bg-black text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{
              backgroundImage: "url(/placeholder.svg)",
            }}
          ></div>
          <div className="relative container mx-auto px-4 md:px-6 py-16 md:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Contact Us
              </h1>
              <p className="text-lg md:text-xl text-gray-200">
                Have questions or need assistance? We're here to help. Reach out
                to our team.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl font-bold tracking-tight mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Select
                        value={formData.subject}
                        onValueChange={handleSelectChange}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="sales">Sales & Pricing</SelectItem>
                          <SelectItem value="service">Service & Support</SelectItem>
                          <SelectItem value="test-ride">Test Ride Request</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="order-1 lg:order-2">
                <h2 className="text-2xl font-bold tracking-tight mb-6">
                  Contact Information
                </h2>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-muted p-3 rounded-full">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Our Headquarters</h3>
                      <address className="not-italic text-muted-foreground">
                        <p>123 Bike Street, Andheri</p>
                        <p>Mumbai, Maharashtra - 400053</p>
                        <p>India</p>
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-muted p-3 rounded-full">
                      <PhoneCall className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Phone</h3>
                      <p className="text-muted-foreground">
                        Sales: +91 98765 43210
                      </p>
                      <p className="text-muted-foreground">
                        Support: +91 98765 43211
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-muted p-3 rounded-full">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="text-muted-foreground">
                        Sales: sales@indiasbikehaven.com
                      </p>
                      <p className="text-muted-foreground">
                        Support: support@indiasbikehaven.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-muted p-3 rounded-full">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Business Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 10:00 AM - 7:00 PM
                      </p>
                      <p className="text-muted-foreground">
                        Saturday: 10:00 AM - 6:00 PM
                      </p>
                      <p className="text-muted-foreground">
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Our Showrooms</h3>
                  <div className="space-y-4">
                    {[
                      {
                        city: "Mumbai",
                        address: "123 Bike Street, Andheri, Mumbai, Maharashtra - 400053",
                        phone: "+91 98765 43210"
                      },
                      {
                        city: "Delhi",
                        address: "456 Motor Avenue, Connaught Place, New Delhi - 110001",
                        phone: "+91 98765 43212"
                      },
                      {
                        city: "Bangalore",
                        address: "789 Rider Lane, Koramangala, Bangalore, Karnataka - 560034",
                        phone: "+91 98765 43213"
                      }
                    ].map((showroom, index) => (
                      <div key={index}>
                        <h4 className="font-medium">{showroom.city}</h4>
                        <p className="text-sm text-muted-foreground">
                          {showroom.address}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {showroom.phone}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section (Placeholder) */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-6 text-center">
              Find Us on the Map
            </h2>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">
                Map Integration Placeholder
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about our bikes, services, and policies.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "Do you offer test rides?",
                  answer: "Yes, we offer test rides for most of our motorcycles. You can schedule a test ride through our website, by phone, or by visiting one of our showrooms."
                },
                {
                  question: "What payment options do you accept?",
                  answer: "We accept various payment methods including credit/debit cards, UPI, net banking, EMI options, and cash payments."
                },
                {
                  question: "Do you ship motorcycles across India?",
                  answer: "Yes, we offer nationwide shipping for all our motorcycles. Delivery usually takes 3-5 business days depending on your location."
                },
                {
                  question: "What kind of warranty do your bikes come with?",
                  answer: "All our motorcycles come with the manufacturer's warranty plus our exclusive store warranty. Specific warranty details vary by brand and model."
                },
                {
                  question: "Can I trade in my old motorcycle?",
                  answer: "Yes, we offer trade-in options. Contact our sales team with details of your current motorcycle for a valuation."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
