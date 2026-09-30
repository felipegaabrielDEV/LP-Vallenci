/* --------------------------------------------------------------------------
   Eventos da página para o Google Tag Manager (dataLayer)
   Quem decide o que vai para GA4, Google Ads, Meta, Clarity e Tintim é o
   painel do GTM, sempre respeitando o aviso de cookies (consent.js).
   Nenhum dado pessoal em texto aberto vai para o dataLayer: o telefone do
   formulário só entra embaralhado (SHA-256), para as conversões otimizadas
   do Google Ads, e é apagado logo depois do evento (lead-form.js).

   Eventos: form_open, form_start, form_error, generate_lead, whatsapp_click
   (formulário) e section_view (seções vistas). Cada um leva um event_id
   único, usado pelas plataformas para não contar a mesma ação duas vezes.
   -------------------------------------------------------------------------- */
(() => {
    const dataLayer = window.dataLayer = window.dataLayer || [];

    const uuid = () => (window.crypto && crypto.randomUUID && crypto.randomUUID()) ||
        "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            return (c === "x" ? r : (r & 3 | 8)).toString(16);
        });

    window.vallenciTrack = (event, params = {}) => {
        const eventId = uuid();
        dataLayer.push({ event, event_id: eventId, ...params });
        return eventId;
    };

    /* Seção vista: metade da seção (ou metade da tela, se a seção for maior
       que a tela) visível por 1 segundo. Uma vez por seção a cada visita. */
    const sections = [
        { selector: "#estrutura .showcase", name: "fotos_estrutura" },
        { selector: "#localizacao .carousel", name: "fotos_localizacao" },
        { selector: "#formatos .plans", name: "valores" }
    ];
    if (!("IntersectionObserver" in window)) return;

    sections.forEach(({ selector, name }) => {
        const element = document.querySelector(selector);
        if (!element) return;
        let timer = null;
        const observer = new IntersectionObserver(entries => entries.forEach(entry => {
            const base = Math.min(entry.boundingClientRect.height, window.innerHeight) || 1;
            const visible = entry.isIntersecting && entry.intersectionRect.height / base >= .5;
            if (visible && !timer) {
                timer = setTimeout(() => {
                    observer.disconnect();
                    window.vallenciTrack("section_view", { section_name: name });
                }, 1000);
            } else if (!visible && timer) {
                clearTimeout(timer);
                timer = null;
            }
        }), { threshold: [0, .25, .5, .75, 1] });
        observer.observe(element);
    });
})();
