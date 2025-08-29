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

  const httpServer = createServer(app);
  return httpServer;
}
