
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { Destination } from '@/types';
import PageContainer from '@/components/layout/PageContainer';
import DestinationCard from '@/components/common/DestinationCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  
  const { data: destinations = [], isLoading } = useQuery({
    queryKey: ['destinations'],
    queryFn: apiService.getDestinations
  });
  
  // Get all available categories from destinations
  const allCategories = Array.from(
    new Set(
      destinations?.flatMap(destination => destination.category) || []
    )
  );
  
  // Filter destinations based on search term and filters
  const filteredDestinations = destinations?.filter(destination => {
    const matchesSearch = 
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategories = 
      selectedCategories.length === 0 || 
      selectedCategories.some(cat => destination.category.includes(cat));
      
    const matchesPrice = 
      destination.price >= minPrice && destination.price <= maxPrice;
      
    return matchesSearch && matchesCategories && matchesPrice;
  });
  
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setMinPrice(0);
    setMaxPrice(5000);
  };
  
  // Loading skeletons
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
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
    <PageContainer className="pb-16">
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Destinations</h1>
            <p className="text-lg text-gray-600">
              Discover our handpicked selection of stunning destinations around the world,
              each offering unique experiences and unforgettable memories.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Search</h3>
                <Input
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Categories</h3>
                  {selectedCategories.length > 0 && (
                    <button
                      className="text-sm text-travel-blue"
                      onClick={() => setSelectedCategories([])}
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategories.includes(category) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        selectedCategories.includes(category) 
                          ? "bg-travel-blue hover:bg-blue-700" 
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleCategoryToggle(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Min</span>
                    <Input
                      type="number"
                      min="0"
                      max={maxPrice}
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Max</span>
                    <Input
                      type="number"
                      min={minPrice}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
              
              {(searchTerm || selectedCategories.length > 0 || minPrice > 0 || maxPrice < 5000) && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </div>
          
          {/* Destinations Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderSkeletons()}
              </div>
            ) : filteredDestinations.length > 0 ? (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-gray-600">
                    Showing {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDestinations.map((destination) => (
                    <DestinationCard key={destination.id} destination={destination} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No destinations found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button onClick={clearFilters}>Reset Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Destinations;
