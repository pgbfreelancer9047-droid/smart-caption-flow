import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import VoiceInput from "./VoiceInput";

const LiveDemo = () => {
  const [captions, setCaptions] = useState<Array<{ text: string; isFinal: boolean; timestamp: number }>>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<"en-US" | "hi-IN" | "ta-IN">("en-US");

  const handleTranscript = (text: string, isFinal: boolean) => {
    const timestamp = Date.now();
    
    if (isFinal) {
      // Add as final caption
      setCaptions(prev => {
        // Remove any interim captions and add this final one
        const filtered = prev.filter(c => c.isFinal);
        return [...filtered, { text, isFinal: true, timestamp }].slice(-10); // Keep last 10 captions
      });
    } else {
      // Update or add interim caption
      setCaptions(prev => {
        const filtered = prev.filter(c => c.isFinal);
        return [...filtered, { text, isFinal: false, timestamp }];
      });
    }
  };

  const languageMap = {
    "en-US": { display: "English", code: "en-US" },
    "hi-IN": { display: "हिंदी", code: "hi-IN" },
    "ta-IN": { display: "தமிழ்", code: "ta-IN" },
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Real-Time Voice Captioning
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Speak into your microphone and watch live captions appear instantly
            </p>
          </div>

          <div className="space-y-6">
            {/* Language Selection */}
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-border">
              <div className="flex flex-col gap-4">
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Select Language
                </div>
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(languageMap).map(([key, lang]) => (
                    <Button
                      key={key}
                      size="sm"
                      variant={selectedLanguage === key ? "default" : "ghost"}
                      onClick={() => setSelectedLanguage(key as "en-US" | "hi-IN" | "ta-IN")}
                    >
                      {lang.display}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Voice Input Controls */}
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-2 border-primary/20">
              <VoiceInput 
                onTranscript={handleTranscript}
                selectedLanguage={selectedLanguage}
              />
            </Card>

            {/* Live Caption Display */}
            <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-2 border-primary/30 shadow-glow min-h-[240px]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-primary uppercase tracking-wide flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    Live Captions ({languageMap[selectedLanguage].display})
                  </div>
                  {captions.length > 0 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setCaptions([])}
                    >
                      Clear
                    </Button>
                  )}
                </div>
                
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {captions.length === 0 ? (
                    <p className="text-xl text-muted-foreground text-center py-12">
                      Click "Start Voice Input" and begin speaking...
                    </p>
                  ) : (
                    captions.map((caption, index) => (
                      <div
                        key={`${caption.timestamp}-${index}`}
                        className={`text-xl md:text-2xl font-semibold leading-relaxed transition-all duration-300 ${
                          caption.isFinal 
                            ? 'text-foreground' 
                            : 'text-foreground/60 italic'
                        }`}
                      >
                        {caption.text}
                        {!caption.isFinal && <span className="animate-pulse">|</span>}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Card>

            {/* Info Card */}
            <Card className="p-6 bg-muted/30 border border-border">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mic className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">How it works</h3>
                  <p className="text-sm text-muted-foreground">
                    This demo uses your browser's built-in speech recognition. Click the microphone button, 
                    allow access, and start speaking. Captions will appear in real-time as you talk.
                    Works best in Chrome or Edge browsers.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;
