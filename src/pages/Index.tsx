import Hero from "@/components/Hero";
import WorkflowSection from "@/components/WorkflowSection";
import LiveDemo from "@/components/LiveDemo";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <WorkflowSection />
      <LiveDemo />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
