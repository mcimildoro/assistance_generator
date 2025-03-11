"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Attendee {
  name: string;
  timestamp: string;
}

export default function AdminPage() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  //const [eventTitle, setEventTitle] = useState("Evento de Fútbol");
  const router = useRouter();

  // ✅ Cargar asistentes desde localStorage al montar la página
  useEffect(() => {
    const storedAttendees = localStorage.getItem("attendees");
    if (storedAttendees) {
      setAttendees(JSON.parse(storedAttendees));
    }
  }, []);

  // ✅ Cambiar título del evento
  {/*const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventTitle(e.target.value);
  };*/}

  // ✅ Eliminar un asistente individualmente
  const removeAttendee = (index: number) => {
    const updatedAttendees = attendees.filter((_, i) => i !== index);
    setAttendees(updatedAttendees);
    localStorage.setItem("attendees", JSON.stringify(updatedAttendees));
  };

  // ✅ Reiniciar toda la lista de asistentes
  const resetAttendees = () => {
    setAttendees([]);
    localStorage.removeItem("attendees"); // ✅ Borra los asistentes guardados
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-14">


      {/* Cambiar título del evento 
      <div className="mb-6 w-full max-w-md">
        <label className="block text-lg font-semibold mb-2">Título del Evento:</label>
        <input
          type="text"
          value={eventTitle}
          onChange={handleTitleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>
      
      */}
      

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
              {attendees.map((attendee, index) => (
                <tr key={index}>
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
                      onClick={() => removeAttendee(index)}
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
