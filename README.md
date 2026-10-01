# Clínica VALLENCI — Landing Page | Salas para profissionais da saúde

Landing page da **Clínica VALLENCI — Saúde Integrada**, espaço no Neo Office Jardins, em frente ao Shopping Jardins, em Aracaju/SE, que oferece salas equipadas e recepção estruturada para profissionais da saúde atenderem os próprios pacientes.

A página apresenta a VALLENCI como o próximo passo na carreira do profissional: uma estrutura à altura do seu trabalho, sem o custo e o risco de montar uma clínica própria. Todos os CTAs levam ao WhatsApp.

---

## Estrutura da página

A ordem segue o documento de ajustes do cliente (revisão de 23/09):

| # | Bloco | Destaques |
|---|---|---|
| 1 | **Menu** | Fundo claro, links no verde da marca, "Clínica VALLENCI" e o botão padrão de WhatsApp |
| 2 | **Hero** | Composição da clínica ao fundo, degradê escuro atrás da copy, headline "Para crescer, seu espaço também precisa estar à altura." e os 3 diferenciais numa faixa verde |
| 3 | **Em qual dessas situações você mais se vê?** | 6 cards com imagem representativa em cima e a situação embaixo |
| 4 | **Montar uma clínica própria custa...** | Comparativo clínica própria × VALLENCI ("Aqui na VALLENCI: ✓ Você paga apenas pelo tempo de uso.") |
| 5 | **Nossa Estrutura** | 3 diferenciais e um bloco estático: vídeo vertical + colagem de fotos |
| 6 | **Como funciona** | Hora Avulsa, Banco de Horas ("Mais escolhido") e Turno Fixo ("Mais benefícios"), sem preços |
| 7 | **Localização** | Carrossel com as fotos do prédio, endereço e botão "Como chegar" |
| 8 | **Ecossistema VALLENCI** | 6 áreas em órbita e faixa contínua de logos de profissionais e parceiros |
| 9 | **Quem já está aqui** | Carrossel de profissionais (3 por vez no desktop, 1 no celular): foto com nome e especialidade sobrepostos, selo da modalidade e depoimento |
| 10 | **FAQ** | Acordeão |
| 11 | **CTA final** | "Pronto para dar o próximo passo no seu atendimento?" |
| 12 | **Rodapé** | "Clínica VALLENCI", contato, Instagram e localização |

**Formulário antes do WhatsApp:** todos os botões de WhatsApp abrem uma janela com Nome, WhatsApp com DDD, área de atuação e pacientes por mês. Depois de validar, a pessoa segue para o WhatsApp com as respostas já na mensagem e confirma o envio por lá (`lead-form.js`). O rastreamento recebe `form_open`, `form_start`, `form_error`, `generate_lead` e `whatsapp_click`. O nome nunca vai; o telefone só vai embaralhado (SHA-256), para as conversões otimizadas do Google Ads.

**Botão de WhatsApp:** um único padrão em todo o site: ícone do WhatsApp nas cores da VALLENCI, texto "Toque para saber mais" e pulsação sutil (classe `.btn-wa`). Ele aparece no menu, no hero, nos planos, no FAQ e no CTA final. O botão flutuante é o círculo verde com o ícone oficial do WhatsApp.

---

## Identidade visual

| Cor | Hex | Uso |
|---|---|---|
| Oil Green (verde oficial) | `#83836C` | Botões, ícones, destaques |
| Arctic Wolf | `#E7DED0` | Fundos e detalhes em creme |
| Snow White | `#F2F0EA` | Fundos claros |
| Verde do logotipo | `#4D5143` | Textos e títulos |

Tipografia (Google Fonts): **Cormorant Garamond** nos títulos, **Manrope** nos textos e **Julius Sans One** no nome "VALLENCI". O logo e o símbolo foram extraídos dos arquivos oficiais, com fundo transparente, em `assets/marca/`.

---

## Tecnologias

Projeto **100% estático**, sem frameworks nem etapa de build, pronto para o **GitHub Pages**.

- HTML5 semântico, CSS3 puro e JavaScript vanilla
- Imagens em WebP otimizado
- Mobile-first, sem rolagem horizontal de 320px a 1920px
- Respeita `prefers-reduced-motion`, foco visível para teclado e textos alternativos nas imagens

---

## Estrutura de arquivos

```
├── index.html        # Estrutura e conteúdo de todas as seções
├── styles.css        # Identidade visual, layout responsivo e animações
├── script.js         # Menu, carrosséis, FAQ e links do WhatsApp
├── lead-form.js      # Formulário que abre antes do WhatsApp
├── eventos.js        # Eventos para o Google Tag Manager (formulário e seções vistas)
├── consent.js        # Aviso de cookies (LGPD) e Modo de Consentimento do Google
├── politica-de-privacidade.html  # Política de privacidade (rascunho para revisão)
├── docs/             # Passo a passo do GTM para o gestor de tráfego
└── assets/
    ├── hero-clinica-vallenci.webp
    ├── compartilhar-vallenci-v2.jpg  # Prévia ao compartilhar o link (1200×630)
    ├── situacoes/    # Imagens dos 6 cards de situações
    ├── marca/        # Símbolo, logotipo e favicon nas cores oficiais
    ├── estrutura/    # Recepção, salas com maca e consultórios
    ├── localizacao/  # Fachada, entrada, área externa e vista aérea
    └── parceiros/    # Logos do ecossistema
```

---

## Configuração rápida

Contato, em meta tags no `<head>` do `index.html`:

| Meta tag | O que preencher |
|---|---|
| `whatsapp-number` | Número com DDI e DDD, só dígitos (ex.: `5579999999999`) |
| `instagram-url` | URL completa do perfil |

A mensagem do WhatsApp é a padrão ("Olá! Sou profissional…") seguida das respostas do formulário. Se houver links rastreáveis por canal (ex.: Tintim), basta preencher `waLinksByOrigin` no `script.js`: a origem da visita (UTM) passa a definir o destino dos botões.

### Prévia ao compartilhar o link

`assets/compartilhar-vallenci-v2.jpg` (1200 × 630, JPG) aparece quando o link é enviado no WhatsApp, Instagram ou Facebook. As tags `og:url` e `og:image` precisam do endereço completo: **ao publicar no domínio oficial, troque `https://felipegaabrieldev.github.io/LP-Vallenci/` pelo novo endereço** nas duas.

### Rastreamento e cookies

- **Google Tag Manager `GTM-NFX8MX4W`** instalado no `<head>` e logo depois do `<body>`. GA4, Google Ads, Meta, Clarity e Tintim são configurados **no painel do GTM**, sem mexer no site.
- **Consentimento (LGPD):** tudo começa negado. O aviso de cookies (`consent.js`) grava a escolha em `localStorage` (`vl_consent`), atualiza o Modo de Consentimento do Google e envia `consent_update` ao GTM. O link "Preferências de cookies", no rodapé, reabre o aviso; ao retirar uma permissão, os cookies de medição são apagados e a página recarrega.
- **Passo a passo do painel do GTM** (variáveis, acionadores, tags e testes, com os nomes que o site envia): [`docs/GTM-PASSO-A-PASSO.md`](docs/GTM-PASSO-A-PASSO.md) e a versão em Word, `docs/GTM-PASSO-A-PASSO.docx`.
- **Eventos no `dataLayer`** (`eventos.js` e `lead-form.js`), todos com `event_id`:

| Evento | Quando | Parâmetros |
|---|---|---|
| `form_open` | Abriu o formulário | `form_id`, `cta_position` |
| `form_start` | Mexeu no primeiro campo | `form_id`, `cta_position` |
| `form_error` | Tentou enviar com erro | `form_id`, `error_fields` |
| `generate_lead` | Envio válido | `form_id`, `cta_position`, `area_atuacao`, `pacientes_mes`, `ec_phone_sha256` |
| `whatsapp_click` | Seguiu para o WhatsApp | `cta_position`, `link_url` |
| `section_view` | Viu Estrutura, Localização ou Valores por 1 s | `section_name` (`fotos_estrutura`, `fotos_localizacao`, `valores`) |
| `consent_update` | Escolheu no aviso de cookies | `consent_analytics`, `consent_marketing` |

### Adicionar um profissional

Em `index.html`, duplique um `<article class="pro-card">` no bloco "Quem já está aqui":

- **Foto:** retrato vertical 4:5 (até 800 × 1000 px, em WebP), com o rosto no terço de cima, em `assets/profissionais/`. Troque o `.pro-photo-placeholder` por `<img src="assets/profissionais/nome.webp" alt="…">`.
- **Etiqueta sobre a foto (`.pro-tag`):** nome e "Formação · Especialidade".
- **Selo:** `<p class="pro-seal">` com Fundadora, Hora avulsa, Banco de horas ou Turno fixo.
- **Depoimento:** logo depois do selo, `<blockquote class="pro-quote">“…”</blockquote>`, sempre com a fala real do profissional.

### Adicionar um logo ao ecossistema

Salve a imagem quadrada em `assets/parceiros/` e inclua um `<li><img …></li>` na lista `.marquee-track`. A duplicação para a rolagem contínua é feita automaticamente pelo `script.js`.

### Vídeo vertical da seção Nossa Estrutura

Enquanto o vídeo não chega, o espaço mostra uma foto da recepção. Para ativar, salve o arquivo em `assets/video/apresentacao.mp4` e troque a `<img>` dentro de `.showcase-video` pelo `<video>` indicado no comentário do HTML.

---

## Pendências de conteúdo

- [x] WhatsApp (79) 99647-4061 e Instagram @vallencisaude
- [ ] Novas fotos da clínica (seção Nossa Estrutura)
- [ ] Vídeo vertical de apresentação da clínica (seção Nossa Estrutura)
- [x] Fotos e depoimentos de Ivone, Camila, Thiago, Lua Clara, Ercivan e Vitória (documento "PROFISSIONAIS PARA O SITE", 28/09)
- [ ] Depoimento da Anna Waleska
- [ ] Foto, especialidade e depoimento de Daniela Gama, Andreia Pereira, Lavínia Araújo, Luana e Luíza Dantas (cards ocultos até a foto chegar, a pedido do cliente: ficam comentados no fim do carrossel em `index.html`)
- [ ] Especialidade do Ercivan Messias
- [ ] Validar as respostas do FAQ com a clínica
- [x] Google Tag Manager, aviso de cookies e eventos no site
- [ ] Política de privacidade (página) e revisão jurídica do aviso de cookies
- [ ] Configuração do painel do GTM: GA4, Clarity, conversões do Google Ads, Meta e Tintim (IDs com o gestor de tráfego)

---

## Como rodar localmente

```bash
git clone https://github.com/felipegaabrieldev/LP-Vallenci.git
cd LP-Vallenci
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

---

## Autor

Desenvolvido por **[Felipe Gabriel](https://github.com/felipegaabrieldev)**.

Imagens, marca, textos e identidade visual pertencem à **Clínica VALLENCI — Saúde Integrada** e às marcas parceiras, e não devem ser reutilizados sem autorização.
