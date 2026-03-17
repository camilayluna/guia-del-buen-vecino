import { pgTable, text, serial, timestamp, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  date: timestamp("date").defaultNow().notNull(),
});

export const publicWorks = pgTable("public_works", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  status: varchar("status", { length: 50 }).notNull(), // 'Finalizada', 'En ejecución', 'En obra'
  location: text("location"),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  eventDate: timestamp("event_date").notNull(),
  location: text("location"),
});

export const complaints = pgTable("complaints", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  status: varchar("status", { length: 50 }).default("Pendiente").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tramites = pgTable("tramites", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  imageUrl: text("image_url"),
});

export const culturalRegistrations = pgTable("cultural_registrations", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dni: text("dni").notNull(),
  phone: text("phone").notNull(),
  culturalNiche: varchar("cultural_niche", { length: 100 }).notNull(), // 'Artesano', 'Cantante', 'Músico', 'Pintor', etc
  description: text("description"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Schemas
export const insertNewsSchema = createInsertSchema(news).omit({ id: true });
export const insertPublicWorkSchema = createInsertSchema(publicWorks).omit({ id: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true });
export const insertComplaintSchema = createInsertSchema(complaints).omit({ id: true, createdAt: true, status: true });
export const insertTramiteSchema = createInsertSchema(tramites).omit({ id: true });
export const insertCulturalRegistrationSchema = createInsertSchema(culturalRegistrations).omit({ id: true, createdAt: true });

// Types
export type News = typeof news.$inferSelect;
export type PublicWork = typeof publicWorks.$inferSelect;
export type Event = typeof events.$inferSelect;
export type Complaint = typeof complaints.$inferSelect;
export type Tramite = typeof tramites.$inferSelect;
export type CulturalRegistration = typeof culturalRegistrations.$inferSelect;

export type InsertNews = z.infer<typeof insertNewsSchema>;
export type InsertPublicWork = z.infer<typeof insertPublicWorkSchema>;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type InsertComplaint = z.infer<typeof insertComplaintSchema>;
export type InsertTramite = z.infer<typeof insertTramiteSchema>;
export type InsertCulturalRegistration = z.infer<typeof insertCulturalRegistrationSchema>;
