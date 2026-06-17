"use client";
import { Package, Plus, Search, Filter, MoreVertical, FileDown } from 'lucide-react';
import { useState } from 'react';

// Mock data (MVP: This will be connected to Supabase in Step 4)
const mockProducts = [
  { id: '1', sku: 'CAM-001-AZ-M', name: 'Camiseta Deportiva', category: 'Camisetas', price: 120, cost: 45, stock: 12, rop: 15 },
  { id: '2', sku: 'PAN-002-NE-L', name: 'Pantalón Casual', category: 'Pantalones', price: 250, cost: 80, stock: 8, rop: 20 },
  { id: '3', sku: 'ZAP-003-GR-42', name: 'Zapatillas Running', category: 'Calzado', price: 450, cost: 150, stock: 25, rop: 18 },
  { id: '4', sku: 'CHA-004-VE-XL', name: 'Chaqueta Invierno', category: 'Chaquetas', price: 380, cost: 120, stock: 5, rop: 12 },
];

export function CatalogoScreen() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 overflow-hidden h-full">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 px-8 py-6 flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-zinc-100 font-semibold tracking-tight text-xl">Gestión de Catálogo</h2>
          <p className="text-zinc-400 mt-1" style={{ fontSize: '0.875rem' }}>
            Administra tus productos, SKUs y niveles de alerta.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg transition-colors border border-zinc-700">
            <FileDown className="size-4" />
            <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Importar CSV</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Plus className="size-4" />
            <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Nuevo Producto</span>
          </button>
        </div>
      </header>

      {/* Toolbar */}
      <div className="px-8 py-4 border-b border-zinc-800 bg-zinc-950 flex gap-4 shrink-0">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o SKU..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 h-10 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 rounded-lg transition-colors">
          <Filter className="size-4" />
          <span className="text-sm">Filtros</span>
        </button>
      </div>

      {/* Table Area */}
      <div className="flex-1 overflow-auto p-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-zinc-800/50 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 text-zinc-400 font-medium text-xs uppercase tracking-wider">Producto / SKU</th>
                <th className="px-6 py-4 text-zinc-400 font-medium text-xs uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-4 text-zinc-400 font-medium text-xs uppercase tracking-wider text-right">Precio (Bs)</th>
                <th className="px-6 py-4 text-zinc-400 font-medium text-xs uppercase tracking-wider text-right">Costo (Bs)</th>
                <th className="px-6 py-4 text-zinc-400 font-medium text-xs uppercase tracking-wider text-center">Stock</th>
                <th className="px-6 py-4 text-zinc-400 font-medium text-xs uppercase tracking-wider text-center">ROP</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {mockProducts.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                        <Package className="size-5 text-zinc-500" />
                      </div>
                      <div>
                        <p className="text-zinc-100 text-sm font-medium">{product.name}</p>
                        <p className="text-zinc-500 text-xs mt-0.5 font-mono">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-300 text-sm">{product.category}</td>
                  <td className="px-6 py-4 text-zinc-100 text-sm text-right">{product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-zinc-400 text-sm text-right">{product.cost.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700">
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-zinc-400 text-sm">{product.rop}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-md transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
