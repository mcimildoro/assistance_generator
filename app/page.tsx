"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/superbaseClient";
import AttendForm from "./components/AttendForm";
import AttendeesList from "./components/AttendeesList";

export default function Home() {
  const [attendees, setAttendees] = useState<{ name: string; timestamp: string }[]>([]);
  const [hasAttended, setHasAttended] = useState(false);

  // ✅ Revisar si la persona ya asistió (usando localStorage)
  useEffect(() => {
    const attended = localStorage.getItem("hasAttended");
    if (attended) {
      setHasAttended(true);
    } else {
      setHasAttended(false); // 🔥 Asegura que al reiniciar evento, se pueda volver a registrar
    }
  }, []);
  

  // ✅ Cargar asistentes desde Supabase
  useEffect(() => {
    async function fetchAttendees() {
      const { data, error } = await supabase.from("attendees").select("*");
      
      if (error) {
        console.error("❌ Error al obtener los asistentes:", error.message);
      } else {
        setAttendees(data);
      }
    }
    fetchAttendees();
  }, []);

  // ✅ Registrar asistencia en Supabase y bloquear nuevo registro
  const handleAttend = async (name: string) => {
    if (hasAttended) {
      alert("⚠️ Ya te has registrado, no puedes volver a hacerlo.");
      return;
    }

    try {
      const { error } = await supabase.from("attendees").insert([
        { name, timestamp: new Date().toISOString() },
      ]);

      if (error) throw error;

      // ✅ Bloquear nuevo registro y actualizar la lista
      localStorage.setItem("hasAttended", "true");
      setHasAttended(true);
      setAttendees((prev) => [...prev, { name, timestamp: new Date().toISOString() }]);
    } catch (error: unknown) {
      console.error("❌ Error registrando asistencia:", (error as Error).message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <h1 className="text-4xl font-bold mb-8">Evento de Fútbol</h1>
      <AttendForm onAttend={handleAttend} hasAttended={hasAttended} />
      <AttendeesList attendees={attendees} />
    </main>
  );
}
