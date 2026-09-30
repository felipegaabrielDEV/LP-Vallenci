/* Rastreamento: GA4, Meta Pixel e conversão do Google Ads na ida ao WhatsApp.
   Os IDs ficam nas meta tags do <head> do index.html. Enquanto estiverem
   vazios, nenhuma tag externa é carregada. */
(() => {
    const campaignParameterNames = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];
    const pageParameters = new URLSearchParams(location.search);
    const campaignAttribution = Object.fromEntries(campaignParameterNames.map(name => [name, pageParameters.get(name) || ""]));
    const meta = name => document.querySelector(`meta[name="${name}"]`)?.content.trim() || "";

    const analyticsId = meta("ga-measurement-id");
    const metaPixelId = meta("meta-pixel-id");
    const googleAdsId = meta("google-ads-id");
    const googleAdsConversionLabel = meta("google-ads-conversion-label");
    const dataLayer = window.dataLayer = window.dataLayer || [];

    const attributionPayload = () => Object.fromEntries(Object.entries(campaignAttribution).filter(([, value]) => value));

    function trackEvent(eventName, parameters = {}) {
        const payload = { ...attributionPayload(), ...parameters };
        if (typeof window.gtag === "function") window.gtag("event", eventName, payload);
        else dataLayer.push({ event: eventName, ...payload });
    }

    const hasAnalyticsId = /^G-[A-Z0-9]+$/i.test(analyticsId);
    const hasGoogleAdsId = /^AW-[A-Z0-9]+$/i.test(googleAdsId);
    if (hasAnalyticsId || hasGoogleAdsId) {
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(hasAnalyticsId ? analyticsId : googleAdsId)}`;
        document.head.appendChild(script);
        window.gtag = function () { dataLayer.push(arguments); };
        window.gtag("js", new Date());
        if (hasAnalyticsId) window.gtag("config", analyticsId);
        if (hasGoogleAdsId) window.gtag("config", googleAdsId);
    }

    if (/^\d+$/.test(metaPixelId)) {
        window.fbq = window.fbq || function () {
            if (window.fbq.callMethod) window.fbq.callMethod.apply(window.fbq, arguments);
            else window.fbq.queue.push(arguments);
        };
        window._fbq = window._fbq || window.fbq;
        window.fbq.push = window.fbq;
        window.fbq.loaded = true;
        window.fbq.version = "2.0";
        window.fbq.queue = window.fbq.queue || [];
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://connect.facebook.net/en_US/fbevents.js";
        document.head.appendChild(script);
        window.fbq("init", metaPixelId);
        window.fbq("track", "PageView");
    }

    dataLayer.push({ event: "landing_page_attribution", ...attributionPayload() });

    function reportGoogleAdsConversion() {
        if (typeof window.gtag === "function" && googleAdsConversionLabel) {
            window.gtag("event", "conversion", { send_to: googleAdsConversionLabel, value: 1.0, currency: "BRL" });
        }
    }

    /* Eventos do formulário antes do WhatsApp (chamados pelo lead-form.js):
       form_open, form_start, generate_lead (envio válido) e whatsapp_click
       (redirecionamento ao WhatsApp, que conta como conversão). Nenhum dado
       pessoal (nome ou telefone) vai para as ferramentas. */
    window.vallenciTrack = function (eventName, parameters = {}) {
        trackEvent(eventName, parameters);
        if (eventName === "generate_lead" && typeof window.fbq === "function") {
            window.fbq("track", "Lead", { ...attributionPayload(), content_name: "Formulário WhatsApp", ...parameters });
        }
        if (eventName === "whatsapp_click") {
            reportGoogleAdsConversion();
            if (typeof window.fbq === "function") {
                window.fbq("track", "Contact", { ...attributionPayload(), content_name: "WhatsApp", cta_position: parameters.cta_position });
            }
        }
    };
})();
