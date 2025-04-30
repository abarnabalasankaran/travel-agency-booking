
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: 'Alexandra Rivers',
      role: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/women/23.jpg',
      bio: 'Alexandra founded TravelDreamscape with a vision to create authentic travel experiences that go beyond the typical tourist attractions.'
    },
    {
      name: 'Michael Chang',
      role: 'Travel Experience Director',
      image: 'https://randomuser.me/api/portraits/men/36.jpg',
      bio: 'With over 15 years in the travel industry, Michael specializes in crafting unique journeys that showcase the best of each destination.'
    },
    {
      name: 'Sophia Rodriguez',
      role: 'Customer Relations Manager',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      bio: 'Sophia ensures every traveler receives personalized attention from the first inquiry through their return home.'
    },
    {
      name: 'David Okafor',
      role: 'Adventure Specialist',
      image: 'https://randomuser.me/api/portraits/men/17.jpg',
      bio: 'An avid explorer himself, David brings his passion for adventure and off-the-beaten-path experiences to our expedition packages.'
    }
  ];

  return (
    <PageContainer>
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80"
            alt="Team at work"
            className="w-full h-full object-cover opacity-25"
          />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About TravelDreamscape</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            We're a team of passionate travelers dedicated to creating unforgettable journeys
            and helping you discover the world's most remarkable destinations.
          </p>
        </div>
      </div>
      
      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="prose lg:prose-lg mx-auto">
              <p>
                TravelDreamscape began in 2015 with a simple yet ambitious goal: to transform how people experience travel. 
                Founded by Alexandra Rivers after her transformative backpacking journey across Southeast Asia, she recognized 
                that many travelers were missing the authentic experiences that make journeys truly memorable.
              </p>
              <p>
                What started as a small boutique agency has grown into a dedicated team of travel enthusiasts, 
                local experts, and customer experience specialists. We pride ourselves on crafting journeys that 
                balance iconic landmarks with hidden gems, luxury accommodations with authentic local experiences.
              </p>
              <p>
                Over the years, we've helped thousands of travelers create memories that last a lifetime. 
                Our commitment to personalized service, sustainable travel practices, and unforgettable experiences 
                has established TravelDreamscape as a trusted name in the travel industry.
              </p>
              <p>
                Today, we continue to explore the world, forge relationships with local partners, and design 
                journeys that inspire, excite, and transform our travelers.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-block p-4 bg-travel-blue rounded-full text-white mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Authentic Experiences</h3>
              <p className="text-gray-600">
                We believe in creating genuine connections with local cultures, communities, and environments
                that go beyond surface-level tourism.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-block p-4 bg-travel-orange rounded-full text-white mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Responsible Tourism</h3>
              <p className="text-gray-600">
                We're committed to sustainable practices that respect local communities
                and preserve natural environments for future generations.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-block p-4 bg-travel-purple rounded-full text-white mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence in Service</h3>
              <p className="text-gray-600">
                From initial planning to your return home, we're dedicated to providing
                an exceptional level of personalized service and attention.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Meet the Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-travel-blue mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-travel-blue to-travel-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who have experienced the world with TravelDreamscape.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/destinations">
              <Button size="lg" className="bg-white text-travel-blue hover:bg-gray-100">
                Explore Destinations
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};

export default About;
