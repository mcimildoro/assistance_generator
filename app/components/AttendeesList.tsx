interface Attendee {
    name: string
    timestamp: string
  }
  
  interface AttendeesListProps {
    attendees: Attendee[]
  }
  
  export default function AttendeesList({ attendees }: AttendeesListProps) {
    return (
      <div className="mt-8 w-full max-w-md">
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
              </tr>
            </thead>
            <tbody>
              {attendees.map((attendee, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-gray-200">{attendee.name}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {new Date(attendee.timestamp).toLocaleString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })} 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aún no hay asistentes registrados.</p>
        )}
      </div>
    )
  }
  
  