"use client";

import { Package, User, AlertTriangle, TrendingUp } from "lucide-react";
import { useState } from "react";

// Mock data
const mockProducts = [
  {
    id: 1,
    producto: "Camiseta Deportiva",
    atributos: "M / Azul",
    stockActual: 12,
    rop: 15,
    cantidadSugerida: 50,
    isUrgent: true,
  },
  {
    id: 2,
    producto: "Pantalón Casual",
    atributos: "L / Negro",
    stockActual: 8,
    rop: 20,
    cantidadSugerida: 45,
    isUrgent: true,
  },
  {
    id: 3,
    producto: "Zapatillas Running",
    atributos: "42 / Gris",
    stockActual: 25,
    rop: 18,
    cantidadSugerida: 30,
    isUrgent: false,
  },
  {
    id: 4,
    producto: "Chaqueta Invierno",
    atributos: "XL / Verde",
    stockActual: 5,
    rop: 12,
    cantidadSugerida: 40,
    isUrgent: true,
  },
  {
    id: 5,
    producto: "Shorts Deportivos",
    atributos: "S / Rojo",
    stockActual: 30,
    rop: 25,
    cantidadSugerida: 35,
    isUrgent: false,
  },
  {
    id: 6,
    producto: "Gorra Casual",
    atributos: "Única / Azul",
    stockActual: 15,
    rop: 22,
    cantidadSugerida: 60,
    isUrgent: false,
  },
];

const urgentAlerts = mockProducts.filter((p) => p.isUrgent);

export default function DashboardPage() {
  const [approvedOrders, setApprovedOrders] = useState<number[]>([]);

  const handleApproveOrder = (id: number) => {
    setApprovedOrders([...approvedOrders, id]);
  };

  const totalStockoutAlerts = urgentAlerts.length;
  const proyectedRevenue = mockProducts.reduce(
    (sum, p) => sum + p.cantidadSugerida * 150,
    0
  );

  return (
    <>
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 px-8 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-zinc-100">Dashboard de Analítica</h2>
          <p className="text-zinc-400 mt-0.5" style={{ fontSize: "0.875rem" }}>
            Viernes, 3 de Abril 2026
          </p>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-zinc-800">
          <div className="size-9 rounded-full bg-blue-600 flex items-center justify-center">
            <User className="size-5 text-white" />
          </div>
          <div>
            <p className="text-zinc-100" style={{ fontSize: "0.875rem" }}>
              Gerente
            </p>
            <p className="text-zinc-400" style={{ fontSize: "0.75rem" }}>
              admin@nexo.com
            </p>
          </div>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="px-8 py-6 bg-zinc-950">
        <div className="grid grid-cols-3 gap-6">
          {/* Total SKUs */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-zinc-400" style={{ fontSize: "0.875rem" }}>
                Total SKUs
              </p>
              <Package className="size-5 text-blue-500" />
            </div>
            <p
              className="text-zinc-100"
              style={{ fontSize: "2rem", fontWeight: "600" }}
            >
              1,247
            </p>
            <p className="text-green-500 mt-2" style={{ fontSize: "0.75rem" }}>
              ↑ 12% vs mes anterior
            </p>
          </div>

          {/* Alertas Stockout */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-zinc-400" style={{ fontSize: "0.875rem" }}>
                Alertas Stockout
              </p>
              <AlertTriangle className="size-5 text-red-500" />
            </div>
            <p
              className="text-zinc-100"
              style={{ fontSize: "2rem", fontWeight: "600", color: "#ef4444" }}
            >
              {totalStockoutAlerts}
            </p>
            <p className="text-red-400 mt-2" style={{ fontSize: "0.75rem" }}>
              Requieren atención inmediata
            </p>
          </div>

          {/* Oportunidad de Venta Proyectada */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-zinc-400" style={{ fontSize: "0.875rem" }}>
                Oportunidad de Venta Proyectada
              </p>
              <TrendingUp className="size-5 text-green-500" />
            </div>
            <p
              className="text-zinc-100"
              style={{ fontSize: "2rem", fontWeight: "600", color: "#10b981" }}
            >
              {proyectedRevenue.toLocaleString()} Bs
            </p>
            <p className="text-green-400 mt-2" style={{ fontSize: "0.75rem" }}>
              Basado en sugerencias actuales
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-8 pb-8 flex gap-6 overflow-hidden">
        {/* Data Table */}
        <div className="flex-1 bg-zinc-900 rounded-xl border border-zinc-800 flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800">
            <h3 className="text-zinc-100">Sugerencias Automáticas de Compra</h3>
            <p className="text-zinc-400 mt-1" style={{ fontSize: "0.875rem" }}>
              Recomendaciones basadas en análisis predictivo
            </p>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full">
              <thead className="bg-zinc-800/50 sticky top-0">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-zinc-400"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                    }}
                  >
                    Producto
                  </th>
                  <th
                    className="px-6 py-3 text-left text-zinc-400"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                    }}
                  >
                    Atributos
                  </th>
                  <th
                    className="px-6 py-3 text-center text-zinc-400"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                    }}
                  >
                    Stock Actual
                  </th>
                  <th
                    className="px-6 py-3 text-center text-zinc-400"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                    }}
                  >
                    ROP
                  </th>
                  <th
                    className="px-6 py-3 text-center text-zinc-400"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                    }}
                  >
                    Cantidad Sugerida
                  </th>
                  <th
                    className="px-6 py-3 text-center text-zinc-400"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                    }}
                  >
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`border-b border-zinc-800 ${
                      index % 2 === 0 ? "bg-zinc-900" : "bg-zinc-900/50"
                    } hover:bg-zinc-800/50 transition-colors`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {product.isUrgent && (
                          <AlertTriangle className="size-4 text-red-500" />
                        )}
                        <span className="text-zinc-100">
                          {product.producto}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {product.atributos}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full ${
                          product.stockActual < product.rop
                            ? "bg-red-950 text-red-400 border border-red-800"
                            : "bg-green-950 text-green-400 border border-green-800"
                        }`}
                        style={{ fontSize: "0.875rem", fontWeight: "500" }}
                      >
                        {product.stockActual}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-zinc-400">
                      {product.rop}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className="inline-block px-3 py-1 rounded-full bg-blue-950 text-blue-400 border border-blue-800"
                        style={{ fontSize: "0.875rem", fontWeight: "500" }}
                      >
                        {product.cantidadSugerida}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleApproveOrder(product.id)}
                        disabled={approvedOrders.includes(product.id)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          approvedOrders.includes(product.id)
                            ? "bg-green-950 text-green-400 border border-green-800 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                        style={{ fontSize: "0.875rem" }}
                      >
                        {approvedOrders.includes(product.id)
                          ? "✓ Aprobado"
                          : "Aprobar Orden"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar - Alertas Urgentes */}
        <div className="w-80 bg-zinc-900 rounded-xl border border-zinc-800 flex flex-col overflow-hidden shrink-0">
          <div className="px-6 py-4 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-red-500" />
              <h3 className="text-zinc-100">Alertas Urgentes</h3>
            </div>
            <p className="text-zinc-400 mt-1" style={{ fontSize: "0.875rem" }}>
              Productos bajo el umbral mínimo
            </p>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-3">
              {urgentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 rounded-lg border border-red-900/50 bg-red-950/30"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p
                      className="text-zinc-100"
                      style={{ fontSize: "0.875rem", fontWeight: "500" }}
                    >
                      {alert.producto}
                    </p>
                    <span
                      className="px-2 py-0.5 rounded-full bg-red-600 text-white"
                      style={{ fontSize: "0.625rem", fontWeight: "600" }}
                    >
                      URGENTE
                    </span>
                  </div>
                  <p
                    className="text-zinc-400 mb-2"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {alert.atributos}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-red-900/50">
                    <div>
                      <p
                        className="text-zinc-500"
                        style={{ fontSize: "0.625rem" }}
                      >
                        Stock Actual
                      </p>
                      <p
                        className="text-red-400"
                        style={{ fontSize: "0.875rem", fontWeight: "600" }}
                      >
                        {alert.stockActual} unidades
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className="text-zinc-500"
                        style={{ fontSize: "0.625rem" }}
                      >
                        ROP
                      </p>
                      <p
                        className="text-zinc-100"
                        style={{ fontSize: "0.875rem", fontWeight: "600" }}
                      >
                        {alert.rop} unidades
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full h-2 bg-red-950 rounded-full overflow-hidden border border-red-900/50">
                      <div
                        className="h-full bg-red-600 rounded-full transition-all"
                        style={{
                          width: `${(alert.stockActual / alert.rop) * 100}%`,
                        }}
                      />
                    </div>
                    <p
                      className="text-red-400 mt-1 text-center"
                      style={{ fontSize: "0.625rem" }}
                    >
                      {Math.round((alert.stockActual / alert.rop) * 100)}% del
                      mínimo
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
