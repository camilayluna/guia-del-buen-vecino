import { AdminLayout } from "@/components/layout/AdminLayout";
import { useTramites, useCreateTramite, useDeleteTramite } from "@/hooks/use-tramites";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Plus, Eye } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Tramite } from "@shared/schema";

const CATEGORIES = ["Tránsito", "Comercio", "Impuestos", "Servicios", "Salud", "Obras", "Social", "Otro"];

function PreviewModal({ tramite, onClose }: { tramite: Tramite; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b">
          <p className="text-xs text-primary font-bold uppercase">{tramite.category}</p>
          <h2 className="text-xl font-bold mt-1">{tramite.title}</h2>
          <p className="text-muted-foreground text-sm mt-1">{tramite.description}</p>
        </div>
        <div className="p-6">
          <h3 className="font-bold mb-3">Requisitos:</h3>
          <pre className="text-sm whitespace-pre-wrap text-foreground bg-muted p-4 rounded-lg">{tramite.requirements}</pre>
        </div>
        <div className="p-4 border-t">
          <Button className="w-full" onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    </div>
  );
}

export default function TramitesAdmin() {
  const { data: tramites, isLoading } = useTramites();
  const { mutate: createTramite, isPending } = useCreateTramite();
  const { mutate: deleteTramite } = useDeleteTramite();
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<Tramite | null>(null);
  const { toast } = useToast();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    createTramite(
      {
        title: fd.get("title") as string,
        category: fd.get("category") as string,
        description: fd.get("description") as string,
        requirements: fd.get("requirements") as string,
      },
      {
        onSuccess: () => {
          setOpen(false);
          (e.target as HTMLFormElement).reset();
          toast({ title: "Trámite creado exitosamente" });
        },
      }
    );
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Trámites y Servicios</h1>
          <p className="text-muted-foreground">Administrá los trámites que se muestran al público.</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> Nuevo Trámite
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Trámite o Servicio</DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-bold block mb-1">Nombre del Trámite</label>
                <input
                  required
                  name="title"
                  placeholder="Ej: Renovación de Licencia de Conducir"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-bold block mb-1">Categoría</label>
                <select required name="category" className="w-full px-3 py-2 border rounded-md">
                  <option value="">Seleccionar...</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-bold block mb-1">Descripción corta</label>
                <input
                  required
                  name="description"
                  placeholder="Ej: Requisitos y turnos para renovación."
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-bold block mb-1">Requisitos detallados</label>
                <p className="text-xs text-muted-foreground mb-1">Escribí uno por línea. Aparecerán numerados en el modal.</p>
                <textarea
                  required
                  name="requirements"
                  rows={8}
                  placeholder="DNI original y fotocopia&#10;Libreta de conducir vencida&#10;Constancia de pago de la tasa&#10;Certificado médico&#10;2 fotos 4x4"
                  className="w-full px-3 py-2 border rounded-md resize-none font-mono text-sm"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Guardando..." : "Guardar Trámite"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-muted-foreground font-semibold border-b">
            <tr>
              <th className="p-4">Trámite</th>
              <th className="p-4">Categoría</th>
              <th className="p-4">Descripción</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="p-4 text-center">Cargando...</td>
              </tr>
            ) : tramites?.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-muted-foreground">
                  No hay trámites. Hacé clic en "Nuevo Trámite" para agregar uno.
                </td>
              </tr>
            ) : (
              tramites?.map((item) => (
                <tr key={item.id} className="border-b hover:bg-slate-50">
                  <td className="p-4 font-medium">{item.title}</td>
                  <td className="p-4">
                    <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground text-sm max-w-xs truncate">
                    {item.description}
                  </td>
                  <td className="p-4 flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-500 hover:bg-blue-50"
                      title="Vista previa"
                      onClick={() => setPreview(item)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => {
                        if (confirm("¿Estás seguro de eliminar este trámite?"))
                          deleteTramite(item.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {preview && <PreviewModal tramite={preview} onClose={() => setPreview(null)} />}
    </AdminLayout>
  );
}
