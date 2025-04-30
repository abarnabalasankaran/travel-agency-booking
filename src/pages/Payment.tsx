
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import PageContainer from '@/components/layout/PageContainer';
import PaymentForm from '@/components/payment/PaymentForm';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';

const Payment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as any;
  
  // Payment status states
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'error'>('pending');
  
  // Get booking data either from location state or fetch it
  const { data: bookingData, isLoading } = useQuery({
    queryKey: ['payment-booking', id],
    queryFn: async () => {
      if (locationState?.booking) {
        return locationState.booking;
      } else {
        // In a real app, you'd fetch the booking by ID
        const allBookings = await apiService.getBookings();
        const booking = allBookings.find((b) => b.id === id);
        if (!booking) throw new Error('Booking not found');
        return booking;
      }
    },
    enabled: !!id
  });
  
  // Get destination data if not in location state
  const { data: destinationData } = useQuery({
    queryKey: ['payment-destination', bookingData?.destinationId],
    queryFn: async () => {
      if (locationState?.destination) {
        return locationState.destination;
      } else if (bookingData?.destinationId) {
        return apiService.getDestinationById(bookingData.destinationId);
      }
      return null;
    },
    enabled: !!bookingData?.destinationId
  });
  
  // Handle payment success
  const handlePaymentSuccess = () => {
    setPaymentStatus('success');
    // Scroll to top to show success message
    window.scrollTo(0, 0);
  };
  
  // Handle payment error
  const handlePaymentError = () => {
    setPaymentStatus('error');
    // Scroll to top to show error message
    window.scrollTo(0, 0);
  };
  
  if (isLoading) {
    return (
      <PageContainer>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
            <div>
              <Skeleton className="h-[400px] w-full rounded-lg" />
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }
  
  if (!bookingData) {
    return (
      <PageContainer>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Booking Not Found</h1>
          <p className="text-gray-600 mb-6">
            We couldn't find the booking you're looking for. It may have been removed or the link is invalid.
          </p>
          <Link to="/my-bookings">
            <Button>View Your Bookings</Button>
          </Link>
        </div>
      </PageContainer>
    );
  }
  
  // Success state
  if (paymentStatus === 'success') {
    return (
      <PageContainer>
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <svg className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
            <p className="text-xl mb-6">
              Your booking for {bookingData.destination} has been confirmed.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-gray-500 text-sm">Booking Reference</p>
                  <p className="font-medium">{bookingData.id?.substring(0, 8)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Amount Paid</p>
                  <p className="font-medium">${bookingData.totalPrice}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Travel Dates</p>
                  <p className="font-medium">
                    {new Date(bookingData.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(bookingData.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Travelers</p>
                  <p className="font-medium">{bookingData.travelers} person(s)</p>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-8">
              We've sent a confirmation email with all the details of your booking.
              You can also view your booking in the "My Bookings" section.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/my-bookings">
                <Button className="bg-travel-blue hover:bg-blue-600 min-w-[200px]">
                  View My Bookings
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="min-w-[200px]">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }
  
  // Error state
  if (paymentStatus === 'error') {
    return (
      <PageContainer>
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-red-100 p-3">
                <svg className="h-16 w-16 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
            <p className="text-xl mb-6">
              There was an issue processing your payment. Please try again.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="space-y-2 text-left">
                <div>
                  <p className="text-gray-500">Possible reasons for failure:</p>
                  <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                    <li>Insufficient funds</li>
                    <li>Card expired or invalid</li>
                    <li>Payment declined by your bank</li>
                    <li>Technical issue with the payment processor</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="bg-travel-blue hover:bg-blue-600 min-w-[200px]"
                onClick={() => setPaymentStatus('pending')}
              >
                Try Again
              </Button>
              <Link to="/my-bookings">
                <Button variant="outline" className="min-w-[200px]">
                  View My Bookings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Complete Your Payment</h1>
            <p className="text-lg text-gray-600">
              You're almost there! Secure your booking by completing payment.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Summary */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
              <div className="flex items-center mb-4">
                <img
                  src={`${bookingData.imageUrl || destinationData?.imageUrl}?w=200&h=100&fit=crop&auto=format`}
                  alt={bookingData.destination || destinationData?.name}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="font-semibold">{bookingData.destination || destinationData?.name}</h3>
                  <p className="text-sm text-gray-500">{destinationData?.location}</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Travel Dates</span>
                  <span>
                    {new Date(bookingData.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(bookingData.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Travelers</span>
                  <span>{bookingData.travelers} person(s)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Booking ID</span>
                  <span>{bookingData.id?.substring(0, 8)}</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Amount</span>
                  <span className="text-xl font-bold text-travel-blue">${bookingData.totalPrice}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm text-yellow-700">
                    <span className="font-semibold">Note:</span> This is a demo payment system. No real transactions will be processed.
                    For testing, you can use any valid-looking credit card information.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment Form */}
          <div>
            <PaymentForm
              booking={bookingData}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Payment;
