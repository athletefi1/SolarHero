import { CheckCircle } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      title: "Qualify Your Home",
      description: "See if your home qualifies for solar.",
      benefit: "Takes only 5 minutes",
      completedMessage: "Step 1 Complete! Your home is qualified for solar installation.",
      primary: true
    },
    {
      number: 2,
      title: "Preparation",
      description: "Once your custom system is designed, we handle all permitting and paperwork to ensure a smooth start.",
      benefit: "Hassle-free process",
      completedMessage: "Step 2 Complete! All paperwork and permits are processed.",
      primary: true
    },
    {
      number: 3,
      title: "Installation",
      description: "Our certified solar experts install your high-quality system quickly and professionally.",
      benefit: "Professional installation",
      completedMessage: "Step 3 Complete! Your solar system is now up and running.",
      primary: true
    }
  ];

  return (
    <section id="how-it-works" className="section py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[hsl(var(--dark))] mb-4">How Sunman Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple 3-step process makes switching to solar energy easy, affordable, and hassle-free.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="step-flip-card h-64">
              <div className="step-flip-card-inner">
                <div className="step-flip-card-front bg-white rounded-xl shadow-lg p-6 border-t-4 border-primary">
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
                <div className="step-flip-card-back bg-secondary rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl text-[hsl(var(--dark))] font-bold mb-3 text-center">{step.completedMessage}</h3>
                  <div className="mt-2 bg-primary text-white py-2 px-4 rounded-lg inline-block">
                    Click to flip back
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Installation Video */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-4xl aspect-video rounded-xl shadow-xl overflow-hidden">
            <iframe 
              src="https://www.youtube.com/embed/grmqsVtQIOs" 
              title="Solar Panel Installation Video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
