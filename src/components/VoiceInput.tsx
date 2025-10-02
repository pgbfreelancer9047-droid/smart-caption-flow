import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceInputProps {
  onTranscript: (text: string, isFinal: boolean) => void;
  selectedLanguage: "en-US" | "hi-IN" | "ta-IN";
}

const VoiceInput = ({ onTranscript, selectedLanguage }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const restartTimeoutRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if browser supports Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.log("Speech Recognition not supported");
      setIsSupported(false);
      return;
    }

    console.log("Initializing Speech Recognition with language:", selectedLanguage);

    // Initialize Speech Recognition
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = selectedLanguage;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("Speech recognition started");
    };

    recognition.onresult = (event: any) => {
      console.log("Got speech result");
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
        console.log("Final transcript:", finalTranscript);
        onTranscript(finalTranscript.trim(), true);
      } else if (interimTranscript) {
        console.log("Interim transcript:", interimTranscript);
        onTranscript(interimTranscript.trim(), false);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error, event);
      
      // Clear any pending restart
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }

      if (event.error === "not-allowed" || event.error === "permission-denied") {
        toast({
          title: "Microphone Access Denied",
          description: "Please allow microphone access to use voice input.",
          variant: "destructive",
        });
        setIsListening(false);
      } else if (event.error === "no-speech") {
        console.log("No speech detected, will restart if still listening");
        // Don't show error for no-speech, it's normal
      } else if (event.error === "aborted") {
        console.log("Recognition aborted");
        // Normal abort, don't show error
      } else if (event.error === "network") {
        toast({
          title: "Network Error",
          description: "Please check your internet connection and try again.",
          variant: "destructive",
        });
        setIsListening(false);
      } else {
        console.log("Other error:", event.error);
        toast({
          title: "Recognition Error",
          description: `Error: ${event.error}. Try restarting voice input.`,
          variant: "destructive",
        });
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      
      // Clear any pending restart
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }

      // Only restart if we're supposed to be listening
      if (isListening && recognitionRef.current) {
        console.log("Attempting to restart recognition...");
        // Add small delay before restart to avoid conflicts
        restartTimeoutRef.current = setTimeout(() => {
          try {
            recognitionRef.current?.start();
            console.log("Recognition restarted successfully");
          } catch (e) {
            console.error("Failed to restart recognition:", e);
            setIsListening(false);
          }
        }, 100);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      console.log("Cleaning up Speech Recognition");
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [selectedLanguage, isListening, onTranscript, toast]);

  const toggleListening = () => {
    if (!isSupported || !recognitionRef.current) {
      console.log("Cannot toggle - not supported or not initialized");
      return;
    }

    if (isListening) {
      console.log("Stopping recognition");
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      recognitionRef.current.abort();
      setIsListening(false);
      toast({
        title: "Stopped Listening",
        description: "Voice input stopped",
      });
    } else {
      console.log("Starting recognition");
      try {
        recognitionRef.current.start();
        setIsListening(true);
        toast({
          title: "Listening...",
          description: "Speak now to generate captions",
        });
      } catch (error: any) {
        console.error("Error starting recognition:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to start voice input. Make sure microphone access is allowed.",
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
