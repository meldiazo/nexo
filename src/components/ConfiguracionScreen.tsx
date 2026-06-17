"use client";
import { Settings, Plus, Save } from 'lucide-react';
import { useState } from 'react';

export function ConfiguracionScreen() {
  // Toggle states for eventos
  const [carnavalEnabled, setCarnavalEnabled] = useState(true);
  const [expocruzEnabled, setExpocruzEnabled] = useState(true);
  const [climaEnabled, setClimaEnabled] = useState(false);

  // Parameters
  const [stockSeguridad, setStockSeguridad] = useState('15');
  const [leadTimePromedio, setLeadTimePromedio] = useState('20');

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-zinc-950">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 px-8 py-6">
        <div className="flex items-center gap-3">
          <Settings className="size-6 text-blue-500" />
          <div>
            <h2 className="text-zinc-100">Configuración del Motor Predictivo</h2>
            <p className="text-zinc-400 mt-1" style={{ fontSize: '0.875rem' }}>
              Ajusta los parámetros del sistema de análisis y reabastecimiento
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 px-8 py-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 gap-6">
            {/* Panel Izquierdo - Estacionalidad y Eventos */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <div className="mb-6 flex justify-between items-start">
                <div>
                  <h3 className="text-zinc-100 mb-1">Estacionalidad y Eventos Locales</h3>
                  <p className="text-zinc-400" style={{ fontSize: '0.875rem' }}>
                    Configura factores externos que afectan la demanda
                  </p>
                </div>
                <a 
                  href="/configuracion/catalogo"
                  className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg transition-colors border border-zinc-700 text-sm font-medium"
                >
                  Gestionar Catálogo
                </a>
              </div>

              <div className="space-y-4 mb-6">
                {/* Toggle Carnaval */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                  <div>
                    <p className="text-zinc-100" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                      Impacto de Carnaval
                    </p>
                    <p className="text-zinc-400 mt-0.5" style={{ fontSize: '0.75rem' }}>
                      Ajusta predicción para temporada de carnaval
                    </p>
                  </div>
                  <button
                    onClick={() => setCarnavalEnabled(!carnavalEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      carnavalEnabled ? 'bg-blue-600' : 'bg-zinc-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        carnavalEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Toggle Expocruz */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                  <div>
                    <p className="text-zinc-100" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                      Efecto Expocruz
                    </p>
                    <p className="text-zinc-400 mt-0.5" style={{ fontSize: '0.75rem' }}>
                      Considera impacto de feria comercial Expocruz
                    </p>
                  </div>
                  <button
                    onClick={() => setExpocruzEnabled(!expocruzEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      expocruzEnabled ? 'bg-blue-600' : 'bg-zinc-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        expocruzEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Toggle Clima */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                  <div>
                    <p className="text-zinc-100" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                      Factor Clima
                    </p>
                    <p className="text-zinc-400 mt-0.5" style={{ fontSize: '0.75rem' }}>
                      Integra datos climáticos en el análisis predictivo
                    </p>
                  </div>
                  <button
                    onClick={() => setClimaEnabled(!climaEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      climaEnabled ? 'bg-blue-600' : 'bg-zinc-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        climaEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Botón Añadir Nuevo Evento */}
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300 transition-colors">
                <Plus className="size-4" />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Añadir Nuevo Evento</span>
              </button>
            </div>

            {/* Panel Derecho - Parámetros de Reabastecimiento */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <div className="mb-6">
                <h3 className="text-zinc-100 mb-1">Parámetros de Reabastecimiento</h3>
                <p className="text-zinc-400" style={{ fontSize: '0.875rem' }}>
                  Define reglas globales para el cálculo de órdenes
                </p>
              </div>

              <div className="space-y-6">
                {/* Stock de Seguridad Global */}
                <div>
                  <label className="block text-zinc-100 mb-2" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                    Stock de Seguridad Global (%)
                  </label>
                  <p className="text-zinc-400 mb-3" style={{ fontSize: '0.75rem' }}>
                    Porcentaje adicional de inventario para cubrir variabilidad de demanda
                  </p>
                  <div className="relative">
                    <input
                      type="number"
                      value={stockSeguridad}
                      onChange={(e) => setStockSeguridad(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-800 text-zinc-100 rounded-lg border border-zinc-700 focus:outline-none focus:border-blue-500 transition-colors"
                      style={{ fontSize: '0.875rem' }}
                      min="0"
                      max="100"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500" style={{ fontSize: '0.875rem' }}>
                      %
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all"
                        style={{ width: `${stockSeguridad}%` }}
                      />
                    </div>
                    <span className="text-zinc-400 min-w-[3rem] text-right" style={{ fontSize: '0.75rem' }}>
                      {stockSeguridad}%
                    </span>
                  </div>
                </div>

                {/* Lead Time Promedio */}
                <div>
                  <label className="block text-zinc-100 mb-2" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                    Lead Time Promedio (Días)
                  </label>
                  <p className="text-zinc-400 mb-3" style={{ fontSize: '0.75rem' }}>
                    Tiempo promedio desde la orden hasta la recepción del producto
                  </p>
                  <div className="relative">
                    <input
                      type="number"
                      value={leadTimePromedio}
                      onChange={(e) => setLeadTimePromedio(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-800 text-zinc-100 rounded-lg border border-zinc-700 focus:outline-none focus:border-blue-500 transition-colors"
                      style={{ fontSize: '0.875rem' }}
                      min="1"
                      max="365"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500" style={{ fontSize: '0.875rem' }}>
                      días
                    </span>
                  </div>
                  <p className="mt-2 text-zinc-500" style={{ fontSize: '0.75rem' }}>
                    Rango recomendado: 7-60 días
                  </p>
                </div>

                {/* Info adicional */}
                <div className="mt-8 p-4 rounded-lg bg-blue-950/30 border border-blue-900/50">
                  <p className="text-blue-400" style={{ fontSize: '0.75rem' }}>
                    💡 <strong>Tip:</strong> Valores más altos de stock de seguridad reducen el riesgo de quiebres,
                    pero aumentan los costos de inventario.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Botón Guardar */}
          <div className="mt-8 flex items-center justify-end gap-4">
            {saved && (
              <div className="flex items-center gap-2 text-green-400">
                <span className="inline-block size-2 rounded-full bg-green-400 animate-pulse" />
                <span style={{ fontSize: '0.875rem' }}>Configuración guardada exitosamente</span>
              </div>
            )}
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              style={{ fontWeight: '500' }}
            >
              <Save className="size-5" />
              <span>Guardar Configuración</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
