import { Link, useLocation } from "wouter";
import { LayoutDashboard, Newspaper, HardHat, CalendarDays, MessageSquare, LogOut, FileText, Palette } from "lucide-react";
import { useAdminAuth } from "@/hooks/use-admin-auth";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, navigate] = useLocation();
  const { logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menu = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Newspaper, label: "Noticias", href: "/admin/noticias" },
    { icon: HardHat, label: "Obras Públicas", href: "/admin/obras" },
    { icon: CalendarDays, label: "Eventos", href: "/admin/eventos" },
    { icon: MessageSquare, label: "Reclamos", href: "/admin/reclamos" },
    { icon: FileText, label: "Trámites", href: "/admin/tramites" },
    { icon: Palette, label: "Cultura", href: "/admin/cultura" },
  ];

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col hidden md:flex">
        <div className="p-6 border-b">
          <h2 className="font-display font-bold text-xl text-primary">Portal Admin</h2>
          <p className="text-xs text-muted-foreground mt-1">Delegación Comunal</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menu.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground font-medium rounded-xl hover:bg-muted transition-colors">
            <LogOut className="h-5 w-5" />
            Volver al sitio
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-destructive hover:text-destructive hover:bg-destructive/5 font-medium rounded-xl transition-colors"
            data-testid="button-logout"
          >
            <LogOut className="h-5 w-5" />
            Salir
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b p-4 flex justify-between items-center">
           <h2 className="font-display font-bold text-lg text-primary">Portal Admin</h2>
           <Link href="/" className="text-sm text-muted-foreground">Volver</Link>
        </header>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
