import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/currency.js';

export default function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <li className="cart-item">
      <img src={item.image} alt={`Capa do livro ${item.title}`} className="cart-item-cover" />
      <div className="cart-item-details">
        <span className="product-category">{item.category}</span>
        <h3>{item.title}</h3>
        <p>por {item.author}</p>
        <span className="cart-unit-price">{formatCurrency(item.price)} por unidade</span>
      </div>
      <div className="cart-item-actions">
        <div className="quantity-control" aria-label={`Quantidade de ${item.title}`}>
          <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} aria-label={`Diminuir quantidade de ${item.title}`}><Minus size={16} /></button>
          <span aria-live="polite">{item.quantity}</span>
          <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} aria-label={`Aumentar quantidade de ${item.title}`}><Plus size={16} /></button>
        </div>
        <strong className="cart-item-subtotal">{formatCurrency(item.price * item.quantity)}</strong>
        <button type="button" className="remove-button" onClick={() => onRemove(item.id)} aria-label={`Remover ${item.title} do carrinho`}><Trash2 size={16} /> Remover</button>
      </div>
    </li>
  );
}
