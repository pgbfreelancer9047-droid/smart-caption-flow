import { Button } from "@/components/ui/button";
import { Mic, Volume2, Languages } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Audio waves transforming to captions"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 shadow-card">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-sm font-semibold text-foreground">
              Real-Time AI-Powered Captioning
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Breaking Barriers
            </span>
            <br />
            <span className="text-foreground">
              Through Accessible Communication
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Real-time multilingual simplified captioning system designed for Deaf and hard-of-hearing communities
          </p>

          {/* Features highlight */}
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-foreground">
              <div className="p-2 rounded-lg bg-primary/10">
                <Mic className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">Live Speech Recognition</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <div className="p-2 rounded-lg bg-secondary/10">
                <Languages className="w-5 h-5 text-secondary" />
              </div>
              <span className="font-medium">Multi-Language Support</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <div className="p-2 rounded-lg bg-accent/10">
                <Volume2 className="w-5 h-5 text-accent" />
              </div>
              <span className="font-medium">Simplified Text</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button variant="hero" size="lg" className="group">
              Try Live Demo
              <div className="group-hover:translate-x-1 transition-transform">→</div>
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default Hero;
