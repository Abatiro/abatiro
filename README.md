# Abatiro · Do caos ao coletivo — site

**Site no ar:** https://abatiro.github.io/abatiro/

Site do Projeto VII / TCC de Getter Ari Ulysses dos Santos Filho (Design, PUCPR).
Movimento apartidário que aproxima jovens da Geração Z (18 a 24 anos) de coletivos, atos e ações do cotidiano em Curitiba e região.

O site é estático: só HTML, CSS e JavaScript. Não precisa de servidor, banco de dados nem mensalidade. Por isso dá para hospedar de graça no **GitHub Pages**.

---

## 1. O que tem no site

| Página | Arquivo | O que faz |
|---|---|---|
| Início | `index.html` | Hero, sobre o projeto, quem somos, trecho do manifesto, 3 coletivos e os 3 próximos atos |
| Manifesto | `manifesto.html` | Texto integral do manifesto, com índice lateral, barra de leitura, seletor de capítulo no celular, espaços de foto e o formulário "Eu faço parte porque…" |
| Coletivos | `coletivos.html` | Diretório com busca, filtros por causa (com contagem) e cards |
| Coletivo | `coletivo.html?id=...` | Página de cada coletivo: sobre, como chegar, atos do coletivo, copiar link, outros coletivos |
| Atos | `atos.html` | Agenda com destaque do próximo ato, busca, abas (Próximos, Este mês, Realizados, Todos) e filtros por causa |
| Ato | `ato.html?id=...` | Página de cada ato: data, horário, local, causa, "Adicionar ao calendário" (.ics), abrir no mapa, copiar link |
| Erro | `404.html` | Página para endereços que não existem |

"Próximo" e "Realizado" são calculados pela data de hoje, automaticamente. "Faltam X dias" também.

## 2. Estrutura de pastas

```
index.html, manifesto.html, coletivos.html, coletivo.html, atos.html, ato.html, 404.html
.nojekyll                 (arquivo vazio, necessário no GitHub Pages)
assets/
  css/style.css           visual do site (cores, fontes, layout, responsivo)
  js/data.js              LISTA DE COLETIVOS E ATOS  ← edite aqui
  js/fotos.js             LISTA DE FOTOS             ← edite aqui
  js/main.js              funcionamento (busca, filtros, menu, calendário…)
  img/                    fotos, favicon e imagem de compartilhamento
  fonts/                  coloque aqui o arquivo da fonte Ellak (opcional)
```

---

## 3. Colocar o site no ar com o GitHub Pages (passo a passo, sem programar)

Por que GitHub Pages: é gratuito, não pede cartão de crédito, o link não expira, aguenta bem o acesso de professores e avaliadores, guarda o histórico de cada alteração e é fácil de atualizar pelo próprio navegador.

### Passo 1 — Criar a conta (se ainda não tiver)
1. Acesse **https://github.com** e clique em **Sign up**.
2. Informe e-mail, crie uma senha e escolha um nome de usuário. **Esse nome vai aparecer no link do site** (ex.: `getter-santos` → `https://getter-santos.github.io/...`). Prefira algo curto e sem acentos.
3. Confirme o e-mail com o código que o GitHub enviar. O plano gratuito (Free) é suficiente.

### Passo 2 — Criar o repositório (a "pasta" do site)
1. Já logado, clique no **+** no canto superior direito e escolha **New repository**.
2. Em **Repository name**, escreva `abatiro` (letras minúsculas, sem espaço).
3. Marque **Public**. (No plano gratuito, o GitHub Pages só funciona com repositório público.)
4. Não marque nenhuma outra opção. Clique em **Create repository**.

### Passo 3 — Enviar os arquivos
1. Descompacte o arquivo `abatiro-site.zip` no seu computador.
2. Na página do repositório recém-criado, clique no link **uploading an existing file** (ou em **Add file → Upload files**).
3. Abra a pasta descompactada, **selecione tudo o que está dentro dela** (os arquivos `.html`, o `README.md`, o `.nojekyll` e a pasta `assets`) e arraste para a área de upload do GitHub.
   - Importante: arraste o **conteúdo** da pasta, não a pasta inteira. O `index.html` precisa ficar na "raiz" do repositório.
   - O `.nojekyll` é um arquivo oculto. No Mac, aperte `Cmd + Shift + .` no Finder para vê-lo; no Windows, ative "Itens ocultos" na aba Exibir. Se ele não for enviado, o site funciona do mesmo jeito; ele só evita um processamento desnecessário.
4. Espere todos os arquivos aparecerem na lista. Embaixo, em **Commit changes**, clique no botão verde **Commit changes**.
5. Confira: a página do repositório deve listar `index.html`, `manifesto.html` etc. e a pasta `assets`.

### Passo 4 — Ligar o GitHub Pages
1. No repositório, clique na aba **Settings** (engrenagem, no topo).
2. Na barra lateral esquerda, em **Code and automation**, clique em **Pages**.
3. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
4. Em **Branch**, escolha **main** e, ao lado, a pasta **/(root)**. Clique em **Save**.
5. Aguarde de 1 a 5 minutos e recarregue a página. Vai aparecer no topo: **"Your site is live at https://SEU-USUARIO.github.io/abatiro/"**.
6. Clique em **Visit site**. Esse é o link para o relatório do TCC.

Se o link mostrar erro 404 logo de início, espere mais alguns minutos: a primeira publicação pode demorar. Para acompanhar, abra a aba **Actions** do repositório; quando o item "pages build and deployment" ficar com um ✓ verde, o site está no ar.

### Passo 5 (opcional) — Mostrar o link no repositório
Na página inicial do repositório, clique na engrenagem ao lado de **About** (à direita), marque **Use your GitHub Pages website** e salve.

---

## 4. Como atualizar o site depois

Toda alteração enviada ao repositório é publicada sozinha em 1 a 2 minutos.

**Editar um arquivo de texto (ex.: `data.js`):** abra o arquivo no GitHub → clique no ícone de lápis (**Edit this file**) → altere → **Commit changes**.

**Trocar ou adicionar arquivos (fotos, por exemplo):** entre na pasta (ex.: `assets/img`) → **Add file → Upload files** → arraste → **Commit changes**. Um arquivo com o mesmo nome substitui o antigo.

**Se algo der errado:** cada envio fica salvo no histórico (botão **History** em cada arquivo). Dá para ver a versão anterior e copiar de volta.

### 4.1 Coletivos e atos (`assets/js/data.js`)
Cada coletivo e cada ato é um bloco entre `{ }`. Copie um bloco existente, cole logo abaixo (com uma vírgula entre os blocos) e mude os valores.
- `id`: identificador sem acento e sem espaço (aparece no endereço da página).
- Nos atos, `data` é `"AAAA-MM-DD"`, `hora` é `"HH:MM"` e `coletivo` é o `id` do coletivo organizador.
- Quando um item deixar de ser exemplo, troque `demo: true` por `demo: false`. Isso remove as etiquetas "Demonstração" e "[Exemplo fictício]".
- `contato` (coletivos) aceita um texto ou um link começando com `https://`.

Quando nada mais for fictício, apague a faixa "Demonstração" do topo: em cada arquivo `.html`, remova a linha que começa com `<div class="demo-bar"`.

### 4.2 Fotografias (`assets/js/fotos.js`)
O site tem espaços de foto com nomes: `hero`, `quem-somos`, um para cada "Foto sugerida" do manifesto (`manifesto-abertura`, `manifesto-p02` … `manifesto-p16`), um por coletivo e um por ato. Enquanto um espaço está vazio, aparece o bloco de cor com a etiqueta, como nas telas do projeto.

Para preencher:
1. Reduza a foto para no máximo ~1600 px de largura e salve em `.jpg` (qualidade 75–80%) ou `.webp`. Fotos leves deixam o site rápido no celular.
2. Envie para a pasta `assets/img/`. Use nomes sem acento e sem espaço (ex.: `hero-rua.jpg`).
3. Em `fotos.js`, troque `arquivo: null` por `arquivo: "hero-rua.jpg"` e ajuste o `alt` (descrição para leitores de tela).
4. Para ajustar o enquadramento, acrescente `pos: "50% 30%"` (horizontal, vertical).

Lembrete do manifesto: usar apenas fotos com autorização de uso de imagem das pessoas retratadas.

### 4.3 Fonte Ellak
Os títulos usam a Ellak. Se ela não estiver disponível, o site usa a Lilita One (Google Fonts) como substituta.
Para publicar com a Ellak de verdade (confira se a licença da fonte permite uso na web):
1. Envie `Ellak.woff2` (ou `Ellak.otf`) para `assets/fonts/`.
2. Em `assets/css/style.css`, no bloco `@font-face` do início, troque a linha `src: local("Ellak")…` pela linha indicada no comentário logo abaixo dela.

---

## 5. Testar no seu computador (opcional)
Dê dois cliques em `index.html` para abrir no navegador. Quase tudo funciona assim; o botão "Copiar link" e o compartilhamento funcionam melhor com o site já publicado (endereço `https://`).

## 6. Plano B de hospedagem
Se preferir não usar o GitHub, o **Cloudflare Pages** (pages.cloudflare.com → Create → Pages → Upload assets) e o **Netlify Drop** (app.netlify.com/drop) aceitam arrastar a pasta do site e também são gratuitos. O site funciona igual em qualquer um deles, porque não depende de servidor.
