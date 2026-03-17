import { PublicLayout } from "@/components/layout/PublicLayout";
import {
  FileText,
  ArrowRight,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTramites } from "@/hooks/use-tramites";
import type { Tramite } from "@shared/schema";

const CATEGORY_COLORS: Record<string, string> = {
  Tránsito: "bg-blue-100 text-blue-700",
  Comercio: "bg-orange-100 text-orange-700",
  Impuestos: "bg-red-100 text-red-700",
  Servicios: "bg-green-100 text-green-700",
  Salud: "bg-pink-100 text-pink-700",
  Obras: "bg-yellow-100 text-yellow-700",
  Social: "bg-purple-100 text-purple-700",
};

function RequirementsModal({
  tramite,
  onClose,
}: {
  tramite: Tramite;
  onClose: () => void;
}) {
  const lines = tramite.requirements.split("\n").filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b">
          <div>
            <span
              className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                CATEGORY_COLORS[tramite.category] ?? "bg-gray-100 text-gray-700"
              }`}
            >
              {tramite.category}
            </span>
            <h2 className="mt-2 text-xl font-display font-bold text-foreground leading-snug">
              {tramite.title}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              {tramite.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 rounded-full hover:bg-muted transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Requirements list */}
        <div className="p-6 overflow-y-auto flex-1">
          <h3 className="font-bold text-base mb-4 flex items-center gap-2 text-foreground">
            <CheckCircle className="w-5 h-5 text-primary" />
            Requisitos y documentación necesaria
          </h3>
          <ul className="space-y-3">
            {lines.map((line, i) => {
              const clean = line.replace(/^[-•*]\s*/, "").trim();
              if (!clean) return null;
              return (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground">{clean}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              Para más información, acercate a la Delegación en{" "}
              <strong>Calle 659 e/ 12 y 13</strong>, de lunes a viernes de 8 a
              14 hs.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <Button onClick={onClose} className="w-full">
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Tramites() {
  const { data: tramites, isLoading } = useTramites();
  const [selected, setSelected] = useState<Tramite | null>(null);

  const SKELETON = Array.from({ length: 6 });

  return (
    <PublicLayout>
      {/* Page header */}
      <div className="bg-primary/5 py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Trámites y Servicios
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Información y requisitos para gestionar tus trámites municipales de
            forma rápida y sencilla en la Delegación.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          SKELETON.map((_, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-sm border border-border animate-pulse"
            >
              <div className="h-4 w-20 bg-muted rounded mb-3" />
              <div className="h-6 w-3/4 bg-muted rounded mb-2" />
              <div className="h-4 w-full bg-muted rounded mb-1" />
              <div className="h-4 w-2/3 bg-muted rounded mb-6" />
              <div className="h-10 bg-muted rounded" />
            </div>
          ))
        ) : tramites && tramites.length > 0 ? (
          tramites.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-all group flex flex-col"
            >
              <span
                className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full self-start mb-3 ${
                  CATEGORY_COLORS[t.category] ?? "bg-gray-100 text-gray-700"
                }`}
              >
                {t.category}
              </span>
              <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                {t.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-6 flex-1">
                {t.description}
              </p>
              <Button
                variant="outline"
                className="w-full justify-between group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                onClick={() => setSelected(t)}
              >
                Ver Requisitos <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-20 text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">No hay trámites cargados aún.</p>
            <p className="text-sm mt-1">
              El administrador puede agregar trámites desde el panel.
            </p>
          </div>
        )}
      </div>

      {/* Info box */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
          <h3 className="font-display font-bold text-2xl text-blue-900 mb-4">
            ¿Necesitás asesoramiento?
          </h3>
          <p className="text-blue-800">
            Acercate a la Delegación en <strong>Calle 659 e/ 12 y 13</strong>,
            de lunes a viernes de <strong>8 a 14 hs</strong>, o escribinos por
            el formulario de contacto.
          </p>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <RequirementsModal
          tramite={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </PublicLayout>
  );
}
