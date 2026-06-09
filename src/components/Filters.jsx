import { ListFilter, Search, Shapes, SlidersHorizontal, X } from "lucide-react";
import { RARITIES, SORT_OPTIONS, STATUSES } from "../constants";
import { ITEM_TYPES } from "../itemTypes";

export default function Filters({
  filters,
  onChange,
  onClear,
  resultCount,
  totalCount,
}) {
  const hasActiveFilters =
    filters.search ||
    filters.itemType ||
    filters.rarity ||
    filters.status ||
    filters.sort !== "newest";

  const updateFilter = (event) => {
    onChange({ ...filters, [event.target.name]: event.target.value });
  };

  return (
    <section className="filter-panel" aria-label="Filtros dos itens">
      <div className="filter-heading">
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <SlidersHorizontal size={17} className="text-violet-400" />
            Seu inventário
          </div>
          <p className="mt-1 text-xs text-slate-500">
            {resultCount === totalCount
              ? `${totalCount} ${totalCount === 1 ? "item cadastrado" : "itens cadastrados"}`
              : `${resultCount} de ${totalCount} itens encontrados`}
          </p>
        </div>

        {hasActiveFilters && (
          <button className="clear-button" onClick={onClear}>
            <X size={14} />
            Limpar filtros
          </button>
        )}
      </div>

      <div className="filter-grid">
        <label className="search-field">
          <span className="sr-only">Buscar item por nome</span>
          <Search className="field-icon" size={18} />
          <input
            name="search"
            type="search"
            value={filters.search}
            onChange={updateFilter}
            placeholder="Buscar item por nome..."
          />
        </label>

        <label className="select-field">
          <span className="sr-only">Filtrar por tipo de item</span>
          <Shapes className="field-icon" size={17} />
          <select
            name="itemType"
            value={filters.itemType}
            onChange={updateFilter}
          >
            <option value="">Todos os tipos</option>
            {ITEM_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>

        <label className="select-field">
          <span className="sr-only">Filtrar por raridade</span>
          <ListFilter className="field-icon" size={17} />
          <select name="rarity" value={filters.rarity} onChange={updateFilter}>
            <option value="">Todas as raridades</option>
            {RARITIES.map((rarity) => (
              <option key={rarity} value={rarity}>
                {rarity}
              </option>
            ))}
          </select>
        </label>

        <label className="select-field">
          <span className="sr-only">Filtrar por status</span>
          <select name="status" value={filters.status} onChange={updateFilter}>
            <option value="">Todos os status</option>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="select-field">
          <span className="sr-only">Ordenar itens</span>
          <select name="sort" value={filters.sort} onChange={updateFilter}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
