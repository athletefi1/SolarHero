import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 bg-white ${scrolled ? "shadow-md" : ""} transition-shadow duration-300`}>
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary text-2xl mr-3"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            <span className="text-2xl font-bold font-montserrat text-primary">Sunman Energy</span>
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="font-medium hover:text-primary transition-colors">Home</a>
          <a href="#how-it-works" className="font-medium hover:text-primary transition-colors">How It Works</a>
          <a href="#compare" className="font-medium hover:text-primary transition-colors">Compare Savings</a>
          <a href="#referral" className="font-medium hover:text-primary transition-colors">Referral Program</a>
          <a href="#contact" className="font-medium hover:text-primary transition-colors">Contact</a>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-500 hover:text-primary focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden bg-white shadow-md ${mobileMenuOpen ? "" : "hidden"}`}>
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
          <a 
            href="#home" 
            className="font-medium hover:text-primary transition-colors py-2 border-b"
            onClick={closeMobileMenu}
          >
            Home
          </a>
          <a 
            href="#how-it-works" 
            className="font-medium hover:text-primary transition-colors py-2 border-b"
            onClick={closeMobileMenu}
          >
            How It Works
          </a>
          <a 
            href="#compare" 
            className="font-medium hover:text-primary transition-colors py-2 border-b"
            onClick={closeMobileMenu}
          >
            Compare Savings
          </a>
          <a 
            href="#referral" 
            className="font-medium hover:text-primary transition-colors py-2 border-b"
            onClick={closeMobileMenu}
          >
            Referral Program
          </a>
          <a 
            href="#contact" 
            className="font-medium hover:text-primary transition-colors py-2"
            onClick={closeMobileMenu}
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
