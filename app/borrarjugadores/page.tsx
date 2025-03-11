"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/superbaseClient"; // Asegúrate de importar correctamente el cliente de Supabase

interface Attendee {
  id: string;
  name: string;
  timestamp: string;
}

export default function AdminPage() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const router = useRouter();

  // ✅ Obtener la lista de asistentes desde Supabase
  useEffect(() => {
    async function fetchAttendees() {
      const { data, error } = await supabase.from("attendees").select("*");
      if (error) {
        console.error("❌ Error obteniendo asistentes:", error.message);
      } else {
        setAttendees(data);
      }
    }

    fetchAttendees();
  }, []);

  // ✅ Eliminar un asistente de la base de datos
  const removeAttendee = async (id: string) => {
    const { error } = await supabase.from("attendees").delete().match({ id });

    if (error) {
      console.error("❌ Error eliminando asistente:", error.message);
    } else {
      setAttendees((prev) => prev.filter((attendee) => attendee.id !== id));
    }
  };

  // ✅ Reiniciar el evento: Borra todos los asistentes y resetea `localStorage`
  const resetAttendees = async () => {
    console.log("🔄 Intentando reiniciar evento...");
  
    try {
      // 🔍 Obtener asistentes antes de eliminar (para verificar)
      const { data: existingData, error: fetchError } = await supabase.from("attendees").select("*");
      console.log("📋 Asistentes antes de eliminar:", existingData);
  
      if (fetchError) throw new Error("🔴 Error obteniendo datos: " + fetchError.message);
  
      // 🗑️ Elimina TODOS los registros correctamente
      const { error } = await supabase.from("attendees").delete().gt("timestamp", "0001-01-01");
  
      if (error) throw new Error("🔴 Error al eliminar asistentes: " + error.message);
  
      console.log("✅ Todos los asistentes han sido eliminados correctamente");
  
      // 🔄 Limpiar `localStorage` y reiniciar `hasAttended`
      if (typeof window !== "undefined") {
        localStorage.removeItem("attendees");
        localStorage.removeItem("hasAttended"); // 🔥 Esto permite volver a registrarse
        console.log("✅ LocalStorage limpiado correctamente");
      }
  
      // 🔄 Refrescar estado en el frontend
      setAttendees([]); // Vacía la lista de asistentes
  
      // 🚀 Opcional: Recargar la página para reflejar los cambios
      window.location.reload();
  
    } catch (error) {
      console.error("❌ Error al reiniciar evento:", error instanceof Error ? error.message : "Unknown error");
    }
  };
  
  
  

  return (
    <main className="flex min-h-screen flex-col items-center p-14">
      <h1 className="text-4xl font-bold mb-6">Administrar Evento</h1>

      {/* Tabla de asistentes */}
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Lista de Asistentes</h2>
        {attendees.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">
                  Nombre
                </th>
                <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">
                  Hora de Llegada
                </th>
                <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((attendee) => (
                <tr key={attendee.id}>
                  <td className="py-2 px-4 border-b border-gray-200">{attendee.name}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {new Date(attendee.timestamp).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button
                      onClick={() => removeAttendee(attendee.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay asistentes registrados.</p>
        )}
      </div>

      {/* Botón para reiniciar la tabla */}
      <button
        onClick={resetAttendees}
        className="mt-6 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Reiniciar Asistentes
      </button>

      {/* Botón para volver a la página principal */}
      <button
        onClick={() => router.push("/")}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Volver al Evento
      </button>
    </main>
  );
}
