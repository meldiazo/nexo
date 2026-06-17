"use client";
import { Package, Clock, DollarSign, FileText } from 'lucide-react';
import { useState } from 'react';

// Mock data for reabastecimiento
const mockReabastecimiento = [
  {
    id: 1,
    sku: 'CAM-001-AZ-M',
    producto: 'Camiseta Deportiva',
    stockActual: 12,
    rop: 15,
    proveedor: 'Textiles S.A.',
    cantidadSugerida: 50,
    urgencia: 'alta',
    costoUnitario: 45
  },
  {
    id: 2,
    sku: 'PAN-002-NE-L',
    producto: 'Pantalón Casual',
    stockActual: 8,
    rop: 20,
    proveedor: 'Fashion Import',
    cantidadSugerida: 45,
    urgencia: 'critica',
    costoUnitario: 80
  },
  {
    id: 3,
    sku: 'CHA-004-VE-XL',
    producto: 'Chaqueta Invierno',
    stockActual: 5,
    rop: 12,
    proveedor: 'Winter Wear Co.',
    cantidadSugerida: 40,
    urgencia: 'critica',
    costoUnitario: 120
  },
  {
    id: 4,
    sku: 'GOR-006-AZ-UN',
    producto: 'Gorra Casual',
    stockActual: 15,
    rop: 22,
    proveedor: 'Accesorios Premium',
    cantidadSugerida: 60,
    urgencia: 'media',
    costoUnitario: 25
  },
  {
    id: 5,
    sku: 'ZAP-003-GR-42',
    producto: 'Zapatillas Running',
    stockActual: 25,
    rop: 18,
    proveedor: 'Sport Shoes Ltd.',
    cantidadSugerida: 30,
    urgencia: 'baja',
    costoUnitario: 150
  },
  {
    id: 6,
    sku: 'CAM-007-BL-L',
    producto: 'Camiseta Básica',
    stockActual: 18,
    rop: 30,
    proveedor: 'Textiles S.A.',
    cantidadSugerida: 55,
    urgencia: 'alta',
    costoUnitario: 35
  }
];

export function ReabastecimientoScreen() {
  const [generatedOrders, setGeneratedOrders] = useState<number[]>([]);

  const handleGenerateOrder = (id: number) => {
    setGeneratedOrders([...generatedOrders, id]);
  };

  // Calculate KPIs
  const skusCriticos = mockReabastecimiento.filter(p => p.urgencia === 'critica' || p.urgencia === 'alta').length;
  const ordenesPendientes = generatedOrders.length;
  const costoProyectado = mockReabastecimiento.reduce((sum, p) => sum + (p.cantidadSugerida * p.costoUnitario), 0);

  const getUrgenciaBadge = (urgencia: string) => {
    switch (urgencia) {
      case 'critica':
        return 'bg-red-600 text-white';
      case 'alta':
        return 'bg-orange-600 text-white';
      case 'media':
        return 'bg-yellow-600 text-white';
      case 'baja':
        return 'bg-green-600 text-white';
      default:
        return 'bg-zinc-600 text-white';
    }
  };

  const getUrgenciaText = (urgencia: string) => {
    switch (urgencia) {
      case 'critica':
        return 'CRÍTICO';
      case 'alta':
        return 'ALTO';
      case 'media':
        return 'MEDIO';
      case 'baja':
        return 'BAJO';
      default:
        return urgencia.toUpperCase();
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-zinc-950">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 px-8 py-6">
        <div>
          <h2 className="text-zinc-100">Sugerencias de Reabastecimiento</h2>
          <p className="text-zinc-400 mt-1" style={{ fontSize: '0.875rem' }}>
            Productos que requieren reorden basado en análisis predictivo
          </p>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="px-8 py-6 bg-zinc-950">
        <div className="grid grid-cols-3 gap-6">
          {/* SKUs Críticos */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-zinc-400" style={{ fontSize: '0.875rem' }}>SKUs Críticos</p>
              <Package className="size-5 text-red-500" />
            </div>
            <p className="text-zinc-100" style={{ fontSize: '2rem', fontWeight: '600', color: '#ef4444' }}>
              {skusCriticos}
            </p>
            <p className="text-red-400 mt-2" style={{ fontSize: '0.75rem' }}>Requieren acción inmediata</p>
          </div>

          {/* Órdenes Pendientes */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-zinc-400" style={{ fontSize: '0.875rem' }}>Órdenes Pendientes</p>
              <Clock className="size-5 text-blue-500" />
            </div>
            <p className="text-zinc-100" style={{ fontSize: '2rem', fontWeight: '600' }}>
              {ordenesPendientes}
            </p>
            <p className="text-zinc-400 mt-2" style={{ fontSize: '0.75rem' }}>Órdenes generadas hoy</p>
          </div>

          {/* Costo Proyectado */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-zinc-400" style={{ fontSize: '0.875rem' }}>Costo Proyectado (Bs)</p>
              <DollarSign className="size-5 text-green-500" />
            </div>
            <p className="text-zinc-100" style={{ fontSize: '2rem', fontWeight: '600', color: '#10b981' }}>
              {costoProyectado.toLocaleString()}
            </p>
            <p className="text-green-400 mt-2" style={{ fontSize: '0.75rem' }}>Inversión total estimada</p>
          </div>
        </div>
      </div>

      {/* Reabastecimiento Table */}
      <div className="flex-1 px-8 pb-8 overflow-hidden">
        <div className="h-full bg-zinc-900 rounded-xl border border-zinc-800 flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <FileText className="size-5 text-blue-500" />
              <h3 className="text-zinc-100">Productos para Reabastecimiento</h3>
            </div>
            <p className="text-zinc-400 mt-1" style={{ fontSize: '0.875rem' }}>
              {mockReabastecimiento.length} productos necesitan reorden
            </p>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full">
              <thead className="bg-zinc-800/50 sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-left text-zinc-400" style={{ fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase' }}>
                    Urgencia
                  </th>
                  <th className="px-6 py-4 text-left text-zinc-400" style={{ fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase' }}>
                    SKU
                  </th>
                  <th className="px-6 py-4 text-left text-zinc-400" style={{ fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase' }}>
                    Producto
                  </th>
                  <th className="px-6 py-4 text-center text-zinc-400" style={{ fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase' }}>
                    Stock Actual
                  </th>
                  <th className="px-6 py-4 text-center text-zinc-400" style={{ fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase' }}>
                    ROP
                  </th>
                  <th className="px-6 py-4 text-left text-zinc-400" style={{ fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase' }}>
                    Proveedor
                  </th>
                  <th className="px-6 py-4 text-center text-zinc-400" style={{ fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase' }}>
                    Cantidad Sugerida
                  </th>
                  <th className="px-6 py-4 text-center text-zinc-400" style={{ fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase' }}>
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockReabastecimiento
                  .sort((a, b) => {
                    const urgenciaOrder: Record<string, number> = { critica: 0, alta: 1, media: 2, baja: 3 };
                    return urgenciaOrder[a.urgencia] - urgenciaOrder[b.urgencia];
                  })
                  .map((item, index) => (
                    <tr
                      key={item.id}
                      className={`border-b border-zinc-800 ${index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/50'} hover:bg-zinc-800/50 transition-colors`}
                    >
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full ${getUrgenciaBadge(item.urgencia)}`}
                          style={{ fontSize: '0.625rem', fontWeight: '700', letterSpacing: '0.05em' }}
                        >
                          {getUrgenciaText(item.urgencia)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-blue-400 font-mono" style={{ fontSize: '0.875rem' }}>
                          {item.sku}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-zinc-100" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                          {item.producto}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className="inline-block px-3 py-1 rounded-full bg-red-950 text-red-400 border border-red-800"
                          style={{ fontSize: '0.875rem', fontWeight: '600' }}
                        >
                          {item.stockActual}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-zinc-400" style={{ fontSize: '0.875rem' }}>
                          {item.rop}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-zinc-300" style={{ fontSize: '0.875rem' }}>
                          {item.proveedor}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span
                            className="inline-block px-4 py-1.5 rounded-full bg-blue-600 text-white"
                            style={{ fontSize: '0.875rem', fontWeight: '700' }}
                          >
                            {item.cantidadSugerida}
                          </span>
                          <span className="text-zinc-500" style={{ fontSize: '0.625rem' }}>
                            {(item.cantidadSugerida * item.costoUnitario).toLocaleString()} Bs
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleGenerateOrder(item.id)}
                          disabled={generatedOrders.includes(item.id)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            generatedOrders.includes(item.id)
                              ? 'bg-green-950 text-green-400 border border-green-800 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                          style={{ fontSize: '0.875rem', fontWeight: '500' }}
                        >
                          {generatedOrders.includes(item.id) ? '✓ Orden Generada' : 'Generar Orden'}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
