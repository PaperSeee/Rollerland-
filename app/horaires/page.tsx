export const revalidate = 60;

const SCHEDULE = [
  {
    day: "Mercredi",
    hours: "12h00 – 20h00",
    activities: ["Cours enfants 16h–17h", "Cours adultes 17h30–19h", "Accès libre"],
    note: null,
  },
  {
    day: "Jeudi",
    hours: "Fermé",
    activities: [],
    note: "Ouvert sur réservation pour groupes",
  },
  {
    day: "Vendredi",
    hours: "17h00 – 24h00",
    activities: ["Disco Roller"],
    note: null,
  },
  {
    day: "Samedi",
    hours: "12h00 – 24h00",
    activities: ["Cours enfants 16h–17h", "Cours adultes 17h30–19h", "Disco Roller"],
    note: null,
  },
  {
    day: "Dimanche",
    hours: "16h00 – 20h00",
    activities: ["Accès libre"],
    note: "Juin–Octobre : 12h–20h",
  },
  {
    day: "Lundi",
    hours: "Fermé",
    activities: [],
    note: "Ouvert sur réservation pour groupes",
  },
  {
    day: "Mardi",
    hours: "Fermé",
    activities: [],
    note: "Ouvert sur réservation pour groupes",
  },
];

const CLOSURES = [
  { period: "16 – 24 mai", reason: "Brocante / Événement spécial" },
  { period: "29 – 31 mai", reason: "Fermeture exceptionnelle" },
  { period: "13 juin", reason: "Fermé avant 19h" },
];

export default function HorairesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16">
        <p className="label-tag mb-4">Planning</p>
        <h1
          className="text-4xl md:text-6xl text-white mb-4"
          style={{ fontWeight: 300, letterSpacing: "-0.02em" }}
        >
          Horaires
        </h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.8" }}>
          En dehors des heures normales, la piste est disponible sur réservation pour les groupes.
        </p>
      </div>

      {/* Weekly schedule */}
      <div className="mb-20">
        <p className="label-tag mb-6">Semaine type</p>
        <div style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}>
          {SCHEDULE.map((slot, i) => (
            <div
              key={slot.day}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 py-6"
              style={{
                borderBottom:
                  i < SCHEDULE.length - 1 ? "0.5px solid rgba(127,119,221,0.15)" : "none",
                background:
                  slot.hours === "Fermé"
                    ? "transparent"
                    : "rgba(127,119,221,0.03)",
              }}
            >
              {/* Day */}
              <div className="flex items-center gap-4">
                <span
                  className="text-sm font-medium text-white uppercase tracking-wide"
                  style={{ letterSpacing: "0.1em", minWidth: 100 }}
                >
                  {slot.day}
                </span>
              </div>

              {/* Hours */}
              <div className="flex items-center">
                <span
                  className="text-sm"
                  style={{
                    color: slot.hours === "Fermé" ? "rgba(255,255,255,0.25)" : "#7F77DD",
                    fontWeight: 500,
                  }}
                >
                  {slot.hours}
                </span>
              </div>

              {/* Activities + note */}
              <div>
                {slot.activities.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {slot.activities.map((a) => (
                      <span
                        key={a}
                        className="text-xs px-2 py-0.5"
                        style={{
                          border: "0.5px solid rgba(127,119,221,0.4)",
                          color: "rgba(255,255,255,0.6)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                )}
                {slot.note && (
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {slot.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exceptional closures */}
      <div className="mb-20">
        <p className="label-tag mb-6">Fermetures exceptionnelles</p>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {CLOSURES.map((c) => (
            <div
              key={c.period}
              className="p-6"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(127,119,221,0.25)",
              }}
            >
              <p
                className="text-sm font-medium mb-2"
                style={{ color: "#7F77DD", letterSpacing: "0.05em" }}
              >
                {c.period}
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                {c.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Info box */}
      <div
        className="p-8"
        style={{ background: "rgba(127,119,221,0.06)", border: "0.5px solid rgba(127,119,221,0.3)" }}
      >
        <p className="label-tag mb-3">Important</p>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.8" }}>
          Les horaires peuvent être modifiés en cas d&apos;événement spécial ou de brocante. Suivez-nous
          sur WhatsApp pour les mises à jour en temps réel.
        </p>
        <a
          href="https://wa.me/32484772593"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline mt-6 w-fit"
        >
          WhatsApp +32 484 77 25 93
        </a>
      </div>
    </div>
  );
}
