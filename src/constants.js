export const RARITIES = [
  "Lendário",
  "Imortal",
  "Arcana",
  "Celestial",
  "Além",
  "Divino",
  "Material",
];

export const STATUSES = ["Bloqueado", "Anunciado", "Vendido"];

export const SORT_OPTIONS = [
  { value: "newest", label: "Mais recentes" },
  { value: "name-asc", label: "Nome: A-Z" },
  { value: "name-desc", label: "Nome: Z-A" },
  { value: "value-desc", label: "Maior valor" },
  { value: "value-asc", label: "Menor valor" },
  { value: "level-desc", label: "Maior level" },
  { value: "level-asc", label: "Menor level" },
  { value: "quantity-desc", label: "Maior quantidade" },
  { value: "quantity-asc", label: "Menor quantidade" },
];

export const RARITY_STYLES = {
  Lendário: {
    accent: "#f7b955",
    className: "rarity-legendary",
  },
  Imortal: {
    accent: "#ff526c",
    className: "rarity-immortal",
  },
  Arcana: {
    accent: "#b878ff",
    className: "rarity-arcana",
  },
  Celestial: {
    accent: "#5bceff",
    className: "rarity-celestial",
  },
  Além: {
    accent: "#5ce1c3",
    className: "rarity-beyond",
  },
  Divino: {
    accent: "#f7ed9d",
    className: "rarity-divine",
  },
  Material: {
    accent: "#a4adbd",
    className: "rarity-material",
  },
};
