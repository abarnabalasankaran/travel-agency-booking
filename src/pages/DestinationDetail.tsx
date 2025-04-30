
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import BookingForm from '@/components/booking/BookingForm';

const DestinationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: destination, isLoading, error } = useQuery({
    queryKey: ['destination', id],
    queryFn: () => apiService.getDestinationById(id || ''),
    enabled: !!id
  });
  
  if (isLoading) {
    return (
      <PageContainer>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-96 w-full rounded-lg mb-8" />
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-3/4" />
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-[500px] w-full rounded-lg" />
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }
  
  if (error || !destination) {
    return (
      <PageContainer>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Destination Not Found</h1>
          <p className="text-gray-600 mb-6">The destination you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/destinations')}>
            Return to Destinations
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Hero Section */}
      <div
        className="h-[400px] bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${destination.imageUrl}?w=1600&auto=format&q=80)`,
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-end pb-12">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-shadow-lg">{destination.name}</h1>
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold">{destination.rating}</span>
              <span className="text-white/80">|</span>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {destination.location}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Details */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge className="bg-travel-blue">{destination.duration}</Badge>
              {destination.category.map((cat) => (
                <Badge key={cat} variant="outline" className="bg-travel-purple/10 text-travel-purple border-travel-purple/20">
                  {cat}
                </Badge>
              ))}
            </div>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About This Destination</h2>
              <p className="text-gray-700 mb-4">
                {destination.description}
              </p>
              <p className="text-gray-700">
                {`${destination.name} offers a perfect blend of adventure, relaxation, and cultural experiences. Located in ${destination.location}, this destination is ideal for travelers looking for an unforgettable journey. Our package includes accommodation, guided tours, and personalized service to make your trip truly special.`}
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">What's Included</h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Professional tour guide</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Luxury accommodations</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Airport transportation</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Selected meals as per itinerary</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>All entrance fees to attractions</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>24/7 travel assistance</span>
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Best Time to Visit</h3>
                  <p className="text-gray-600">May to October for ideal weather conditions</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Languages</h3>
                  <p className="text-gray-600">Local language with English commonly spoken in tourist areas</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Currency</h3>
                  <p className="text-gray-600">Local currency with USD and EUR accepted in many places</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Travel Requirements</h3>
                  <p className="text-gray-600">Valid passport required. Visa may be necessary depending on nationality.</p>
                </div>
              </div>
            </section>
          </div>
          
          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="mb-6">
                <div className="text-2xl font-bold text-travel-blue">
                  ${destination.price}
                  <span className="text-sm text-gray-500 font-normal"> /person</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Starting from, price may vary based on dates
                </p>
              </div>
              
              <BookingForm destination={destination} />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default DestinationDetail;
