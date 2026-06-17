export default function POSPage() {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Registro de Salida</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Escanea o busca el producto para registrar su venta.
        </p>
      </header>
      
      <div className="space-y-4">
        {/* Aquí irá el input de búsqueda/escáner y la lista del carrito con Zustand */}
        <div className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center">
          <span className="text-sm text-zinc-500">Buscador Touch-friendly</span>
        </div>
      </div>
    </div>
  );
}
