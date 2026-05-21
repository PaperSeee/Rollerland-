export const revalidate = 60;

const COURSES = [
  {
    tag: "01",
    audience: "Enfants",
    schedule: "Mercredi & Samedi · 16h00–17h00",
    price: "10€",
    includes: "Patins inclus",
    desc: "Initiation et progression pour les enfants. Apprentissage des bases en toute sécurité avec nos moniteurs certifiés.",
    level: "Tous niveaux",
    age: "Enfants",
  },
  {
    tag: "02",
    audience: "Adultes",
    schedule: "Mercredi & Samedi · 17h30–19h00",
    price: "15€",
    includes: "Patins inclus",
    desc: "Cours collectifs pour adultes débutants ou intermédiaires. Technique, équilibre et plaisir au programme.",
    level: "Débutant–Intermédiaire",
    age: "Adultes",
  },
];

export default function CoursPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16">
        <p className="label-tag mb-4">Formation</p>
        <h1
          className="text-4xl md:text-6xl text-white mb-4"
          style={{ fontWeight: 300, letterSpacing: "-0.02em" }}
        >
          Cours de Roller
        </h1>
        <p className="text-sm max-w-2xl" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.8" }}>
          Apprenez à patiner ou perfectionnez votre technique avec nos moniteurs. Cours collectifs
          pour enfants et adultes, patins inclus dans le prix.
        </p>
      </div>

      {/* Course cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {COURSES.map((course) => (
          <div
            key={course.tag}
            className="p-8"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "0.5px solid rgba(127,119,221,0.3)",
            }}
          >
            <p className="label-tag mb-4">{course.tag} · {course.audience}</p>
            <h2
              className="text-2xl text-white mb-2"
              style={{ fontWeight: 400 }}
            >
              Cours {course.audience}
            </h2>

            <div className="flex flex-wrap gap-3 my-5">
              <span
                className="text-xs px-3 py-1"
                style={{ border: "0.5px solid rgba(127,119,221,0.4)", color: "rgba(255,255,255,0.5)" }}
              >
                {course.level}
              </span>
              <span
                className="text-xs px-3 py-1"
                style={{ border: "0.5px solid rgba(127,119,221,0.4)", color: "rgba(255,255,255,0.5)" }}
              >
                {course.includes}
              </span>
            </div>

            <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.8" }}>
              {course.desc}
            </p>

            <div
              className="flex items-center justify-between px-4 py-3 mb-6"
              style={{ background: "rgba(127,119,221,0.06)", border: "0.5px solid rgba(127,119,221,0.2)" }}
            >
              <div>
                <p className="label-tag mb-0.5">Horaire</p>
                <p className="text-xs text-white">{course.schedule}</p>
              </div>
              <div className="text-right">
                <p className="label-tag mb-0.5">Tarif</p>
                <p className="text-sm font-medium" style={{ color: "#7F77DD" }}>
                  {course.price}
                </p>
              </div>
            </div>

            <a
              href="https://www.tickettailor.com/events/retrobrusselsasbl/2140456"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center"
            >
              Réserver via TicketTailor
            </a>
          </div>
        ))}
      </div>

      {/* Start2Ride */}
      <div className="mb-16">
        <div
          className="p-8 md:p-10"
          style={{
            background: "rgba(127,119,221,0.05)",
            border: "0.5px solid rgba(127,119,221,0.35)",
          }}
        >
          <p className="label-tag mb-4">Nouveau · Outdoor</p>
          <h2
            className="text-2xl md:text-3xl text-white mb-3"
            style={{ fontWeight: 400 }}
          >
            Start2Ride
          </h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.8" }}>
            Entraînement en plein air au Parc de Laeken. Une belle occasion de pratiquer le roller
            dans un environnement naturel avec l&apos;encadrement de nos moniteurs.
          </p>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            style={{ borderTop: "0.5px solid rgba(127,119,221,0.15)", paddingTop: "1.5rem" }}
          >
            <div>
              <p className="label-tag mb-1">Date</p>
              <p className="text-sm text-white">Samedi 30 mai</p>
            </div>
            <div>
              <p className="label-tag mb-1">Horaire</p>
              <p className="text-sm text-white">10h00 – 12h00</p>
            </div>
            <div>
              <p className="label-tag mb-1">Lieu</p>
              <p className="text-sm text-white">Parc de Laeken</p>
            </div>
          </div>

          <a
            href="https://www.tickettailor.com/events/retrobrusselsasbl/2211764"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Réserver Start2Ride
          </a>
        </div>
      </div>

      {/* Own skates note */}
      <div
        className="p-6"
        style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(127,119,221,0.15)" }}
      >
        <p className="label-tag mb-2">Patins personnels</p>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.8" }}>
          Si vous venez avec vos propres patins, les protections sont gratuites. Les patins de location
          sont inclus dans le prix du cours.
        </p>
      </div>
    </div>
  );
}
