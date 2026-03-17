import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AdminProtected } from "@/components/AdminProtected";

// Public Pages
import Home from "./pages/Home";
import Tramites from "./pages/Tramites";
import Obras from "./pages/Obras";
import Noticias from "./pages/Noticias";
import Eventos from "./pages/Eventos";
import Contacto from "./pages/Contacto";
import Telefonos from "./pages/Telefonos";
import Cultura from "./pages/Cultura";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import NewsAdmin from "./pages/admin/NewsAdmin";
import WorksAdmin from "./pages/admin/WorksAdmin";
import EventsAdmin from "./pages/admin/EventsAdmin";
import ComplaintsAdmin from "./pages/admin/ComplaintsAdmin";
import CulturaAdmin from "./pages/admin/CulturaAdmin";
import TramitesAdmin from "./pages/admin/TramitesAdmin";
import AdminLogin from "./pages/admin/Login";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/tramites" component={Tramites} />
      <Route path="/obras" component={Obras} />
      <Route path="/noticias" component={Noticias} />
      <Route path="/eventos" component={Eventos} />
      <Route path="/contacto" component={Contacto} />
      <Route path="/telefonos" component={Telefonos} />
      <Route path="/cultura" component={Cultura} />

      {/* Admin Login Route */}
      <Route path="/admin/login" component={AdminLogin} />

      {/* Admin Routes - Protected */}
      <Route path="/admin">
        {() => (
          <AdminProtected>
            <Dashboard />
          </AdminProtected>
        )}
      </Route>
      <Route path="/admin/noticias">
        {() => (
          <AdminProtected>
            <NewsAdmin />
          </AdminProtected>
        )}
      </Route>
      <Route path="/admin/obras">
        {() => (
          <AdminProtected>
            <WorksAdmin />
          </AdminProtected>
        )}
      </Route>
      <Route path="/admin/eventos">
        {() => (
          <AdminProtected>
            <EventsAdmin />
          </AdminProtected>
        )}
      </Route>
      <Route path="/admin/reclamos">
        {() => (
          <AdminProtected>
            <ComplaintsAdmin />
          </AdminProtected>
        )}
      </Route>
      <Route path="/admin/cultura">
        {() => (
          <AdminProtected>
            <CulturaAdmin />
          </AdminProtected>
        )}
      </Route>
      <Route path="/admin/tramites">
        {() => (
          <AdminProtected>
            <TramitesAdmin />
          </AdminProtected>
        )}
      </Route>

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
