import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { InsertComplaint } from "@shared/schema";

export function useComplaints() {
  return useQuery({
    queryKey: [api.complaints.list.path],
    queryFn: async () => {
      const res = await fetch(api.complaints.list.path);
      if (!res.ok) throw new Error("Failed to fetch complaints");
      return api.complaints.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateComplaint() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertComplaint) => {
      const res = await fetch(api.complaints.create.path, {
        method: api.complaints.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create complaint");
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [api.complaints.list.path] }),
  });
}

export function useUpdateComplaintStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const url = buildUrl(api.complaints.updateStatus.path, { id });
      const res = await fetch(url, {
        method: api.complaints.updateStatus.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [api.complaints.list.path] }),
  });
}
