import { BookOpen, ShoppingBag } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const itemCount = useSelector((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <header className="site-header">
      <div className="header-inner container">
        <NavLink className="brand" to="/" aria-label="Livraria Aurora, ir para o catálogo">
          <span className="brand-icon"><BookOpen size={21} strokeWidth={1.8} /></span>
          <span className="brand-wordmark">AURORA<span className="brand-dot">.</span></span>
        </NavLink>

        <nav className="main-nav" aria-label="Navegação principal">
          <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Catálogo
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => `nav-link cart-link${isActive ? ' active' : ''}`}>
            <ShoppingBag size={19} strokeWidth={1.8} aria-hidden="true" />
            <span>Carrinho</span>
            <span className="cart-count" aria-label={`${itemCount} itens no carrinho`}>{itemCount}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
