import { CheckCircle } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      title: "Qualify Your Home",
      description: "Submit a recent utility bill to see if your home qualifies for our solar program.",
      benefit: "Takes only 5 minutes",
      primary: true
    },
    {
      number: 2,
      title: "System Design",
      description: "We create a custom solar + efficiency plan specifically for your home and energy needs.",
      benefit: "Tailored to your home",
      primary: true
    },
    {
      number: 3,
      title: "Home Upgrades",
      description: "Receive added benefits like LED lighting, smart thermostat, and improved insulation.",
      benefit: "Energy efficiency boost",
      primary: true
    },
    {
      number: 4,
      title: "Installation",
      description: "SolarMan handles all permits, engineering, and local compliance requirements.",
      benefit: "Hassle-free process",
      primary: true
    },
    {
      number: 5,
      title: "Fixed Monthly Bill",
      description: "Pay less every month with a fixed rate that never increases over time.",
      benefit: "Start saving immediately",
      primary: false
    }
  ];

  return (
    <section id="how-it-works" className="section py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[hsl(var(--dark))] mb-4">How SolarMan Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple 5-step process makes switching to solar energy easy, affordable, and hassle-free.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.slice(0, 3).map((step) => (
            <div 
              key={step.number} 
              className="step-card bg-white rounded-xl shadow-lg p-6 border-t-4 border-primary"
            >
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600 mb-4">
                {step.description}
              </p>
              <div className="text-primary font-medium flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                {step.benefit}
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mt-8 md:w-2/3 mx-auto">
          {steps.slice(3, 5).map((step) => (
            <div 
              key={step.number} 
              className={`step-card bg-white rounded-xl shadow-lg p-6 border-t-4 ${step.primary ? 'border-primary' : 'border-secondary'}`}
            >
              <div className={`w-12 h-12 ${step.primary ? 'bg-primary text-white' : 'bg-secondary text-[hsl(var(--dark))]'} rounded-full flex items-center justify-center text-2xl font-bold mb-4`}>
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600 mb-4">
                {step.description}
              </p>
              <div className="text-primary font-medium flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                {step.benefit}
              </div>
            </div>
          ))}
        </div>
        
        {/* Installation Image */}
        <div className="mt-16 text-center">
          <img 
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
            alt="Solar panel installation process" 
            className="rounded-xl shadow-xl mx-auto"
          />
          <p className="text-gray-500 mt-4 italic">Our professional team handles the entire installation process</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
