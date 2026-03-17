import { AdminLayout } from "@/components/layout/AdminLayout";
import { useNews } from "@/hooks/use-news";
import { usePublicWorks } from "@/hooks/use-public-works";
import { useEvents } from "@/hooks/use-events";
import { useComplaints } from "@/hooks/use-complaints";
import { useCulturalRegistrations } from "@/hooks/use-cultural-registrations";
import { useTramites } from "@/hooks/use-tramites";
import { Newspaper, HardHat, CalendarDays, MessageSquare, Palette, FileText } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { data: news } = useNews();
  const { data: works } = usePublicWorks();
  const { data: events } = useEvents();
  const { data: complaints } = useComplaints();
  const { data: culturalRegistrations } = useCulturalRegistrations();
  const { data: tramitesData } = useTramites();

  const stats = [
    { title: "Noticias", count: news?.length || 0, icon: Newspaper, link: "/admin/noticias", color: "text-orange-600", bg: "bg-orange-100" },
    { title: "Obras", count: works?.length || 0, icon: HardHat, link: "/admin/obras", color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Eventos", count: events?.length || 0, icon: CalendarDays, link: "/admin/eventos", color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Reclamos", count: complaints?.length || 0, icon: MessageSquare, link: "/admin/reclamos", color: "text-green-600", bg: "bg-green-100" },
    { title: "Cultura", count: culturalRegistrations?.length || 0, icon: Palette, link: "/admin/cultura", color: "text-rose-600", bg: "bg-rose-100" },
    { title: "Trámites", count: tramitesData?.length || 0, icon: FileText, link: "/admin/tramites", color: "text-indigo-600", bg: "bg-indigo-100" },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Panel de Control</h1>
        <p className="text-muted-foreground mt-2">Resumen del contenido del portal municipal.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.link} className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold text-foreground">{stat.count}</span>
            </div>
            <h3 className="font-semibold text-muted-foreground group-hover:text-primary transition-colors">Total {stat.title}</h3>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}
