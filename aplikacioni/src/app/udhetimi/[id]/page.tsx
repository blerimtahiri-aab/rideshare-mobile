import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejUdhetimin } from "@/lib/udhetimet";

export default async function Detajet({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const udhetim = gjejUdhetimin(id);

  if (!udhetim) notFound();

  return (
    <main>
      <Link className="back" href="/">
        ← Kthehu te lista
      </Link>
      <h1>
        {udhetim.nisja} → {udhetim.destinacioni}
      </h1>
      <dl className="details">
        <div>
          <dt>Ora</dt>
          <dd>{udhetim.ora}</dd>
        </div>
        <div>
          <dt>Vendtakimi</dt>
          <dd>{udhetim.vendtakimi}</dd>
        </div>
        <div>
          <dt>Vende të lira</dt>
          <dd>{udhetim.vende}</dd>
        </div>
      </dl>
      {udhetim.vende > 0 ? (
        <Link className="action" href={`/udhetimi/${id}/kerkesa`}>
          Kërko vend
        </Link>
      ) : (
        <button className="action" disabled>
          Nuk ka vende të lira
        </button>
      )}
    </main>
  );
}
