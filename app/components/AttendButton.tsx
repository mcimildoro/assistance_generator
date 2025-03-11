"use client";

import { useToast } from "./ui/use-toast" // Asegúrate de que la ruta sea correcta
import { Button } from "./ui/button"; // Si usas el botón de ShadCN, impórtalo correctamente

interface AttendButtonProps {
  onAttend: () => void;
}

export default function AttendButton({ onAttend }: AttendButtonProps) {
  const { showToast } = useToast(); // Hook de ShadCN para mostrar toasts

  return (
    <Button
      onClick={() => {
        onAttend();
        showToast(`Asistencia registrada.`, true);
      }}
      variant="default" // Usa variantes si estás usando el sistema de botones de ShadCN
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      Asistir
    </Button>
  );
}
