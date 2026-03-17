import { PublicLayout } from "@/components/layout/PublicLayout";
import { useNews } from "@/hooks/use-news";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Newspaper } from "lucide-react";

export default function Noticias() {
  const { data: news, isLoading } = useNews();

  return (
    <PublicLayout>
      <div className="bg-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Newspaper className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-display font-bold drop-shadow-md">Noticias y Novedades</h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Mantente informado con las últimas novedades de nuestra delegación.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-[400px] bg-muted animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : news && news.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <article key={item.id} className="bg-white rounded-2xl shadow-lg border border-border/50 overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-300 hover:shadow-xl group">
                {item.imageUrl && (
                  <div className="h-56 overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <time className="text-sm font-bold text-orange-500 mb-3 block">
                    {format(new Date(item.date), "EEEE, d 'de' MMMM, yyyy", { locale: es })}
                  </time>
                  <h3 className="font-display font-bold text-2xl mb-4 leading-tight group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground flex-1">
                    {item.content}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <Newspaper className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <h3 className="text-xl font-display font-semibold">No hay noticias publicadas</h3>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
