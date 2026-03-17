import { z } from 'zod';
import { 
  insertNewsSchema, news,
  insertPublicWorkSchema, publicWorks,
  insertEventSchema, events,
  insertComplaintSchema, complaints,
  insertTramiteSchema, tramites,
  insertCulturalRegistrationSchema, culturalRegistrations
} from './schema';

export const errorSchemas = {
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  news: {
    list: {
      method: 'GET' as const,
      path: '/api/news' as const,
      responses: { 200: z.array(z.custom<typeof news.$inferSelect>()) },
    },
    create: {
      method: 'POST' as const,
      path: '/api/news' as const,
      input: insertNewsSchema,
      responses: { 201: z.custom<typeof news.$inferSelect>(), 400: errorSchemas.validation },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/news/:id' as const,
      responses: { 204: z.void(), 404: errorSchemas.notFound },
    }
  },
  publicWorks: {
    list: {
      method: 'GET' as const,
      path: '/api/public-works' as const,
      responses: { 200: z.array(z.custom<typeof publicWorks.$inferSelect>()) },
    },
    create: {
      method: 'POST' as const,
      path: '/api/public-works' as const,
      input: insertPublicWorkSchema,
      responses: { 201: z.custom<typeof publicWorks.$inferSelect>(), 400: errorSchemas.validation },
    },
    updateStatus: {
      method: 'PATCH' as const,
      path: '/api/public-works/:id/status' as const,
      input: z.object({ status: z.enum(['Finalizada', 'En ejecución', 'En obra']) }),
      responses: { 200: z.custom<typeof publicWorks.$inferSelect>(), 404: errorSchemas.notFound },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/public-works/:id' as const,
      responses: { 204: z.void(), 404: errorSchemas.notFound },
    }
  },
  events: {
    list: {
      method: 'GET' as const,
      path: '/api/events' as const,
      responses: { 200: z.array(z.custom<typeof events.$inferSelect>()) },
    },
    create: {
      method: 'POST' as const,
      path: '/api/events' as const,
      input: insertEventSchema,
      responses: { 201: z.custom<typeof events.$inferSelect>(), 400: errorSchemas.validation },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/events/:id' as const,
      responses: { 204: z.void(), 404: errorSchemas.notFound },
    }
  },
  complaints: {
    list: {
      method: 'GET' as const,
      path: '/api/complaints' as const,
      responses: { 200: z.array(z.custom<typeof complaints.$inferSelect>()) },
    },
    create: {
      method: 'POST' as const,
      path: '/api/complaints' as const,
      input: insertComplaintSchema,
      responses: { 201: z.custom<typeof complaints.$inferSelect>(), 400: errorSchemas.validation },
    },
    updateStatus: {
      method: 'PATCH' as const,
      path: '/api/complaints/:id/status' as const,
      input: z.object({ status: z.string() }),
      responses: { 200: z.custom<typeof complaints.$inferSelect>(), 404: errorSchemas.notFound },
    }
  },
  tramites: {
    list: {
      method: 'GET' as const,
      path: '/api/tramites' as const,
      responses: { 200: z.array(z.custom<typeof tramites.$inferSelect>()) },
    },
    create: {
      method: 'POST' as const,
      path: '/api/tramites' as const,
      input: insertTramiteSchema,
      responses: { 201: z.custom<typeof tramites.$inferSelect>(), 400: errorSchemas.validation },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/tramites/:id' as const,
      responses: { 204: z.void(), 404: errorSchemas.notFound },
    }
  },
  culturalRegistrations: {
    list: {
      method: 'GET' as const,
      path: '/api/cultural-registrations' as const,
      responses: { 200: z.array(z.custom<typeof culturalRegistrations.$inferSelect>()) },
    },
    create: {
      method: 'POST' as const,
      path: '/api/cultural-registrations' as const,
      input: insertCulturalRegistrationSchema,
      responses: { 201: z.custom<typeof culturalRegistrations.$inferSelect>(), 400: errorSchemas.validation },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/cultural-registrations/:id' as const,
      responses: { 204: z.void(), 404: errorSchemas.notFound },
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
