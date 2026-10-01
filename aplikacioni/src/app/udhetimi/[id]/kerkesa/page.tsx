import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusiKerkeses } from "@/components/StatusiKerkeses";
import { gjejUdhetimin } from "@/lib/udhetimet";

export default async function Kerkesa({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const udhetim = gjejUdhetimin(id);

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
