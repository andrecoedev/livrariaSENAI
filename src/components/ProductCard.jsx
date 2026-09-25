import { ArrowUpRight, Plus } from 'lucide-react';
import { formatCurrency } from '../utils/currency.js';

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-cover-wrap">
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <img className="product-cover" src={product.image} alt={`Capa do livro ${product.title}`} loading="lazy" />
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3>{product.title}</h3>
        <p className="product-author">por {product.author}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-bottom">
          <div className="product-price"><span>Por apenas</span><strong>{formatCurrency(product.price)}</strong></div>
          <button className="add-button" type="button" onClick={() => onAdd(product)} aria-label={`Adicionar ${product.title} ao carrinho`}>
            <Plus size={18} strokeWidth={2} aria-hidden="true" />
            <span>Adicionar</span>
            <ArrowUpRight className="add-arrow" size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
