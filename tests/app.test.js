import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { legacy_createStore as createStore } from 'redux';
import { createServer } from 'vite';
import { ADD_TO_CART, REMOVE_FROM_CART, cartReducer } from '../src/store/store.js';
import { products } from '../src/data/products.js';

test('as rotas exibem o catálogo e o carrinho conectado ao Redux', async () => {
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });

  try {
    const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
    const store = createStore(cartReducer);

    function render(path) {
      return renderToString(
        React.createElement(Provider, { store },
          React.createElement(MemoryRouter, { initialEntries: [path] },
            React.createElement(App),
          ),
        ),
      );
    }

    assert.match(render('/'), /Para ler e sentir/);
    assert.match(render('/'), /Adicionar O Jardim Invisível ao carrinho/);
    assert.match(render('/cart'), /Seu carrinho está esperando uma história/);

    store.dispatch({ type: ADD_TO_CART, payload: products[0] });
    store.dispatch({ type: ADD_TO_CART, payload: products[0] });
    store.dispatch({ type: ADD_TO_CART, payload: products[1] });
    const filledCart = render('/cart');
    assert.match(filledCart, /O Jardim Invisível/);
    assert.match(filledCart, /Atlas do Silêncio/);
    assert.match(filledCart, /3 itens no carrinho/);
    assert.match(filledCart, /R\$\s*157,80/);

    store.dispatch({ type: REMOVE_FROM_CART, payload: products[0].id });
    const afterRemoval = render('/cart');
    assert.doesNotMatch(afterRemoval, /<h3>O Jardim Invisível<\/h3>/);
    assert.match(afterRemoval, /<h3>Atlas do Silêncio<\/h3>/);
  } finally {
    await vite.close();
  }
});
