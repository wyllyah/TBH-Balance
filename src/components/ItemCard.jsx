import { useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  ChevronDown,
  LockKeyhole,
  Megaphone,
  Pencil,
  ShoppingBag,
  Sparkles,
  Trash2,
} from "lucide-react";
import { RARITY_STYLES } from "../constants";
import { getItemType, ITEM_TYPES } from "../itemTypes";
import ItemTypeGraphic from "./ItemTypeGraphic";
import { formatCurrency } from "../utils";

export default function ItemCard({
  item,
  onEdit,
  onDelete,
  onMarkAsSold,
  onChangeItemType,
}) {
  const [isTypeMenuOpen, setIsTypeMenuOpen] = useState(false);
  const typePickerRef = useRef(null);
  const rarity = RARITY_STYLES[item.rarity] ?? RARITY_STYLES.Material;
  const { label: itemTypeLabel } = getItemType(item.itemType);
  const isLocked = item.status === "Bloqueado";
  const isAnnounced = item.status === "Anunciado";
  const isSold = item.status === "Vendido";
  const statusClass = isLocked
    ? "status-locked"
    : isAnnounced
      ? "status-announced"
      : "status-sold";
  const total = Number(item.quantity) * Number(item.value);

  useEffect(() => {
    if (!isTypeMenuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!typePickerRef.current?.contains(event.target)) {
        setIsTypeMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsTypeMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTypeMenuOpen]);

  const handleTypeChange = (itemType) => {
    onChangeItemType(item.id, itemType);
    setIsTypeMenuOpen(false);
  };

  return (
    <article
      className={`item-card ${rarity.className}`}
      style={{ "--rarity-color": rarity.accent }}
    >
      <div className="rarity-glow" aria-hidden="true" />

      <div className="item-main">
        <div className="item-icon-control" ref={typePickerRef}>
          <button
            type="button"
            className="item-avatar"
            title="Clique para alterar o ícone"
            aria-label={`Alterar ícone do item. Atual: ${itemTypeLabel}`}
            aria-expanded={isTypeMenuOpen}
            aria-haspopup="menu"
            onClick={() => setIsTypeMenuOpen((current) => !current)}
          >
            <ItemTypeGraphic type={item.itemType} size={52} />
            <span className="item-avatar-indicator" aria-hidden="true">
              <ChevronDown size={9} strokeWidth={2.5} />
            </span>
          </button>

          {isTypeMenuOpen && (
            <div className="item-type-menu" role="menu" aria-label="Escolher ícone">
              <p>Escolha o ícone</p>
              <div className="item-type-menu-grid">
                {ITEM_TYPES.map((type) => {
                  const { value, label } = type;
                  const isSelected = (item.itemType ?? "generic") === value;

                  return (
                    <button
                      key={value}
                      type="button"
                      role="menuitemradio"
                      aria-checked={isSelected}
                      className={`item-type-menu-option ${
                        isSelected ? "item-type-menu-option-selected" : ""
                      }`}
                      onClick={() => handleTypeChange(value)}
                      title={label}
                    >
                      <ItemTypeGraphic type={type} size={29} />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="item-name-block">
          <span className="item-mobile-label">Item</span>
          <h3>{item.name}</h3>
          <small>
            {itemTypeLabel} · {Number(item.quantity).toLocaleString("pt-BR")} unidade(s)
          </small>
        </div>
      </div>

      <div className="item-classification">
        <span className="item-mobile-label">Raridade</span>
        <span className="rarity-badge">
          <Sparkles size={15} />
          {item.rarity}
        </span>
      </div>

      <div className="item-classification">
        <span className="item-mobile-label">Status</span>
        <span className={`status-badge ${statusClass}`}>
          {isLocked ? (
            <LockKeyhole size={14} />
          ) : isAnnounced ? (
            <Megaphone size={14} />
          ) : (
            <ShoppingBag size={14} />
          )}
          {item.status}
        </span>
      </div>

      <div className="item-list-value">
        <span>Level</span>
        <strong>{Number(item.level).toLocaleString("pt-BR")}</strong>
      </div>

      <div className="item-list-value">
        <span>Quantidade</span>
        <strong>{Number(item.quantity).toLocaleString("pt-BR")}</strong>
      </div>

      <div className="item-list-value">
        <span>Valor unitário</span>
        <strong>{formatCurrency(item.value)}</strong>
      </div>

      <div className="item-list-value item-total">
        <span>Total</span>
        <strong>{formatCurrency(total)}</strong>
      </div>

      <div className="item-actions">
        {!isSold && (
          <button
            className="sell-button"
            onClick={() => onMarkAsSold(item.id)}
            title="Marcar item como vendido"
          >
            <BadgeCheck size={18} />
            <span>Vendido</span>
          </button>
        )}
        <button className="edit-button" onClick={() => onEdit(item)}>
          <Pencil size={17} />
          <span>Editar</span>
        </button>
        <button
          className="delete-button"
          onClick={() => onDelete(item)}
          aria-label={`Excluir ${item.name}`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </article>
  );
}
