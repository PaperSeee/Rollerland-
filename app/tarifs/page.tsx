import Link from "next/link";
import { getRollerland } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

const GROUPS = [
  { name: "Wheels Deal", desc: "Location de patins uniquement", kids: "5€", adults: "7€", highlight: false },
  { name: "Refresh Yourself", desc: "Patins + 2 boissons au choix", kids: "10€", adults: "14€", highlight: false },
  { name: "Birthday Party", desc: "Formule anniversaire standard", kids: "14€", adults: "18€", highlight: true },
  { name: "Birthday Party Plus", desc: "Formule anniversaire premium", kids: "20€", adults: "24€", highlight: true },
  { name: "Team Building", desc: "Patins + animation + encadrement", kids: "16€", adults: "23€", highlight: false },
  { name: "After Work", desc: "Soirée afterwork tout inclus", kids: "—", adults: "30€", highlight: false },
  { name: "School Deal", desc: "Groupes scolaires (16+ : 7€)", kids: "5€", adults: "—", highlight: false },
];

const OPTIONS = [
  { label: "Cours / animation privé(e)", price: "75€/heure" },
  { label: "Karaoké", price: "75€/heure" },
];

const DRINKS_FALLBACK = [
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

const FOOD_FALLBACK = [
  { name: "Mini bar de chocolat", price: "0,50€" },
  { name: "Snacks variés", price: "2€" },
  { name: "Gâteau au chocolat (part)", price: "3,50€" },
  { name: "Pizza (petite)", price: "6€" },
  { name: "Pizza (normale)", price: "10€" },
  { name: "Saucisse (bœuf, ail, noix)", price: "6€" },
];

function Row({ label, price, desc, last }: { label: string; price: string; desc?: string; last?: boolean }) {
  return (
    <div
      className="flex items-center justify-between px-5 py-4 hover-lift transition-all"
      style={{ borderBottom: last ? "none" : "0.5px solid rgba(127,119,221,0.1)", background: "rgba(255,255,255,0.01)" }}
    >
      <div>
        <p className="text-sm text-white" style={{ fontWeight: 400 }}>{label}</p>
        {desc && <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{desc}</p>}
      </div>
      <p className="text-sm font-medium flex-shrink-0 ml-4" style={{ color: "#7F77DD" }}>{price}</p>
    </div>
  );
}

export default async function TarifsPage() {
  const acf = await getRollerland();

  const INDIVIDUAL = [
    { label: "Enfant (−16 ans)", price: acf.tarif_enfant || "6€", desc: "Location de patins incluse" },
    { label: "Adulte", price: acf.tarif_adulte || "8€", desc: "Location de patins incluse" },
    { label: "Protection", price: acf.tarif_protection || "1€/paire", desc: "Genouillères, coudières, poignets" },
    { label: "Vestiaire", price: acf.tarif_vestiaire || "1€", desc: "Casier sécurisé" },
  ];

  const DRINKS = acf.menu_boissons?.length
    ? acf.menu_boissons.map((d) => ({ name: d.nom, price: d.prix }))
    : DRINKS_FALLBACK;

  const FOOD = acf.menu_nourriture?.length
    ? acf.menu_nourriture.map((f) => ({ name: f.nom, price: f.prix }))
    : FOOD_FALLBACK;

  const groupRows = acf.forfaits_groupe?.length
    ? acf.forfaits_groupe.map((g, i) => ({
        name: g.nom,
        desc: g.description,
        kids: g.prix_enfant,
        adults: g.prix_adulte,
        highlight: i === 2 || i === 3,
      }))
    : GROUPS;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16 animate-fade-up">
        <p className="label-tag mb-4">Tarification</p>
        <h1 className="text-5xl md:text-7xl text-white mb-4" style={{ fontWeight: 300, letterSpacing: "-0.03em", lineHeight: "0.95" }}>
          Tarifs
        </h1>
        <p className="text-sm mt-6 max-w-lg" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.8" }}>
          Tous les tarifs sont par personne. Réservation obligatoire pour les groupes. Patins inclus dans tous les forfaits groupe.
        </p>
      </div>

      {/* Individual + options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 animate-fade-up delay-100">
        <div>
          <p className="label-tag mb-4">Accès individuel</p>
          <div style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}>
            {INDIVIDUAL.map((t, i) => (
              <Row key={t.label} label={t.label} price={t.price} desc={t.desc} last={i === INDIVIDUAL.length - 1} />
            ))}
          </div>
        </div>
        <div>
          <p className="label-tag mb-4">Options supplémentaires</p>
          <div style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}>
            {OPTIONS.map((o, i) => (
              <Row key={o.label} label={o.label} price={o.price} last={i === OPTIONS.length - 1} />
            ))}
          </div>
          <div
            className="mt-4 p-4"
            style={{ border: "0.5px solid rgba(127,119,221,0.15)", background: "rgba(255,255,255,0.02)" }}
          >
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)", lineHeight: "1.7" }}>
              Protections gratuites si vous venez avec vos propres patins. Patins inclus dans tous les forfaits groupe.
            </p>
          </div>
        </div>
      </div>

      {/* Group packages */}
      <div className="mb-16 animate-fade-up delay-200">
        <div className="flex items-end justify-between mb-4">
          <p className="label-tag">Forfaits groupe</p>
          <Link href="/contact" className="text-xs uppercase" style={{ color: "rgba(127,119,221,0.5)", letterSpacing: "0.1em" }}>
            Réserver →
          </Link>
        </div>
        <div style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}>
          <div
            className="grid grid-cols-4 px-5 py-3"
            style={{ borderBottom: "0.5px solid rgba(127,119,221,0.2)", background: "rgba(127,119,221,0.05)" }}
          >
            <p className="label-tag col-span-2">Formule</p>
            <p className="label-tag text-center">Enfant</p>
            <p className="label-tag text-center">Adulte</p>
          </div>
          {groupRows.map((g, i) => (
            <div
              key={g.name}
              className="grid grid-cols-4 px-5 py-4 items-center hover-lift transition-all"
              style={{
                borderBottom: i < groupRows.length - 1 ? "0.5px solid rgba(127,119,221,0.1)" : "none",
                background: g.highlight ? "rgba(127,119,221,0.04)" : "rgba(255,255,255,0.01)",
              }}
            >
              <div className="col-span-2 flex items-center gap-3">
                {g.highlight && <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#7F77DD" }} />}
                <div>
                  <p className="text-sm text-white" style={{ fontWeight: 400 }}>{g.name}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{g.desc}</p>
                </div>
              </div>
              <p className="text-sm text-center font-medium" style={{ color: g.kids === "—" ? "rgba(255,255,255,0.15)" : "#7F77DD" }}>{g.kids}</p>
              <p className="text-sm text-center font-medium" style={{ color: g.adults === "—" ? "rgba(255,255,255,0.15)" : "#7F77DD" }}>{g.adults}</p>
            </div>
          ))}
        </div>
        <div className="mt-5">
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

      {/* Bar + Food */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-up delay-300">
        <div>
          <p className="label-tag mb-4">Bar · Boissons</p>
          <div style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}>
            {DRINKS.map((d, i) => (
              <Row key={d.name} label={d.name} price={d.price} last={i === DRINKS.length - 1} />
            ))}
          </div>
        </div>
        <div>
          <p className="label-tag mb-4">Nourriture</p>
          <div style={{ border: "0.5px solid rgba(127,119,221,0.25)" }}>
            {FOOD.map((f, i) => (
              <Row key={f.name} label={f.name} price={f.price} last={i === FOOD.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
