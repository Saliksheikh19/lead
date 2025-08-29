interface StatsOverviewProps {
  activePartners: number;
  totalWinners: number;
}

export default function StatsOverview({ activePartners, totalWinners }: StatsOverviewProps) {
  return (
    <section className="py-12 border-b border-border/50" data-testid="section-stats">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center animate-float" data-testid="stat-partners">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{activePartners}</div>
            <div className="text-muted-foreground">Active Partners</div>
          </div>
          <div className="text-center animate-float delay-500" data-testid="stat-winners">
            <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">{totalWinners}</div>
            <div className="text-muted-foreground">Total Winners</div>
          </div>
          <div className="text-center animate-float delay-1000" data-testid="stat-prizes">
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2 prize-glow">$3,500+</div>
            <div className="text-muted-foreground">Total Prizes</div>
          </div>
          <div className="text-center animate-float delay-1500" data-testid="stat-competition">
            <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2">24/7</div>
            <div className="text-muted-foreground">Live Competition</div>
          </div>
        </div>
      </div>
    </section>
  );
}
