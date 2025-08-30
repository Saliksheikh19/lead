import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { type Partner, type LeaderboardEntry } from "@shared/schema";
import Navbar from "@/components/navbar";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Trophy, Medal, Award, Users, Target, Calendar } from "lucide-react";

export default function LeaderboardDetail() {
  const [match, params] = useRoute("/leaderboards/:slug");
  const partnerSlug = params?.slug || "";

  const { data: partner, isLoading: partnerLoading } = useQuery<Partner>({
    queryKey: ["/api/partners", partnerSlug],
    enabled: !!partnerSlug,
  });

  const { data: entries, isLoading: entriesLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ["/api/leaderboards", partnerSlug],
    enabled: !!partnerSlug,
  });

  if (partnerLoading || entriesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background-secondary">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading leaderboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background-secondary">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Leaderboard Not Found</h1>
            <p className="text-muted-foreground">The requested leaderboard could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50";
      case 2:
        return "bg-gradient-to-r from-gray-400/20 to-slate-500/20 border-gray-400/50";
      case 3:
        return "bg-gradient-to-r from-amber-600/20 to-yellow-600/20 border-amber-600/50";
      default:
        return "bg-card border-border";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background-secondary">
      <Navbar />
      
      {/* Partner Header */}
      <header className="relative overflow-hidden py-16 border-b border-border/50">
        <div className="absolute inset-0 opacity-10">
          <div 
            className={`absolute inset-0 bg-gradient-to-r ${partner.gradientFrom} ${partner.gradientTo}`}
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <img 
              src={partner.logoUrl}
              alt={`${partner.name} logo`} 
              className="w-20 h-20 rounded-xl mr-6 border-2 border-border"
              data-testid={`img-partner-logo-${partner.slug}`}
            />
            <div className="text-left">
              <h1 className={`text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r ${partner.gradientFrom} ${partner.gradientTo} bg-clip-text text-transparent`} data-testid="text-partner-name">
                {partner.name} Leaderboard
              </h1>
              <p className="text-lg text-muted-foreground" data-testid="text-partner-description">
                {partner.description}
              </p>
            </div>
          </div>

          {/* Competition Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-sm text-muted-foreground">Winners</span>
              </div>
              <div className="text-2xl font-bold text-emerald-400" data-testid="text-winners">
                {partner.winners}
              </div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-sm text-muted-foreground">Prize Pool</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400" data-testid="text-prize-pool">
                {partner.prizePool}
              </div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-sm text-muted-foreground">Players</span>
              </div>
              <div className="text-2xl font-bold text-blue-400" data-testid="text-active-users">
                {partner.activeUsers.toLocaleString()}
              </div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-5 h-5 text-purple-400 mr-2" />
                <span className="text-sm text-muted-foreground">Status</span>
              </div>
              <div className="text-2xl font-bold text-purple-400">
                Live
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Leaderboard Table */}
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                Current Rankings
              </h2>
              {partnerSlug === "rainbet" && (
                <div className="inline-flex items-center px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-sm font-medium text-emerald-400 animate-glow">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mr-2"></div>
                  Live API Data
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {entries?.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`${getRankBg(entry.rank)} rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  data-testid={`row-player-${entry.rank}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Rank */}
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(entry.rank)}
                      </div>
                      
                      {/* Player Info */}
                      <div className="flex items-center space-x-4">
                        <img 
                          src={entry.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64"}
                          alt={`${entry.playerName} avatar`}
                          className="w-12 h-12 rounded-full border-2 border-border"
                          data-testid={`img-avatar-${entry.rank}`}
                        />
                        <div>
                          <div className="font-bold text-lg text-foreground" data-testid={`text-player-name-${entry.rank}`}>
                            {entry.playerName}
                          </div>
                          {entry.country && (
                            <div className="text-sm text-muted-foreground" data-testid={`text-country-${entry.rank}`}>
                              {entry.country}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      {/* Score */}
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          {partnerSlug === "rainbet" ? "Wagered" : "Score"}
                        </div>
                        <div className="text-xl font-bold text-primary" data-testid={`text-score-${entry.rank}`}>
                          {partnerSlug === "rainbet" ? `$${entry.score.toLocaleString()}` : entry.score.toLocaleString()}
                        </div>
                      </div>

                      {/* Prize */}
                      {entry.prize && (
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Prize</div>
                          <div className="text-xl font-bold text-yellow-400 prize-glow" data-testid={`text-prize-${entry.rank}`}>
                            {entry.prize}
                          </div>
                        </div>
                      )}

                      {/* Winner Badge */}
                      {entry.isWinner === 1 && (
                        <div className={`px-3 py-1 bg-gradient-to-r ${partner.gradientFrom} ${partner.gradientTo} text-xs font-semibold text-white rounded-full`}>
                          WINNER
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Live indicator for Rain Bet */}
                  {partnerSlug === "rainbet" && (
                    <div className="mt-4 pt-4 border-t border-border/30">
                      <div className="flex items-center justify-center text-sm text-emerald-400">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mr-2"></div>
                        Live data from Rain Bet API
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Competition Info */}
            <div className="mt-12 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-foreground">How to Participate</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Join the competition by playing on {partner.name} and climbing the leaderboard. 
                The top {partner.winners} players will win amazing prizes from the {partner.prizePool} prize pool!
              </p>
              <button 
                onClick={() => window.open(`https://${partner.slug}.com`, '_blank')}
                className={`bg-gradient-to-r ${partner.gradientFrom} ${partner.gradientTo} hover:from-${partner.gradientFrom.replace('from-', '')}/90 hover:to-${partner.gradientTo.replace('to-', '')}/90 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg`}
                data-testid="button-join-competition"
              >
                <Trophy className="w-5 h-5 mr-2 inline" />
                Join Competition
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}