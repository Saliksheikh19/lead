import { Trophy } from "lucide-react";
import { Link, useLocation } from "wouter";

interface HeaderProps {
  variant?: "home" | "leaderboards" | "rewards";
  title?: string;
  description?: string;
  badge?: string;
}

export default function Header({ 
  variant = "leaderboards", 
  title, 
  description, 
  badge 
}: HeaderProps) {
  const [location] = useLocation();

  const getHeaderContent = () => {
    switch (variant) {
      case "home":
        return {
          badge: "ULTIMATE REWARDS",
          title: "The Ultimate Rewards Experience With CK97",
          description: "Sign up under CK97 affiliate code and start gaining benefits from supporting CK97! If you do use code CK97, you can also check out our Leaderboards too below."
        };
      case "rewards":
        return {
          badge: "EXCLUSIVE BONUSES",
          title: "Claim Your Bonuses",
          description: "Use our exclusive promo codes to get the best bonuses on your favorite gaming sites"
        };
      default:
        return {
          badge: "COMPETE & WIN",
          title: "CK97Leaderboards",
          description: "Challenge yourself against other players, climb the ranks, and win exciting prizes in our competitive leaderboards"
        };
    }
  };

  const content = getHeaderContent();

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
            {badge || content.badge}
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-primary via-accent to-emerald-400 bg-clip-text text-transparent animate-slide-up" data-testid="text-main-title">
          {title || content.title}
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up delay-200" data-testid="text-main-description">
          {description || content.description}
        </p>

        {variant === "home" && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 animate-slide-up delay-500">
            <Link href="/leaderboards">
              <button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/25" data-testid="button-join-leaderboards">
                Join Leaderboards
              </button>
            </Link>
            <Link href="/rewards">
              <button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-500/90 hover:to-cyan-500/90 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/25" data-testid="button-rewards">
                Rewards
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
