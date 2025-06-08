
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Calendar, Shield, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">HealthCare+</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="hover-scale">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 hover-scale">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Health, Our
              <span className="text-blue-600"> Priority</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with certified doctors, book appointments instantly, and manage your healthcare journey with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
              <Link to="/signup?type=patient">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 hover-scale">
                  <Users className="h-5 w-5 mr-2" />
                  Join as Patient
                </Button>
              </Link>
              <Link to="/signup?type=doctor">
                <Button size="lg" variant="outline" className="hover-scale">
                  <Heart className="h-5 w-5 mr-2" />
                  Join as Doctor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose HealthCare+?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide a comprehensive healthcare platform designed for both patients and medical professionals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Easy Appointment Booking",
                description: "Book appointments with certified doctors in just a few clicks. Choose your preferred time and date.",
                color: "text-blue-600"
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your health data is protected with enterprise-grade security and HIPAA compliance.",
                color: "text-green-600"
              },
              {
                icon: Users,
                title: "Verified Doctors",
                description: "All our doctors are certified professionals with verified credentials and expertise.",
                color: "text-purple-600"
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Get help whenever you need it with our round-the-clock customer support team.",
                color: "text-orange-600"
              },
              {
                icon: Star,
                title: "Quality Care",
                description: "Experience top-quality healthcare services with personalized treatment plans.",
                color: "text-red-600"
              },
              {
                icon: Heart,
                title: "Health Tracking",
                description: "Monitor your health progress and maintain comprehensive medical records.",
                color: "text-pink-600"
              }
            ].map((feature, index) => (
              <Card key={index} className="hover-scale transition-all duration-200 animate-fade-in">
                <CardHeader>
                  <feature.icon className={`h-10 w-10 ${feature.color} mb-2`} />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Health Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of patients and doctors who trust HealthCare+ for their healthcare needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/find-doctors">
                <Button size="lg" variant="secondary" className="hover-scale">
                  Find Doctors
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600 hover-scale">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Heart className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">HealthCare+</span>
            </div>
            <p className="text-gray-400 text-center md:text-right">
              © 2024 HealthCare+. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
