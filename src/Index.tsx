
import React, { useEffect } from 'react';
import HeroSection from '@/components/common/HeroSection';
import FeaturedDestinations from '@/components/common/FeaturedDestinations';
import BookingSteps from '@/components/common/BookingSteps';
import PageContainer from '@/components/layout/PageContainer';
import { apiService } from '@/services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import TestimonialCard from '@/components/common/TestimonialCard';
import { useQuery } from '@tanstack/react-query';

const Index = () => {
  useEffect(() => {
    // Initialize mock API data on component mount
    apiService.initialize();
  }, []);

  const { data: reviews } = useQuery({
    queryKey: ['reviews'],
    queryFn: apiService.getReviews
  });
  
  const features = [
    {
      title: "Exclusive Destinations",
      description: "Access unique places and experiences that aren't available through mainstream travel sites.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: "Expert Local Guides",
      description: "Benefit from the knowledge of experienced local guides who provide authentic cultural insights.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      title: "Seamless Booking",
      description: "Enjoy a smooth and secure booking process with 24/7 customer support for any questions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <PageContainer className="pt-0">
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              TravelDreamscape offers personalized travel experiences with exceptional service
              and attention to detail at every step of your journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 shadow">
                <CardContent className="pt-6 px-4 pb-6">
                  <div className="flex justify-center mb-4 text-travel-blue">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Destinations */}
      <FeaturedDestinations />
      
      {/* How It Works */}
      <BookingSteps />
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Travelers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from travelers who've experienced our services and created memories to last a lifetime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews?.map(review => (
              <TestimonialCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-travel-blue to-travel-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Begin your journey today and create memories that will last a lifetime.
          </p>
          <Link to="/destinations">
            <Button size="lg" className="bg-white text-travel-blue hover:bg-gray-100">
              Explore Destinations
            </Button>
          </Link>
        </div>
      </section>
    </PageContainer>
  );
};

export default Index;
