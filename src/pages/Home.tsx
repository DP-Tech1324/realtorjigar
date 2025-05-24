import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home as HomeIcon, DollarSign, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import PropertySearch from '@/components/PropertySearch';
import PropertyCard from '@/components/PropertyCard';
import TestimonialCard from '@/components/TestimonialCard';
import { properties } from '@/data/properties';
import { testimonials } from '@/data/testimonials';



const Home = () => {
  // Only get featured properties
  const featuredProperties = properties.filter(property => property.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[600px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1600607687644-a19911add663?ixlib=rb-4.0.3')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-realtor-navy/90 to-realtor-navy/60"></div>
        </div>

        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Your <span className="text-realtor-gold">Trusted Real Estate</span> Professional in the GTA
            </h1>
            <p className="text-xl text-white/90 mb-8">
              With Royal LePage expertise and personalized service, I'm committed to finding your perfect home or maximizing your property's value.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy font-medium">
                  Schedule a Free Consultation
                </Button>
              </Link>
              <Link to="/listings">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-realtor-navy">
                  Browse Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Property Search Section */}
      <section className="relative z-10 -mt-16">
        <div className="container mx-auto px-4">
          <PropertySearch />
        </div>
      </section>
      
      {/* Services Tiles Section - NEW */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-realtor-navy mb-3">My Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive real estate services tailored to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Buying Service */}
            <div className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-realtor-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <HomeIcon className="h-8 w-8 text-realtor-gold" />
              </div>
              <h3 className="text-2xl font-bold text-realtor-navy mb-3">Buying</h3>
              <p className="text-gray-600 mb-6">
                Find your dream home with personalized search assistance, market insights, and negotiation expertise.
              </p>
              <Link to="/buyers" className="text-realtor-gold hover:text-realtor-navy flex items-center justify-center gap-2 font-medium">
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
            
            {/* Selling Service */}
            <div className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-realtor-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-8 w-8 text-realtor-gold" />
              </div>
              <h3 className="text-2xl font-bold text-realtor-navy mb-3">Selling</h3>
              <p className="text-gray-600 mb-6">
                Maximize your property value with strategic marketing, professional staging advice, and skilled negotiation.
              </p>
              <Link to="/sellers" className="text-realtor-gold hover:text-realtor-navy flex items-center justify-center gap-2 font-medium">
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
            
            {/* Local Expertise Service */}
            <div className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-realtor-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-realtor-gold" />
              </div>
              <h3 className="text-2xl font-bold text-realtor-navy mb-3">Local Expertise</h3>
              <p className="text-gray-600 mb-6">
                Benefit from deep knowledge of GTA neighborhoods, schools, market trends, and community insights.
              </p>
              <Link to="/about" className="text-realtor-gold hover:text-realtor-navy flex items-center justify-center gap-2 font-medium">
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-realtor-navy mb-3">Featured Properties</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our exclusive selection of premium properties in the Greater Toronto Area
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/listings">
              <Button className="bg-realtor-navy hover:bg-realtor-navy/90 text-white flex items-center gap-2">
                View All Properties
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-realtor-navy mb-3">Why Choose Jigar Patel</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your trusted partner in finding the perfect home or maximizing your property's value
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-realtor-gold/20 text-realtor-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-realtor-navy mb-2">Local Expertise</h3>
              <p className="text-gray-600">
                Born and raised in the GTA with deep knowledge of neighborhoods, schools, and market trends.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-realtor-gold/20 text-realtor-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-realtor-navy mb-2">Personalized Service</h3>
              <p className="text-gray-600">
                Dedicated approach tailored to your specific needs and preferences, with exceptional communication.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-realtor-gold/20 text-realtor-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-realtor-navy mb-2">Proven Results</h3>
              <p className="text-gray-600">
                Track record of successful transactions, with properties sold at or above asking price.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/about">
              <Button className="bg-realtor-navy hover:bg-realtor-navy/90 text-white flex items-center gap-2">
                Learn More About Me
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-realtor-navy mb-3">Client Testimonials</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear what my clients have to say about their experience working with me
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-realtor-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Let's discuss your real estate goals and how I can help you achieve them.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy font-medium">
              Schedule a Free Consultation
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
