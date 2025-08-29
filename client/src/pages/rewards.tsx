import { useQuery } from "@tanstack/react-query";
import { type Bonus } from "@shared/schema";
import Navbar from "@/components/navbar";
import Header from "@/components/header";
import BonusCard from "@/components/bonus-card";
import Footer from "@/components/footer";

export default function Rewards() {
  const { data: bonuses, isLoading } = useQuery<Bonus[]>({
    queryKey: ["/api/bonuses"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background-secondary">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading rewards...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background-secondary">
      <Navbar />
      <Header variant="rewards" />
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {bonuses?.map((bonus, index) => (
              <BonusCard 
                key={bonus.id} 
                bonus={bonus} 
                index={index}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Responsible Gaming Notice */}
      <section className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-4 text-foreground">Responsible Gaming</h3>
          <p className="text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We do not take responsibility for any losses from gambling in casinos and betting sites which are linked or promoted on our website(s). 
            As a player, you are responsible for your bets. If you feel you may have a gambling problem, please visit{" "}
            <a 
              href="https://www.begambleaware.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline transition-colors"
              data-testid="link-responsible-gaming"
            >
              BeGambleAware.org
            </a>{" "}
            for free, confidential help and support.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}