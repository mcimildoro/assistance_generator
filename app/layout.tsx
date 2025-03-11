import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Toaster } from "@/app/components/ui/sonner"; // Asegúrate de que la ruta es correcta

const urban = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Asistencia a Evento de Fútbol",
  description: "Registra tu asistencia al evento de fútbol",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <title>Asistencia a Evento de Fútbol</title>
      </head>
      <body className={`${urban.className} bg-background text-foreground light`}>
        {children}
        <Toaster /> 
      </body>
    </html>
  );
}
