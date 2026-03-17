import { PublicLayout } from "@/components/layout/PublicLayout";
import { useEvents } from "@/hooks/use-events";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarDays, MapPin, Clock } from "lucide-react";

export default function Eventos() {
  const { data: events, isLoading } = useEvents();

  return (
    <PublicLayout>
      <div className="bg-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <CalendarDays className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-display font-bold drop-shadow-md">Agenda de Eventos</h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Actividades culturales, reuniones vecinales y fechas importantes.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-40 bg-muted animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : events && events.length > 0 ? (
          <div className="space-y-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl shadow-md border border-border/50 overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow">
                {/* Date Block */}
                <div className="md:w-48 bg-purple-50 flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-purple-100 text-purple-700">
                  <span className="text-sm font-bold uppercase tracking-wider">
                    {format(new Date(event.eventDate), "MMMM", { locale: es })}
                  </span>
                  <span className="text-5xl font-display font-extrabold my-1">
                    {format(new Date(event.eventDate), "dd")}
                  </span>
                  <span className="text-sm font-medium">
                    {format(new Date(event.eventDate), "EEEE", { locale: es })}
                  </span>
                </div>
                
                {/* Content Block */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                  <h3 className="font-display font-bold text-2xl mb-3 text-foreground">{event.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-1">{event.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-600" />
                      {format(new Date(event.eventDate), "HH:mm 'hs'")}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-purple-600" />
                        {event.location}
                      </div>
                    )}
                  </div>
                </div>

                {/* Image Block (optional) */}
                {event.imageUrl && (
                  <div className="md:w-64 hidden md:block">
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <CalendarDays className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <h3 className="text-xl font-display font-semibold">No hay eventos en la agenda</h3>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
