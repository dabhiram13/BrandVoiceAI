import { 
  type User, 
  type InsertUser, 
  type Transformation, 
  type InsertTransformation,
  type Analytics,
  type InsertAnalytics,
  type BrandVoice,
  type ContentType,
  users,
  transformations,
  analytics
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Transformation methods
  async createTransformation(insertTransformation: InsertTransformation): Promise<Transformation> {
    const [transformation] = await db
      .insert(transformations)
      .values(insertTransformation)
      .returning();
    return transformation;
  }

  async getTransformations(limit: number = 50): Promise<Transformation[]> {
    return db
      .select()
      .from(transformations)
      .orderBy(desc(transformations.id))
      .limit(limit);
  }

  // Analytics methods
  async incrementAnalytics(brandVoice: BrandVoice, contentType: ContentType): Promise<Analytics> {
    // Try to find existing analytics
    const existing = await db
      .select()
      .from(analytics)
      .where(
        sql`${analytics.brandVoice} = ${brandVoice} AND ${analytics.contentType} = ${contentType}`
      );
    
    // Get the first result if any
    const existingRecord = existing.length > 0 ? existing[0] : null;
    
    if (existingRecord) {
      // Update count if exists
      const [updated] = await db
        .update(analytics)
        .set({ count: existingRecord.count + 1 })
        .where(eq(analytics.id, existingRecord.id))
        .returning();
      return updated;
    } else {
      // Insert new if doesn't exist
      const [newAnalytics] = await db
        .insert(analytics)
        .values({
          brandVoice,
          contentType,
          count: 1
        })
        .returning();
      return newAnalytics;
    }
  }

  async getAnalytics(): Promise<Analytics[]> {
    return db.select().from(analytics);
  }

  async getPopularBrandVoices(limit: number = 4): Promise<{brandVoice: BrandVoice, count: number}[]> {
    const results = await db.select({
      brandVoice: analytics.brandVoice,
      count: sql<number>`sum(${analytics.count})::int`
    })
    .from(analytics)
    .groupBy(analytics.brandVoice)
    .orderBy(sql`sum(${analytics.count})`)
    .limit(limit);
    
    return results.map(row => ({
      brandVoice: row.brandVoice,
      count: row.count
    }));
  }

  async getPopularContentTypes(limit: number = 4): Promise<{contentType: ContentType, count: number}[]> {
    const results = await db.select({
      contentType: analytics.contentType,
      count: sql<number>`sum(${analytics.count})::int`
    })
    .from(analytics)
    .groupBy(analytics.contentType)
    .orderBy(sql`sum(${analytics.count})`)
    .limit(limit);
    
    return results.map(row => ({
      contentType: row.contentType,
      count: row.count
    }));
  }
}