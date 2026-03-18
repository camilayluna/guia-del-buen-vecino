import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "../shared/routes";
import { z } from "zod";
import { upload } from "./upload";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // File Upload
  app.post("/api/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(201).json({ url: fileUrl, filename: req.file.filename });
  });

  // News
  app.get(api.news.list.path, async (req, res) => {
    const items = await storage.getNews();
    res.json(items);
  });

  app.post(api.news.create.path, async (req, res) => {
    try {
      const input = api.news.create.input.parse(req.body);
      // coerce date
      const coercedInput = { ...input, date: input.date ? new Date(input.date) : undefined };
      const item = await storage.createNews(coercedInput);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join('.') });
      }
      throw err;
    }
  });

  app.delete(api.news.delete.path, async (req, res) => {
    await storage.deleteNews(Number(req.params.id));
    res.status(204).end();
  });

  // Public Works
  app.get(api.publicWorks.list.path, async (req, res) => {
    const items = await storage.getPublicWorks();
    res.json(items);
  });

  app.post(api.publicWorks.create.path, async (req, res) => {
    try {
      const input = api.publicWorks.create.input.parse(req.body);
      const item = await storage.createPublicWork(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join('.') });
      }
      throw err;
    }
  });

  app.patch(api.publicWorks.updateStatus.path, async (req, res) => {
    try {
      const { status } = api.publicWorks.updateStatus.input.parse(req.body);
      const item = await storage.updatePublicWorkStatus(Number(req.params.id), status);
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.delete(api.publicWorks.delete.path, async (req, res) => {
    await storage.deletePublicWork(Number(req.params.id));
    res.status(204).end();
  });

  // Events
  app.get(api.events.list.path, async (req, res) => {
    const items = await storage.getEvents();
    res.json(items);
  });

  app.post(api.events.create.path, async (req, res) => {
    try {
      const input = api.events.create.input.parse(req.body);
      const coercedInput = { ...input, eventDate: new Date(input.eventDate) };
      const item = await storage.createEvent(coercedInput);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join('.') });
      }
      throw err;
    }
  });

  app.delete(api.events.delete.path, async (req, res) => {
    await storage.deleteEvent(Number(req.params.id));
    res.status(204).end();
  });

  // Complaints
  app.get(api.complaints.list.path, async (req, res) => {
    const items = await storage.getComplaints();
    res.json(items);
  });

  app.post(api.complaints.create.path, async (req, res) => {
    try {
      const input = api.complaints.create.input.parse(req.body);
      const item = await storage.createComplaint(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join('.') });
      }
      throw err;
    }
  });

  app.patch(api.complaints.updateStatus.path, async (req, res) => {
    try {
      const { status } = api.complaints.updateStatus.input.parse(req.body);
      const item = await storage.updateComplaintStatus(Number(req.params.id), status);
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // Tramites
  app.get(api.tramites.list.path, async (req, res) => {
    const items = await storage.getTramites();
    res.json(items);
  });

  app.post(api.tramites.create.path, async (req, res) => {
    try {
      const input = api.tramites.create.input.parse(req.body);
      const item = await storage.createTramite(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join('.') });
      }
      throw err;
    }
  });

  app.delete(api.tramites.delete.path, async (req, res) => {
    await storage.deleteTramite(Number(req.params.id));
    res.status(204).end();
  });

  // Cultural Registrations
  app.get(api.culturalRegistrations.list.path, async (req, res) => {
    const items = await storage.getCulturalRegistrations();
    res.json(items);
  });

  app.post(api.culturalRegistrations.create.path, async (req, res) => {
    try {
      const input = api.culturalRegistrations.create.input.parse(req.body);
      const item = await storage.createCulturalRegistration(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join('.') });
      }
      throw err;
    }
  });

  app.delete(api.culturalRegistrations.delete.path, async (req, res) => {
    await storage.deleteCulturalRegistration(Number(req.params.id));
    res.status(204).end();
  });

  // Seed DB with mock data if needed
  //await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingNews = await storage.getNews();
  if (existingNews.length === 0) {
    await storage.createNews({
      title: "Nuevo Centro de Atención",
      content: "Se inauguró el nuevo centro de atención al vecino para agilizar los trámites.",
      imageUrl: "https://images.unsplash.com/photo-1554232456-8727aae0cfa4?auto=format&fit=crop&q=80",
    });
    await storage.createNews({
      title: "Programa de Castraciones",
      content: "Continúa el programa gratuito de castraciones en la delegación.",
      imageUrl: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80",
    });
  }

  const existingWorks = await storage.getPublicWorks();
  if (existingWorks.length === 0) {
    await storage.createPublicWork({
      title: "Obra Hidráulica Calle 18",
      description: "Mejoras en el sistema de drenaje para evitar inundaciones.",
      status: "Finalizada",
      imageUrl: "https://images.unsplash.com/photo-1541888081622-4a0b271d431c?auto=format&fit=crop&q=80",
      location: "Calle 18 y 659",
    });
    await storage.createPublicWork({
      title: "Pavimentación Calle 30",
      description: "Asfalto nuevo y cordón cuneta.",
      status: "En ejecución",
      imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80",
      location: "Calle 30 de 650 a 659",
    });
    await storage.createPublicWork({
      title: "Mejorado Calle 22",
      description: "Nivelación y colocación de calcáreo.",
      status: "En obra",
      imageUrl: "https://images.unsplash.com/photo-1506045412240-22980140a405?auto=format&fit=crop&q=80",
      location: "Calle 22",
    });
  }

  const existingEvents = await storage.getEvents();
  if (existingEvents.length === 0) {
    await storage.createEvent({
      title: "Feria de Emprendedores",
      description: "Feria mensual de artesanos y emprendedores locales.",
      eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
      imageUrl: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80",
      location: "Plaza principal",
    });
  }
}

