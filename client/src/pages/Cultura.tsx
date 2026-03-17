import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle, Palette, Upload, User, Hash, Phone, Brush } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCreateCulturalRegistration } from "@/hooks/use-cultural-registrations";

const CULTURAL_NICHES = [
  "Artesano",
  "Cantante",
  "Músico",
  "Pintor",
  "Emprendedora",
  "Poeta",
  "Baile",
  "Fotógrafo",
  "Otro",
];

export default function Cultura() {
  const { mutate: createRegistration, isPending } = useCreateCulturalRegistration();
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
        toast({ title: "Imagen cargada correctamente" });
      } else {
        toast({ title: "Error al cargar la imagen", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error al cargar la imagen", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    createRegistration(
      {
        firstName: fd.get("firstName") as string,
        lastName: fd.get("lastName") as string,
        dni: fd.get("dni") as string,
        phone: fd.get("phone") as string,
        culturalNiche: fd.get("culturalNiche") as string,
        description: (fd.get("description") as string) || undefined,
        imageUrl: imageUrl || undefined,
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          setImageUrl(undefined);
        },
      }
    );
  };

  return (
    <PublicLayout>
      {/* Hero Banner */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1400"
          alt="Cultura y Arte"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-purple-800/70 to-purple-900/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl mb-3">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white drop-shadow-lg">
            Registro de Cultura
          </h1>
          <p className="text-white/85 mt-2 text-base md:text-lg max-w-lg">
            Delegación Villa Garibaldi · Parque Sicardi · Ignacio Correas
          </p>
        </div>
      </div>

      {/* Form Area */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {submitted ? (
          /* Success State */
          <div className="text-center py-16">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-20 h-20 text-green-500" />
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              ¡Registro enviado!
            </h2>
            <p className="text-muted-foreground text-lg mb-2">
              Gracias por sumarte al Registro Cultural de la Delegación.
            </p>
            <p className="text-muted-foreground mb-8">
              Nos pondremos en contacto con vos a la brevedad.
            </p>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setSubmitted(false)}
            >
              Registrar otra persona
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                Completá el formulario
              </h2>
              <p className="text-muted-foreground">
                ¿Sos artesano, músico, artista o emprendedor cultural? Registrate
                para que la delegación pueda conocerte y difundir tu trabajo.
              </p>
            </div>

            <form
              onSubmit={onSubmit}
              className="bg-white rounded-2xl shadow-lg border border-border p-6 md:p-8 space-y-5"
            >
              {/* Nombre y Apellido */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold block mb-1 flex items-center gap-1">
                    <User className="w-4 h-4 text-purple-600" /> Nombre
                  </label>
                  <input
                    required
                    name="firstName"
                    placeholder="Tu nombre"
                    className="w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold block mb-1 flex items-center gap-1">
                    <User className="w-4 h-4 text-purple-600" /> Apellido
                  </label>
                  <input
                    required
                    name="lastName"
                    placeholder="Tu apellido"
                    className="w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              {/* DNI y Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold block mb-1 flex items-center gap-1">
                    <Hash className="w-4 h-4 text-purple-600" /> DNI
                  </label>
                  <input
                    required
                    name="dni"
                    placeholder="Número de DNI"
                    className="w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold block mb-1 flex items-center gap-1">
                    <Phone className="w-4 h-4 text-purple-600" /> Teléfono
                  </label>
                  <input
                    required
                    name="phone"
                    placeholder="Ej: 221 1234567"
                    className="w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              {/* Nicho Cultural */}
              <div>
                <label className="text-sm font-bold block mb-1 flex items-center gap-1">
                  <Brush className="w-4 h-4 text-purple-600" /> ¿A qué pertenecés?
                </label>
                <select
                  required
                  name="culturalNiche"
                  className="w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                >
                  <option value="">Seleccionar actividad...</option>
                  {CULTURAL_NICHES.map((niche) => (
                    <option key={niche} value={niche}>
                      {niche}
                    </option>
                  ))}
                </select>
              </div>

              {/* Imagen */}
              <div>
                <label className="text-sm font-bold block mb-1 flex items-center gap-1">
                  <Upload className="w-4 h-4 text-purple-600" /> Imagen de tu trabajo
                </label>
                <div className="space-y-2">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-colors">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="h-full w-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-muted-foreground">
                        <Upload className="w-8 h-8 mb-1 text-purple-400" />
                        <span className="text-sm">
                          {uploading ? "Subiendo imagen..." : "Hacé clic para subir una foto"}
                        </span>
                        <span className="text-xs mt-1">JPG, PNG, GIF (máx. 5MB)</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                  {imageUrl && (
                    <button
                      type="button"
                      onClick={() => setImageUrl(undefined)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Eliminar imagen
                    </button>
                  )}
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label className="text-sm font-bold block mb-1">
                  Contanos sobre tu trabajo{" "}
                  <span className="font-normal text-muted-foreground">(opcional)</span>
                </label>
                <textarea
                  name="description"
                  rows={3}
                  className="w-full px-3 py-2.5 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Describí tu especialidad, dónde trabajás, qué hacés..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 py-3 text-base font-bold"
                disabled={isPending || uploading}
              >
                {isPending ? "Enviando..." : "Enviar Registro"}
              </Button>
            </form>
          </>
        )}
      </div>
    </PublicLayout>
  );
}
