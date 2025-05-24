import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { user, isAdmin } = useAuth();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full h-[72px] z-50 flex items-center transition-colors duration-300",
        isScrolled || isOpen ? "bg-white shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-realtor-navy font-bold text-xl lg:text-2xl hover:text-realtor-gold transition-colors z-10"
        >
          <span className="text-realtor-gold">Jigar</span> Patel
        </Link>

        {/* Navigation */}
        <nav className={cn(
          "fixed md:static top-[72px] left-0 w-full h-[calc(100vh-72px)] md:h-auto md:w-auto md:flex bg-white md:bg-transparent overflow-y-auto md:overflow-visible transition-transform duration-300 transform",
          isOpen 
            ? "translate-x-0 shadow-lg"
            : "translate-x-full md:translate-x-0"
        )}>
          <ul className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 p-6 md:p-0 text-realtor-navy">
            <li>
              <Link 
                to="/" 
                className={cn(
                  "hover:text-realtor-gold transition-colors",
                  location.pathname === '/' ? "text-realtor-gold font-semibold" : ""
                )}
              >
                Home
              </Link>
            </li>

            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(
                  "flex items-center hover:text-realtor-gold transition-colors",
                  location.pathname.includes('/listings') || location.pathname.includes('/properties') || location.pathname === '/rlp-search' || location.pathname === '/favorites' 
                    ? "text-realtor-gold font-semibold" 
                    : ""
                )}>
                  Properties <ChevronDown className="h-4 w-4 ml-1" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/listings" className="w-full">Featured Listings</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>

            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(
                  "flex items-center hover:text-realtor-gold transition-colors",
                  location.pathname === '/services' ||
                  location.pathname === '/property-sales' ||
                  location.pathname === '/property-acquisition' ||
                  location.pathname === '/relocation' ||
                  location.pathname === '/investment' ||
                  location.pathname === '/luxury' ||
                  location.pathname === '/commercial'
                    ? "text-realtor-gold font-semibold"
                    : ""
                )}>
                  Services <ChevronDown className="h-4 w-4 ml-1" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/services">Overview</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/property-sales">Property Sales</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/property-acquisition">Property Acquisition</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/relocation">Relocation Services</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/investment">Investment Properties</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/luxury">Luxury Properties</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/commercial">Commercial Real Estate</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            
            <li>
              <Link 
                to="/about" 
                className={cn(
                  "hover:text-realtor-gold transition-colors",
                  location.pathname === '/about' ? "text-realtor-gold font-semibold" : ""
                )}
              >
                About
              </Link>
            </li>

            <li>
              <Link 
                to="/blog" 
                className={cn(
                  "hover:text-realtor-gold transition-colors",
                  location.pathname === '/blog' || location.pathname.includes('/blog/') ? "text-realtor-gold font-semibold" : ""
                )}
              >
                Blog
              </Link>
            </li>

            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(
                  "flex items-center hover:text-realtor-gold transition-colors",
                  location.pathname === '/resources' ||
                  location.pathname.includes('/resources/') ||
                  location.pathname === '/buyers' ||
                  location.pathname === '/sellers' ||
                  location.pathname === '/calculators' ||
                  location.pathname === '/home-valuation'
                    ? "text-realtor-gold font-semibold"
                    : ""
                )}>
                  Resources <ChevronDown className="h-4 w-4 ml-1" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/resources">All Resources</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/buyers">For Buyers</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/sellers">For Sellers</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/calculators">Mortgage Calculator</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/home-valuation">Home Valuation</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            
            <li>
              <Link 
                to="/contact" 
                className={cn(
                  "hover:text-realtor-gold transition-colors",
                  location.pathname === '/contact' ? "text-realtor-gold font-semibold" : ""
                )}
              >
                Contact
              </Link>
            </li>

            {/* Admin Panel Link - Only show if user is admin */}
            {isAdmin && (
              <li>
                <Link 
                  to="/admin" 
                  className={cn(
                    "hover:text-realtor-gold transition-colors flex items-center gap-2",
                    location.pathname.startsWith('/admin') ? "text-realtor-gold font-semibold" : ""
                  )}
                >
                  <ShieldCheck className="h-4 w-4" />
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>

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

        {/* Desktop view: CTA buttons */}
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

        {/* Mobile menu toggle */}
        <button
          className="z-20 block md:hidden text-realtor-navy focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
