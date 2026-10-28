# Connect Culture 2.0

Site bilíngue (português e inglês) de turismo cultural do **Sertão do Pajeú** e do **Sertão do Moxotó** (PE), feito pelos alunos do MEDIOTEC – Técnico em Desenvolvimento de Sistemas do Senac Serra Talhada. Cada ponto turístico tem uma página própria, aberta pelo QR Code instalado no local.

## Como rodar

O site lê os dados de arquivos JSON, por isso precisa de um servidor local (dois cliques no `index.html` não funcionam).

1. Abra a pasta `src` no VS Code.
2. Instale a extensão **Live Server**.
3. Clique com o botão direito em `index.html` → **Open with Live Server**.

## Páginas

| Página | Endereço |
|---|---|
| Início | `index.html` |
| Pontos turísticos (busca e filtros) | `pages/pontos.html` |
| Um ponto turístico | `pages/ponto.html?id=pico-do-papagaio` |
| Uma cidade | `pages/cidade.html?id=triunfo` |
| Sobre e equipe | `pages/sobre.html` |
| Mesma página em inglês | acrescente `?lang=en` ou use o botão **EN** |

## Estrutura

```
src/
├── dados/
│   ├── cidades.json      26 cidades
│   └── pontos.json       75 pontos turísticos
├── assets/img/
│   ├── pontos/           fotos dos pontos (nome = campo "arquivo" do JSON)
│   ├── qrcodes/          qr-code-<slug>.png
│   └── equipe/           fotos da equipe
├── pages/                pontos, ponto, cidade, sobre
├── scripts/              idioma.js, dados.js e um arquivo por página
├── styles/               style.css, home.css, content.css, connect.css
└── vercel.json           endereços /pontos/<slug> usados pelos QR Codes
geradorqrcode.js          gera os QR Codes (npm run qrcodes)
links-qrcode.txt          lista dos links que estão nos QR Codes
```

## Como mudar o conteúdo

- **Texto de um ponto:** edite `dados/pontos.json` (procure pelo `slug`). `descricao` é o português e `descricao_en` o inglês.
- **Foto nova:** salve em `assets/img/pontos/` e acrescente em `"imagens"` do ponto, com a `fonte`.
- **Textos fixos dos botões e menus:** `scripts/idioma.js` (objeto `TEXTOS`, `pt` e `en`).
- **Equipe e textos da página Sobre:** `pages/sobre.html` (cada texto tem a versão `texto-pt` e `texto-en`).

## Publicar (Vercel)

Na Vercel, escolha **Root Directory = `src`**. O `vercel.json` faz o endereço `/pontos/pico-do-papagaio` (o do QR Code) abrir a página do ponto.

Site atual: **https://connectculture-src.vercel.app/**

## QR Codes

Cada QR Code abre `https://connectculture-src.vercel.app/pontos/<slug>`. Se o endereço do site mudar:

1. Abra `geradorqrcode.js` e troque a linha `const SITE = '...'`.
2. No terminal, na pasta do projeto: `npm install` (só na primeira vez) e depois `npm run qrcodes`.
3. As imagens em `src/assets/img/qrcodes/` são recriadas e `links-qrcode.txt` é atualizado.

Ponto novo no `pontos.json`? Rode `npm run qrcodes` de novo para ele ganhar o QR Code.
