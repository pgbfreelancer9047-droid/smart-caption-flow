import { Card } from "@/components/ui/card";
import { 
  Mic, 
  Waves, 
  Brain, 
  FileText, 
  Languages, 
  Type, 
  Monitor,
  MessageSquare 
} from "lucide-react";

const workflowSteps = [
  {
    icon: Mic,
    title: "Audio Input",
    description: "Capture from microphone, broadcast, or classroom",
    color: "primary",
    delay: "0s"
  },
  {
    icon: Waves,
    title: "Preprocessing",
    description: "Noise suppression & speech enhancement",
    color: "primary",
    delay: "0.1s"
  },
  {
    icon: Brain,
    title: "ASR Engine",
    description: "Real-time speech-to-text with AI models",
    color: "primary",
    delay: "0.2s"
  },
  {
    icon: FileText,
    title: "Confidence Scoring",
    description: "Validate accuracy of transcription",
    color: "primary",
    delay: "0.3s"
  },
  {
    icon: Type,
    title: "Simplification",
    description: "AI-powered text simplification for clarity",
    color: "secondary",
    delay: "0.4s"
  },
  {
    icon: Languages,
    title: "Translation",
    description: "Multi-language support (Hindi, Tamil, etc.)",
    color: "secondary",
    delay: "0.5s"
  },
  {
    icon: Monitor,
    title: "Display",
    description: "Optimized captions on any device",
    color: "accent",
    delay: "0.6s"
  },
  {
    icon: MessageSquare,
    title: "Feedback",
    description: "Continuous learning from user input",
    color: "accent",
    delay: "0.7s"
  }
];

const WorkflowSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our AI-powered workflow transforms audio into accessible, multilingual captions in real-time
          </p>
        </div>

        {/* Workflow Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-glow transition-all duration-500 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/50 group cursor-pointer animate-fade-in"
                style={{ animationDelay: step.delay }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Step number */}
                  <div className="text-sm font-bold text-muted-foreground">
                    Step {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className={`p-4 rounded-xl bg-${step.color}/10 group-hover:bg-${step.color}/20 transition-colors`}>
                    <Icon className={`w-8 h-8 text-${step.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  
                  {/* Title and description */}
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Arrow for flow indication (except last item) */}
                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-primary/30">
                    →
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Flow visualization for mobile */}
        <div className="lg:hidden flex justify-center mt-8 gap-2">
          {workflowSteps.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-primary/30"
              style={{
                animation: `pulse 2s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
