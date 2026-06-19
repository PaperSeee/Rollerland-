import { createEvent } from "../../actions";
import EventForm from "../../EventForm";

export const dynamic = "force-dynamic";

export default function NewEventPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <p className="label-tag mb-2">Disco Roller</p>
      <h1 className="text-3xl text-white mb-10" style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>
        Nouvel événement
      </h1>
      <EventForm action={createEvent} submitLabel="Créer l'événement" />
    </div>
  );
}
