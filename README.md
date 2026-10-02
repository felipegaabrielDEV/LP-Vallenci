# 🌿 Clínica VALLENCI — Landing Page | Salas para profissionais da saúde

Landing page desenvolvida para a **Clínica VALLENCI — Saúde Integrada**, espaço no Neo Office Jardins, em frente ao Shopping Jardins, em Aracaju/SE, que oferece salas equipadas e recepção estruturada para profissionais da saúde atenderem os próprios pacientes. O projeto foi construído do zero como uma página única (*one-page*), focada em apresentar a estrutura, gerar confiança e converter visitantes em contatos qualificados via WhatsApp.

**🔗 Acesse o site publicado:** [vallencisaude.com.br/salas](https://vallencisaude.com.br/salas/)

![Preview da landing page](assets/compartilhar-vallenci.jpg)

---

## 📋 Sobre o projeto

A página apresenta a VALLENCI como o próximo passo na carreira do profissional da saúde: **uma estrutura à altura do seu trabalho, sem o custo e o risco de montar uma clínica própria**. O visitante é guiado das situações do dia a dia até a estrutura, os formatos de uso, a localização e os profissionais que já atendem ali, com chamadas para ação em todos os pontos-chave.

A página foi pensada e construída com foco em:

- **Conversão**: todos os botões abrem um formulário curto antes do WhatsApp, e a pessoa chega à conversa com as respostas já escritas na mensagem;
- **Confiança**: fotos reais da clínica e do prédio, profissionais com foto, modalidade e depoimento, e o ecossistema de parceiros;
- **Medição com privacidade**: Google Tag Manager com aviso de cookies (LGPD) e Modo de Consentimento do Google; nada é medido antes de a pessoa aceitar;
- **Acessibilidade e performance**: respeito a `prefers-reduced-motion`, foco visível para teclado, imagens em WebP e carregamento sem *layout shift*.

---

## ✨ Funcionalidades

| Seção | Destaques |
|---|---|
| **Menu** | Fundo claro, links no verde da marca e o botão padrão de WhatsApp |
| **Hero** | Composição da clínica ao fundo, degradê atrás do texto, headline "Para crescer, seu espaço também precisa estar à altura." e 3 diferenciais numa faixa |
| **Em qual dessas situações você mais se vê?** | 6 cards com imagem e a situação do profissional |
| **Clínica própria × VALLENCI** | Comparativo de custos ("Aqui na VALLENCI: você paga apenas pelo tempo de uso.") |
| **Nossa Estrutura** | Diferenciais e bloco com vídeo vertical + colagem de fotos |
| **Como funciona** | Hora Avulsa, Banco de Horas ("Mais escolhido") e Turno Fixo ("Mais benefícios") |
| **Localização** | Carrossel com fotos do prédio, endereço e botão "Como chegar" |
| **Ecossistema VALLENCI** | 6 áreas em órbita e faixa contínua com os logos dos parceiros |
| **Quem já está aqui** | Carrossel de profissionais (3 por vez no desktop, 1 no celular) com foto, especialidade, selo da modalidade e depoimento |
| **Perguntas frequentes** | Acordeão com abertura suave |
| **CTA final e rodapé** | "Pronto para dar o próximo passo no seu atendimento?", contato, horários, Instagram e localização |

**Formulário antes do WhatsApp:** qualquer botão de WhatsApp abre uma janela com Nome, WhatsApp com DDD (com máscara e validação), área de atuação e pacientes por mês. Depois de enviar, a pessoa segue para o WhatsApp com as respostas na mensagem, e a janela mostra uma confirmação ("Tudo certo, Maria!") com um botão para abrir o WhatsApp de novo.

**Botão de WhatsApp:** um único padrão em todo o site: ícone nas cores da VALLENCI, texto "Toque para saber mais" e pulsação sutil. O botão flutuante é o círculo verde com o ícone oficial.

**Também no site:** aviso de cookies com "Aceitar", "Recusar" e "Personalizar"; página de **Política de privacidade**; **página 404** com a identidade da clínica; **prévia ao compartilhar o link** (WhatsApp, Instagram, Facebook); **dados da clínica para o Google** (LocalBusiness) e **sitemap**.

---

## 🎨 Identidade visual

| Cor | Hex | Uso |
|---|---|---|
| Oil Green (verde oficial) | `#83836C` | Botões, ícones, destaques |
| Arctic Wolf | `#E7DED0` | Fundos e detalhes em creme |
| Snow White | `#F2F0EA` | Fundos claros |
| Verde do logotipo | `#4D5143` | Textos e títulos |

Tipografia (Google Fonts): **Cormorant Garamond** nos títulos, **Manrope** nos textos e **Julius Sans One** no nome "VALLENCI". O logo e o símbolo foram extraídos dos arquivos oficiais, com fundo transparente, em `assets/marca/`.

---

## 🛠️ Tecnologias

Projeto **100% estático**, sem frameworks, bundlers ou dependências de build, publicado diretamente via **GitHub Pages**.

- **HTML5** semântico
- **CSS3** puro (custom properties, Grid, Flexbox, animações e transições nativas)
- **JavaScript** vanilla (ES6+), sem bibliotecas externas
- **Google Tag Manager** + **Modo de Consentimento v2**: GA4, Google Ads, Meta, Clarity e Tintim configurados no painel do GTM
- **[Tintim](https://tintim.link/)**: pronto para links de WhatsApp rastreáveis por origem (UTM)

---

## 📁 Estrutura do projeto

```
├── index.html                    # Estrutura e conteúdo de todas as seções
├── styles.css                    # Identidade visual, layout responsivo e animações
├── script.js                     # Menu, carrosséis, FAQ e links do WhatsApp
├── lead-form.js                  # Formulário antes do WhatsApp e confirmação
├── eventos.js                    # Eventos para o Google Tag Manager (formulário e seções vistas)
├── consent.js                    # Aviso de cookies (LGPD) e Modo de Consentimento do Google
├── politica-de-privacidade.html  # Política de privacidade (rascunho para revisão)
├── 404.html                      # Página para endereços que não existem
├── sitemap.xml                   # Mapa do site para o Google (o robots.txt fica em vallencisaude.github.io)
├── docs/                         # Passo a passo do GTM para o gestor de tráfego
└── assets/
    ├── hero-clinica-vallenci.webp
    ├── compartilhar-vallenci.jpg # Prévia ao compartilhar o link (1200×630)
    ├── situacoes/                # Imagens dos 6 cards de situações
    ├── marca/                    # Símbolo, logotipo, favicon e logo quadrada (512 px)
    ├── estrutura/                # Recepção, salas com maca e consultórios
    ├── localizacao/              # Fachada, entrada, área externa e vista aérea
    ├── profissionais/            # Fotos dos profissionais (4:5, WebP)
    └── parceiros/                # Logos do ecossistema
```

---

## 📱 Responsividade

Layout desenvolvido com abordagem **mobile-first** e testado nas principais larguras de tela:

`320px` · `375px` · `390px` · `430px` · `768px` (tablet) · `1024px` · `1366px` · `1920px`

Sem rolagem horizontal, sobreposição de elementos ou conteúdo cortado em nenhuma faixa testada.

---

## ♿ Acessibilidade e performance

- Navegação por teclado com estados de foco visíveis (`:focus-visible`), inclusive dentro do formulário
- Todas as animações respeitam `prefers-reduced-motion`
- Imagens com `loading="lazy"`, dimensões declaradas e formato WebP otimizado
- Textos alternativos descritivos em todas as imagens de conteúdo
- Áreas de toque adequadas e campos com 16 px (sem zoom automático no iPhone)

---

## 🚀 Como rodar localmente

Por ser um projeto estático, não há dependências para instalar:

```bash
git clone https://github.com/vallencisaude/salas.git
cd salas
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`, ou abra a pasta com a extensão **Live Server** (VS Code).

---

## 🌐 Deploy

- **Endereço oficial:** `https://vallencisaude.com.br/salas/`, publicado automaticamente via **GitHub Pages** a cada atualização.
- **Onde fica:** organização [`vallencisaude`](https://github.com/vallencisaude) no GitHub, repositório `salas`.
- **Domínio:** ligado ao site da organização (repositório [`vallencisaude.github.io`](https://github.com/vallencisaude/vallencisaude.github.io)), verificado no GitHub e com HTTPS. Cada repositório da organização aparece numa "pasta" do domínio: `salas` → `/salas`, e futuros `exames`, `consultas` etc. Enquanto o site principal da clínica não existe, `vallencisaude.com.br` e `www.vallencisaude.com.br` levam para `/salas/`, mantendo os parâmetros UTM do link.
- **DNS** (Registro.br, zona do `vallencisaude.com.br`):

| Tipo | Nome | Dados |
|---|---|---|
| A | `vallencisaude.com.br` | `185.199.108.153` · `185.199.109.153` · `185.199.110.153` · `185.199.111.153` |
| CNAME | `www` | `vallencisaude.github.io` |
| TXT | `_github-pages-challenge-vallencisaude` | Verificação do domínio no GitHub |

### Prévia ao compartilhar o link

`assets/compartilhar-vallenci.jpg` (1200 × 630, JPG) aparece quando o link é enviado no WhatsApp, Instagram ou Facebook. As tags `og:url`, `og:image` e `canonical` usam o endereço completo (`https://vallencisaude.com.br/salas/`). Se o endereço do site mudar, troque nelas e nos dados da clínica, abaixo.

### Dados da clínica para o Google

No `<head>` do `index.html` há um bloco `application/ld+json` (LocalBusiness) com nome, endereço, telefone, horário e Instagram, os mesmos do rodapé. Se algum dado mudar no rodapé, mude também ali. Para conferir: [Teste de pesquisa aprimorada do Google](https://search.google.com/test/rich-results).

---

## 📊 Rastreamento e cookies

- **Google Tag Manager `GTM-NFX8MX4W`** instalado no `<head>` e logo depois do `<body>`. GA4, Google Ads, Meta, Clarity e Tintim são configurados **no painel do GTM**, sem mexer no site.
- **Consentimento (LGPD):** tudo começa negado. O aviso de cookies (`consent.js`) grava a escolha em `localStorage` (`vl_consent`), atualiza o Modo de Consentimento do Google e envia `consent_update` ao GTM. O link "Preferências de cookies", no rodapé, reabre o aviso; ao retirar uma permissão, os cookies de medição são apagados e a página recarrega.
- **Passo a passo do painel do GTM** (variáveis, acionadores, tags e testes, com os nomes que o site envia): [`docs/GTM-PASSO-A-PASSO.md`](docs/GTM-PASSO-A-PASSO.md) e a versão em Word, `docs/GTM-PASSO-A-PASSO.docx`.
- **Proteção de dados:** o nome nunca é enviado às ferramentas; o telefone só vai embaralhado (SHA-256), para as conversões otimizadas do Google Ads, e é apagado do `dataLayer` logo depois.

**Eventos no `dataLayer`** (`eventos.js` e `lead-form.js`), todos com `event_id`:

| Evento | Quando | Parâmetros |
|---|---|---|
| `form_open` | Abriu o formulário | `form_id`, `cta_position` |
| `form_start` | Mexeu no primeiro campo | `form_id`, `cta_position` |
| `form_error` | Tentou enviar com erro | `form_id`, `error_fields` |
| `generate_lead` | Envio válido | `form_id`, `cta_position`, `area_atuacao`, `pacientes_mes`, `ec_phone_sha256` |
| `whatsapp_click` | Seguiu para o WhatsApp | `cta_position`, `link_url` |
| `section_view` | Viu Estrutura, Localização ou Valores por 1 s | `section_name` (`fotos_estrutura`, `fotos_localizacao`, `valores`) |
| `consent_update` | Escolheu no aviso de cookies | `consent_analytics`, `consent_marketing` |

O token da API de Conversões da Meta não deve ser incluído neste projeto estático nem no repositório público: ele fica só na Tintim.

---

## 🧩 Manutenção

### Contato

Em meta tags no `<head>` do `index.html`:

| Meta tag | O que preencher |
|---|---|
| `whatsapp-number` | Número com DDI e DDD, só dígitos (ex.: `5579999999999`) |
| `instagram-url` | URL completa do perfil |

A mensagem do WhatsApp é a padrão ("Olá! Sou profissional…") seguida das respostas do formulário. Se houver links rastreáveis por canal (ex.: Tintim), basta preencher `waLinksByOrigin` no `script.js`: a origem da visita (UTM) passa a definir o destino dos botões.

### Adicionar um profissional

Em `index.html`, duplique um `<article class="pro-card">` no bloco "Quem já está aqui":

- **Foto:** retrato vertical 4:5 (800 × 1000 px, em WebP), com o rosto no terço de cima, em `assets/profissionais/`.
- **Etiqueta sobre a foto (`.pro-tag`):** nome e "Formação · Especialidade".
- **Selo:** `<p class="pro-seal">` com Fundadora, Hora avulsa, Banco de horas ou Turno fixo.
- **Depoimento:** logo depois do selo, `<blockquote class="pro-quote">“…”</blockquote>`, sempre com a fala real do profissional.

Os cards de quem ainda não mandou foto ficam comentados no fim do carrossel, prontos para entrar.

### Adicionar um logo ao ecossistema

Salve a imagem quadrada em `assets/parceiros/` e inclua um `<li><img …></li>` na lista `.marquee-track`. A duplicação para a rolagem contínua é feita automaticamente pelo `script.js`.

### Vídeo vertical da seção Nossa Estrutura

Enquanto o vídeo não chega, o espaço mostra uma foto da recepção. Para ativar, salve o arquivo em `assets/video/apresentacao.mp4` e troque a `<img>` dentro de `.showcase-video` pelo `<video>` indicado no comentário do HTML.

---

## ✅ Pendências de conteúdo

- [x] WhatsApp (79) 99647-4061 e Instagram @vallencisaude
- [x] Domínio oficial `vallencisaude.com.br/salas` com HTTPS
- [ ] Novas fotos da clínica (seção Nossa Estrutura)
- [ ] Vídeo vertical de apresentação da clínica (seção Nossa Estrutura)
- [x] Fotos e depoimentos de Ivone, Camila, Thiago, Lua Clara, Ercivan e Vitória (documento "PROFISSIONAIS PARA O SITE", 28/09)
- [ ] Depoimento da Anna Waleska
- [x] Fotos de Daniela Gama, Luíza Dantas e Kelly Roberta (faltam especialidade e depoimento; da Kelly, também a modalidade)
- [ ] Foto, especialidade e depoimento de Andreia Pereira, Lavínia Araújo e Luana
- [ ] Especialidade do Ercivan Messias
- [ ] Validar as respostas do FAQ com a clínica
- [x] Google Tag Manager, aviso de cookies e eventos no site
- [ ] Política de privacidade: CNPJ, e-mail de contato e revisão jurídica
- [ ] Configuração do painel do GTM: GA4, Clarity, conversões do Google Ads, Meta e Tintim (IDs com o gestor de tráfego)

---

## 👤 Autor

Desenvolvido por **[Felipe Gabriel](https://github.com/felipegaabrieldev)**.

---

## 📄 Licença

Este repositório documenta um projeto de cliente real. O código-fonte pode ser usado como referência de portfólio; imagens, marca, textos e identidade visual pertencem à **Clínica VALLENCI — Saúde Integrada** e às marcas parceiras, e não devem ser reutilizados sem autorização.
