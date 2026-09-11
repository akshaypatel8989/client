import { X } from 'lucide-react'

export default function Modal({ title, children, onClose }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="modal" role="dialog" aria-modal="true"><button className="modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button><h2>{title}</h2>{children}</section></div>
}
