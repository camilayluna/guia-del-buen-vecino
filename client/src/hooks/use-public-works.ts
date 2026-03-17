import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { InsertPublicWork } from "@shared/schema";

export function usePublicWorks() {
  return useQuery({
    queryKey: [api.publicWorks.list.path],
    queryFn: async () => {
      const res = await fetch(api.publicWorks.list.path);
      if (!res.ok) throw new Error("Failed to fetch public works");
      return api.publicWorks.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreatePublicWork() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertPublicWork) => {
      const res = await fetch(api.publicWorks.create.path, {
        method: api.publicWorks.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create public work");
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [api.publicWorks.list.path] }),
  });
}

export function useUpdatePublicWorkStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: 'Finalizada' | 'En ejecución' | 'En obra' }) => {
      const url = buildUrl(api.publicWorks.updateStatus.path, { id });
      const res = await fetch(url, {
        method: api.publicWorks.updateStatus.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [api.publicWorks.list.path] }),
  });
}

export function useDeletePublicWork() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.publicWorks.delete.path, { id });
      const res = await fetch(url, { method: api.publicWorks.delete.method });
      if (!res.ok) throw new Error("Failed to delete public work");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [api.publicWorks.list.path] }),
  });
}
