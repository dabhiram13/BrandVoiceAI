import { 
  type User, 
  type InsertUser, 
  type Transformation, 
  type InsertTransformation,
  type Analytics,
  type InsertAnalytics,
  type BrandVoice,
  type ContentType
} from "@shared/schema";

// Enhanced storage interface with CRUD methods for all entities
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Transformation methods
  createTransformation(transformation: InsertTransformation): Promise<Transformation>;
  getTransformations(limit?: number): Promise<Transformation[]>;
  
  // Analytics methods
  incrementAnalytics(brandVoice: BrandVoice, contentType: ContentType): Promise<Analytics>;
  getAnalytics(): Promise<Analytics[]>;
  getPopularBrandVoices(limit?: number): Promise<{brandVoice: BrandVoice, count: number}[]>;
  getPopularContentTypes(limit?: number): Promise<{contentType: ContentType, count: number}[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private transformations: Map<number, Transformation>;
  private analyticsMap: Map<string, Analytics>;
  currentUserId: number;
  currentTransformationId: number;
  currentAnalyticsId: number;

  constructor() {
    this.users = new Map();
    this.transformations = new Map();
    this.analyticsMap = new Map();
    this.currentUserId = 1;
    this.currentTransformationId = 1;
    this.currentAnalyticsId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Transformation methods
  async createTransformation(insertTransformation: InsertTransformation): Promise<Transformation> {
    const id = this.currentTransformationId++;
    const transformation: Transformation = { 
      ...insertTransformation, 
      id 
    };
    this.transformations.set(id, transformation);
    return transformation;
  }

  async getTransformations(limit: number = 50): Promise<Transformation[]> {
    const transformations = Array.from(this.transformations.values());
    return transformations.slice(0, limit);
  }

  // Analytics methods
  async incrementAnalytics(brandVoice: BrandVoice, contentType: ContentType): Promise<Analytics> {
    const key = `${brandVoice}:${contentType}`;
    const existing = this.analyticsMap.get(key);

    if (existing) {
      const updated: Analytics = {
        ...existing,
        count: existing.count + 1
      };
      this.analyticsMap.set(key, updated);
      return updated;
    } else {
      const newAnalytics: Analytics = {
        id: this.currentAnalyticsId++,
        brandVoice,
        contentType,
        count: 1
      };
      this.analyticsMap.set(key, newAnalytics);
      return newAnalytics;
    }
  }

  async getAnalytics(): Promise<Analytics[]> {
    return Array.from(this.analyticsMap.values());
  }

  async getPopularBrandVoices(limit: number = 4): Promise<{brandVoice: BrandVoice, count: number}[]> {
    const analytics = await this.getAnalytics();
    
    // Group by brand voice and sum counts
    const brandCounts = new Map<BrandVoice, number>();
    
    for (const entry of analytics) {
      const currentCount = brandCounts.get(entry.brandVoice as BrandVoice) || 0;
      brandCounts.set(entry.brandVoice as BrandVoice, currentCount + entry.count);
    }
    
    // Convert to array and sort by count
    const result = Array.from(brandCounts.entries()).map(([brandVoice, count]) => ({
      brandVoice,
      count
    }));
    
    result.sort((a, b) => b.count - a.count);
    return result.slice(0, limit);
  }

  async getPopularContentTypes(limit: number = 4): Promise<{contentType: ContentType, count: number}[]> {
    const analytics = await this.getAnalytics();
    
    // Group by content type and sum counts
    const contentTypeCounts = new Map<ContentType, number>();
    
    for (const entry of analytics) {
      const currentCount = contentTypeCounts.get(entry.contentType as ContentType) || 0;
      contentTypeCounts.set(entry.contentType as ContentType, currentCount + entry.count);
    }
    
    // Convert to array and sort by count
    const result = Array.from(contentTypeCounts.entries()).map(([contentType, count]) => ({
      contentType,
      count
    }));
    
    result.sort((a, b) => b.count - a.count);
    return result.slice(0, limit);
  }
}

// Import the DatabaseStorage implementation
import { DatabaseStorage } from "./database-storage";

// Use DatabaseStorage instead of MemStorage
export const storage = new DatabaseStorage();
