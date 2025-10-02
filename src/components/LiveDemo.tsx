import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

const demoTexts = [
  {
    original: "The quantum entanglement phenomenon demonstrates non-local correlations between particles.",
    simplified: "Quantum particles can be connected even when far apart.",
    translations: {
      hindi: "क्वांटम कण दूर होने पर भी जुड़े रह सकते हैं।",
      tamil: "குவாண்டம் துகள்கள் தொலைவில் இருந்தாலும் இணைக்கப்பட்டிருக்கும்."
    }
  },
  {
    original: "The implementation of sustainable development requires comprehensive policy frameworks.",
    simplified: "Building a sustainable future needs good planning and rules.",
    translations: {
      hindi: "सतत भविष्य के लिए अच्छी योजना और नियम चाहिए।",
      tamil: "நிலையான எதிர்காலத்திற்கு நல்ல திட்டமிடல் தேவை."
    }
  }
];

const LiveDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<"english" | "hindi" | "tamil">("english");

  const currentDemo = demoTexts[currentIndex];

  useEffect(() => {
    if (!isPlaying) return;

    const text = selectedLanguage === "english" 
      ? currentDemo.simplified 
      : currentDemo.translations[selectedLanguage];

    let charIndex = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayedText(text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % demoTexts.length);
          setDisplayedText("");
        }, 2000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, selectedLanguage]);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                See It In Action
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Watch how complex speech is transformed into simple, accessible captions
            </p>
          </div>

          <div className="space-y-6">
            {/* Original Text Display */}
            <Card className="p-6 bg-muted/50 border-2 border-border">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Original Speech
                </div>
                <p className="text-lg text-foreground/70 italic">
                  "{currentDemo.original}"
                </p>
              </div>
            </Card>

            {/* Live Caption Display */}
            <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-2 border-primary/30 shadow-glow min-h-[180px] flex items-center justify-center">
              <div className="space-y-4 w-full">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-primary uppercase tracking-wide flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    Live Caption ({selectedLanguage})
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={selectedLanguage === "english" ? "default" : "ghost"}
                      onClick={() => setSelectedLanguage("english")}
                    >
                      English
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedLanguage === "hindi" ? "default" : "ghost"}
                      onClick={() => setSelectedLanguage("hindi")}
                    >
                      हिंदी
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedLanguage === "tamil" ? "default" : "ghost"}
                      onClick={() => setSelectedLanguage("tamil")}
                    >
                      தமிழ்
                    </Button>
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-semibold text-foreground leading-relaxed min-h-[80px]">
                  {displayedText}
                  {isPlaying && <span className="animate-pulse">|</span>}
                </p>
              </div>
            </Card>

            {/* Controls */}
            <div className="flex justify-center">
              <Button
                variant="hero"
                size="lg"
                onClick={() => setIsPlaying(!isPlaying)}
                className="group"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Pause Demo
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Demo
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;
