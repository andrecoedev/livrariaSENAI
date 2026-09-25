import { ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './CartItem.jsx';
import { REMOVE_FROM_CART, UPDATE_QUANTITY } from '../store/store.js';
import { formatCurrency } from '../utils/currency.js';

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function removeItem(id) {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  }

  function updateQuantity(id, quantity) {
    dispatch({ type: UPDATE_QUANTITY, payload: { id, quantity } });
  }

  return (
    <section className="cart-page container" aria-labelledby="cart-title">
      <Link to="/" className="back-link"><ArrowLeft size={17} aria-hidden="true" /> Voltar ao catálogo</Link>
      <div className="cart-heading">
        <div>
          <span className="section-kicker">SUAS PRÓXIMAS LEITURAS</span>
          <h1 id="cart-title">Meu carrinho<span className="title-period">.</span></h1>
        </div>
        <span className="cart-heading-count">{itemCount} {itemCount === 1 ? 'item' : 'itens'}</span>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-cart-icon"><ShoppingBag size={42} strokeWidth={1.3} /></span>
          <h2>Seu carrinho está esperando uma história.</h2>
          <p>Explore nossa seleção e encontre seu próximo livro favorito.</p>
          <Link to="/" className="primary-link">Explorar catálogo <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list-panel">
            <div className="cart-list-header"><span>PRODUTO</span><span>QUANTIDADE / SUBTOTAL</span></div>
            <ul className="cart-list">
              {cart.map((item) => <CartItem key={item.id} item={item} onRemove={removeItem} onUpdateQuantity={updateQuantity} />)}
            </ul>
            <Link to="/" className="continue-link"><ArrowLeft size={17} aria-hidden="true" /> Continuar explorando</Link>
          </div>
          <aside className="order-summary" aria-label="Resumo do pedido">
            <span className="summary-kicker">RESUMO DO PEDIDO</span>
            <h2>Sua seleção</h2>
            <div className="summary-line"><span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})</span><span>{formatCurrency(total)}</span></div>
            <div className="summary-total"><span>Total</span><strong>{formatCurrency(total)}</strong></div>
            <p className="summary-note">Esta é uma demonstração acadêmica. Compras e pagamentos não estão disponíveis.</p>
          </aside>
        </div>
      )}
    </section>
  );
}
