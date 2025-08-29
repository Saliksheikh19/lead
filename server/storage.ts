import { type Partner, type InsertPartner, type Bonus, type InsertBonus, type LeaderboardEntry, type InsertLeaderboardEntry } from "@shared/schema";
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
  getLeaderboardEntriesByPartner(partnerSlug: string): Promise<LeaderboardEntry[]>;
  createLeaderboardEntry(entry: InsertLeaderboardEntry): Promise<LeaderboardEntry>;
}

export class MemStorage implements IStorage {
  private partners: Map<string, Partner>;
  private bonuses: Map<string, Bonus>;
  private leaderboardEntries: Map<string, LeaderboardEntry>;

  constructor() {
    this.partners = new Map();
    this.bonuses = new Map();
    this.leaderboardEntries = new Map();
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

    // Seed leaderboard data
    const leaderboardData: InsertLeaderboardEntry[] = [
      // Roobet leaderboard
      { partnerSlug: "roobet", playerName: "CryptoKing97", rank: 1, score: 15420, prize: "$300", avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "US", isWinner: 1 },
      { partnerSlug: "roobet", playerName: "LuckyPlayer", rank: 2, score: 12850, prize: "$200", avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b02b8815?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "CA", isWinner: 1 },
      { partnerSlug: "roobet", playerName: "GamingPro", rank: 3, score: 11200, prize: "$100", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "UK", isWinner: 1 },
      { partnerSlug: "roobet", playerName: "BetMaster", rank: 4, score: 9850, prize: "$75", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "AU", isWinner: 1 },
      { partnerSlug: "roobet", playerName: "SpinWinner", rank: 5, score: 8750, prize: "$50", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "DE", isWinner: 1 },
      { partnerSlug: "roobet", playerName: "RollMaster", rank: 6, score: 7820, avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "FR", isWinner: 0 },
      { partnerSlug: "roobet", playerName: "CasinoKing", rank: 7, score: 7200, avatarUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "NL", isWinner: 0 },
      { partnerSlug: "roobet", playerName: "BetGuru", rank: 8, score: 6950, avatarUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "SE", isWinner: 0 },
      { partnerSlug: "roobet", playerName: "SlotHero", rank: 9, score: 6500, avatarUrl: "https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "NO", isWinner: 0 },
      { partnerSlug: "roobet", playerName: "GameChamp", rank: 10, score: 6100, avatarUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "FI", isWinner: 0 },
      
      // Packdraw leaderboard
      { partnerSlug: "packdraw", playerName: "PackMaster", rank: 1, score: 18750, prize: "$400", avatarUrl: "https://images.unsplash.com/photo-1502767089025-6572583495f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "US", isWinner: 1 },
      { partnerSlug: "packdraw", playerName: "CasePro", rank: 2, score: 16200, prize: "$300", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "CA", isWinner: 1 },
      { partnerSlug: "packdraw", playerName: "DrawKing", rank: 3, score: 14850, prize: "$200", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "UK", isWinner: 1 },
      { partnerSlug: "packdraw", playerName: "LootHunter", rank: 4, score: 13200, prize: "$150", avatarUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "AU", isWinner: 1 },
      { partnerSlug: "packdraw", playerName: "BoxOpener", rank: 5, score: 11850, prize: "$100", avatarUrl: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "DE", isWinner: 1 },
      { partnerSlug: "packdraw", playerName: "UnboxHero", rank: 6, score: 10200, avatarUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "FR", isWinner: 0 },
      { partnerSlug: "packdraw", playerName: "PackLegend", rank: 7, score: 9750, avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "NL", isWinner: 0 },
      { partnerSlug: "packdraw", playerName: "CaseGuru", rank: 8, score: 9200, avatarUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "SE", isWinner: 0 },
      
      // CSGOGem leaderboard
      { partnerSlug: "csgogem", playerName: "GemCollector", rank: 1, score: 22400, prize: "300 Gems", avatarUrl: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "US", isWinner: 1 },
      { partnerSlug: "csgogem", playerName: "SkinMaster", rank: 2, score: 19850, prize: "200 Gems", avatarUrl: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "RU", isWinner: 1 },
      { partnerSlug: "csgogem", playerName: "CS2Pro", rank: 3, score: 17200, prize: "150 Gems", avatarUrl: "https://images.unsplash.com/photo-1553512207-4c5c77a73f1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "PL", isWinner: 1 },
      { partnerSlug: "csgogem", playerName: "GamingElite", rank: 4, score: 15600, prize: "100 Gems", avatarUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "BR", isWinner: 1 },
      { partnerSlug: "csgogem", playerName: "SkinTrader", rank: 5, score: 14200, prize: "75 Gems", avatarUrl: "https://images.unsplash.com/photo-1522075469751-3847ae946a65?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "TR", isWinner: 1 },
      { partnerSlug: "csgogem", playerName: "GemHunter", rank: 6, score: 12800, avatarUrl: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "IT", isWinner: 0 },
      { partnerSlug: "csgogem", playerName: "CSMaster", rank: 7, score: 11500, avatarUrl: "https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "ES", isWinner: 0 },
      { partnerSlug: "csgogem", playerName: "SkinsLord", rank: 8, score: 10200, avatarUrl: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "PT", isWinner: 0 },
      
      // Chicken.gg leaderboard
      { partnerSlug: "chickengg", playerName: "ChickenChamp", rank: 1, score: 25600, prize: "500 Coins", avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "US", isWinner: 1 },
      { partnerSlug: "chickengg", playerName: "EggMaster", rank: 2, score: 23100, prize: "400 Coins", avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "CA", isWinner: 1 },
      { partnerSlug: "chickengg", playerName: "FeatherKing", rank: 3, score: 20850, prize: "300 Coins", avatarUrl: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "UK", isWinner: 1 },
      { partnerSlug: "chickengg", playerName: "CluckPro", rank: 4, score: 18500, prize: "200 Coins", avatarUrl: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "AU", isWinner: 1 },
      { partnerSlug: "chickengg", playerName: "WingMaster", rank: 5, score: 16200, prize: "150 Coins", avatarUrl: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "DE", isWinner: 1 },
      { partnerSlug: "chickengg", playerName: "NestBuilder", rank: 6, score: 14800, avatarUrl: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "FR", isWinner: 0 },
      { partnerSlug: "chickengg", playerName: "RoosterKing", rank: 7, score: 13200, avatarUrl: "https://images.unsplash.com/photo-1513152697235-fe74a4e56e80?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "NL", isWinner: 0 },
      { partnerSlug: "chickengg", playerName: "EggHunter", rank: 8, score: 11900, avatarUrl: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "SE", isWinner: 0 },
      { partnerSlug: "chickengg", playerName: "ChickLord", rank: 9, score: 10500, avatarUrl: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "NO", isWinner: 0 },
      { partnerSlug: "chickengg", playerName: "CluckStar", rank: 10, score: 9200, avatarUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64", country: "FI", isWinner: 0 },
    ];

    leaderboardData.forEach(entry => {
      const id = randomUUID();
      const entryWithId: LeaderboardEntry = { ...entry, id };
      this.leaderboardEntries.set(id, entryWithId);
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

  async getLeaderboardEntriesByPartner(partnerSlug: string): Promise<LeaderboardEntry[]> {
    return Array.from(this.leaderboardEntries.values())
      .filter(entry => entry.partnerSlug === partnerSlug)
      .sort((a, b) => a.rank - b.rank);
  }

  async createLeaderboardEntry(insertEntry: InsertLeaderboardEntry): Promise<LeaderboardEntry> {
    const id = randomUUID();
    const entry: LeaderboardEntry = { ...insertEntry, id };
    this.leaderboardEntries.set(id, entry);
    return entry;
  }
}

export const storage = new MemStorage();
