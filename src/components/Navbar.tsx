
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileMenu from './navbar/MobileMenu';
import CTAButtons from './navbar/CTAButtons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
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

        {/* Mobile Menu */}
        <MobileMenu isOpen={isOpen} />

        {/* Desktop CTA Buttons */}
        <CTAButtons />

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
