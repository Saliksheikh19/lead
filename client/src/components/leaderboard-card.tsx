import { Trophy, Users, Gem, Coins } from "lucide-react";
import { type Partner } from "@shared/schema";
import { useLocation } from "wouter";

interface LeaderboardCardProps {
  partner: Partner;
  index: number;
}

export default function LeaderboardCard({ partner, index }: LeaderboardCardProps) {
  const [, setLocation] = useLocation();

  const handleViewLeaderboard = () => {
    setLocation(`/leaderboards/${partner.slug}`);
  };

  const getCurrencyIcon = () => {
    if (partner.currencyType === "GEMS") {
      return <Gem className="w-5 h-5 text-orange-400 mr-2" />;
    }
    if (partner.currencyType === "COINS") {
      return <Coins className="w-5 h-5 text-yellow-400 mr-2" />;
    }
    return null;
  };

  return (
    <article 
      className={`group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-${partner.hoverColor} card-hover glow-effect animate-slide-up`}
      style={{ animationDelay: `${index * 0.2}s` }}
      data-testid={`card-partner-${partner.slug}`}
    >
      {/* Partnered Badge */}
      <div className="absolute top-4 left-4 z-20">
        <span className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${partner.gradientFrom} ${partner.gradientTo} text-xs font-semibold text-white rounded-full`}>
          <Trophy className="w-3 h-3 mr-1" />
          PARTNERED
        </span>
      </div>

      {/* Card Content */}
      <div className="p-8">
        {/* Logo and Title */}
        <div className="flex items-center mb-6">
          <img 
            src={partner.logoUrl}
            alt={`${partner.name} logo`} 
            className={`w-16 h-16 rounded-xl mr-4 border-2 border-border group-hover:border-${partner.hoverColor} transition-colors duration-300`}
            data-testid={`img-logo-${partner.slug}`}
          />
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1" data-testid={`text-name-${partner.slug}`}>
              {partner.name}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="w-4 h-4 mr-2" />
              <span data-testid={`text-users-${partner.slug}`}>
                {partner.activeUsers.toLocaleString()} active players
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-6 text-lg" data-testid={`text-description-${partner.slug}`}>
          {partner.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-secondary/50 rounded-lg p-4 border border-border/50">
            <div className="text-sm text-muted-foreground mb-1">Winners</div>
            <div className="text-2xl font-bold text-emerald-400" data-testid={`text-winners-${partner.slug}`}>
              {partner.winners}
            </div>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4 border border-border/50">
            <div className="text-sm text-muted-foreground mb-1">Prize Pool</div>
            <div className="flex items-center">
              {getCurrencyIcon()}
              <span className="text-2xl font-bold text-yellow-400 prize-glow" data-testid={`text-prize-${partner.slug}`}>
                {partner.prizePool}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleViewLeaderboard}
          className={`w-full bg-gradient-to-r ${partner.gradientFrom} ${partner.gradientTo} hover:from-${partner.gradientFrom.replace('from-', '')}/90 hover:to-${partner.gradientTo.replace('to-', '')}/90 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-${partner.hoverColor.replace('/50', '/25')} group-hover:animate-glow`}
          data-testid={`button-view-${partner.slug}`}
        >
          <Trophy className="w-4 h-4 mr-2 inline" />
          View Leaderboard
        </button>
      </div>
    </article>
  );
}
