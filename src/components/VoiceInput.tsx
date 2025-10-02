import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface VoiceInputProps {
  onTranscript: (text: string, isFinal: boolean) => void;
  selectedLanguage: "en-US" | "hi-IN" | "ta-IN";
}

const VoiceInput = ({ onTranscript, selectedLanguage }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if browser supports Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      toast({
        title: "Not Supported",
        description: "Your browser doesn't support speech recognition. Please use Chrome or Edge.",
        variant: "destructive",
      });
      return;
    }

    // Initialize Speech Recognition
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = selectedLanguage;

    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        onTranscript(finalTranscript.trim(), true);
      } else if (interimTranscript) {
        onTranscript(interimTranscript.trim(), false);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "not-allowed") {
        toast({
          title: "Microphone Access Denied",
          description: "Please allow microphone access to use voice input.",
          variant: "destructive",
        });
      } else if (event.error === "no-speech") {
        // This is normal, just restart
        if (isListening) {
          recognition.start();
        }
      } else {
        toast({
          title: "Recognition Error",
          description: `Error: ${event.error}`,
          variant: "destructive",
        });
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      if (isListening) {
        // Automatically restart if still supposed to be listening
        try {
          recognition.start();
        } catch (e) {
          console.log("Recognition restart failed:", e);
        }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [selectedLanguage, onTranscript, toast]);

  const toggleListening = () => {
    if (!isSupported || !recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      toast({
        title: "Stopped Listening",
        description: "Voice input stopped",
      });
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        toast({
          title: "Listening...",
          description: "Speak now to generate captions",
        });
      } catch (error) {
        console.error("Error starting recognition:", error);
        toast({
          title: "Error",
          description: "Failed to start voice input",
          variant: "destructive",
        });
      }
    }
  };

  if (!isSupported) {
    return (
      <Card className="p-6 bg-muted/50 border-2 border-destructive/30">
        <div className="text-center space-y-2">
          <MicOff className="w-12 h-12 mx-auto text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Speech recognition is not supported in your browser. Please use Chrome or Edge.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        variant={isListening ? "destructive" : "hero"}
        size="lg"
        onClick={toggleListening}
        className="group relative"
      >
        {isListening ? (
          <>
            <MicOff className="w-6 h-6" />
            <span className="ml-2">Stop Listening</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse" />
          </>
        ) : (
          <>
            <Mic className="w-6 h-6" />
            <span className="ml-2">Start Voice Input</span>
          </>
        )}
      </Button>

      {isListening && (
        <div className="flex items-center gap-2 text-sm text-primary animate-pulse">
          <Volume2 className="w-4 h-4" />
          <span className="font-medium">Listening for speech...</span>
        </div>
      )}
    </div>
  );
};

export default VoiceInput;
