import { type Partner, type InsertPartner } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getPartner(id: string): Promise<Partner | undefined>;
  getPartnerBySlug(slug: string): Promise<Partner | undefined>;
  getAllPartners(): Promise<Partner[]>;
  createPartner(partner: InsertPartner): Promise<Partner>;
}

export class MemStorage implements IStorage {
  private partners: Map<string, Partner>;

  constructor() {
    this.partners = new Map();
    this.seedData();
  }

  private seedData() {
    const partnersData: InsertPartner[] = [
      {
        name: "Roobet",
        slug: "roobet",
        description: "Compete in Roobet Leaderboard and win exclusive rewards",
        logoUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128",
        winners: 10,
        prizePool: "$1,000",
        currencyType: "USD",
        activeUsers: 2547,
        gradientFrom: "from-primary",
        gradientTo: "to-purple-600",
        hoverColor: "primary/50",
      },
      {
        name: "Packdraw",
        slug: "packdraw",
        description: "Compete in Packdraw Leaderboard and win exclusive rewards",
        logoUrl: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128",
        winners: 8,
        prizePool: "$1,500",
        currencyType: "USD",
        activeUsers: 1892,
        gradientFrom: "from-emerald-500",
        gradientTo: "to-cyan-500",
        hoverColor: "emerald-400/50",
      },
      {
        name: "CSGOGem",
        slug: "csgogem",
        description: "Compete in CSGOGem Leaderboard and win exclusive rewards",
        logoUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128",
        winners: 8,
        prizePool: "1,000",
        currencyType: "GEMS",
        currencyIcon: "gem",
        activeUsers: 3241,
        gradientFrom: "from-orange-500",
        gradientTo: "to-red-500",
        hoverColor: "orange-400/50",
      },
      {
        name: "Chicken.gg",
        slug: "chickengg",
        description: "Compete in Chicken.gg Leaderboard and win exclusive rewards",
        logoUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128",
        winners: 10,
        prizePool: "2,000",
        currencyType: "COINS",
        currencyIcon: "coins",
        activeUsers: 1645,
        gradientFrom: "from-yellow-500",
        gradientTo: "to-orange-500",
        hoverColor: "yellow-400/50",
      },
    ];

    partnersData.forEach(partner => {
      const id = randomUUID();
      const partnerWithId: Partner = { ...partner, id };
      this.partners.set(id, partnerWithId);
    });
  }

  async getPartner(id: string): Promise<Partner | undefined> {
    return this.partners.get(id);
  }

  async getPartnerBySlug(slug: string): Promise<Partner | undefined> {
    return Array.from(this.partners.values()).find(
      (partner) => partner.slug === slug,
    );
  }

  async getAllPartners(): Promise<Partner[]> {
    return Array.from(this.partners.values());
  }

  async createPartner(insertPartner: InsertPartner): Promise<Partner> {
    const id = randomUUID();
    const partner: Partner = { ...insertPartner, id };
    this.partners.set(id, partner);
    return partner;
  }
}

export const storage = new MemStorage();
