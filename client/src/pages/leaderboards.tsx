import { useQuery } from "@tanstack/react-query";
import { type Partner } from "@shared/schema";
import Navbar from "@/components/navbar";
import Header from "@/components/header";
import StatsOverview from "@/components/stats-overview";
import LeaderboardCard from "@/components/leaderboard-card";
import Footer from "@/components/footer";

export default function Leaderboards() {
  const { data: partners, isLoading } = useQuery<Partner[]>({
    queryKey: ["/api/partners"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background-secondary">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading leaderboards...</p>
          </div>
        </div>
      </div>
    );
  }

  const totalWinners = partners?.reduce((sum, partner) => sum + partner.winners, 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background-secondary">
      <Navbar />
      <Header variant="leaderboards" />
      <StatsOverview 
        activePartners={partners?.length || 0}
        totalWinners={totalWinners}
      />
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {partners?.map((partner, index) => (
              <LeaderboardCard 
                key={partner.id} 
                partner={partner} 
                index={index}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}