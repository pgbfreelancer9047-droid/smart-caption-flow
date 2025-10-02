import { Card } from "@/components/ui/card";
import { 
  Zap, 
  Globe, 
  Shield, 
  Sparkles, 
  Users, 
  Smartphone 
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Real-Time Processing",
    description: "Instant caption generation with less than 100ms latency for seamless communication",
    gradient: "from-primary to-primary-glow"
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Supports multiple Indian languages including Hindi, Tamil, Bengali, and more",
    gradient: "from-secondary to-secondary-glow"
  },
  {
    icon: Sparkles,
    title: "AI Simplification",
    description: "Neural networks simplify complex language into easy-to-understand captions",
    gradient: "from-accent to-primary"
  },
  {
    icon: Shield,
    title: "High Accuracy",
    description: "Confidence scoring ensures 95%+ accuracy with continuous model improvement",
    gradient: "from-primary to-accent"
  },
  {
    icon: Users,
    title: "Accessibility First",
    description: "Designed specifically for Deaf and hard-of-hearing communities",
    gradient: "from-secondary to-primary"
  },
  {
    icon: Smartphone,
    title: "Cross-Platform",
    description: "Works seamlessly on mobile, web, TV broadcasts, and classroom screens",
    gradient: "from-accent to-secondary"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Powerful Features for </span>
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Everyone
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Built with cutting-edge AI technology to ensure the best accessibility experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-8 hover:shadow-primary transition-all duration-500 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/30 group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  {/* Icon with gradient background */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
