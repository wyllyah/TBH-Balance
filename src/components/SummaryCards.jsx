import { createElement } from "react";
import {
  Archive,
  LockKeyhole,
  ShoppingBag,
} from "lucide-react";
import { formatCurrency } from "../utils";

function SummaryCard({ icon, label, value, detail, tone = "default" }) {
  return (
    <article className={`summary-card summary-card-${tone}`}>
      <div className="summary-icon">
        {createElement(icon, { size: 19 })}
      </div>
      <div className="min-w-0">
        <p className="summary-label">{label}</p>
        <p className="summary-value">{value}</p>
        {detail && <p className="summary-detail">{detail}</p>}
      </div>
    </article>
  );
}

export default function SummaryCards({ items }) {
  const statusSummary = items.reduce(
    (summary, item) => {
      const key =
        item.status === "Vendido"
          ? "sold"
          : item.status === "Bloqueado"
            ? "locked"
            : null;

      if (!key) return summary;

      summary[key].value += Number(item.quantity) * Number(item.value);
      summary[key].quantity += Number(item.quantity);
      return summary;
    },
    {
      locked: { value: 0, quantity: 0 },
      sold: { value: 0, quantity: 0 },
    },
  );

  return (
    <section className="summary-grid" aria-label="Resumo do inventário">
      <SummaryCard
        icon={Archive}
        label="Itens cadastrados"
        value={items.length.toLocaleString("pt-BR")}
        detail={items.length === 1 ? "registro no inventário" : "registros no inventário"}
      />
      <SummaryCard
        icon={LockKeyhole}
        label="Total bloqueado"
        value={formatCurrency(statusSummary.locked.value)}
        detail={`${statusSummary.locked.quantity.toLocaleString("pt-BR")} unidades`}
        tone="locked"
      />
      <SummaryCard
        icon={ShoppingBag}
        label="Total vendido"
        value={formatCurrency(statusSummary.sold.value)}
        detail={`${statusSummary.sold.quantity.toLocaleString("pt-BR")} unidades`}
        tone="sold"
      />
    </section>
  );
}
