const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[hsl(var(--dark))] text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun text-secondary text-2xl mr-3"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              <span className="text-xl font-bold font-montserrat">Sunman Energy</span>
            </div>
            <div className="mt-2 text-gray-400">
              Powering homes with clean solar energy
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400">© {currentYear} Sunman Energy. All rights reserved.</p>
            <div className="mt-3 flex space-x-6 justify-center md:justify-end">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
