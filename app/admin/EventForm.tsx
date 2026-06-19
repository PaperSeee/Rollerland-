import Link from "next/link";

export interface EventFormValues {
  date?: string; // YYYY-MM-DD
  day?: string;
  theme?: string;
  description?: string;
  dj?: string;
  time?: string;
  image?: string;
  special?: boolean;
}

const FIELD_STYLE = {
  border: "0.5px solid rgba(127,119,221,0.4)",
  background: "transparent",
} as const;

function Field({
  label,
  name,
  defaultValue,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="label-tag">
        {label}
        {required && <span style={{ color: "#9B92F0" }}> *</span>}
      </span>
      <input
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="px-4 py-2.5 text-sm text-white outline-none"
        style={FIELD_STYLE}
      />
    </label>
  );
}

// Server-component form. `action` is a Server Action already bound to the right
// mutation (create or update). Rendered by both new and edit pages.
export default function EventForm({
  action,
  values = {},
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  values?: EventFormValues;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex flex-col gap-5 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Date" name="date" defaultValue={values.date} required placeholder="2026-06-13" />
        <Field label="Jour" name="day" defaultValue={values.day} required placeholder="Samedi" />
      </div>
      <Field label="Thème" name="theme" defaultValue={values.theme} required placeholder="Summer Opening" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Horaire" name="time" defaultValue={values.time} required placeholder="17h00 – 00h00" />
        <Field label="DJ" name="dj" defaultValue={values.dj} placeholder="DJ Summer" />
      </div>
      <label className="flex flex-col gap-2">
        <span className="label-tag">Description</span>
        <textarea
          name="description"
          defaultValue={values.description}
          rows={3}
          className="px-4 py-2.5 text-sm text-white outline-none"
          style={FIELD_STYLE}
        />
      </label>
      <Field label="Image (URL)" name="image" defaultValue={values.image} placeholder="https://…" />
      <label className="flex items-center gap-3">
        <input type="checkbox" name="special" defaultChecked={values.special} />
        <span className="text-sm text-white">Événement spécial</span>
      </label>

      <div className="flex items-center gap-4 mt-2">
        <button type="submit" className="btn-primary">
          {submitLabel}
        </button>
        <Link
          href="/admin"
          className="text-xs uppercase tracking-wide hover:text-white transition-colors"
          style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}
