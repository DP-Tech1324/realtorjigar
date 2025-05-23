
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bed, Bath, ArrowRight, MapPin, Home, Calendar, MessageSquare } from 'lucide-react';
import { Property } from '@/types/Property';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ConsultationForm from '@/components/ConsultationForm';
import { useToast } from '@/hooks/use-toast';

interface PropertyCardProps {
  property: Property;
  showViewDetails?: boolean;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(price);
};

const PropertyCard: React.FC<PropertyCardProps> = ({ property, showViewDetails = true }) => {
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [openContactDialog, setOpenContactDialog] = useState(false);
  const { toast } = useToast();

  // Log the property ID to help with debugging
  console.log("Property Card rendering with ID:", property.id);

  const handleBookTourClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Opening booking dialog for property:", property.id);
    setOpenBookingDialog(true);
  };

  const handleContactAgentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Opening contact dialog for property:", property.id);
    setOpenContactDialog(true);
  };

  const handleFormSubmitSuccess = (type: 'booking' | 'contact') => {
    if (type === 'booking') {
      setOpenBookingDialog(false);
      toast({
        title: "Tour scheduled successfully",
        description: `We've received your request for a tour of ${property.title}. Our agent will contact you shortly.`,
      });
    } else {
      setOpenContactDialog(false);
      toast({
        title: "Message sent successfully",
        description: `Thank you for your interest in ${property.title}. Our agent will contact you shortly.`,
      });
    }
  };

  return (
    <>
      <Card className="overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-60">
          <Link to={`/properties/${property.id}`}>
            <img 
              src={property.images[0]} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-realtor-navy text-white py-1 px-3 rounded-full text-sm font-medium">
              {property.status === 'for-sale' ? 'For Sale' : 
              property.status === 'for-rent' ? 'For Rent' : 
              property.status === 'sold' ? 'Sold' : 'Pending'}
            </div>
          </Link>
        </div>

        <CardContent className="p-5">
          <div className="mb-2">
            <Link to={`/properties/${property.id}`}>
              <h3 className="font-bold text-xl text-realtor-navy truncate hover:text-realtor-gold transition-colors">{property.title}</h3>
            </Link>
            <div className="flex items-center text-gray-600 mb-1">
              <MapPin size={16} className="mr-1" />
              <p className="text-sm truncate">
                {property.address}, {property.city}, {property.province}
              </p>
            </div>
            <p className="text-realtor-gold font-bold text-xl">
              {formatPrice(property.price)}
            </p>
          </div>

          <div className="flex justify-between text-gray-600 my-3 border-y border-gray-100 py-2">
            <div className="flex items-center">
              <Bed size={16} className="mr-1" />
              <span className="text-sm">{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center">
              <Bath size={16} className="mr-1" />
              <span className="text-sm">{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center">
              <Home size={16} className="mr-1" />
              <span className="text-sm">{property.squareFeet} sq ft</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button 
              className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy flex items-center justify-center"
              onClick={handleBookTourClick}
            >
              <Calendar className="mr-1" size={16} />
              Book a Tour
            </Button>
            <Button 
              variant="outline" 
              className="border-realtor-navy text-realtor-navy hover:bg-realtor-navy hover:text-white flex items-center justify-center"
              onClick={handleContactAgentClick}
            >
              <MessageSquare className="mr-1" size={16} />
              Contact Agent
            </Button>
          </div>

          {showViewDetails && (
            <div className="mt-3">
              <Link to={`/properties/${property.id}`}>
                <Button className="w-full bg-realtor-navy hover:bg-realtor-navy/90 flex items-center justify-center gap-2">
                  View Details 
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Book a Tour Dialog */}
      <Dialog open={openBookingDialog} onOpenChange={setOpenBookingDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl text-realtor-navy">Book a Tour</DialogTitle>
            <DialogDescription>
              Complete the form below to schedule a tour of {property.title}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <ConsultationForm 
              defaultType="buyer" 
              propertyId={property.id}
              onSubmitSuccess={() => handleFormSubmitSuccess('booking')}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Agent Dialog */}
      <Dialog open={openContactDialog} onOpenChange={setOpenContactDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl text-realtor-navy">Request Property Information</DialogTitle>
            <DialogDescription>
              Have questions about {property.title}? I'll get back to you promptly.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <ConsultationForm 
              defaultType="buyer" 
              propertyId={property.id}
              onSubmitSuccess={() => handleFormSubmitSuccess('contact')}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertyCard;
