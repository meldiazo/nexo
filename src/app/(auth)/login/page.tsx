"use client";

import { useState } from "react";
import { login } from "./actions";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl">
      <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight text-center mb-6">
        Acceso a Nexo
      </h1>
      
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-950/50 border border-red-900/50 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-400" htmlFor="email">
            Correo Corporativo
          </label>
          <input 
            id="email"
            name="email"
            type="email" 
            required
            className="w-full h-11 bg-zinc-950 border border-zinc-800 rounded-lg px-4 text-zinc-100 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="admin@ejemplo.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-400" htmlFor="password">
            Contraseña
          </label>
          <input 
            id="password"
            name="password"
            type="password" 
            required
            className="w-full h-11 bg-zinc-950 border border-zinc-800 rounded-lg px-4 text-zinc-100 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="••••••••"
          />
        </div>
        <button 
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-lg mt-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Autenticando..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
}
