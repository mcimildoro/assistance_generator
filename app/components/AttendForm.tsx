"use client";

import { useState } from "react";

interface AttendFormProps {
  onAttend: (name: string) => void;
  hasAttended: boolean;
}

export default function AttendForm({ onAttend, hasAttended }: AttendFormProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim()) {
      onAttend(name.trim());
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Escribe tu nombre"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        required
        disabled={hasAttended} // ✅ Bloquear input si ya se ha registrado
      />
      <button
        type="submit"
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${hasAttended ? "bg-gray-500 cursor-not-allowed" : ""}`}
        disabled={hasAttended} // ✅ Bloquear botón si ya se ha registrado
      >
        {hasAttended ? "Ya estás registrado" : "Asistir"}
      </button>
    </form>
  );
}
