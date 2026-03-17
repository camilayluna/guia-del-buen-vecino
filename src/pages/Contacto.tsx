import { PublicLayout } from "@/components/layout/PublicLayout";
import { useCreateComplaint } from "@/hooks/use-complaints";
import { MessageSquare, MapPin, Phone, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export default function Contacto() {
  const { mutate: createComplaint, isPending } = useCreateComplaint();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      subject: fd.get("subject") as string,
      description: fd.get("description") as string,
    };

    createComplaint(data, {
      onSuccess: () => {
        toast({
          title: "Reclamo enviado",
          description: "Hemos recibido tu mensaje correctamente.",
          variant: "default",
        });
        (e.target as HTMLFormElement).reset();
      },
      onError: () => {
        toast({
          title: "Error",
          description: "No se pudo enviar el reclamo. Intenta nuevamente.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <PublicLayout>
      <div className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <MessageSquare className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-display font-bold drop-shadow-md">
            Reclamos y Consultas
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Tu opinión es importante para mejorar nuestro barrio. Envíanos tu
            inquietud.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-border">
            <h3 className="font-display font-bold text-2xl mb-6 text-foreground">
              Información de Contacto
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Dirección</h4>
                  <p className="text-muted-foreground">
                    Calle 659 e/ 12 y 13, Parque Sicardi
                    <br />
                    La Plata, Buenos Aires
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Teléfonos</h4>
                  <p className="text-muted-foreground">
                    2215777810
                    <br />
                    4416910
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">
                    Correo Electrónico
                  </h4>
                  <p className="text-muted-foreground">.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-border">
            <h3 className="font-display font-bold text-2xl mb-6 text-foreground">
              Ingresar un Reclamo o Sugerencia
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Nombre completo *
                  </label>
                  <input
                    required
                    name="name"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Juan Pérez"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Teléfono
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="2215777810"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Email *
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="juan@ejemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Asunto / Motivo *
                  </label>
                  <select
                    required
                    name="subject"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Luminaria">Alumbrado público</option>
                    <option value="Baches">Baches / Calles</option>
                    <option value="Basura">Recolección de basura</option>
                    <option value="Poda">Poda / Arbolado</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Descripción detallada *
                </label>
                <textarea
                  required
                  name="description"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                  placeholder="Describe el problema, indicando ubicación exacta (calle e intersecciones)..."
                ></textarea>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full py-6 text-lg font-bold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/30 rounded-xl"
              >
                {isPending ? (
                  "Enviando..."
                ) : (
                  <span className="flex items-center gap-2">
                    Enviar Mensaje <Send className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
