import { Sidebar } from "../../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex bg-zinc-950">
      {/* 
        Layout Desktop B2B (Dashboard)
        Aplica los estándares "Impeccable": Layout de pantalla completa
        para gerencia con alta densidad de datos.
      */}
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
