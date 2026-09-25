import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  cartReducer,
  initialState,
} from '../src/store/store.js';

const bookA = { id: 'book-a', title: 'Livro A', price: 30 };
const bookB = { id: 'book-b', title: 'Livro B', price: 50 };

test('começa com o carrinho vazio', () => {
  assert.deepEqual(cartReducer(undefined, { type: '@@INIT' }), { cart: [] });
  assert.deepEqual(initialState, { cart: [] });
});

test('adiciona um produto com quantidade 1 sem alterar o estado anterior', () => {
  const next = cartReducer(initialState, { type: ADD_TO_CART, payload: bookA });
  assert.deepEqual(next.cart, [{ ...bookA, quantity: 1 }]);
  assert.deepEqual(initialState.cart, []);
  assert.notStrictEqual(next.cart, initialState.cart);
});

test('adicionar o mesmo produto novamente aumenta sua quantidade', () => {
  const first = cartReducer(initialState, { type: ADD_TO_CART, payload: bookA });
  const second = cartReducer(first, { type: ADD_TO_CART, payload: bookA });
  assert.equal(second.cart.length, 1);
  assert.equal(second.cart[0].quantity, 2);
  assert.equal(first.cart[0].quantity, 1);
});

test('remove apenas o produto selecionado e preserva os demais', () => {
  const state = { cart: [{ ...bookA, quantity: 2 }, { ...bookB, quantity: 1 }] };
  const next = cartReducer(state, { type: REMOVE_FROM_CART, payload: bookA.id });
  assert.deepEqual(next.cart, [{ ...bookB, quantity: 1 }]);
  assert.equal(state.cart.length, 2);
});

test('aumenta e diminui a quantidade por atualização explícita', () => {
  const state = { cart: [{ ...bookA, quantity: 1 }] };
  const increased = cartReducer(state, { type: UPDATE_QUANTITY, payload: { id: bookA.id, quantity: 3 } });
  const decreased = cartReducer(increased, { type: UPDATE_QUANTITY, payload: { id: bookA.id, quantity: 2 } });
  assert.equal(increased.cart[0].quantity, 3);
  assert.equal(decreased.cart[0].quantity, 2);
  assert.equal(state.cart[0].quantity, 1);
});

test('remove o produto quando a quantidade chega a zero', () => {
  const state = { cart: [{ ...bookA, quantity: 1 }, { ...bookB, quantity: 2 }] };
  const next = cartReducer(state, { type: UPDATE_QUANTITY, payload: { id: bookA.id, quantity: 0 } });
  assert.deepEqual(next.cart, [{ ...bookB, quantity: 2 }]);
});

test('ignora quantidades negativas ou fracionárias', () => {
  const state = { cart: [{ ...bookA, quantity: 1 }] };
  assert.strictEqual(cartReducer(state, { type: UPDATE_QUANTITY, payload: { id: bookA.id, quantity: -1 } }), state);
  assert.strictEqual(cartReducer(state, { type: UPDATE_QUANTITY, payload: { id: bookA.id, quantity: 1.5 } }), state);
});
