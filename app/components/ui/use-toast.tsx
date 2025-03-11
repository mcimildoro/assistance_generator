
"use client";

import * as React from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";
import { useState, createContext, useContext, ReactNode } from "react";

// Definir el contexto del Toast
interface ToastContextType {
  showToast: (message: string, isSuccess?: boolean) => void;
}

// Crear un contexto para manejar los toasts
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Hook para usar el Toast en cualquier componente
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe ser usado dentro de ToastProvider");
  }
  return context;
}

// Proveedor del Toast para envolver la aplicación
export function ToastProviderComponent({ children }: { children: ReactNode }) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  const showToast = (message: string, isSuccess: boolean = true) => {
    setToastMessage(message);
    setIsSuccess(isSuccess);

    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastProvider>
        {toastMessage && (
          <Toast variant={isSuccess ? "default" : "destructive"}>
            <div className="grid gap-1">
              {isSuccess && <ToastTitle>Éxito</ToastTitle>}
              {!isSuccess && <ToastTitle>Error</ToastTitle>}
              <ToastDescription>{toastMessage}</ToastDescription>
            </div>
            <ToastClose />
          </Toast>
        )}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  );
}
