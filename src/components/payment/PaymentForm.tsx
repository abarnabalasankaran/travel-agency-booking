
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookingDetails, PaymentDetails } from '@/types';
import { apiService } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

interface PaymentFormProps {
  booking: BookingDetails;
  onSuccess: () => void;
  onError: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ booking, onSuccess, onError }) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      // Format card number with spaces
      const formatted = value
        .replace(/\s/g, '') // Remove existing spaces
        .replace(/\D/g, '') // Remove non-digits
        .slice(0, 16) // Limit to 16 digits
        .replace(/(\d{4})(?=\d)/g, '$1 '); // Add space after every 4 digits
      
      setPaymentDetails(prev => ({
        ...prev,
        [name]: formatted
      }));
    } else if (name === 'expiryDate') {
      // Format expiry date as MM/YY
      const formatted = value
        .replace(/\D/g, '') // Remove non-digits
        .slice(0, 4) // Limit to 4 digits
        .replace(/(\d{2})(?=\d)/g, '$1/'); // Add / after first 2 digits
      
      setPaymentDetails(prev => ({
        ...prev,
        [name]: formatted
      }));
    } else if (name === 'cvv') {
      // Limit CVV to 3-4 digits
      const formatted = value
        .replace(/\D/g, '')
        .slice(0, 4);
        
      setPaymentDetails(prev => ({
        ...prev,
        [name]: formatted
      }));
    } else {
      setPaymentDetails(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const { cardNumber, cardholderName, expiryDate, cvv } = paymentDetails;
    
    if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 16) {
      toast({
        title: "Invalid card number",
        description: "Please enter a valid 16-digit card number",
        variant: "destructive"
      });
      return false;
    }
    
    if (!cardholderName.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter the cardholder name",
        variant: "destructive"
      });
      return false;
    }
    
    if (!expiryDate || expiryDate.length < 5) {
      toast({
        title: "Invalid expiry date",
        description: "Please enter a valid expiry date in MM/YY format",
        variant: "destructive"
      });
      return false;
    }
    
    // Check if expiry date is in the future
    const [month, year] = expiryDate.split('/');
    const expiryMonth = parseInt(month, 10) - 1; // JS months are 0-indexed
    const expiryYear = parseInt(`20${year}`, 10);
    const currentDate = new Date();
    const expiryDate2 = new Date(expiryYear, expiryMonth, 1);
    
    if (expiryDate2 <= currentDate) {
      toast({
        title: "Card expired",
        description: "The card expiry date must be in the future",
        variant: "destructive"
      });
      return false;
    }
    
    if (!cvv || cvv.length < 3) {
      toast({
        title: "Invalid CVV",
        description: "Please enter a valid CVV/CVC code",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Process payment
      const paymentResult = await apiService.processPayment({
        bookingId: booking.id,
        amount: booking.totalPrice,
        ...paymentDetails
      });
      
      if (paymentResult.success) {
        // Update booking status to confirmed
        if (booking.id) {
          await apiService.updateBookingStatus(booking.id, 'confirmed');
        }
        
        // Show success toast
        toast({
          title: "Payment successful",
          description: "Your booking has been confirmed",
          variant: "default"
        });
        
        // Call success callback
        onSuccess();
      } else {
        // Show error toast
        toast({
          title: "Payment failed",
          description: paymentResult.message,
          variant: "destructive"
        });
        
        // Call error callback
        onError();
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      
      toast({
        title: "Payment error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      
      onError();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={paymentDetails.cardNumber}
              onChange={handleChange}
              disabled={isProcessing}
            />
          </div>
          
          <div>
            <Label htmlFor="cardholderName">Cardholder Name</Label>
            <Input
              id="cardholderName"
              name="cardholderName"
              placeholder="John Doe"
              value={paymentDetails.cardholderName}
              onChange={handleChange}
              disabled={isProcessing}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={paymentDetails.expiryDate}
                onChange={handleChange}
                disabled={isProcessing}
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV/CVC</Label>
              <Input
                id="cvv"
                name="cvv"
                type="password"
                placeholder="123"
                value={paymentDetails.cvv}
                onChange={handleChange}
                disabled={isProcessing}
              />
            </div>
          </div>
          
          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between mb-2 text-sm">
              <span>Booking Total</span>
              <span>${booking.totalPrice}</span>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-travel-blue hover:bg-blue-600"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay $${booking.totalPrice}`}
          </Button>
          
          <div className="text-center text-xs text-gray-500 mt-4">
            <p>This is a demo payment. No actual charges will be made.</p>
            <p>You can use any valid-looking credit card information.</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
