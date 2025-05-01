
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <Layout>
      <div className="page-transition">
        {/* Hero Section */}
        <section className="relative bg-black text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: "url(/placeholder.svg)" }}
          ></div>
          <div className="relative container mx-auto px-4 md:px-6 py-16 md:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                About India Bike Haven
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8">
                India's premier destination for motorcycle enthusiasts since 2018.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Our Story
                </h2>
                <p className="text-muted-foreground mb-6">
                  India Bike Haven began with a simple passion for motorcycles and a vision to create India's most trusted platform for motorcycle enthusiasts.
                </p>
                <p className="text-muted-foreground mb-6">
                  Founded in 2018 by a group of motorcycle enthusiasts, our journey started in a small garage in Mumbai. We understood the challenges Indian riders faced when purchasing high-performance motorcycles: limited options, opaque pricing, and inadequate after-sales support.
                </p>
                <p className="text-muted-foreground">
                  Today, we're proud to be India's leading motorcycle retailer, offering bikes from over 20 prestigious brands, with showrooms in 12 major cities and a robust online presence that serves customers nationwide.
                </p>
              </div>
              <div className="lg:h-[400px] rounded-lg overflow-hidden bg-muted">
                <img
                  src="/placeholder.svg"
                  alt="Our Team"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-12 md:py-16 lg:py-24 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              To provide motorcycle enthusiasts across India with access to the world's finest bikes, exceptional service, and a community that shares their passion.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Quality</h3>
                <p className="text-muted-foreground">
                  We offer only the finest motorcycles from reputable manufacturers, each thoroughly inspected to ensure exceptional quality and performance.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Experience</h3>
                <p className="text-muted-foreground">
                  We create a seamless buying experience from browsing to delivery, with transparent pricing and expert guidance at every step.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Community</h3>
                <p className="text-muted-foreground">
                  We foster a vibrant community of riders through events, group rides, and online forums where enthusiasts can connect and share experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Our team consists of passionate motorcycle enthusiasts with decades of combined experience in the industry.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Rahul Sharma",
                  position: "Founder & CEO",
                  bio: "Former professional racer with 15+ years in the motorcycle industry."
                },
                {
                  name: "Priya Singh",
                  position: "Chief Marketing Officer",
                  bio: "Motorcycle enthusiast with extensive experience in digital marketing and brand building."
                },
                {
                  name: "Vikram Patel",
                  position: "Head of Service",
                  bio: "Certified master technician with expertise in high-performance motorcycles."
                },
                {
                  name: "Ananya Reddy",
                  position: "Customer Experience Manager",
                  bio: "Dedicated to ensuring every customer has an exceptional buying experience."
                }
              ].map((member, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-muted">
                    <img
                      src="/placeholder.svg"
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-primary mb-2">{member.position}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 lg:py-24 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Ready to Find Your Perfect Ride?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore our extensive collection of premium motorcycles or visit one of our showrooms for a personal experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/products">
                <Button size="lg">Browse Bikes</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
