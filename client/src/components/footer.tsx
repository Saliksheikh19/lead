export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-12" data-testid="footer-main">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
            Ready to Compete?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of players competing for amazing prizes. Choose your platform and start climbing the leaderboards today!
          </p>
        </div>
        
        <div className="flex justify-center items-center space-x-6 mb-8">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300" data-testid="link-discord">
            <i className="fab fa-discord text-2xl"></i>
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300" data-testid="link-twitter">
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300" data-testid="link-youtube">
            <i className="fab fa-youtube text-2xl"></i>
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300" data-testid="link-twitch">
            <i className="fab fa-twitch text-2xl"></i>
          </a>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>&copy; 2024 CK97Leaderboards. All rights reserved.</p>
          <p className="mt-2">Compete responsibly. Must be 18+ to participate.</p>
        </div>
      </div>
    </footer>
  );
}
