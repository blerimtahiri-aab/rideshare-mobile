import Link from "next/link";
import { tekstiVendeve, type Udhetim } from "@/lib/udhetimet";

export function KartaUdhetimi({ udhetim }: { udhetim: Udhetim }) {
  return (
    <article className="trip-card">
      <h2>
        {udhetim.nisja} → {udhetim.destinacioni}
      </h2>
      <p className="trip-meta">
        <span>Ora {udhetim.ora}</span>
        <span className={udhetim.vende > 0 ? "badge" : "badge full"}>
          {tekstiVendeve(udhetim.vende)}
        </span>
      </p>
      <Link className="action secondary" href={`/udhetimi/${udhetim.id}`}>
        Shiko detajet
      </Link>
    </article>
  );
}
