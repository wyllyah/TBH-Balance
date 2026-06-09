import { useEffect, useRef, useState } from "react";
import { Boxes, Gem, Save, X } from "lucide-react";
import { RARITIES, STATUSES } from "../constants";
import { formatCurrency, formatCurrencyInput, parseCurrencyInput } from "../utils";

const EMPTY_FORM = {
  name: "",
  rarity: "",
  level: "",
  quantity: "",
  status: "",
  value: formatCurrency(0),
};

function getInitialForm(item) {
  if (!item) return EMPTY_FORM;

  return {
    name: item.name,
    rarity: item.rarity,
    level: String(item.level),
    quantity: String(item.quantity),
    status: item.status,
    value: formatCurrency(item.value),
  };
}

export default function ItemForm({ item, onSubmit, onClose }) {
  const [form, setForm] = useState(() => getInitialForm(item));
  const [errors, setErrors] = useState({});
  const nameInputRef = useRef(null);
  const isEditing = Boolean(item);

  useEffect(() => {
    nameInputRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  };

  const handleCurrencyChange = (event) => {
    setForm((current) => ({
      ...current,
      value: formatCurrencyInput(event.target.value),
    }));

    if (errors.value) {
      setErrors((current) => ({ ...current, value: undefined }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Informe o nome do item.";
    if (!form.rarity) nextErrors.rarity = "Selecione uma raridade.";
    if (!form.status) nextErrors.status = "Selecione um status.";
    if (!form.level || Number(form.level) <= 0)
      nextErrors.level = "Informe um level maior que zero.";
    if (!form.quantity || Number(form.quantity) <= 0)
      nextErrors.quantity = "Informe uma quantidade maior que zero.";
    if (parseCurrencyInput(form.value) <= 0)
      nextErrors.value = "Informe um valor maior que zero.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...form,
      name: form.name.trim(),
      level: Number(form.level),
      quantity: Number(form.quantity),
      value: parseCurrencyInput(form.value),
    });
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="form-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="item-form-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="form-header">
          <div className="flex items-center gap-3">
            <div className="form-header-icon">
              {isEditing ? <Gem size={21} /> : <Boxes size={21} />}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-400">
                Inventário
              </p>
              <h2 id="item-form-title" className="mt-0.5 text-xl font-extrabold text-white">
                {isEditing ? "Editar item" : "Novo item"}
              </h2>
            </div>
          </div>
          <button className="close-button" onClick={onClose} aria-label="Fechar formulário">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-body">
            <label className="form-field form-field-full">
              <span>Nome do item</span>
              <input
                ref={nameInputRef}
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ex.: Lâmina do Eclipse"
                maxLength={80}
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && <small>{errors.name}</small>}
            </label>

            <label className="form-field">
              <span>Raridade</span>
              <select
                name="rarity"
                value={form.rarity}
                onChange={handleChange}
                className={errors.rarity ? "input-error" : ""}
              >
                <option value="">Selecione</option>
                {RARITIES.map((rarity) => (
                  <option key={rarity} value={rarity}>
                    {rarity}
                  </option>
                ))}
              </select>
              {errors.rarity && <small>{errors.rarity}</small>}
            </label>

            <label className="form-field">
              <span>Status do produto</span>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={errors.status ? "input-error" : ""}
              >
                <option value="">Selecione</option>
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {errors.status && <small>{errors.status}</small>}
            </label>

            <label className="form-field">
              <span>Level</span>
              <input
                name="level"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={form.level}
                onChange={handleChange}
                placeholder="1"
                className={errors.level ? "input-error" : ""}
              />
              {errors.level && <small>{errors.level}</small>}
            </label>

            <label className="form-field">
              <span>Quantidade</span>
              <input
                name="quantity"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={form.quantity}
                onChange={handleChange}
                placeholder="1"
                className={errors.quantity ? "input-error" : ""}
              />
              {errors.quantity && <small>{errors.quantity}</small>}
            </label>

            <label className="form-field form-field-full">
              <span>Valor unitário</span>
              <input
                name="value"
                type="text"
                inputMode="numeric"
                value={form.value}
                onChange={handleCurrencyChange}
                placeholder="R$ 0,00"
                className={errors.value ? "input-error" : ""}
              />
              {errors.value && <small>{errors.value}</small>}
            </label>
          </div>

          <div className="form-footer">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="primary-button">
              <Save size={17} />
              {isEditing ? "Salvar alterações" : "Cadastrar item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
