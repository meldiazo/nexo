export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      {/* 
        Layout B2B de Autenticación
        - Centrado, ideal para pantallas grandes y móviles.
        - Elimina distracciones.
      */}
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
