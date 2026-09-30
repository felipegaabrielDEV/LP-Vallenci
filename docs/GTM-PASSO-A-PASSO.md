# Passo a passo do Google Tag Manager — LP de salas da Vallenci

**Para:** o gestor de tráfego (ou quem montar o painel do GTM).
**Versão:** 1.0 · 30/09/2026.
**Base:** seção 6 do `GUIA_INSTALACAO_RASTREAMENTO` (29/09/2026), ajustada ao que o site **realmente envia** hoje.
**Regra geral:** nada de senha ou token no GTM nem no site. Onde aparece `[ENTRE_COLCHETES]`, é informação que ainda falta.

---

## 1. O que mudou em relação ao guia

O site já está pronto do lado do código (seções 4 e 5 do guia). O formulário seguiu o documento de ajustes do site (**opção A**), e não as perguntas propostas no guia. Por isso, **alguns nomes são diferentes**. Use os nomes da coluna "No site", senão as tags não recebem os dados.

| No guia | No site (usar este) | Observação |
|---|---|---|
| `form_id` = `lead_salas` | `form_id` = `whatsapp_lead` | |
| `profissao` | `area_atuacao` | Texto da opção: Nutrição, Medicina, Fisioterapia, Massoterapia, Estética, Psicologia, Outra |
| `ja_atende` | **não existe** | |
| `inicio_previsto` | **não existe** | |
| `intencao` | **não existe** | |
| — | `pacientes_mes` | Novo. Texto da opção: "Ainda não tenho pacientes", "De 1 a 5 pacientes" … "Mais de 40 pacientes" |
| `error_type` | `error_fields` | Campos com erro, separados por vírgula: `nome`, `whatsapp`, `area`, `pacientes` |
| — | `link_url` | Novo, no `whatsapp_click`: o endereço do WhatsApp (sem a mensagem) |

**Como o fluxo funciona no site:** todos os botões de WhatsApp abrem o formulário. Não existe o link "Prefiro ir direto ao WhatsApp" do guia. Depois de um envio válido, o site dispara `generate_lead` e, em seguida, `whatsapp_click`, e abre o WhatsApp com a mensagem pronta (mensagem padrão + respostas). Ou seja: **todo `whatsapp_click` vem logo depois de um `generate_lead`**.

---

## 2. Eventos que o site já envia ao `dataLayer`

Todos os eventos levam um `event_id` único (para deduplicação).

| Evento | Quando | Parâmetros |
|---|---|---|
| `consent_update` | A pessoa escolhe no aviso de cookies (ou volta ao site com a escolha salva) | `consent_analytics` (true/false), `consent_marketing` (true/false) |
| `form_open` | Abriu o formulário | `form_id`, `cta_position` |
| `form_start` | Mexeu no primeiro campo (uma vez por abertura) | `form_id`, `cta_position` |
| `form_error` | Tentou enviar com erro | `form_id`, `error_fields` |
| `generate_lead` | Envio válido | `form_id`, `cta_position`, `area_atuacao`, `pacientes_mes`, `ec_phone_sha256` |
| `whatsapp_click` | Seguiu para o WhatsApp (logo após o `generate_lead`) | `cta_position`, `link_url` |
| `section_view` | Viu a seção por 1 s (uma vez por visita) | `section_name`: `fotos_estrutura`, `fotos_localizacao` ou `valores` |

**Valores de `cta_position`** (botão que abriu o formulário): `menu`, `menu_mobile`, `hero`, `plano_hora_avulsa`, `plano_banco_de_horas`, `plano_turno_fixo`, `faq`, `cta_final`, `rodape`, `botao_flutuante`.

**`ec_phone_sha256`:** o WhatsApp informado, no formato `+55DDDNÚMERO`, embaralhado em SHA-256. Só para as conversões otimizadas do Google Ads. O site apaga esse valor do `dataLayer` logo depois do evento. **Nunca** mandar para o GA4 nem para o Meta. O nome da pessoa não vai para o `dataLayer`.

**Consentimento:** o site já aplica o Modo de Consentimento do Google (tudo negado por padrão) antes do GTM carregar, e reaplica a escolha salva a cada visita.

---

## 3. Antes de tudo

1. **Administrador → Configurações do contêiner → marcar "Ativar visão geral de consentimento".**
2. Não publicar nada antes dos testes da seção 8.

---

## 4. Variáveis

**Constantes**

| Nome | Valor |
|---|---|
| `C - GA4 ID` | `[ID_GA4]` (formato `G-XXXXXXX`) |
| `C - Google Ads ID` | `18482830906` (só os números; nas tags de conversão o GTM pede o ID sem o "AW-") |
| `C - Meta Pixel ID` | `1647209342987306` |
| `C - Clarity ID` | `[ID_CLARITY]` |

**Variáveis da camada de dados** (tipo "Variável da camada de dados", versão 2). Nome da variável = `DLV - ` + chave:

`event_id` · `form_id` · `cta_position` · `area_atuacao` · `pacientes_mes` · `error_fields` · `link_url` · `section_name` · `consent_analytics` · `consent_marketing` · `ec_phone_sha256`

Exemplo: variável `DLV - area_atuacao`, nome da variável da camada de dados `area_atuacao`.

**JavaScript personalizado** `JS - Dados EC Google Ads`:

```js
function () {
  var h = {{DLV - ec_phone_sha256}};
  return h ? { sha256_phone_number: h } : undefined;
}
```

**Dados fornecidos pelo usuário** `UPD - Formulário`: tipo **Código** → variável `{{JS - Dados EC Google Ads}}`.

---

## 5. Acionadores

| Nome | Tipo | Condição |
|---|---|---|
| `CE - consent_update` | Evento personalizado | `consent_update` |
| `CE - generate_lead` | Evento personalizado | `generate_lead` |
| `CE - whatsapp_click` | Evento personalizado | `whatsapp_click` |
| `CE - form_open` | Evento personalizado | `form_open` |
| `CE - form_start` | Evento personalizado | `form_start` |
| `CE - form_error` | Evento personalizado | `form_error` |
| `CE - section_view` | Evento personalizado | `section_view` |
| `Inicialização - Todas as páginas` | Inicialização | todas |
| `Todas as páginas` | Visualização de página | todas |

---

## 6. Tags

Em cada tag: **Configurações avançadas → Configurações de consentimento → "Exigir consentimento adicional"** com o tipo indicado. Nas tags de carregamento (Google tag, Vinculador, Meta Base, Tintim, Clarity), usar **"Opções de disparo: uma vez por página"**, com o acionador de página **e** o `CE - consent_update`. Assim, quem aceita o aviso no meio da visita passa a ser medido.

| Tag | Tipo | Acionador | Consentimento exigido | Configuração |
|---|---|---|---|---|
| **GA4 - Google tag** | Tag do Google | Inicialização + `CE - consent_update` (uma vez por página) | `analytics_storage` | ID `{{C - GA4 ID}}` |
| **GA4 - generate_lead** | Evento do GA4 | `CE - generate_lead` | `analytics_storage` | Nome `generate_lead`; parâmetros `form_id`, `cta_position`, `area_atuacao`, `pacientes_mes`. **Não** enviar `ec_phone_sha256` |
| **GA4 - eventos de interação** | Evento do GA4 | `CE - whatsapp_click`, `CE - form_open`, `CE - form_start`, `CE - form_error`, `CE - section_view` | `analytics_storage` | Nome `{{Event}}`; parâmetros `cta_position`, `form_id`, `section_name`, `error_fields` |
| **Ads - Vinculador de conversões** | Vinculador de conversões | Todas as páginas + `CE - consent_update` (uma vez por página) | `ad_storage` | — |
| **Ads - Formulário enviado** | Acompanhamento de conversões do Google Ads | `CE - generate_lead` | `ad_storage`, `ad_user_data` | ID `{{C - Google Ads ID}}`, rótulo `[ROTULO_ADS_FORMULARIO]`, **ID da transação `{{DLV - event_id}}`**, marcar **"Incluir dados fornecidos pelo usuário"** → `{{UPD - Formulário}}` |
| **Ads - Clique WhatsApp** | Acompanhamento de conversões do Google Ads | `CE - whatsapp_click` | `ad_storage` | Rótulo `[ROTULO_ADS_CLIQUE_WHATSAPP]`, ID da transação `{{DLV - event_id}}`. **Secundária**: aqui ela acompanha cada formulário enviado (ver seção 1) |
| **Meta - Base + PageView** | HTML personalizado | Todas as páginas + `CE - consent_update` (uma vez por página) | `ad_storage` | código 7.1 |
| **Meta - Lead** | HTML personalizado | `CE - generate_lead` | `ad_storage` | código 7.2 · Sequenciamento: disparar **depois** de "Meta - Base + PageView" |
| **Meta - Clique WhatsApp** | HTML personalizado | `CE - whatsapp_click` | `ad_storage` | código 7.3 · mesmo sequenciamento |
| **Tintim - Pixel** | HTML personalizado | Todas as páginas + `CE - consent_update` (uma vez por página) | `ad_storage` | `[CODIGO_PIXEL_TINTIM]`, colado exatamente como o Tintim entrega. **Só depois do ponto 9.2** |
| **Clarity** | HTML personalizado | Todas as páginas + `CE - consent_update` (uma vez por página) | `analytics_storage` | código 7.4 |

---

## 7. Códigos das tags HTML

**7.1 Meta - Base + PageView**
```html
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '{{C - Meta Pixel ID}}');
fbq('track', 'PageView');
</script>
```

**7.2 Meta - Lead** (com os campos do formulário do site)
```html
<script>
fbq('track', 'Lead', {
  content_name: 'lp_salas',
  area_atuacao: {{DLV - area_atuacao}},
  pacientes_mes: {{DLV - pacientes_mes}},
  cta_position: {{DLV - cta_position}}
}, { eventID: {{DLV - event_id}} });
</script>
```

**7.3 Meta - Clique WhatsApp** (evento personalizado, para não se confundir com o `Contact` que o Tintim envia quando a conversa existe de fato)
```html
<script>
fbq('trackCustom', 'WhatsAppClick', { cta_position: {{DLV - cta_position}} }, { eventID: {{DLV - event_id}} });
</script>
```

**7.4 Clarity**
```html
<script>
(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "{{C - Clarity ID}}");
window.clarity('consentv2', {
  analytics_Storage: 'granted',
  ad_Storage: {{DLV - consent_marketing}} ? 'granted' : 'denied'
});
</script>
```

---

## 8. Testes no modo "Visualizar" (antes de publicar)

Adaptação dos testes da seção 10 do guia. Onde conferir: **Tag Assistant (modo Visualizar do GTM)**, **GA4 → DebugView**, **Meta → Eventos de teste**, **DevTools → Application → Cookies**. Para começar do zero: aba anônima.

| # | Teste | Resultado esperado |
|---|---|---|
| T01 | 1ª visita, sem clicar no aviso | Nenhuma tag de GA4, Ads, Meta, Tintim ou Clarity dispara; nenhum cookie `_ga`, `_gcl`, `_fbp`, `_clck` |
| T02 | Clicar em **Aceitar** | `consent_update` com os dois `true`; Google tag, Meta PageView e Clarity disparam uma vez |
| T03 | Recarregar depois de aceitar | Tags disparam no carregamento, sem aviso |
| T04 | Clicar em **Recusar** | Nada dispara; o aviso some e não volta ao recarregar |
| T05 | Personalizar: só Estatística | GA4 e Clarity sim; Ads, Meta e Tintim não |
| T06 | Rodapé → Preferências de cookies → desmarcar tudo → Salvar | Página recarrega; cookies `_ga*`, `_gcl*`, `_fbp`, `_fbc`, `_clck`, `_clsk` apagados; nada dispara |
| T07 | Abrir o formulário pelo hero | `form_open` com `cta_position=hero`; **nenhum** `whatsapp_click` |
| T08 | Mexer num campo | `form_start` uma vez só, mesmo mexendo em vários campos |
| T09 | Enviar vazio / WhatsApp inválido (`123`) | Avisos de erro; `form_error` com `error_fields`; **nenhum** `generate_lead` |
| T10 | Envio válido | 1 `generate_lead` com `area_atuacao` e `pacientes_mes`; Ads "Formulário enviado" com ID da transação; Meta `Lead` com `eventID`; DebugView **sem** telefone nem hash; depois 1 `whatsapp_click` |
| T15 | Botão flutuante e botões dos planos | Abrem o formulário com o `cta_position` certo (`botao_flutuante`, `plano_turno_fixo`…) |
| T16 | Rolar até Estrutura, Localização e Valores e parar 1 s | Um `section_view` por seção; passar rápido não dispara; voltar não repete |
| T17 | Celular real (Android e iPhone) | Formulário cabe na tela; teclado numérico no WhatsApp; o WhatsApp abre com a mensagem e as respostas |
| T25 | Clarity | Gravação sem mostrar o que foi digitado no formulário |
| T26 | Bloqueador de anúncios ligado | Site e formulário funcionam; o WhatsApp abre; eventos podem faltar (limitação conhecida) |

Os testes do guia que dependem do Tintim (T12, T13, T18–T24, T27) ficam para quando o link rastreável estiver no site. O T14 ("Prefiro ir direto ao WhatsApp") não se aplica: esse link não existe no formulário do site.

---

## 9. Pontos de atenção

**9.1 GA4:** em **Definições personalizadas → dimensões de evento**, criar `area_atuacao`, `pacientes_mes`, `cta_position`, `section_name`, `form_id` e `error_fields` (no lugar de `profissao`, `ja_atende`, `inicio_previsto` e `intencao` do guia). Marcar **`generate_lead`** como evento principal. Desligar **Medição otimizada → Interações de formulário**, para não duplicar `form_start`.

**9.2 Tintim e a mensagem do WhatsApp:** hoje a mensagem que abre no WhatsApp leva as respostas do formulário, como pede o documento de ajustes. Segundo o guia, no link rastreável do Tintim a mensagem é fixa, configurada no Tintim. **Antes de instalar o pixel e trocar os links, confirmar com o Tintim:**
- se o link rastreável aceita um texto variável (as respostas do formulário);
- se o pixel do Tintim junta as UTMs quando o WhatsApp é aberto pelo botão "Continuar no WhatsApp" do formulário (o site abre o link pelo script, logo após o envio, e não por um clique direto no link).

Com essas respostas, o programador ajusta o `script.js` e o `lead-form.js` e testa com o link real.

**9.3 Leitura por campanha (substitui a "intenção" do guia):** no GA4, em Explorar → Forma livre, usar a linha "Campanha da sessão", as colunas `area_atuacao` e `pacientes_mes` e o valor "Contagem de eventos" de `generate_lead`. Campanhas que trazem muitos "Ainda não tenho pacientes" atraem quem ainda não vai alugar.

**9.4 Publicar:** GTM → **Enviar → Publicar**, com o nome da versão `v1 - rastreamento LP salas`. Para desfazer: **Versões** → escolher a anterior → **Publicar**. Isso desliga todas as tags na hora, sem mexer no site.

---

## 10. O que falta para montar o painel

- `[ID_GA4]` e `[ID_CLARITY]`: criar as propriedades (seções 8.1 e 8.4 do guia).
- `[ROTULO_ADS_FORMULARIO]` e `[ROTULO_ADS_CLIQUE_WHATSAPP]`: criar as conversões no Google Ads (seção 8.2 do guia).
- `[CODIGO_PIXEL_TINTIM]` e o link rastreável: depois da confirmação do ponto 9.2.
- Token novo do Meta: só no Tintim, nunca no GTM nem no site.
