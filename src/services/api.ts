import { Destination, BookingDetails, Review } from "@/types";

// Mock data for destinations
const MOCK_DESTINATIONS: Destination[] = [
  {
    id: "1",
    name: "Santorini Sunset Paradise",
    description: "Experience the breathtaking sunsets and pristine white architecture of Santorini, Greece's most picturesque island.",
    location: "Santorini, Greece",
    price: 1299,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    duration: "7 days",
    category: ["romantic", "beach", "luxury"]
  },
  {
    id: "2",
    name: "Bali Tropical Retreat",
    description: "Immerse yourself in the spiritual and natural beauty of Bali with this all-inclusive tropical island getaway.",
    location: "Bali, Indonesia",
    price: 1099,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    duration: "10 days",
    category: ["beach", "cultural", "adventure"]
  },
  {
    id: "3",
    name: "Swiss Alps Adventure",
    description: "Discover the majesty of the Swiss Alps with stunning hiking trails, pristine lakes, and charming alpine villages.",
    location: "Interlaken, Switzerland",
    price: 1599,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    duration: "8 days",
    category: ["adventure", "nature", "luxury"]
  },
  {
    id: "4",
    name: "Tokyo City Explorer",
    description: "Navigate the exciting blend of traditional and ultra-modern in Japan's vibrant capital city.",
    location: "Tokyo, Japan",
    price: 1899,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
    duration: "9 days",
    category: ["urban", "cultural", "foodie"]
  },
  {
    id: "5",
    name: "Amalfi Coast Drive",
    description: "Wind your way through the stunning coastal roads of Italy's most beautiful coastline.",
    location: "Amalfi, Italy",
    price: 1399,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8",
    duration: "6 days",
    category: ["romantic", "luxury", "foodie"]
  },
  {
    id: "6",
    name: "Serengeti Safari Experience",
    description: "Witness the incredible wildlife of Tanzania's Serengeti National Park in this unforgettable safari adventure.",
    location: "Serengeti, Tanzania",
    price: 2199,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    duration: "12 days",
    category: ["adventure", "nature", "wildlife"]
  },
  {
    id: "7",
    name: "Amazon Rainforest Expedition",
    description: "Explore the rich biodiversity of the Amazon rainforest with expert guides on this eco-friendly expedition.",
    location: "Manaus, Brazil",
    price: 1699,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1488415032361-b7e238421f1b",
    duration: "9 days",
    category: ["adventure", "nature", "eco-friendly"]
  },
  {
    id: "8",
    name: "Paris Romantic Getaway",
    description: "Fall in love with the City of Lights on this intimate tour of Paris's most romantic destinations.",
    location: "Paris, France",
    price: 1299,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    duration: "5 days",
    category: ["romantic", "urban", "luxury"]
  },
];

// Mock data for bookings
const MOCK_BOOKINGS: BookingDetails[] = [
  {
    id: "b1",
    destinationId: "1",
    destination: "Santorini Sunset Paradise",
    startDate: "2025-06-15",
    endDate: "2025-06-22",
    travelers: 2,
    totalPrice: 2598,
    status: "confirmed",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    bookingDate: "2025-02-10"
  },
  {
    id: "b2",
    destinationId: "3",
    destination: "Swiss Alps Adventure",
    startDate: "2025-07-20",
    endDate: "2025-07-28",
    travelers: 4,
    totalPrice: 6396,
    status: "pending",
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    bookingDate: "2025-03-05"
  }
];

// Mock testimonials/reviews
const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    userName: "Sarah Johnson",
    userImage: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    comment: "TravelDreamscape made our honeymoon to Santorini absolutely perfect! The accommodations were exactly as pictured, and the local guides were fantastic.",
    date: "2025-01-15"
  },
  {
    id: "r2",
    userName: "Michael Chen",
    userImage: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 4,
    comment: "The Swiss Alps package exceeded my expectations. Every detail was well-planned, and the hiking guides were extremely knowledgeable about the region.",
    date: "2025-02-03"
  },
  {
    id: "r3",
    userName: "Emily Roberts",
    userImage: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 5,
    comment: "Our family trip to Bali was the adventure of a lifetime! From arranging temple tours to finding family-friendly beach spots, TravelDreamscape thought of everything.",
    date: "2025-02-20"
  }
];

// Mock user data
const MOCK_USERS = [
  {
    id: "u1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    password: "password123", // In a real app, this would be hashed
    createdAt: "2025-01-15"
  },
  {
    id: "u2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    password: "password456", // In a real app, this would be hashed
    createdAt: "2025-02-10"
  }
];

// Local storage keys
const STORAGE_KEYS = {
  DESTINATIONS: "traveldreamscape_destinations",
  BOOKINGS: "traveldreamscape_bookings",
  REVIEWS: "traveldreamscape_reviews",
  USERS: "traveldreamscape_users",
  CURRENT_USER: "traveldreamscape_current_user"
};

// Initialize mock data in localStorage if not present
const initMockData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.DESTINATIONS)) {
    localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(MOCK_DESTINATIONS));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(MOCK_BOOKINGS));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(MOCK_REVIEWS));
  }

  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(MOCK_USERS));
  }
};

// Mock API delay to simulate network request
const mockDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// API Service
export const apiService = {
  // Initialize mock data
  initialize: () => {
    initMockData();
  },
  
  // Destinations
  getDestinations: async (): Promise<Destination[]> => {
    await mockDelay();
    const destinations = localStorage.getItem(STORAGE_KEYS.DESTINATIONS);
    return destinations ? JSON.parse(destinations) : [];
  },
  
  getDestinationById: async (id: string): Promise<Destination | null> => {
    await mockDelay();
    const destinations = localStorage.getItem(STORAGE_KEYS.DESTINATIONS);
    const parsedDestinations = destinations ? JSON.parse(destinations) : [];
    return parsedDestinations.find((dest: Destination) => dest.id === id) || null;
  },
  
  // Bookings
  getBookings: async (): Promise<BookingDetails[]> => {
    await mockDelay();
    const bookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return bookings ? JSON.parse(bookings) : [];
  },
  
  createBooking: async (bookingData: BookingDetails): Promise<BookingDetails> => {
    await mockDelay();
    const bookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    const parsedBookings = bookings ? JSON.parse(bookings) : [];
    
    // Get destination info to add to booking
    const destinations = localStorage.getItem(STORAGE_KEYS.DESTINATIONS);
    const parsedDestinations = destinations ? JSON.parse(destinations) : [];
    const destination = parsedDestinations.find((d: Destination) => d.id === bookingData.destinationId);
    
    // Create new booking with ID
    const newBooking: BookingDetails = {
      ...bookingData,
      id: `b${Date.now()}`,
      destination: destination?.name,
      imageUrl: destination?.imageUrl,
      bookingDate: new Date().toISOString().split('T')[0]
    };
    
    const updatedBookings = [...parsedBookings, newBooking];
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updatedBookings));
    
    return newBooking;
  },
  
  updateBookingStatus: async (bookingId: string, status: BookingDetails['status']): Promise<BookingDetails | null> => {
    await mockDelay();
    const bookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    const parsedBookings = bookings ? JSON.parse(bookings) : [];
    
    const updatedBookings = parsedBookings.map((booking: BookingDetails) => {
      if (booking.id === bookingId) {
        return { ...booking, status };
      }
      return booking;
    });
    
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updatedBookings));
    return updatedBookings.find((booking: BookingDetails) => booking.id === bookingId) || null;
  },
  
  // Reviews
  getReviews: async (): Promise<Review[]> => {
    await mockDelay();
    const reviews = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return reviews ? JSON.parse(reviews) : [];
  },
  
  // Payment simulation
  processPayment: async (paymentData: any): Promise<{success: boolean, message: string}> => {
    await mockDelay(1500); // Longer delay for payment processing
    
    // Simulate payment success with 90% probability
    const isSuccess = Math.random() < 0.9;
    
    if (isSuccess) {
      return { 
        success: true, 
        message: "Payment processed successfully" 
      };
    } else {
      return { 
        success: false, 
        message: "Payment failed. Please try again or use a different payment method." 
      };
    }
  },

  // User Authentication
  registerUser: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<{ success: boolean; message: string; userId?: string }> => {
    await mockDelay();
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    const parsedUsers = users ? JSON.parse(users) : [];
    
    // Check if email already exists
    const existingUser = parsedUsers.find(
      (user: any) => user.email.toLowerCase() === userData.email.toLowerCase()
    );
    
    if (existingUser) {
      return {
        success: false,
        message: "A user with this email already exists."
      };
    }
    
    // Create new user
    const newUser = {
      id: `u${Date.now()}`,
      ...userData,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    const updatedUsers = [...parsedUsers, newUser];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));
    
    // Set current user in local storage (simulating a session)
    const { password, ...userWithoutPassword } = newUser;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));
    
    return {
      success: true,
      message: "User registered successfully",
      userId: newUser.id
    };
  },

  loginUser: async (credentials: {
    email: string;
    password: string;
  }): Promise<{ success: boolean; message: string; userId?: string }> => {
    await mockDelay();
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    const parsedUsers = users ? JSON.parse(users) : [];
    
    // Find user by email
    const user = parsedUsers.find(
      (user: any) => user.email.toLowerCase() === credentials.email.toLowerCase()
    );
    
    if (!user) {
      return {
        success: false,
        message: "User not found. Please check your email or register."
      };
    }
    
    // Check password
    if (user.password !== credentials.password) {
      return {
        success: false,
        message: "Invalid password. Please try again."
      };
    }
    
    // Set current user in local storage (simulating a session)
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));
    
    return {
      success: true,
      message: "Login successful",
      userId: user.id
    };
  },
  
  logoutUser: async (): Promise<void> => {
    await mockDelay(300);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },
  
  getCurrentUser: (): any => {
    const currentUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return currentUser ? JSON.parse(currentUser) : null;
  },
  
  isLoggedIn: (): boolean => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER) !== null;
  }
};
