import { PublicLayout } from "@/components/layout/PublicLayout";
import { Phone, ShieldAlert, HeartPulse, Flame } from "lucide-react";

export default function Telefonos() {
  const numbers = [
    { name: "Policía (Emergencias)", number: "911", icon: ShieldAlert, color: "text-blue-600", bg: "bg-blue-100" },
    { name: "Ambulancia (SAME)", number: "107", icon: HeartPulse, color: "text-green-600", bg: "bg-green-100" },
    { name: "Bomberos", number: "100", icon: Flame, color: "text-red-600", bg: "bg-red-100" },
    { name: "Atención al Vecino", number: "147", icon: Phone, color: "text-slate-600", bg: "bg-slate-100" },
  ];

  return (
    <PublicLayout>
      <div className="bg-yellow-500 text-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Phone className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-display font-bold drop-shadow-sm">Teléfonos Útiles</h1>
          <p className="mt-4 text-lg font-medium max-w-2xl mx-auto">
            Números de emergencia y atención rápida para los vecinos.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {numbers.map((item) => (
            <div key={item.name} className="flex items-center bg-white p-6 rounded-2xl shadow-md border border-border hover:shadow-lg transition-all">
              <div className={`w-20 h-20 flex-shrink-0 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mr-6`}>
                <item.icon className="w-10 h-10" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-slate-500 mb-1">{item.name}</h3>
                <p className="text-4xl font-display font-extrabold text-foreground">{item.number}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
