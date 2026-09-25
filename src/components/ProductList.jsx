import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ArrowDown, ArrowRight, Check, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard.jsx';
import { products } from '../data/products.js';
import { ADD_TO_CART } from '../store/store.js';

export default function ProductList() {
  const dispatch = useDispatch();
  const [notice, setNotice] = useState(null);
  const noticeId = useRef(0);

  function addToCart(product) {
    dispatch({ type: ADD_TO_CART, payload: product });
    noticeId.current += 1;
    setNotice({ id: noticeId.current, message: `${product.title} adicionado ao carrinho` });
  }

  return (
    <>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-content">
          <span className="eyebrow"><Sparkles size={14} aria-hidden="true" /> SUA PRÓXIMA HISTÓRIA COMEÇA AQUI</span>
          <h1 id="hero-title">Livros que <em>iluminam</em> novos caminhos.</h1>
          <p>Histórias para desacelerar, imaginar e descobrir. Encontre o próximo livro que vai ficar com você.</p>
          <a className="hero-cta" href="#catalogo">Explorar coleção <ArrowRight size={18} aria-hidden="true" /></a>
          <span className="hero-note"><ArrowDown size={15} aria-hidden="true" /> SELEÇÃO FEITA PARA VOCÊ</span>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <span className="hero-star star-one">✦</span>
          <span className="hero-star star-two">✦</span>
          <div className="hero-book book-back"><img src="/covers/atlas-do-silencio.svg" alt="" /></div>
          <div className="hero-book book-front"><img src="/covers/jardim-invisivel.svg" alt="" /></div>
          <div className="hero-art-label">HISTÓRIAS QUE FICAM</div>
        </div>
      </section>

      <section id="catalogo" className="catalog-section container" aria-labelledby="catalog-title">
        <div className="section-heading">
          <div>
            <span className="section-kicker">CURADORIA AURORA <span /> EDIÇÃO 01</span>
            <h2 id="catalog-title">Para ler e sentir.</h2>
            <p>Oito histórias, infinitas possibilidades. Qual delas vai com você?</p>
          </div>
          <span className="book-count">{String(products.length).padStart(2, '0')} LIVROS</span>
        </div>
        <div className="product-grid">
          {products.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}
        </div>
      </section>
      {notice && (
        <div key={notice.id} className="toast visible" role="status" aria-live="polite" onAnimationEnd={() => setNotice(null)}>
          <Check size={18} aria-hidden="true" /> {notice.message}
        </div>
      )}
    </>
  );
}
