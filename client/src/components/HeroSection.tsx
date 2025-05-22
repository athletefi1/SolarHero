import { Button } from "@/components/ui/button";
import { ChevronDown, Zap, Shield, Leaf } from "lucide-react";
import solarManImage from "@assets/Solarman2.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="section pt-24 pb-16 relative">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-center bg-no-repeat overflow-hidden hero-gradient" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
          backgroundSize: "100% 100%"
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 text-white mb-10 md:mb-0">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 superhero-shadow">
                No Cash, No Credit.
                <span className="text-secondary block md:inline"> Just Sunlight.</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl">
                Pay a fixed monthly amount that's less than your current bill and watch your savings grow over the next 25 years.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  className="bg-accent hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-lg transition-all text-lg"
                >
                  <a href="#compare" className="inline-flex items-center">
                    Calculate Your Savings
                    <ChevronDown className="ml-2" />
                  </a>
                </Button>
                
                <Button 
                  asChild
                  className="bg-secondary hover:bg-secondary/90 text-[hsl(var(--dark))] font-bold py-3 px-8 rounded-lg transition-all text-lg"
                >
                  <a href="#contact" className="inline-flex items-center">
                    Schedule a Solar Consultation
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-6 mt-12">
              <div className="bg-[hsl(var(--dark))] bg-opacity-70 p-4 rounded-lg">
                <div className="text-secondary font-bold text-xl flex items-center">
                  <Zap className="mr-2" /> Lower Bills
                </div>
                <p className="text-white">Fixed monthly payments</p>
              </div>
              <div className="bg-[hsl(var(--dark))] bg-opacity-70 p-4 rounded-lg">
                <div className="text-secondary font-bold text-xl flex items-center">
                  <Shield className="mr-2" /> Zero Down
                </div>
                <p className="text-white">No upfront investment</p>
              </div>
              <div className="bg-[hsl(var(--dark))] bg-opacity-70 p-4 rounded-lg">
                <div className="text-secondary font-bold text-xl flex items-center">
                  <Leaf className="mr-2" /> Eco-Friendly
                </div>
                <p className="text-white">Reduce carbon footprint</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/3">
            {/* SolarMan superhero image with interactive flip effect */}
            <div className="flip-card mx-auto" style={{ maxWidth: '300px' }}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img 
                    src={solarManImage} 
                    alt="SolarMan superhero" 
                    className="rounded-2xl shadow-2xl transform -rotate-3 border-4 border-secondary mx-auto shake-trigger" 
                  />
                </div>
                <div className="flip-card-back bg-secondary rounded-2xl shadow-2xl border-4 border-primary p-4 flex flex-col justify-center items-center">
                  <h3 className="text-2xl font-bold text-[hsl(var(--dark))] mb-2">Special Offer!</h3>
                  <p className="text-lg text-[hsl(var(--dark))] font-semibold mb-4">Share Promo Code:</p>
                  <div className="bg-white py-3 px-6 rounded-lg shadow-inner text-2xl font-bold text-primary">
                    #Summer2025
                  </div>
                  <p className="mt-4 text-sm text-[hsl(var(--dark))]">for a special discount</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
