"use client";

import { Package, Inbox, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function POSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Diseño estricto Mobile-First para punto de venta.
  // Impeccable standards: Sin Sidebar, uso de espacio completo, 
  // navegación inferior con touch targets grandes (mínimo 44px).
  return (
    <div className="flex flex-col w-full h-[100dvh] bg-zinc-950 overflow-hidden">
      {/* Área principal del POS */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-zinc-900 border-t border-zinc-800 flex items-center justify-around z-50">
        <Link 
          href="/pos"
          className={clsx(
            "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
            pathname === "/pos" ? "text-blue-500" : "text-zinc-500 hover:text-zinc-300"
          )}
        >
          <Package className="size-5" />
          <span className="text-[10px] font-medium tracking-wide">Salidas</span>
        </Link>
        <Link 
          href="/pos/inventario"
          className={clsx(
            "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
            pathname === "/pos/inventario" ? "text-blue-500" : "text-zinc-500 hover:text-zinc-300"
          )}
        >
          <Inbox className="size-5" />
          <span className="text-[10px] font-medium tracking-wide">Catálogo</span>
        </Link>
        <button 
          className="flex flex-col items-center justify-center w-full h-full space-y-1 text-zinc-500 hover:text-red-400 transition-colors"
        >
          <LogOut className="size-5" />
          <span className="text-[10px] font-medium tracking-wide">Salir</span>
        </button>
      </nav>
    </div>
  );
}
