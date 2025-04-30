
import { BookingDetails } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface BookingCardProps {
  booking: BookingDetails;
}

const BookingStatusBadge = ({ status }: { status: BookingDetails['status'] }) => {
  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    payment_processing: 'bg-blue-100 text-blue-800 border-blue-200',
    confirmed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  };

  const statusLabels = {
    pending: 'Pending',
    payment_processing: 'Processing',
    confirmed: 'Confirmed',
    cancelled: 'Cancelled',
  };

  return (
    <Badge variant="outline" className={`${statusStyles[status]} font-medium`}>
      {statusLabels[status]}
    </Badge>
  );
};

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="overflow-hidden h-full">
      <div className="relative h-44">
        <img
          src={`${booking.imageUrl}?w=600&auto=format&q=80`}
          alt={booking.destination}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <BookingStatusBadge status={booking.status} />
        </div>
      </div>

      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{booking.destination}</h3>
            <p className="text-sm text-gray-500">
              Booking ID: {booking.id?.substring(0, 8)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-500">Travel Dates</p>
              <p className="font-medium">
                {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Travelers</p>
              <p className="font-medium">{booking.travelers} person(s)</p>
            </div>
          </div>
          
          {booking.bookingDate && (
            <div className="text-sm">
              <p className="text-gray-500">Booked On</p>
              <p className="font-medium">{formatDate(booking.bookingDate)}</p>
            </div>
          )}
          
          <div className="pt-2">
            <p className="text-gray-500 text-sm">Total Price</p>
            <p className="text-travel-blue text-xl font-bold">${booking.totalPrice}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <div className="w-full flex gap-2">
          <Button variant="outline" className="w-full">View Details</Button>
          {booking.status === 'pending' && (
            <Button className="w-full bg-travel-blue hover:bg-blue-600">Complete Payment</Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
