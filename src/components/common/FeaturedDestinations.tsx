
import { useEffect, useState } from 'react';
import { Destination } from '@/types';
import { apiService } from '@/services/api';
import DestinationCard from './DestinationCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const allDestinations = await apiService.getDestinations();
        // Get top rated destinations
        const featured = allDestinations
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        setDestinations(featured);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Loading skeleton
  const renderSkeletons = () => {
    return Array(3).fill(0).map((_, index) => (
      <div key={index} className="flex flex-col space-y-3">
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-20 w-full" />
        <div className="flex justify-between">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    ));
  };

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of the world's most enchanting destinations,
            each promising an unforgettable experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading ? (
            renderSkeletons()
          ) : (
            destinations.map(destination => (
              <DestinationCard key={destination.id} destination={destination} />
            ))
          )}
        </div>
        
        <div className="mt-10 md:mt-16 text-center">
          <Link to="/destinations">
            <Button size="lg" className="bg-travel-blue hover:bg-blue-600">
              View All Destinations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
