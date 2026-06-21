import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateEvent } from "../../actions";
import EventForm from "../../EventForm";

export const dynamic = "force-dynamic";

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const event = await prisma.discoEvent.findUnique({ where: { id: params.id } });
  if (!event) notFound();

  // Bind the event id to the update action.
  const action = updateEvent.bind(null, event.id);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <p className="label-tag mb-2">Disco Roller</p>
      <h1 className="text-3xl text-white mb-10" style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>
        Edit event
      </h1>
      <EventForm
        action={action}
        submitLabel="Save"
        values={{
          date: event.date.toISOString().slice(0, 10),
          day: event.day,
          theme: event.theme,
          description: event.description,
          dj: event.dj ?? "",
          time: event.time,
          image: event.image ?? "",
          imagePosition: event.imagePosition ?? "center",
          special: event.special,
        }}
      />
    </div>
  );
}
