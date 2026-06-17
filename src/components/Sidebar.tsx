"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Settings } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Analítica de Demanda", href: "/demanda", icon: Package },
    { name: "Reabastecimiento", href: "/reabastecimiento", icon: ShoppingCart },
    { name: "Configuración", href: "/configuracion", icon: Settings },
    // Link externo al módulo móvil
    { name: "Ir al POS (Móvil)", href: "/pos", icon: Package },
  ];

  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col shrink-0">
      <div className="p-6">
        <h1 className="text-blue-500 tracking-tight text-2xl font-medium">Nexo</h1>
        <p className="text-zinc-400 mt-1" style={{ fontSize: "0.875rem" }}>
          Analítica Predictiva
        </p>
      </div>

      <nav className="flex-1 px-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              <item.icon className="size-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
