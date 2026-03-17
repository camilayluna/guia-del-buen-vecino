import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { Tramite, InsertTramite } from "@shared/schema";

export function useTramites() {
  return useQuery<Tramite[]>({
    queryKey: [api.tramites.list.path],
    queryFn: async () => {
      const res = await fetch(api.tramites.list.path);
      if (!res.ok) throw new Error("Error al cargar los trámites");
      return res.json();
    },
  });
}

export function useCreateTramite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertTramite) => {
      const res = await fetch(api.tramites.create.path, {
        method: api.tramites.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al crear el trámite");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [api.tramites.list.path] });
    },
  });
}

export function useDeleteTramite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.tramites.delete.path, { id });
      const res = await fetch(url, { method: api.tramites.delete.method });
      if (!res.ok) throw new Error("Error al eliminar el trámite");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [api.tramites.list.path] });
    },
  });
}
