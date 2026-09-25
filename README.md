# Livraria Aurora

Aplicação de livraria online desenvolvida para a atividade **Contexto de Aprendizagem — Parada Obrigatória 1**, da disciplina Desenvolvimento Full Stack do SENAI CIMATEC. O objetivo é demonstrar um catálogo em React, navegação com React Router e as operações de um carrinho gerenciado globalmente pelo Redux.

O projeto é uma demonstração acadêmica: não processa pedidos nem pagamentos. Os oito livros são fictícios e suas capas SVG estão no próprio repositório.

## Tecnologias

- React com componentes funcionais e `createRoot`
- Vite e JavaScript
- Redux e React Redux (`Provider`, `useDispatch`, `useSelector`)
- React Router DOM (`BrowserRouter`, `Routes`, `Route` e `NavLink`)
- Lucide React para ícones
- CSS responsivo
- Node.js Test Runner para os testes do reducer

## Funcionalidades

- Catálogo com oito livros, descrição, categoria, autor, preço em reais e capa local.
- Adição de livros ao carrinho com confirmação visual.
- Contador no cabeçalho que soma as quantidades dos itens.
- Adição repetida que aumenta a quantidade do mesmo livro.
- Carrinho com preço unitário, quantidade, subtotal e total geral.
- Controles para aumentar e diminuir quantidades, com remoção automática ao chegar a zero.
- Botão para remover um livro específico sem afetar os demais.
- Estado vazio com retorno ao catálogo.
- Rotas `/` (catálogo) e `/cart` (carrinho).

## Estrutura

```text
public/covers/          Capas SVG locais
src/components/         Header, ProductCard, ProductList, Cart e CartItem
src/data/products.js    Catálogo dos livros
src/store/store.js      Estado inicial, ações e reducer Redux
src/styles/global.css   Estilos e regras responsivas
src/utils/currency.js   Formatação monetária pt-BR
src/App.jsx             Rotas e estrutura comum
src/main.jsx            Entrada, Provider e BrowserRouter
tests/store.test.js     Testes automatizados do reducer
vercel.json             Reescrita de URLs para as rotas do React Router
```
