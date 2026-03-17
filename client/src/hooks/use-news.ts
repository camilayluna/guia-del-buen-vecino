import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { InsertNews, News } from "@shared/schema";
import { z } from "zod";

export function useNews() {
  return useQuery({
    queryKey: [api.news.list.path],
    queryFn: async () => {
      const res = await fetch(api.news.list.path, { credentials: "omit" });
      if (!res.ok) throw new Error("Failed to fetch news");
      const data = await res.json();
      return api.news.list.responses[200].parse(data);
    },
  });
}

export function useCreateNews() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertNews) => {
      const res = await fetch(api.news.create.path, {
        method: api.news.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        if (res.status === 400) throw new Error("Validation Error");
        throw new Error("Failed to create news");
      }
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [api.news.list.path] });
    },
  });
}

export function useDeleteNews() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.news.delete.path, { id });
      const res = await fetch(url, { method: api.news.delete.method });
      if (!res.ok) throw new Error("Failed to delete news");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [api.news.list.path] });
    },
  });
}
