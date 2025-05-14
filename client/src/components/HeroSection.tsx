import { Button } from "@/components/ui/button";
import { ChevronDown, Zap, Shield, Leaf } from "lucide-react";
import solarmanImg from "@/assets/Solarman.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="section pt-24 pb-16 relative">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center hero-gradient" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611365892117-bab4d1dc574b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')" }}
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
                Pay a fixed monthly amount that's less than your current bill and watch your savings grow over the next 20 years.
              </p>
              <Button 
                asChild
                className="bg-accent hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-lg transition-all text-lg"
              >
                <a href="#compare" className="inline-flex items-center">
                  Calculate Your Savings
                  <ChevronDown className="ml-2" />
                </a>
              </Button>
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
          
          <div className="md:w-1/3 float-animation">
            {/* Superhero SolarMan image */}
            <img 
              src={solarmanImg} 
              alt="SolarMan superhero" 
              className="rounded-2xl shadow-2xl transform -rotate-3 border-4 border-secondary mx-auto" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
