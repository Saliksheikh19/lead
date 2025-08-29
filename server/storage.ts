import { type Partner, type InsertPartner, type Bonus, type InsertBonus } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getPartner(id: string): Promise<Partner | undefined>;
  getPartnerBySlug(slug: string): Promise<Partner | undefined>;
  getAllPartners(): Promise<Partner[]>;
  createPartner(partner: InsertPartner): Promise<Partner>;
  getBonus(id: string): Promise<Bonus | undefined>;
  getBonusBySlug(slug: string): Promise<Bonus | undefined>;
  getAllBonuses(): Promise<Bonus[]>;
  createBonus(bonus: InsertBonus): Promise<Bonus>;
}

export class MemStorage implements IStorage {
  private partners: Map<string, Partner>;
  private bonuses: Map<string, Bonus>;

  constructor() {
    this.partners = new Map();
    this.bonuses = new Map();
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

    const bonusesData: InsertBonus[] = [
      {
        name: "Roobet",
        slug: "roobet",
        logoUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96",
        bonusType: "Cashback / Lossback",
        promoCode: "CK97",
        claimUrl: "https://roobet.com/?ref=CK97",
        isFeatured: 1,
        gradientFrom: "from-primary",
        gradientTo: "to-purple-600",
      },
      {
        name: "Packdraw",
        slug: "packdraw",
        logoUrl: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96",
        bonusType: "5% Deposit Bonus",
        promoCode: "CK97",
        claimUrl: "https://packdraw.com/?ref=CK97",
        isFeatured: 1,
        gradientFrom: "from-emerald-500",
        gradientTo: "to-cyan-500",
      },
      {
        name: "Rain.gg",
        slug: "rain",
        logoUrl: "https://images.unsplash.com/photo-1528132596460-10deeb5e6064?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96",
        bonusType: "Get 3 Free Cases + 5% Deposit Bonus",
        promoCode: "CK97",
        claimUrl: "https://rain.gg/r/CRZ",
        isFeatured: 1,
        gradientFrom: "from-blue-500",
        gradientTo: "to-indigo-500",
      },
      {
        name: "Clash.gg",
        slug: "clash",
        logoUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96",
        bonusType: "5% Deposit Bonus & Daily Cases",
        promoCode: "CK97",
        claimUrl: "https://clash.gg/r/CK97",
        isFeatured: 1,
        gradientFrom: "from-red-500",
        gradientTo: "to-pink-500",
      },
      {
        name: "CSGOGem",
        slug: "csgogem",
        logoUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96",
        bonusType: "5% Deposit Bonus & Daily Cases",
        promoCode: "CK97",
        claimUrl: "https://csgogem.com/r/CK97",
        isFeatured: 1,
        gradientFrom: "from-orange-500",
        gradientTo: "to-red-500",
      },
      {
        name: "Chicken.gg",
        slug: "chickengg",
        logoUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96",
        bonusType: "5% Deposit Bonus & Cases",
        promoCode: "CK97",
        claimUrl: "https://chicken.gg/r/CK97",
        isFeatured: 1,
        gradientFrom: "from-yellow-500",
        gradientTo: "to-orange-500",
      },
    ];

    bonusesData.forEach(bonus => {
      const id = randomUUID();
      const bonusWithId: Bonus = { ...bonus, id };
      this.bonuses.set(id, bonusWithId);
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

  async getBonus(id: string): Promise<Bonus | undefined> {
    return this.bonuses.get(id);
  }

  async getBonusBySlug(slug: string): Promise<Bonus | undefined> {
    return Array.from(this.bonuses.values()).find(
      (bonus) => bonus.slug === slug,
    );
  }

  async getAllBonuses(): Promise<Bonus[]> {
    return Array.from(this.bonuses.values());
  }

  async createBonus(insertBonus: InsertBonus): Promise<Bonus> {
    const id = randomUUID();
    const bonus: Bonus = { ...insertBonus, id };
    this.bonuses.set(id, bonus);
    return bonus;
  }
}

export const storage = new MemStorage();
