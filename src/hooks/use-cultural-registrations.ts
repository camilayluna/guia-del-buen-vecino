import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { CulturalRegistration, InsertCulturalRegistration } from "@shared/schema";

export function useCulturalRegistrations() {
  return useQuery({
    queryKey: [api.culturalRegistrations.list.path],
    queryFn: async () => {
      const res = await fetch(api.culturalRegistrations.list.path, { credentials: "omit" });
      if (!res.ok) throw new Error("Failed to fetch cultural registrations");
      const data = await res.json();
      return api.culturalRegistrations.list.responses[200].parse(data);
    },
  });
}

export function useCreateCulturalRegistration() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertCulturalRegistration) => {
      const res = await fetch(api.culturalRegistrations.create.path, {
        method: api.culturalRegistrations.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create cultural registration");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [api.culturalRegistrations.list.path] });
    },
  });
}

export function useDeleteCulturalRegistration() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.culturalRegistrations.delete.path, { id });
      const res = await fetch(url, { method: api.culturalRegistrations.delete.method });
      if (!res.ok) throw new Error("Failed to delete cultural registration");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [api.culturalRegistrations.list.path] });
    },
  });
}
