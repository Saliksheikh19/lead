import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all partners
  app.get("/api/partners", async (req, res) => {
    try {
      const partners = await storage.getAllPartners();
      res.json(partners);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch partners" });
    }
  });

  // Get partner by slug
  app.get("/api/partners/:slug", async (req, res) => {
    try {
      const partner = await storage.getPartnerBySlug(req.params.slug);
      if (!partner) {
        return res.status(404).json({ message: "Partner not found" });
      }
      res.json(partner);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch partner" });
    }
  });

  // Get all bonuses
  app.get("/api/bonuses", async (req, res) => {
    try {
      const bonuses = await storage.getAllBonuses();
      res.json(bonuses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bonuses" });
    }
  });

  // Get bonus by slug
  app.get("/api/bonuses/:slug", async (req, res) => {
    try {
      const bonus = await storage.getBonusBySlug(req.params.slug);
      if (!bonus) {
        return res.status(404).json({ message: "Bonus not found" });
      }
      res.json(bonus);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bonus" });
    }
  });

  // Get leaderboard entries by partner slug
  app.get("/api/leaderboards/:partnerSlug", async (req, res) => {
    try {
      const { partnerSlug } = req.params;
      
      // Special handling for Rain Bet - fetch live data
      if (partnerSlug === "rainbet") {
        try {
          const response = await fetch("https://services.rainbet.com/v1/external/affiliates?start_at=2025-03-01&end_at=2025-03-02&key=15DRHDoG9NCbS4TGCgnhoka1ez6fp7Zn");
          const data = await response.json();
          
          if (data.affiliates) {
            // Transform Rain Bet API data to our leaderboard format
            const rainBetEntries = data.affiliates.map((affiliate: any, index: number) => ({
              id: affiliate.id,
              partnerSlug: "rainbet",
              playerName: affiliate.username,
              rank: index + 1,
              score: Math.floor(parseFloat(affiliate.wagered_amount)),
              prize: index < 5 ? `$${[500, 300, 200, 150, 100][index]}` : undefined,
              avatarUrl: `https://images.unsplash.com/photo-${1535713875002 + index}d-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64`,
              country: ["US", "CA", "UK", "AU", "DE", "FR", "NL", "SE", "NO", "FI"][index % 10],
              isWinner: index < 15 ? 1 : 0,
            }));
            
            return res.json(rainBetEntries);
          }
        } catch (apiError) {
          console.error("Failed to fetch Rain Bet data:", apiError);
          // Fall back to stored data if API fails
        }
      }
      
      // Default behavior for other partners
      const entries = await storage.getLeaderboardEntriesByPartner(partnerSlug);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch leaderboard entries" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
