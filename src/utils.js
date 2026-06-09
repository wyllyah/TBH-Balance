export const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value) || 0);

export const formatCurrencyInput = (value) => {
  const numericValue =
    typeof value === "string"
      ? Number(value.replace(/\D/g, "")) / 100
      : Number(value) || 0;

  return formatCurrency(numericValue);
};

export const parseCurrencyInput = (value) =>
  Number(String(value).replace(/\D/g, "")) / 100;

export const normalizeText = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export const makeId = () => {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};
