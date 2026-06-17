import "../styles/index.css";

export const metadata = {
  title: "Nexo - Analítica Predictiva",
  description: "Sistema de reposición inteligente para micro-marcas impulsado por IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      {/* 
        Root Layout "Impeccable"
        - Elimina el background genérico o "AI slop"
        - Establece un color de fondo neutro intencional pero sin "crema/arena" o "gris" lavado
        - Previene rebotes de scroll o comportamientos inesperados en el body
      */}
      <body className="antialiased bg-zinc-950 text-zinc-100 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
