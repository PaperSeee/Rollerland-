export const revalidate = 60;

const INDIVIDUAL = [
  { label: "Enfant (−16 ans)", price: "6€" },
  { label: "Adulte", price: "8€" },
  { label: "Protection", price: "1€/paire" },
  { label: "Vestiaire", price: "1€" },
];

const GROUPS = [
  {
    name: "Wheels Deal",
    desc: "Location de patins uniquement",
    kids: "5€",
    adults: "7€",
  },
  {
    name: "Refresh Yourself",
    desc: "Patins + 2 boissons",
    kids: "10€",
    adults: "14€",
  },
  {
    name: "Birthday Party",
    desc: "Formule anniversaire standard",
    kids: "14€",
    adults: "18€",
  },
  {
    name: "Birthday Party Plus",
    desc: "Formule anniversaire premium",
    kids: "20€",
    adults: "24€",
  },
  {
    name: "Team Building",
    desc: "Activité d'équipe avec animation",
    kids: "16€",
    adults: "23€",
  },
  {
    name: "After Work",
    desc: "Soirée afterwork",
    kids: "—",
    adults: "30€",
  },
  {
    name: "School Deal",
    desc: "Groupes scolaires (16+ ans : 7€)",
    kids: "5€",
    adults: "—",
  },
];

const OPTIONS = [
  { label: "Cours/animation privé(e)", price: "75€/heure" },
  { label: "Karaoké", price: "75€/heure" },
];

const DRINKS = [
  { name: "Eau (bouteille)", price: "2€" },
  { name: "Boissons chaudes", price: "2,50€" },
  { name: "Soft drinks", price: "3€" },
  { name: "Energy drink", price: "4€" },
  { name: "Bière (Pils, 0%)", price: "3€" },
  { name: "IPA / Bière spéciale", price: "4€" },
  { name: "Vin (verre)", price: "4€" },
  { name: "Vin (25cl)", price: "6€" },
  { name: "Vin (75cl)", price: "15€" },
  { name: "Glühwein (hiver)", price: "4€" },
  { name: "Cava (verre)", price: "5€" },
  { name: "Cava (75cl)", price: "22€" },
  { name: "Mocktails", price: "6€" },
  { name: "Cocktails", price: "8€" },
];

const FOOD = [
  { name: "Mini bar de chocolat", price: "0,50€" },
  { name: "Snacks (chips, popcorn, gaufre, glace)", price: "2€" },
  { name: "Gâteau au chocolat (part)", price: "3,50€" },
  { name: "Pizza (petite)", price: "6€" },
  { name: "Pizza (normale)", price: "10€" },
  { name: "Saucisse (bœuf, ail, noix)", price: "6€" },
];

function PriceRow({
  label,
  price,
  last,
}: {
  label: string;
  price: string;
  last?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between px-5 py-3.5"
      style={{
        borderBottom: last ? "none" : "0.5px solid rgba(127,119,221,0.12)",
      }}
    >
      <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
        {label}
      </p>
      <p className="text-sm font-medium" style={{ color: "#7F77DD" }}>
        {price}
      </p>
    </div>
  );
}

export default function TarifsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16">
        <p className="label-tag mb-4">Tarification</p>
        <h1
          className="text-4xl md:text-6xl text-white mb-4"
          style={{ fontWeight: 300, letterSpacing: "-0.02em" }}
        >
          Tarifs
        </h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.8" }}>
          Tous les tarifs sont par personne. La réservation est obligatoire pour les groupes.
        </p>
      </div>

      {/* Individual */}
      <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <p className="label-tag mb-5">Accès individuel</p>
          <div style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}>
            {INDIVIDUAL.map((t, i) => (
              <PriceRow
                key={t.label}
                label={t.label}
                price={t.price}
                last={i === INDIVIDUAL.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Options */}
        <div>
          <p className="label-tag mb-5">Options supplémentaires</p>
          <div style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}>
            {OPTIONS.map((o, i) => (
              <PriceRow
                key={o.label}
                label={o.label}
                price={o.price}
                last={i === OPTIONS.length - 1}
              />
            ))}
          </div>
          <p
            className="text-xs mt-4"
            style={{ color: "rgba(255,255,255,0.3)", lineHeight: "1.7" }}
          >
            Patins inclus dans tous les forfaits groupe. Protections gratuites avec patins propres.
          </p>
        </div>
      </div>

      {/* Group packages */}
      <div className="mb-16">
        <p className="label-tag mb-6">Forfaits groupe</p>
        <div style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}>
          {/* Header */}
          <div
            className="grid grid-cols-3 px-5 py-3"
            style={{
              borderBottom: "0.5px solid rgba(127,119,221,0.2)",
              background: "rgba(127,119,221,0.05)",
            }}
          >
            <p className="label-tag">Formule</p>
            <p className="label-tag text-center">Enfant</p>
            <p className="label-tag text-center">Adulte</p>
          </div>
          {GROUPS.map((g, i) => (
            <div
              key={g.name}
              className="grid grid-cols-3 px-5 py-4 items-center"
              style={{
                borderBottom:
                  i < GROUPS.length - 1 ? "0.5px solid rgba(127,119,221,0.12)" : "none",
              }}
            >
              <div>
                <p className="text-sm text-white" style={{ fontWeight: 400 }}>
                  {g.name}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {g.desc}
                </p>
              </div>
              <p
                className="text-sm text-center font-medium"
                style={{ color: g.kids === "—" ? "rgba(255,255,255,0.2)" : "#7F77DD" }}
              >
                {g.kids}
              </p>
              <p
                className="text-sm text-center font-medium"
                style={{ color: g.adults === "—" ? "rgba(255,255,255,0.2)" : "#7F77DD" }}
              >
                {g.adults}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScMq5Q5slrGQ-F_TX8hcWAV93R2pKOhk-cTWFo-QbaXGTjRCg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Réserver un groupe
          </a>
        </div>
      </div>

      {/* Drinks + Food */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <p className="label-tag mb-5">Boissons</p>
          <div style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}>
            {DRINKS.map((d, i) => (
              <PriceRow
                key={d.name}
                label={d.name}
                price={d.price}
                last={i === DRINKS.length - 1}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="label-tag mb-5">Nourriture</p>
          <div style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}>
            {FOOD.map((f, i) => (
              <PriceRow
                key={f.name}
                label={f.name}
                price={f.price}
                last={i === FOOD.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
