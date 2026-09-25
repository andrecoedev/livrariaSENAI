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

## Instalação e execução

Requer Node.js compatível com a versão de Vite definida em `package.json` (Node.js 20.19+ ou 22.12+). Na pasta do projeto:

```bash
npm install
npm run dev
```

Abra o endereço local mostrado no terminal. Para verificar o carrinho, adicione um livro no catálogo e use o link **Carrinho** no cabeçalho.

## Testes e build

```bash
npm test
npm run build
npm run preview
```

`npm test` cobre o estado inicial, adição simples e repetida, remoção, atualização de quantidade, remoção ao chegar a zero, preservação dos demais itens e rejeição de quantidade inválida. Também renderiza as rotas com Redux para conferir catálogo, carrinho, contador e totais. `npm run build` gera `dist/` para publicação. O diretório `dist/` é ignorado pelo Git.

## Publicação

### GitHub

1. Crie um repositório vazio na sua conta do GitHub.
2. Revise os arquivos e execute `git add .` e `git commit -m "Implementa Livraria Aurora"`.
3. Configure o remoto com a URL real do seu repositório e execute `git push -u origin main`.
4. Copie o link do repositório para o documento acadêmico em `ENTREGA.md`.

### Vercel

1. Importe o repositório do GitHub no painel da Vercel.
2. Selecione **Vite** como framework, `npm run build` como comando de build e `dist` como diretório de saída. A Vercel costuma detectar esses valores automaticamente.
3. Publique o projeto. `vercel.json` encaminha acessos diretos a `/cart` para o aplicativo React.
4. Abra as rotas `/` e `/cart` no endereço publicado e copie o link real para `ENTREGA.md`.

O carrinho fica em memória durante a sessão da página. Recarregar o navegador reinicia o carrinho, pois a atividade não usa banco de dados nem persistência local.
