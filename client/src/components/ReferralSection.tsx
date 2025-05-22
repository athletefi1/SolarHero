import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Lightbulb } from "lucide-react";

const ReferralSection = () => {
  const referralBenefits = [
    "Each successful referral earns you a discount on your monthly rate",
    "Your friends and family get a signing bonus when they join",
    "After multiple referrals, you'll receive our guaranteed lowest rate",
    "Simple process: just share your solar experience with friends and family"
  ];

  return (
    <section id="referral" className="section py-20 bg-primary bg-opacity-5">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Get Our Best Rate</h2>
              <Card className="bg-white p-6 rounded-xl shadow-lg mb-8">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-center mb-4 text-primary">
                    Refer 6 people and unlock our best possible solar rate
                  </div>
                  <div className="h-1 w-24 bg-secondary mx-auto mb-6"></div>
                  <div className="flex items-center mb-4 bg-primary bg-opacity-10 p-3 rounded-lg border-l-4 border-primary">
                    <Lightbulb className="text-primary text-xl mr-3" />
                    <p className="text-primary font-medium">The most successful referrals come from sharing your personal solar journey.</p>
                  </div>
                  <ul className="space-y-4">
                    {referralBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="text-primary mt-1 mr-3 h-5 w-5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000" 
                alt="Residential solar panels on a home" 
                className="rounded-xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg transform rotate-3 border-2 border-secondary hidden md:block">
                <div className="text-lg font-bold text-primary">Refer Friends!</div>
                <div className="text-sm text-gray-600">Help them save too</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralSection;
