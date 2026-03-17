import { AdminLayout } from "@/components/layout/AdminLayout";
import { useCulturalRegistrations, useDeleteCulturalRegistration } from "@/hooks/use-cultural-registrations";
import { Button } from "@/components/ui/button";
import { Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CulturaAdmin() {
  const { data: registrations, isLoading } = useCulturalRegistrations();
  const { mutate: deleteRegistration } = useDeleteCulturalRegistration();
  const { toast } = useToast();

  const handleExportCSV = () => {
    if (!registrations || registrations.length === 0) {
      toast({ title: "No hay registros para exportar", variant: "destructive" });
      return;
    }

    const headers = ["ID", "Nombre", "Apellido", "DNI", "Teléfono", "Nicho Cultural", "Descripción", "Fecha"];
    const rows = registrations.map((reg) => [
      reg.id,
      reg.firstName,
      reg.lastName,
      reg.dni,
      reg.phone,
      reg.culturalNiche,
      reg.description || "",
      new Date(reg.createdAt).toLocaleString("es-AR"),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registros-cultura-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Archivo descargado exitosamente" });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Gestión de Registro de Cultura</h1>
          <p className="text-muted-foreground">Administra los registros culturales enviados.</p>
        </div>
        <Button className="gap-2 bg-purple-600 hover:bg-purple-700" onClick={handleExportCSV}>
          <Download className="w-4 h-4" /> Descargar CSV
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-muted-foreground font-semibold border-b">
            <tr>
              <th className="p-4">Nombre</th>
              <th className="p-4">Nicho Cultural</th>
              <th className="p-4">Teléfono</th>
              <th className="p-4">DNI</th>
              <th className="p-4">Fecha</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  Cargando...
                </td>
              </tr>
            ) : registrations?.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  No hay registros
                </td>
              </tr>
            ) : (
              registrations?.map((item) => (
                <tr key={item.id} className="border-b hover:bg-slate-50">
                  <td className="p-4 font-medium">
                    {item.firstName} {item.lastName}
                  </td>
                  <td className="p-4">{item.culturalNiche}</td>
                  <td className="p-4">{item.phone}</td>
                  <td className="p-4">{item.dni}</td>
                  <td className="p-4 text-xs">{new Date(item.createdAt).toLocaleString("es-AR")}</td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => {
                        if (confirm("¿Estás seguro de eliminar este registro?"))
                          deleteRegistration(item.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
