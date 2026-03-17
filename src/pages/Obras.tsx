import { PublicLayout } from "@/components/layout/PublicLayout";
import { usePublicWorks } from "@/hooks/use-public-works";
import { MapPin, HardHat } from "lucide-react";

export default function Obras() {
  const { data: works, isLoading } = usePublicWorks();

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Finalizada':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'En ejecución':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'En obra':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <PublicLayout>
      <div className="bg-muted py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <HardHat className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">Obras Públicas</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Seguimiento de los proyectos y mejoras de infraestructura en Villa Garibaldi, Parque Sicardi e Ignacio Correas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-muted animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : works && works.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work) => (
              <div key={work.id} className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
                {work.imageUrl ? (
                  <div className="h-48 overflow-hidden">
                    <img src={work.imageUrl} alt={work.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="h-48 bg-muted flex items-center justify-center">
                    <HardHat className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                )}
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${getStatusStyle(work.status)}`}>
                      {work.status}
                    </span>
                  </div>
                  
                  <h3 className="font-display font-bold text-xl mb-2 text-foreground">{work.title}</h3>
                  <p className="text-muted-foreground text-sm flex-1 mb-4">{work.description}</p>
                  
                  {work.location && (
                    <div className="flex items-center text-sm font-medium text-slate-600 border-t pt-4 mt-auto">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      {work.location}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <HardHat className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <h3 className="text-xl font-display font-semibold">No hay obras registradas</h3>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
