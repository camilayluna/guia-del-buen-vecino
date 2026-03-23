import { db, pool } from "./db";
import {
  news, publicWorks, events, complaints, tramites, culturalRegistrations,
  type News, type PublicWork, type Event, type Complaint, type Tramite, type CulturalRegistration,
  type InsertNews, type InsertPublicWork, type InsertEvent, type InsertComplaint, type InsertTramite, type InsertCulturalRegistration
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getNews(): Promise<News[]>;
  createNews(item: InsertNews): Promise<News>;
  deleteNews(id: number): Promise<void>;

  getPublicWorks(): Promise<PublicWork[]>;
  createPublicWork(item: InsertPublicWork): Promise<PublicWork>;
  updatePublicWorkStatus(id: number, status: string): Promise<PublicWork | undefined>;
  deletePublicWork(id: number): Promise<void>;

  getEvents(): Promise<Event[]>;
  createEvent(item: InsertEvent): Promise<Event>;
  deleteEvent(id: number): Promise<void>;

  getComplaints(): Promise<Complaint[]>;
  createComplaint(item: InsertComplaint): Promise<Complaint>;
  updateComplaintStatus(id: number, status: string): Promise<Complaint | undefined>;

  getTramites(): Promise<Tramite[]>;
  createTramite(item: InsertTramite): Promise<Tramite>;
  deleteTramite(id: number): Promise<void>;

  getCulturalRegistrations(): Promise<CulturalRegistration[]>;
  createCulturalRegistration(item: InsertCulturalRegistration): Promise<CulturalRegistration>;
  deleteCulturalRegistration(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getNews(): Promise<News[]> {
    return await db.select().from(news);
  }

  async createNews(item: InsertNews): Promise<News> {
    const [row] = await db.insert(news).values(item).returning();
    return row;
  }

  async deleteNews(id: number): Promise<void> {
    await db.delete(news).where(eq(news.id, id));
  }

  async getPublicWorks(): Promise<PublicWork[]> {
    return await db.select().from(publicWorks);
  }

  async createPublicWork(item: InsertPublicWork): Promise<PublicWork> {
    const [row] = await db.insert(publicWorks).values(item).returning();
    return row;
  }

  async updatePublicWorkStatus(id: number, status: string): Promise<PublicWork | undefined> {
    const [row] = await db.update(publicWorks).set({ status }).where(eq(publicWorks.id, id)).returning();
    return row;
  }

  async deletePublicWork(id: number): Promise<void> {
    await db.delete(publicWorks).where(eq(publicWorks.id, id));
  }

  async getEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }

  async createEvent(item: InsertEvent): Promise<Event> {
    const [row] = await db.insert(events).values(item).returning();
    return row;
  }

  async deleteEvent(id: number): Promise<void> {
    await db.delete(events).where(eq(events.id, id));
  }

  async getComplaints(): Promise<Complaint[]> {
    return await db.select().from(complaints);
  }

  async createComplaint(item: InsertComplaint): Promise<Complaint> {
    const [row] = await db.insert(complaints).values(item).returning();
    return row;
  }

  async updateComplaintStatus(id: number, status: string): Promise<Complaint | undefined> {
    const [row] = await db.update(complaints).set({ status }).where(eq(complaints.id, id)).returning();
    return row;
  }

  async getTramites(): Promise<Tramite[]> {
    return await db.select().from(tramites);
  }

  async createTramite(item: InsertTramite): Promise<Tramite> {
    const [row] = await db.insert(tramites).values(item).returning();
    return row;
  }

  async deleteTramite(id: number): Promise<void> {
    await db.delete(tramites).where(eq(tramites.id, id));
  }

  async getCulturalRegistrations(): Promise<CulturalRegistration[]> {
    return await db.select().from(culturalRegistrations);
  }

  async createCulturalRegistration(item: InsertCulturalRegistration): Promise<CulturalRegistration> {
    try {
      const [row] = await db.insert(culturalRegistrations).values(item).returning();
      return row;
    } catch (error: any) {

      // 👇 si la tabla no existe, la creamos
      if (error.message.includes("does not exist")) {
        await pool.query(`
          CREATE TABLE IF NOT EXISTS cultural_registrations (
            id SERIAL PRIMARY KEY,
            name TEXT,
            email TEXT,
            phone TEXT,
            activity TEXT
          );
        `);

        // 👇 reintenta guardar
        const [row] = await db.insert(culturalRegistrations).values(item).returning();
        return row;
      }

      throw error;
    }
  }

  async deleteCulturalRegistration(id: number): Promise<void> {
    await db.delete(culturalRegistrations).where(eq(culturalRegistrations.id, id));
  }
}

export const storage = new DatabaseStorage();
