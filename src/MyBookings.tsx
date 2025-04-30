
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import PageContainer from '@/components/layout/PageContainer';
import BookingCard from '@/components/common/BookingCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const MyBookings = () => {
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: apiService.getBookings
  });

  const renderSkeletons = () => {
    return Array(3).fill(0).map((_, index) => (
      <div key={index} className="flex flex-col space-y-3">
        <Skeleton className="h-44 w-full rounded-lg" />
        <div className="p-4">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    ));
  };

  const hasConfirmed = bookings.some(booking => booking.status === 'confirmed');
  const hasPending = bookings.some(booking => booking.status === 'pending');

  return (
    <PageContainer>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My Bookings</h1>
            <p className="text-lg text-gray-600">
              Track and manage your travel bookings all in one place.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderSkeletons()}
          </div>
        ) : bookings.length > 0 ? (
          <>
            {hasPending && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Pending Bookings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookings
                    .filter(booking => booking.status === 'pending')
                    .map(booking => (
                      <BookingCard key={booking.id} booking={booking} />
                    ))}
                </div>
              </div>
            )}
            
            {hasConfirmed && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Confirmed Bookings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookings
                    .filter(booking => booking.status === 'confirmed')
                    .map(booking => (
                      <BookingCard key={booking.id} booking={booking} />
                    ))}
                </div>
              </div>
            )}
            
            {bookings.some(booking => booking.status === 'cancelled') && (
              <div>
                <h2 className="text-xl font-bold mb-4">Cancelled Bookings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookings
                    .filter(booking => booking.status === 'cancelled')
                    .map(booking => (
                      <BookingCard key={booking.id} booking={booking} />
                    ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="py-16 text-center">
            <div className="mx-auto max-w-md">
              <h2 className="text-2xl font-bold mb-4">No Bookings Found</h2>
              <p className="text-gray-600 mb-8">
                You don't have any bookings yet. Explore our exciting destinations
                and start planning your next adventure!
              </p>
              <Link to="/destinations">
                <Button size="lg" className="bg-travel-blue hover:bg-blue-600">
                  Explore Destinations
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default MyBookings;
