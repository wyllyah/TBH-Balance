import { useCallback, useMemo, useState } from "react";
import Header from "./components/Header";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import SummaryCards from "./components/SummaryCards";
import Filters from "./components/Filters";
import DeleteModal from "./components/DeleteModal";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { makeId, normalizeText } from "./utils";

const DEFAULT_FILTERS = {
  search: "",
  itemType: "",
  rarity: "",
  status: "",
  sort: "newest",
};

const HERO_LOOT = [
  { name: "secondary", src: "/assets/item-icons/secondary.png" },
  { name: "helmet", src: "/assets/item-icons/helmet.png" },
  { name: "armor", src: "/assets/item-icons/armor.png" },
  { name: "weapon", src: "/assets/item-icons/weapon.png" },
  { name: "jewelry", src: "/assets/item-icons/jewelry.png" },
  { name: "gloves", src: "/assets/item-icons/gloves.png" },
  { name: "boots", src: "/assets/item-icons/boots.png" },
  { name: "material", src: "/assets/item-icons/material.png" },
];

export default function App() {
  const [items, setItems] = useLocalStorage("tbh-balance-items", []);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [formState, setFormState] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const filteredItems = useMemo(() => {
    const search = normalizeText(filters.search);
    const result = items.filter((item) => {
      const matchesName = !search || normalizeText(item.name).includes(search);
      const matchesItemType =
        !filters.itemType ||
        (item.itemType ?? "generic") === filters.itemType;
      const matchesRarity = !filters.rarity || item.rarity === filters.rarity;
      const matchesStatus = !filters.status || item.status === filters.status;
      return matchesName && matchesItemType && matchesRarity && matchesStatus;
    });

    return result.toSorted((first, second) => {
      switch (filters.sort) {
        case "name-asc":
          return first.name.localeCompare(second.name, "pt-BR", {
            sensitivity: "base",
          });
        case "name-desc":
          return second.name.localeCompare(first.name, "pt-BR", {
            sensitivity: "base",
          });
        case "value-desc":
          return Number(second.value) - Number(first.value);
        case "value-asc":
          return Number(first.value) - Number(second.value);
        case "level-desc":
          return Number(second.level) - Number(first.level);
        case "level-asc":
          return Number(first.level) - Number(second.level);
        case "quantity-desc":
          return Number(second.quantity) - Number(first.quantity);
        case "quantity-asc":
          return Number(first.quantity) - Number(second.quantity);
        default:
          return new Date(second.updatedAt ?? second.createdAt) -
            new Date(first.updatedAt ?? first.createdAt);
      }
    });
  }, [filters, items]);

  const closeForm = useCallback(() => setFormState(null), []);

  const handleSaveItem = (itemData) => {
    const now = new Date().toISOString();

    if (formState?.item) {
      setItems((current) =>
        current.map((item) =>
          item.id === formState.item.id
            ? { ...item, ...itemData, updatedAt: now }
            : item,
        ),
      );
    } else {
      setItems((current) => [
        ...current,
        {
          ...itemData,
          id: makeId(),
          createdAt: now,
          updatedAt: now,
        },
      ]);
    }

    closeForm();
  };

  const handleDeleteItem = () => {
    setItems((current) => current.filter((item) => item.id !== itemToDelete.id));
    setItemToDelete(null);
  };

  const handleMarkAsSold = (itemId) => {
    const now = new Date().toISOString();

    setItems((current) =>
      current.map((item) =>
        item.id === itemId
          ? { ...item, status: "Vendido", updatedAt: now }
          : item,
      ),
    );
  };

  const handleChangeItemType = (itemId, itemType) => {
    const now = new Date().toISOString();

    setItems((current) =>
      current.map((item) =>
        item.id === itemId ? { ...item, itemType, updatedAt: now } : item,
      ),
    );
  };

  return (
    <div className="app-shell min-h-screen">
      <Header />

      <main className="page-shell app-main py-7 sm:py-10">
        <section className="hero-banner">
          <div className="hero-copy">
            <p className="eyebrow">Salão do inventário</p>
            <h2>Gerencie o tesouro conquistado em sua jornada.</h2>
            <p>
              Organize equipamentos, acompanhe valores e mantenha o registro
              de cada relíquia bloqueada ou vendida.
            </p>
          </div>
          <div className="hero-loot" aria-hidden="true">
            {HERO_LOOT.map((item) => (
              <span
                className={`hero-loot-item hero-loot-${item.name}`}
                key={item.name}
              >
                <img src={item.src} alt="" />
              </span>
            ))}
          </div>
        </section>

        <SummaryCards items={items} />

        <div className="mt-8">
          <Filters
            filters={filters}
            onChange={setFilters}
            onClear={() => setFilters(DEFAULT_FILTERS)}
            resultCount={filteredItems.length}
            totalCount={items.length}
          />
        </div>

        <div className="mt-5">
          <ItemList
            items={filteredItems}
            hasItems={items.length > 0}
            onAddItem={() => setFormState({ item: null })}
            onEdit={(item) => setFormState({ item })}
            onDelete={setItemToDelete}
            onMarkAsSold={handleMarkAsSold}
            onChangeItemType={handleChangeItemType}
          />
        </div>
      </main>

      <footer className="page-shell app-footer py-7 text-center text-xs">
        TBH Balance · O registro do seu inventário permanece neste dispositivo.
      </footer>

      {formState && (
        <ItemForm
          item={formState.item}
          onSubmit={handleSaveItem}
          onClose={closeForm}
        />
      )}

      {itemToDelete && (
        <DeleteModal
          item={itemToDelete}
          onConfirm={handleDeleteItem}
          onClose={() => setItemToDelete(null)}
        />
      )}
    </div>
  );
}
