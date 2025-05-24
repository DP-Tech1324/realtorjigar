
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const CTAButtons: React.FC = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <Button className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy">
        <Link to="/contact">Contact Agent</Link>
      </Button>
      {/* Desktop Admin Panel Button */}
      {isAdmin && (
        <Button className="bg-realtor-navy hover:bg-realtor-navy/90 text-white">
          <Link to="/admin" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Admin Panel
          </Link>
        </Button>
      )}
    </div>
  );
};

export default CTAButtons;
