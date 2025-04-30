
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookingDetails, Destination, UserDetails } from '@/types';
import { apiService } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

interface BookingFormProps {
  destination: Destination;
}

const BookingForm: React.FC<BookingFormProps> = ({ destination }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState<Partial<BookingDetails>>({
    destinationId: destination.id,
    travelers: 2,
    totalPrice: destination.price * 2,
    status: 'pending'
  });
  const [userData, setUserData] = useState<UserDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const today = new Date().toISOString().split('T')[0];
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const maxDate = nextYear.toISOString().split('T')[0];

  // Update booking details
  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'startDate' || name === 'endDate') {
      setBookingDetails(prev => ({
        ...prev,
        [name]: value
      }));
    } else if (name === 'travelers') {
      const travelers = parseInt(value);
      if (travelers > 0) {
        setBookingDetails(prev => ({
          ...prev,
          travelers,
          totalPrice: destination.price * travelers
        }));
      }
    }
  };

  // Update user details
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form validation
  const validateStep1 = () => {
    if (!bookingDetails.startDate || !bookingDetails.endDate || !bookingDetails.travelers) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return false;
    }
    
    const start = new Date(bookingDetails.startDate);
    const end = new Date(bookingDetails.endDate);
    
    if (end <= start) {
      toast({
        title: "Invalid dates",
        description: "End date must be after start date",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    const { firstName, lastName, email, phone } = userData;
    if (!firstName || !lastName || !email || !phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return false;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  // Navigation functions
  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      handleBookingSubmit();
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Handle form submission
  const handleBookingSubmit = async () => {
    try {
      // Create booking in our API
      if (!bookingDetails.startDate || !bookingDetails.endDate || !bookingDetails.travelers || !bookingDetails.totalPrice) {
        throw new Error("Missing required booking information");
      }
      
      const booking: BookingDetails = {
        destinationId: destination.id,
        startDate: bookingDetails.startDate,
        endDate: bookingDetails.endDate,
        travelers: bookingDetails.travelers,
        totalPrice: bookingDetails.totalPrice,
        status: 'pending',
      };
      
      const createdBooking = await apiService.createBooking(booking);
      
      // Navigate to payment page with booking ID
      navigate(`/payment/${createdBooking.id}`, { 
        state: { 
          booking: createdBooking, 
          userData,
          destination 
        }
      });
      
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Booking failed",
        description: "There was a problem creating your booking. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <div className="flex justify-between mb-4">
            <div className={`text-sm font-medium ${currentStep === 1 ? 'text-travel-blue' : 'text-gray-500'}`}>
              Trip Details
            </div>
            <div className="h-px flex-1 bg-gray-200 mx-4 mt-3"></div>
            <div className={`text-sm font-medium ${currentStep === 2 ? 'text-travel-blue' : 'text-gray-500'}`}>
              Personal Info
            </div>
          </div>
        </div>
        
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input 
                  id="startDate"
                  name="startDate"
                  type="date" 
                  min={today}
                  max={maxDate}
                  value={bookingDetails.startDate || ''}
                  onChange={handleBookingChange}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input 
                  id="endDate"
                  name="endDate"
                  type="date" 
                  min={bookingDetails.startDate || today}
                  max={maxDate}
                  value={bookingDetails.endDate || ''}
                  onChange={handleBookingChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="travelers">Number of Travelers</Label>
              <Input 
                id="travelers"
                name="travelers"
                type="number" 
                min="1"
                max="10"
                value={bookingDetails.travelers || 1}
                onChange={handleBookingChange}
              />
            </div>
            
            <div className="border-t pt-4 mt-6">
              <div className="flex justify-between mb-2 text-sm">
                <span>Price per person</span>
                <span>${destination.price}</span>
              </div>
              <div className="flex justify-between font-medium text-base">
                <span>Total price</span>
                <span className="text-travel-blue font-bold">${bookingDetails.totalPrice}</span>
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleUserChange}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleUserChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleUserChange}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone"
                name="phone"
                type="tel"
                value={userData.phone}
                onChange={handleUserChange}
              />
            </div>
            
            <div className="border-t pt-4 mt-6">
              <div className="text-sm mb-3">
                <span className="font-medium">Trip Summary</span>
              </div>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Destination</span>
                  <span className="font-medium">{destination.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dates</span>
                  <span>{bookingDetails.startDate} to {bookingDetails.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Travelers</span>
                  <span>{bookingDetails.travelers} person(s)</span>
                </div>
                <div className="flex justify-between font-medium text-base pt-2">
                  <span>Total price</span>
                  <span className="text-travel-blue font-bold">${bookingDetails.totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-between mt-8">
          {currentStep > 1 ? (
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <Button className="bg-travel-blue hover:bg-blue-600" onClick={nextStep}>
            {currentStep === 2 ? 'Proceed to Payment' : 'Continue'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
