"use client";

import { useState, useEffect } from "react";
import AttendForm from "./components/AttendForm";
import AttendeesList from "./components/AttendeesList";

export default function Home() {
  const [attendees, setAttendees] = useState<{ name: string; timestamp: string }[]>([]);

  // ✅ Cargar asistentes desde localStorage al montar la página
  useEffect(() => {
    const storedAttendees = localStorage.getItem("attendees");
    if (storedAttendees) {
      setAttendees(JSON.parse(storedAttendees));
    }
  }, []);

  // ✅ Función para registrar asistencia
  const handleAttend = (name: string) => {
    const now = new Date();
    const newAttendee = {
      name,
      timestamp: now.toISOString(),
    };

    const updatedAttendees = [...attendees, newAttendee];
    setAttendees(updatedAttendees);
    localStorage.setItem("attendees", JSON.stringify(updatedAttendees)); // ✅ Guardar en localStorage
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <h1 className="text-4xl font-bold mb-8">Evento de Fútbol</h1>

      <AttendForm onAttend={handleAttend} />
      <AttendeesList attendees={attendees} />
    </main>
  );
}
