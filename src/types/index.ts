
// Destination types
export interface Destination {
  id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  imageUrl: string;
  duration: string;
  category: string[];
}

// Booking types
export interface BookingDetails {
  id?: string;
  destinationId: string;
  destination?: string;
  startDate: string;
  endDate: string;
  travelers: number;
  totalPrice: number;
  status: 'pending' | 'payment_processing' | 'confirmed' | 'cancelled';
  userId?: string;
  imageUrl?: string;
  bookingDate?: string;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface PaymentDetails {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

// Review/Testimonial types
export interface Review {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  date: string;
}

// User authentication types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends UserDetails {
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  userId?: string;
}
