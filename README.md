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
| 9 | **Quem já está aqui** | Carrossel de profissionais (3 por vez no desktop, 1 no celular) |
| 10 | **FAQ** | Acordeão |
| 11 | **CTA final** | "Pronto para dar o próximo passo no seu atendimento?" |
| 12 | **Rodapé** | "Clínica VALLENCI", contato, Instagram e localização |

**Botão de WhatsApp:** um único padrão em todo o site: ícone do WhatsApp nas cores da VALLENCI, texto "Toque para saber mais" e pulsação sutil (classe `.btn-wa`). Ele aparece no menu, no hero, nos planos, no FAQ, no CTA final e como botão flutuante. No celular, o flutuante surge depois do hero para não cobrir os diferenciais.

---|---|---|
| 1 | **Menu** | Integrado ao hero, sobre a imagem; fica sólido ao rolar. Logo + Estrutura, Localização, Ecossistema, Valores e Dúvidas, com **Fale Conosco** em destaque |
| 2 | **Hero** | Composição da clínica como fundo e degradê escuro à esquerda. Copy com hierarquia de tamanhos, pesos e sublinhados, CTA "Quero conhecer o espaço" e 3 diferenciais com ícones |
| 3 | **Talvez você se reconheça** | 6 situações em frases curtas |
| 4 | **Montar uma clínica própria custa...** | Comparativo em dois cards (clínica própria × VALLENCI) e o fechamento "O risco não é montar uma clínica…" |
| 5 | **Nossa Estrutura** | 4 diferenciais (ícone + título) e um carrossel grande com as fotos reais |
| 6 | **Localização** | Carrossel com as fotos do prédio, endereço e botão "Como chegar" (Google Maps) |
| 7 | **Ecossistema VALLENCI** | Áreas da saúde em órbita e faixa de logos dos parceiros |
| 8 | **Prova social** | Carrossel de profissionais (3 por vez no desktop, 1 no celular) com selo do formato utilizado |
| 9 | **Como funciona** | Hora Avulsa, Banco de Horas ("Mais escolhido") e Turno Fixo ("Mais benefícios"), sem preços |
| 10 | **FAQ** | Acordeão |
| 11 | **CTA final** | "Pronto para dar o próximo passo no seu atendimento?" |
| 12 | **Rodapé** | "Clínica VALLENCI", contato, Instagram e localização |

Botão flutuante com o **ícone oficial do WhatsApp** em todas as telas.

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
├── tracking.js       # GA4, Meta Pixel e conversão do Google Ads (ativados pelos IDs)
└── assets/
    ├── hero-clinica-vallenci.webp
    ├── situacoes/    # Imagens dos 6 cards de situações
    ├── marca/        # Símbolo, logotipo e favicon nas cores oficiais
    ├── estrutura/    # Recepção, salas com maca e consultórios
    ├── localizacao/  # Fachada, entrada, área externa e vista aérea
    └── parceiros/    # Logos do ecossistema
```

---

## Configuração rápida

Tudo fica em meta tags no `<head>` do `index.html`:

| Meta tag | O que preencher |
|---|---|
| `whatsapp-number` | Número com DDI e DDD, só dígitos (ex.: `5579999999999`) |
| `instagram-url` | URL completa do perfil |
| `ga-measurement-id` | ID do Google Analytics 4 (`G-...`) |
| `meta-pixel-id` | ID do Meta Pixel |
| `google-ads-id` / `google-ads-conversion-label` | Conta e rótulo de conversão do Google Ads |

Cada botão pode ter uma mensagem própria de WhatsApp (`data-wa-msg`). Os cards de "Como funciona", por exemplo, já informam a modalidade de interesse. Se houver links rastreáveis por canal (ex.: Tintim), basta preencher `waLinksByOrigin` no `script.js`: a origem da visita (UTM) passa a definir o destino dos botões.

### Adicionar um profissional

Em `index.html`, duplique um `<article class="pro-card">` no bloco "Quem já está aqui":

- **Foto:** troque o `.pro-photo-placeholder` por `<img src="assets/profissionais/nome.webp" alt="…">`.
- **Depoimento:** logo após `.pro-info`, inclua `<blockquote class="pro-quote">“…”</blockquote>`, sempre com a fala real do profissional.
- **Selo:** `<p class="pro-seal">` com Hora avulsa, Banco de horas ou Turno fixo.

### Adicionar um logo ao ecossistema

Salve a imagem quadrada em `assets/parceiros/` e inclua um `<li><img …></li>` na lista `.marquee-track`. A duplicação para a rolagem contínua é feita automaticamente pelo `script.js`.

### Vídeo vertical da seção Nossa Estrutura

Enquanto o vídeo não chega, o espaço mostra uma foto da recepção. Para ativar, salve o arquivo em `assets/video/apresentacao.mp4` e troque a `<img>` dentro de `.showcase-video` pelo `<video>` indicado no comentário do HTML.

---

## Pendências de conteúdo

- [x] WhatsApp (79) 99647-4061 e Instagram @vallencisaude
- [ ] Novas fotos da clínica (seção Nossa Estrutura)
- [ ] Vídeo vertical de apresentação da clínica (seção Nossa Estrutura)
- [ ] Fotos, modalidade, especialidade e depoimento ("O que você mais gosta na VALLENCI?") de cada profissional
- [ ] Validar as respostas do FAQ com a clínica
- [ ] IDs de rastreamento (GA4, Meta Pixel, Google Ads), se forem usados

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
