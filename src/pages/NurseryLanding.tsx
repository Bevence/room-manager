import { Navbar } from "@/components/nursery/Navbar";
import { HeroSection } from "@/components/nursery/HeroSection";
import { AboutSection } from "@/components/nursery/AboutSection";
import { PlantsSection } from "@/components/nursery/PlantsSection";
import { WhyUsSection } from "@/components/nursery/WhyUsSection";
import { TipsSection } from "@/components/nursery/TipsSection";
import { TestimonialsSection } from "@/components/nursery/TestimonialsSection";
import { ContactSection } from "@/components/nursery/ContactSection";
import { Footer } from "@/components/nursery/Footer";

const NurseryLanding = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <PlantsSection />
        <WhyUsSection />
        <TipsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default NurseryLanding;
