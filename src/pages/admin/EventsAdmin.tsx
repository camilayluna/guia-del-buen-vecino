import { AdminLayout } from "@/components/layout/AdminLayout";
import { useEvents, useCreateEvent, useDeleteEvent } from "@/hooks/use-events";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function EventsAdmin() {
  const { data: events, isLoading } = useEvents();
  const { mutate: createEvent, isPending } = useCreateEvent();
  const { mutate: deleteEvent } = useDeleteEvent();
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        setImageUrl(data.url);
        toast({ title: "Imagen cargada exitosamente" });
      } else {
        toast({ title: "Error al cargar la imagen", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error al cargar la imagen", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    createEvent({
      title: fd.get("title") as string,
      description: fd.get("description") as string,
      eventDate: new Date(fd.get("eventDate") as string),
      location: fd.get("location") as string || undefined,
      imageUrl: imageUrl || (fd.get("imageUrl") as string) || undefined,
    }, {
      onSuccess: () => {
        setOpen(false);
        setImageUrl(undefined);
        toast({ title: "Evento creado exitosamente" });
      }
    });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Gestión de Eventos</h1>
          <p className="text-muted-foreground">Administra la agenda de eventos.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Nuevo Evento</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Evento</DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-bold block mb-1">Título</label>
                <input required name="title" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold block mb-1">Fecha y Hora</label>
                  <input required type="datetime-local" name="eventDate" className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="text-sm font-bold block mb-1">Ubicación</label>
                  <input name="location" className="w-full px-3 py-2 border rounded-md" />
                </div>
              </div>
              <div>
                <label className="text-sm font-bold block mb-1">Imagen</label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="flex-1 px-3 py-2 border rounded-md"
                    />
                    {uploading && <span className="text-xs text-muted-foreground pt-2">Subiendo...</span>}
                  </div>
                  {imageUrl && (
                    <img src={imageUrl} alt="Preview" className="w-full h-32 object-cover rounded-md border" />
                  )}
                  <p className="text-xs text-muted-foreground">O ingresa una URL:</p>
                  <input 
                    name="imageUrl" 
                    className="w-full px-3 py-2 border rounded-md" 
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-bold block mb-1">Descripción</label>
                <textarea required name="description" rows={3} className="w-full px-3 py-2 border rounded-md resize-none" />
              </div>
              <Button type="submit" className="w-full" disabled={isPending || uploading}>
                {isPending ? "Guardando..." : "Guardar Evento"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-muted-foreground font-semibold border-b">
            <tr>
              <th className="p-4">Fecha</th>
              <th className="p-4">Evento</th>
              <th className="p-4">Ubicación</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={4} className="p-4 text-center">Cargando...</td></tr>
            ) : events?.length === 0 ? (
              <tr><td colSpan={4} className="p-4 text-center">No hay eventos</td></tr>
            ) : events?.map(item => (
              <tr key={item.id} className="border-b hover:bg-slate-50">
                <td className="p-4 whitespace-nowrap">{format(new Date(item.eventDate), 'dd/MM/yyyy HH:mm')}</td>
                <td className="p-4 font-medium">{item.title}</td>
                <td className="p-4">{item.location || '-'}</td>
                <td className="p-4">
                  <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 hover:text-red-600" onClick={() => {
                    if (confirm("¿Estás seguro de eliminar este evento?")) deleteEvent(item.id);
                  }}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
