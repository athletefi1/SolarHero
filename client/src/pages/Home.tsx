import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ComparisonSection from "@/components/ComparisonSection";
import ReferralSection from "@/components/ReferralSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <HeroSection />
      <HowItWorksSection />
      <ComparisonSection />
      <ReferralSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
