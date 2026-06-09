import { PackageOpen, Plus, SearchX } from "lucide-react";
import ItemCard from "./ItemCard";

export default function ItemList({
  items,
  hasItems,
  onAddItem,
  onEdit,
  onDelete,
  onMarkAsSold,
  onChangeItemType,
}) {
  if (!items.length) {
    return (
      <section className="empty-state">
        <div className="empty-icon">
          {hasItems ? <SearchX size={31} /> : <PackageOpen size={31} />}
        </div>
        <h2>{hasItems ? "Nenhum item encontrado" : "Seu inventário está vazio"}</h2>
        <p>
          {hasItems
            ? "Tente ajustar a busca ou remover algum filtro."
            : "Cadastre seu primeiro item para começar a acompanhar seu saldo."}
        </p>
        {!hasItems && (
          <button className="primary-button mt-5" onClick={onAddItem}>
            <Plus size={18} />
            Adicionar primeiro item
          </button>
        )}
      </section>
    );
  }

  return (
    <section className="item-list" aria-live="polite">
      <div className="ledger-heading">
        <div>
          <span>Registro do inventário</span>
          <small>Livro de equipamentos e relíquias</small>
        </div>
        <div className="ledger-heading-actions">
          <button
            className="primary-button ledger-add-button"
            onClick={onAddItem}
          >
            <Plus size={17} strokeWidth={2.5} />
            Novo item
          </button>
          <strong>{items.length.toLocaleString("pt-BR")} itens</strong>
        </div>
      </div>
      <div className="item-list-header" aria-hidden="true">
        <span>Item</span>
        <span>Raridade</span>
        <span>Status</span>
        <span>Level</span>
        <span>Quantidade</span>
        <span>Valor unitário</span>
        <span>Total</span>
        <span>Ações</span>
      </div>
      <div className="item-list-rows">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            onMarkAsSold={onMarkAsSold}
            onChangeItemType={onChangeItemType}
          />
        ))}
      </div>
    </section>
  );
}
