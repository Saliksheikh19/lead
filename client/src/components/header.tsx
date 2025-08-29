import { Trophy } from "lucide-react";

export default function Header() {
  return (
    <header className="relative overflow-hidden" data-testid="header-main">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), 
                             radial-gradient(circle at 80% 50%, rgba(6, 214, 160, 0.3) 0%, transparent 50%)`
          }}
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="mb-6">
          <span className="inline-flex items-center px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-sm font-medium text-primary-foreground mb-4 animate-glow">
            <Trophy className="w-4 h-4 mr-2" />
            COMPETE & WIN
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-primary via-accent to-emerald-400 bg-clip-text text-transparent animate-slide-up" data-testid="text-main-title">
          CK97Leaderboards
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up delay-200" data-testid="text-main-description">
          Challenge yourself against other players, climb the ranks, and win exciting prizes in our competitive leaderboards
        </p>
      </div>
    </header>
  );
}
