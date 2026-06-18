"use client";
import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { TrendingUp, Calendar, AlertCircle, Lightbulb } from 'lucide-react';
import { useConfigStore } from '../store/configStore';

const mockHistoricalData = [
  { mes: 'Ene', ventas: 4000, proyectado: 4100 },
  { mes: 'Feb', ventas: 3000, proyectado: 3200 },
  { mes: 'Mar', ventas: 2000, proyectado: 2100 },
  { mes: 'Abr', ventas: 2780, proyectado: 2900 },
  { mes: 'May', ventas: 1890, proyectado: 2000 },
  { mes: 'Jun', ventas: 2390, proyectado: 2400 },
  { mes: 'Jul', ventas: 3490, proyectado: 3600 },
];

const mockCategoryData = [
  { category: 'Camisetas', velocity: 120, stock: 400 },
  { category: 'Pantalones', velocity: 85, stock: 200 },
  { category: 'Calzado', velocity: 65, stock: 150 },
  { category: 'Accesorios', velocity: 200, stock: 600 },
];

export function DemandaScreen() {
  const [timeRange, setTimeRange] = useState('6m');
  const { events } = useConfigStore();

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 overflow-auto h-full">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 px-8 py-6 shrink-0">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Análisis de Demanda</h1>
            <p className="text-zinc-400 mt-1 text-sm">
              Visualiza tendencias históricas y proyecciones de ventas basadas en IA.
            </p>
          </div>
          <div className="flex gap-2 bg-zinc-800/50 p-1 rounded-lg border border-zinc-700/50">
            {['1m', '3m', '6m', '1y'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  timeRange === range 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8 space-y-6">
        
        {/* Insights Proactivos */}
        {(events.carnaval || events.fexpocruz || events.climaInvierno) && (
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-5 flex items-start gap-4">
            <div className="bg-blue-500/20 p-2 rounded-lg shrink-0">
              <Lightbulb className="size-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-blue-100">Insights Proactivos de IA</h3>
              <div className="mt-2 space-y-2">
                {events.carnaval && (
                  <p className="text-sm text-blue-200/80">
                    <span className="font-semibold text-blue-300">Impacto Carnaval detectado:</span> Aumento proyectado del 45% en Shorts y Tops Blancos. Se sugiere adelantar pedidos a proveedores en 2 semanas.
                  </p>
                )}
                {events.fexpocruz && (
                  <p className="text-sm text-blue-200/80">
                    <span className="font-semibold text-blue-300">Proyección Fexpocruz:</span> Alta rotación esperada en Zapatillas y Accesorios premium. Revisar el stock de seguridad del catálogo B.
                  </p>
                )}
                {events.climaInvierno && (
                  <p className="text-sm text-blue-200/80">
                    <span className="font-semibold text-blue-300">Clima - Ola de Frío:</span> Pico de demanda inminente en Suéteres y Chaquetas. Posible quiebre de stock en 5 días si no se reabastece.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-zinc-400">Velocidad de Venta Global</h3>
              <TrendingUp className="size-5 text-blue-500" />
            </div>
            <p className="text-3xl font-semibold text-zinc-100">465 <span className="text-lg text-zinc-500 font-normal">un/semana</span></p>
            <p className="text-sm text-green-400 mt-2 flex items-center gap-1">
              <span>+12.5%</span> <span className="text-zinc-500">vs mes anterior</span>
            </p>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-zinc-400">Precisión del Forecast</h3>
              <Calendar className="size-5 text-purple-500" />
            </div>
            <p className="text-3xl font-semibold text-zinc-100">94.2%</p>
            <p className="text-sm text-zinc-500 mt-2">
              Basado en los últimos 30 días
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-zinc-400">Riesgo de Quiebre</h3>
              <AlertCircle className="size-5 text-orange-500" />
            </div>
            <p className="text-3xl font-semibold text-zinc-100">8 <span className="text-lg text-zinc-500 font-normal">SKUs</span></p>
            <p className="text-sm text-orange-400 mt-2 flex items-center gap-1">
              Requieren atención inmediata
            </p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Area Chart */}
          <div className="col-span-1 md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-medium text-zinc-100 mb-6">Tendencia Histórica y Proyección</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockHistoricalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProyectado" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="mes" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.5rem' }}
                    itemStyle={{ color: '#e4e4e7' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Area type="monotone" dataKey="ventas" name="Ventas Reales" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorVentas)" />
                  <Area type="monotone" dataKey="proyectado" name="Proyección" stroke="#a855f7" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorProyectado)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Secondary Bar Chart */}
          <div className="col-span-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-medium text-zinc-100 mb-6">Velocidad por Categoría</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockCategoryData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                  <XAxis type="number" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="category" type="category" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#27272a' }}
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.5rem' }}
                  />
                  <Bar dataKey="velocity" name="Vel. (un/sem)" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
