
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import NavigationMenu from './NavigationMenu';

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen }) => {
  const { isAdmin } = useAuth();

  return (
    <nav className={cn(
      "fixed md:static top-[72px] left-0 w-full h-[calc(100vh-72px)] md:h-auto md:w-auto md:flex bg-white md:bg-transparent overflow-y-auto md:overflow-visible transition-transform duration-300 transform",
      isOpen 
        ? "translate-x-0 shadow-lg"
        : "translate-x-full md:translate-x-0"
    )}>
      <NavigationMenu className="p-6 md:p-0" />

      {/* Mobile view: CTA button inside menu */}
      <div className="p-6 md:hidden">
        <Button className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy w-full">
          <Link to="/contact">Contact Agent</Link>
        </Button>
        {/* Mobile Admin Panel Button */}
        {isAdmin && (
          <Button className="bg-realtor-navy hover:bg-realtor-navy/90 text-white w-full mt-2">
            <Link to="/admin" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Admin Panel
            </Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default MobileMenu;
