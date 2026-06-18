"use client";
import { Search, Edit2, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';

// Mock inventory data
const mockInventory = [
  {
    id: 1,
    sku: 'CAM-001',
    nombre: 'Camiseta Deportiva',
    atributos: 'M / Azul',
    leadTime: '15 días',
    stockActual: 12,
    categoria: 'Ropa',
    talla: 'M',
    color: 'Azul',
    cost: 45,
    price: 120,
    rop: 15
  },
  {
    id: 2,
    sku: 'PAN-002',
    nombre: 'Pantalón Casual',
    atributos: 'L / Negro',
    leadTime: '20 días',
    stockActual: 8,
    categoria: 'Ropa',
    talla: 'L',
    color: 'Negro',
    cost: 80,
    price: 250,
    rop: 20
  },
  {
    id: 3,
    sku: 'ZAP-003',
    nombre: 'Zapatillas Running',
    atributos: '42 / Gris',
    leadTime: '30 días',
    stockActual: 25,
    categoria: 'Calzado',
    talla: '42',
    color: 'Gris',
    cost: 150,
    price: 450,
    rop: 18
  },
  {
    id: 4,
    sku: 'CHA-004',
    nombre: 'Chaqueta Invierno',
    atributos: 'XL / Verde',
    leadTime: '25 días',
    stockActual: 5,
    categoria: 'Ropa',
    talla: 'XL',
    color: 'Verde',
    cost: 120,
    price: 380,
    rop: 12
  },
  {
    id: 5,
    sku: 'SHO-005',
    nombre: 'Short de Mezclilla',
    atributos: 'S / Azul',
    leadTime: '12 días',
    stockActual: 30,
    categoria: 'Ropa',
    talla: 'S',
    color: 'Azul',
    cost: 80,
    price: 180,
    rop: 20
  },
  {
    id: 6,
    sku: 'TOP-006',
    nombre: 'Top Blanco Básico',
    atributos: 'S / Blanco',
    leadTime: '10 días',
    stockActual: 45,
    categoria: 'Ropa',
    talla: 'S',
    color: 'Blanco',
    cost: 40,
    price: 90,
    rop: 30
  },
  {
    id: 7,
    sku: 'GAF-007',
    nombre: 'Gafas de Sol Premium',
    atributos: 'Única / Carey',
    leadTime: '15 días',
    stockActual: 15,
    categoria: 'Accesorios',
    talla: 'Única',
    color: 'Carey',
    cost: 150,
    price: 320,
    rop: 25
  },
  {
    id: 8,
    sku: 'FAL-008',
    nombre: 'Falda de Verano',
    atributos: 'M / Flores',
    leadTime: '18 días',
    stockActual: 20,
    categoria: 'Ropa',
    talla: 'M',
    color: 'Flores',
    cost: 90,
    price: 210,
    rop: 15
  },
  {
    id: 9,
    sku: 'SUE-009',
    nombre: 'Suéter de Lana',
    atributos: 'L / Gris',
    leadTime: '15 días',
    stockActual: 10,
    categoria: 'Ropa',
    talla: 'L',
    color: 'Gris',
    cost: 190,
    price: 410,
    rop: 10
  },
  {
    id: 10,
    sku: 'GOR-010',
    nombre: 'Gorra Urbana',
    atributos: 'Única / Negro',
    leadTime: '10 días',
    stockActual: 40,
    categoria: 'Accesorios',
    talla: 'Única',
    color: 'Negro',
    cost: 60,
    price: 150,
    rop: 15
  }
];

export const catalog = mockInventory.map(item => ({
  id: item.id.toString(),
  sku: item.sku,
  name: item.nombre,
  price: item.price,
  stock: item.stockActual,
  category: item.categoria
}));

export function InventoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTalla, setSelectedTalla] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(null);

  // Get unique values for filters
  const tallas = Array.from(new Set(mockInventory.map(p => p.talla)));
  const colores = Array.from(new Set(mockInventory.map(p => p.color)));
  const categorias = Array.from(new Set(mockInventory.map(p => p.categoria)));

  // Filter products
  const filteredProducts = mockInventory.filter(product => {
    const matchesSearch = product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTalla = !selectedTalla || product.talla === selectedTalla;
    const matchesColor = !selectedColor || product.color === selectedColor;
    const matchesCategoria = !selectedCategoria || product.categoria === selectedCategoria;

    return matchesSearch && matchesTalla && matchesColor && matchesCategoria;
  });

  const handleDelete = (id: number) => {
    // Handle delete logic
    console.log('Delete product:', id);
  };

  const handleEdit = (id: number) => {
    // Handle edit logic
    console.log('Edit product:', id);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-zinc-100">Gestión de Catálogo</h2>
            <p className="text-zinc-400 mt-1" style={{ fontSize: '0.875rem' }}>
              {filteredProducts.length} productos en inventario
            </p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="size-5" />
            <span style={{ fontWeight: '500' }}>Nuevo Producto</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-zinc-800 text-zinc-100 rounded-lg border border-zinc-700 focus:outline-none focus:border-blue-500 transition-colors"
            style={{ fontSize: '0.875rem' }}
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide flex-nowrap" style={{ WebkitOverflowScrolling: 'touch' }}>
          {/* Talla Filter */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-zinc-400 shrink-0" style={{ fontSize: '0.875rem' }}>Talla:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTalla(null)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  !selectedTalla
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
                style={{ fontSize: '0.75rem' }}
              >
                Todas
              </button>
              {tallas.map(talla => (
                <button
                  key={talla}
                  onClick={() => setSelectedTalla(talla)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    selectedTalla === talla
                      ? 'bg-blue-600 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                  style={{ fontSize: '0.75rem' }}
                >
                  {talla}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-zinc-400 shrink-0" style={{ fontSize: '0.875rem' }}>Color:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedColor(null)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  !selectedColor
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
                style={{ fontSize: '0.75rem' }}
              >
                Todos
              </button>
              {colores.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    selectedColor === color
                      ? 'bg-blue-600 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                  style={{ fontSize: '0.75rem' }}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Categoría Filter */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-zinc-400 shrink-0" style={{ fontSize: '0.875rem' }}>Categoría:</span>
            <div className="flex gap-2 pr-4">
              <button
                onClick={() => setSelectedCategoria(null)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  !selectedCategoria
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
                style={{ fontSize: '0.75rem' }}
              >
                Todas
              </button>
              {categorias.map(categoria => (
                <button
                  key={categoria}
                  onClick={() => setSelectedCategoria(categoria)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    selectedCategoria === categoria
                      ? 'bg-blue-600 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                  style={{ fontSize: '0.75rem' }}
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Inventory Table */}
      <div className="flex-1 px-8 py-6 overflow-hidden bg-zinc-950">
        <div className="h-full bg-zinc-900 rounded-xl border border-zinc-800 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            <table className="w-full">
              <thead className="bg-zinc-800/50 sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-left text-zinc-400" style={{ fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase' }}>
                    SKU
                  </th>
                  <th className="px-6 py-4 text-left text-zinc-400" style={{ fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase' }}>
                    Nombre del Producto
                  </th>
                  <th className="px-6 py-4 text-left text-zinc-400" style={{ fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase' }}>
                    Atributos
                  </th>
                  <th className="px-6 py-4 text-center text-zinc-400" style={{ fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase' }}>
                    Lead Time
                  </th>
                  <th className="px-6 py-4 text-center text-zinc-400" style={{ fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase' }}>
                    Stock Actual
                  </th>
                  <th className="px-6 py-4 text-center text-zinc-400" style={{ fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase' }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`border-b border-zinc-800 ${index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/50'} hover:bg-zinc-800/50 transition-colors`}
                  >
                    <td className="px-6 py-4">
                      <span className="text-blue-400 font-mono" style={{ fontSize: '0.875rem' }}>
                        {product.sku}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-zinc-100" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                        {product.nombre}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-zinc-400" style={{ fontSize: '0.875rem' }}>
                        {product.atributos}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-3 py-1 rounded-full bg-zinc-800 text-zinc-300" style={{ fontSize: '0.75rem' }}>
                        {product.leadTime}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full ${
                        product.stockActual < 15
                          ? 'bg-red-950 text-red-400 border border-red-800'
                          : 'bg-green-950 text-green-400 border border-green-800'
                      }`} style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                        {product.stockActual}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(product.id)}
                          className="p-2 rounded-lg bg-zinc-800 text-blue-400 hover:bg-zinc-700 transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="size-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 rounded-lg bg-zinc-800 text-red-400 hover:bg-zinc-700 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <p className="text-zinc-400 mb-2">No se encontraron productos</p>
                <p className="text-zinc-500" style={{ fontSize: '0.875rem' }}>
                  Intenta ajustar los filtros de búsqueda
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
