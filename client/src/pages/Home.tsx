import { PublicLayout } from "@/components/layout/PublicLayout";
import {
  FileText,
  AlertTriangle,
  Phone,
  Newspaper,
  Calendar,
  ArrowRight,
  MapPin,
  Palette,
} from "lucide-react";
import { Link } from "wouter";
import { Map } from "@/components/Map";
import { useNews } from "@/hooks/use-news";
import { useEvents } from "@/hooks/use-events";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// ✅ IMPORT CORREGIDO
import heroImage from "../attached_assets/Diseno-sin-titulo.png";

export default function Home() {
  const { data: news, isLoading: loadingNews } = useNews();
  const { data: events, isLoading: loadingEvents } = useEvents();

  const mainButtons = [
    {
      title: "Trámites",
      icon: FileText,
      bgColor: "bg-[#0056b3]",
      hoverColor: "hover:bg-[#004494]",
      link: "/tramites",
    },
    {
      title: "Reclamos",
      icon: AlertTriangle,
      bgColor: "bg-[#28a745]",
      hoverColor: "hover:bg-[#218838]",
      link: "/contacto",
    },
    {
      title: "Teléfonos útiles",
      icon: Phone,
      bgColor: "bg-[#ffc107]",
      hoverColor: "hover:bg-[#e0a800]",
      textColor: "text-slate-900",
      link: "/telefonos",
    },
    {
      title: "Noticias",
      icon: Newspaper,
      bgColor: "bg-[#fd7e14]",
      hoverColor: "hover:bg-[#e06b0b]",
      link: "/noticias",
    },
  ];

  const recentNews = news?.slice(0, 3) || [];
  const upcomingEvents = events?.slice(0, 3) || [];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Paisaje de Villa Garibaldi"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-wider drop-shadow-xl mb-4">
            VILLA GARIBALDI
          </h1>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-white/95 drop-shadow-md mb-8">
            PARQUE SICARDI - IGNACIO CORREAS
          </h2>
          <div className="w-24 h-1.5 bg-primary mx-auto my-8 rounded-full" />
          <p className="text-xl md:text-3xl font-sans text-white/90 font-medium tracking-wide bg-black/30 inline-block px-6 py-2 rounded-xl backdrop-blur-sm border border-white/10">
            EL ESTADO ES VECINO
          </p>
        </div>
      </section>

      {/* Main Buttons Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {mainButtons.map((btn) => (
            <Link
              key={btn.title}
              href={btn.link}
              className={`${btn.bgColor} ${btn.hoverColor} ${btn.textColor || "text-white"} 
                rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2
                flex flex-col items-center justify-center p-6 md:p-8 aspect-square group
                border border-white/10`}
            >
              <btn.icon className="w-12 h-12 md:w-16 md:h-16 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-display font-bold text-lg md:text-xl text-center leading-tight">
                {btn.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Cultura Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1200"
            alt="Cultura y Arte"
            className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/85 via-purple-800/60 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 md:px-14">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                  <Palette className="w-7 h-7 text-white" />
                </div>
                <span className="text-white/80 font-semibold text-sm uppercase tracking-widest">
                  Nuevo
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white leading-tight mb-3 drop-shadow-lg">
                Registro de Cultura
              </h2>
              <p className="text-white/85 text-base md:text-lg mb-6 leading-relaxed">
                ¿Sos artesano, músico, artista o emprendedor cultural?
                Registrate y mostrá tu trabajo a toda la comunidad.
              </p>
              <Link
                href="/cultura"
                className="inline-flex items-center gap-2 bg-white text-purple-800 font-bold px-6 py-3 rounded-xl hover:bg-purple-50 transition-colors shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                <Palette className="w-5 h-5" />
                Registrarme ahora
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* (resto del código igual, no hacía falta tocarlo) */}
    </PublicLayout>
  );
}
