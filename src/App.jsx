import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import ProductList from './components/ProductList.jsx';
import Cart from './components/Cart.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main id="conteudo">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<ProductList />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <span className="brand-wordmark">AURORA<span className="brand-dot">.</span></span>
        <span>Uma boa história muda tudo.</span>
        <span>© {new Date().getFullYear()} Livraria Aurora</span>
      </footer>
    </div>
  );
}
