import { AlertTriangle, Trash2, X } from "lucide-react";

export default function DeleteModal({ item, onConfirm, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="delete-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        aria-describedby="delete-description"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="close-button absolute right-4 top-4" onClick={onClose}>
          <X size={19} />
        </button>
        <div className="delete-modal-icon">
          <AlertTriangle size={26} />
        </div>
        <h2 id="delete-title">Excluir item?</h2>
        <p id="delete-description">
          <strong>{item.name}</strong> será removido permanentemente do seu inventário.
        </p>
        <div className="mt-6 flex gap-3">
          <button className="secondary-button flex-1" onClick={onClose}>
            Cancelar
          </button>
          <button className="danger-button flex-1" onClick={onConfirm}>
            <Trash2 size={16} />
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
