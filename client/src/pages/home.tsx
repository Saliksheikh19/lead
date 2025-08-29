import Navbar from "@/components/navbar";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background-secondary">
      <Navbar />
      <Header variant="home" />
      
      {/* Hero Section with CK97 Logo */}
      <section className="py-16 border-b border-border/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 animate-slide-up">
              <img 
                src="https://images.unsplash.com/photo-1614680376593-902f74cf0d41?ixlib=rb-4.0.3&auto=format&fit=crop&w=828&h=428" 
                alt="CK97 Logo" 
                className="mx-auto rounded-2xl shadow-2xl border border-border/50 max-w-full h-auto"
                data-testid="img-ck97-logo"
              />
            </div>
            
            <div className="space-y-8 animate-slide-up delay-200">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                  Start Your Journey Today
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Join the CK97 community and unlock exclusive benefits, bonuses, and compete in exciting leaderboards. 
                  Your gaming experience is about to get a lot more rewarding!
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-secondary/30 rounded-lg p-6 border border-border/30">
                    <h3 className="text-xl font-semibold mb-3 text-emerald-400">Exclusive Bonuses</h3>
                    <p className="text-muted-foreground">
                      Get access to exclusive promo codes and bonuses across multiple gaming platforms
                    </p>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-6 border border-border/30">
                    <h3 className="text-xl font-semibold mb-3 text-purple-400">Competitive Leaderboards</h3>
                    <p className="text-muted-foreground">
                      Compete with other players and climb the ranks to win amazing prizes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
