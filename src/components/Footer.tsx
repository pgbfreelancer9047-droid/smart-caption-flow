import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-destructive fill-destructive" />
            <span>for accessibility</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Real-Time Multilingual Simplified Captioning System
          </p>
          <p className="text-xs text-muted-foreground">
            Making communication accessible for everyone
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
