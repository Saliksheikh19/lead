import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const partners = pgTable("partners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  logoUrl: text("logo_url").notNull(),
  winners: integer("winners").notNull(),
  prizePool: text("prize_pool").notNull(),
  currencyType: text("currency_type").notNull().default("USD"), // USD, GEMS, COINS
  currencyIcon: text("currency_icon"), // for custom currencies
  activeUsers: integer("active_users").notNull(),
  gradientFrom: text("gradient_from").notNull(),
  gradientTo: text("gradient_to").notNull(),
  hoverColor: text("hover_color").notNull(),
});

export const bonuses = pgTable("bonuses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  logoUrl: text("logo_url").notNull(),
  bonusType: text("bonus_type").notNull(), // "Cashback / Lossback", "5% Deposit Bonus", etc.
  promoCode: text("promo_code").notNull(),
  claimUrl: text("claim_url").notNull(),
  isFeatured: integer("is_featured").notNull().default(0), // 0 = false, 1 = true
  gradientFrom: text("gradient_from").notNull(),
  gradientTo: text("gradient_to").notNull(),
});

export const insertPartnerSchema = createInsertSchema(partners).omit({
  id: true,
});

export const insertBonusSchema = createInsertSchema(bonuses).omit({
  id: true,
});

export type InsertPartner = z.infer<typeof insertPartnerSchema>;
export type Partner = typeof partners.$inferSelect;
export type InsertBonus = z.infer<typeof insertBonusSchema>;
export type Bonus = typeof bonuses.$inferSelect;
