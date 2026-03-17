import { Link, useLocation } from "wouter";
import { MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/tramites", label: "Trámites y Servicios" },
    { href: "/obras", label: "Obras Públicas" },
    { href: "/noticias", label: "Noticias" },
    { href: "/eventos", label: "Eventos" },
    { href: "/telefonos", label: "Teléfonos" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-sm hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>Municipalidad de La Plata</span>
          <Link
            href="/admin"
            className="hover:underline opacity-80 hover:opacity-100"
          >
            Acceso Admin
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-secondary p-2 rounded-lg group-hover:bg-primary transition-colors">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl leading-tight text-foreground">
                  Delegación Comunal
                </h1>
                <p className="text-xs text-muted-foreground font-semibold">
                  Villa Garibaldi - Parque Sicardi
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-semibold text-sm transition-colors hover:text-primary ${
                    location === link.href
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t p-4 flex flex-col gap-4 shadow-lg absolute w-full left-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-foreground font-semibold py-2 px-4 hover:bg-muted rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="block text-primary font-semibold py-2 px-4 hover:bg-muted rounded-md"
            >
              Acceso Admin
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-primary" />
              <h3 className="font-display font-bold text-lg">
                Delegación Comunal
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              Villa Garibaldi, Parque Sicardi e Ignacio Correas.
              <br />
              Municipalidad de La Plata, Buenos Aires, Argentina.
            </p>
          </div>
          <div>
            <h3 className="font-display font-bold text-lg mb-4">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/tramites"
                  className="hover:text-white transition-colors"
                >
                  Trámites
                </Link>
              </li>
              <li>
                <Link
                  href="/obras"
                  className="hover:text-white transition-colors"
                >
                  Obras Públicas
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="hover:text-white transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Contacto</h3>
            <p className="text-gray-400 text-sm">
              Calle 659 e/ 12 y 13
              <br />
             Villa Garibaldi
              <br />
              Tel:2215777810
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Municipalidad de La Plata. Todos los
          derechos reservados.
        </div>
      </footer>
    </div>
  );
}
