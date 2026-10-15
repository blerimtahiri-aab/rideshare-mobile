import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusiKerkeses } from "@/components/StatusiKerkeses";
import { gjejUdhetimin, type Udhetim } from "@/lib/udhetimet";

export const dynamic = "force-dynamic";

export default async function Kerkesa({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let udhetim: Udhetim | undefined;
  try {
    udhetim = await gjejUdhetimin(id);
  } catch {
    return (
      <main>
        <h1>RideShare</h1>
        <p className="lead" role="alert">
          Nuk u lidhëm me databazën. Provo përsëri.
        </p>
        <Link className="action" href="/">
          ← Kthehu te lista
        </Link>
      </main>
    );
  }

  if (!udhetim) notFound();

  return (
    <main>
      <Link className="back" href={`/udhetimi/${id}`}>
        ← Kthehu te detajet
      </Link>
      <p className="trip-meta">
        <span>
          {udhetim.nisja} → {udhetim.destinacioni}
        </span>
        <span>Ora {udhetim.ora}</span>
      </p>
      {udhetim.vende > 0 ? (
        <StatusiKerkeses udhetim={udhetim} />
      ) : (
        <h1>Nuk ka vende të lira.</h1>
      )}
    </main>
  );
}
