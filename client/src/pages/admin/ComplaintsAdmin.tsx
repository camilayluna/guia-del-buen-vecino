import { AdminLayout } from "@/components/layout/AdminLayout";
import { useComplaints, useUpdateComplaintStatus } from "@/hooks/use-complaints";
import { format } from "date-fns";

export default function ComplaintsAdmin() {
  const { data: complaints, isLoading } = useComplaints();
  const { mutate: updateStatus } = useUpdateComplaintStatus();

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Gestión de Reclamos</h1>
        <p className="text-muted-foreground">Bandeja de entrada de reclamos y sugerencias vecinales.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-muted-foreground font-semibold border-b">
            <tr>
              <th className="p-4">Fecha</th>
              <th className="p-4">Vecino</th>
              <th className="p-4">Asunto</th>
              <th className="p-4">Estado</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={4} className="p-4 text-center">Cargando...</td></tr>
            ) : complaints?.length === 0 ? (
              <tr><td colSpan={4} className="p-4 text-center">No hay reclamos</td></tr>
            ) : complaints?.map(item => (
              <tr key={item.id} className="border-b hover:bg-slate-50 group">
                <td className="p-4 whitespace-nowrap align-top">{format(new Date(item.createdAt), 'dd/MM/yyyy')}</td>
                <td className="p-4 align-top">
                  <div className="font-bold text-foreground">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.email}</div>
                  {item.phone && <div className="text-xs text-muted-foreground">{item.phone}</div>}
                </td>
                <td className="p-4 align-top">
                  <span className="inline-block px-2 py-1 bg-slate-100 rounded text-xs font-bold mb-1">{item.subject}</span>
                  <p className="text-muted-foreground">{item.description}</p>
                </td>
                <td className="p-4 align-top">
                  <select 
                    value={item.status}
                    onChange={(e) => updateStatus({ id: item.id, status: e.target.value })}
                    className={`text-xs font-bold border rounded px-2 py-1 ${
                      item.status === 'Resuelto' ? 'bg-green-100 text-green-800' : 
                      item.status === 'En proceso' ? 'bg-blue-100 text-blue-800' : 
                      'bg-orange-100 text-orange-800'
                    }`}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Resuelto">Resuelto</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
