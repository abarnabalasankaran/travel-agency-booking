
import { Link } from 'react-router-dom';
import { Destination } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const { id, name, description, location, price, rating, imageUrl, duration, category } = destination;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group h-full flex flex-col">
      <div className="relative overflow-hidden h-48">
        <img
          src={`${imageUrl}?w=600&h=400&fit=crop&auto=format&q=80`}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center shadow-md">
          <svg
            className="w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          <span className="ml-1 text-sm font-semibold">{rating}</span>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{name}</CardTitle>
        </div>
        <CardDescription className="text-sm text-gray-500 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2 grow">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-xs bg-travel-blue/10 text-travel-blue border-travel-blue/20">
            {duration}
          </Badge>
          {category.slice(0, 2).map((cat) => (
            <Badge 
              key={cat} 
              variant="outline" 
              className="text-xs bg-travel-purple/10 text-travel-purple border-travel-purple/20"
            >
              {cat}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-2 mt-auto">
        <div className="text-lg font-bold">
          <span className="text-travel-blue">${price}</span>
          <span className="text-xs text-gray-500 font-normal"> /person</span>
        </div>
        <Link to={`/destinations/${id}`}>
          <Button className="bg-travel-blue hover:bg-blue-600">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DestinationCard;
