/* --------------------------------------------------------------------------
   Aviso de cookies (LGPD)
   Tudo começa negado (script no <head>). A escolha fica salva no navegador
   (localStorage "vl_consent"), atualiza o Modo de Consentimento do Google e
   avisa o GTM com o evento consent_update. Pelo rodapé ("Preferências de
   cookies") a pessoa revê a escolha; ao retirar uma permissão, os cookies de
   medição são apagados e a página recarrega para as tags pararem.
   -------------------------------------------------------------------------- */
(() => {
    const KEY = "vl_consent";
    const banner = document.getElementById("cookieBanner");
    if (!banner) return;

    const options = banner.querySelector(".cookie-options");
    const analytics = document.getElementById("cookieAnalytics");
    const marketing = document.getElementById("cookieMarketing");
    const button = name => banner.querySelector(`[data-consent="${name}"]`);
    const gtag = window.gtag || function () { (window.dataLayer = window.dataLayer || []).push(arguments); };

    const read = () => {
        try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch (error) { return null; }
    };

    function deleteCookies(prefixes) {
        const host = location.hostname;
        const parts = host.split(".");
        const domains = ["", host, `.${host}`];
        if (parts.length > 2) domains.push(`.${parts.slice(-3).join(".")}`, `.${parts.slice(-2).join(".")}`);
        document.cookie.split(";").forEach(cookie => {
            const name = cookie.split("=")[0].trim();
            if (!prefixes.some(prefix => name.startsWith(prefix))) return;
            domains.forEach(domain => {
                document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
            });
        });
    }

    function show(customize) {
        options.hidden = !customize;
        button("personalizar").hidden = customize;
        button("salvar").hidden = !customize;
        banner.hidden = false;
        requestAnimationFrame(() => banner.classList.add("is-visible"));
    }

    function hide() {
        banner.classList.remove("is-visible");
        banner.hidden = true;
    }

    function save(allowAnalytics, allowMarketing) {
        const before = read();
        try {
            localStorage.setItem(KEY, JSON.stringify({ v: 1, a: !!allowAnalytics, m: !!allowMarketing, ts: new Date().toISOString() }));
        } catch (error) { }
        gtag("consent", "update", {
            analytics_storage: allowAnalytics ? "granted" : "denied",
            ad_storage: allowMarketing ? "granted" : "denied",
            ad_user_data: allowMarketing ? "granted" : "denied",
            ad_personalization: allowMarketing ? "granted" : "denied"
        });
        window.dataLayer.push({ event: "consent_update", consent_analytics: !!allowAnalytics, consent_marketing: !!allowMarketing });
        hide();

        // Retirou uma permissão que tinha dado: apaga os cookies e recarrega
        const revokedAnalytics = before && before.a && !allowAnalytics;
        const revokedMarketing = before && before.m && !allowMarketing;
        if (revokedAnalytics) {
            deleteCookies(["_ga", "_clck", "_clsk"]);
            if (typeof window.clarity === "function") window.clarity("consent", false);
        }
        if (revokedMarketing) deleteCookies(["_gcl", "_fbp", "_fbc"]);
        if (revokedAnalytics || revokedMarketing) location.reload();
    }

    banner.addEventListener("click", event => {
        const action = event.target.closest("[data-consent]")?.dataset.consent;
        if (action === "aceitar") save(true, true);
        if (action === "recusar") save(false, false);
        if (action === "salvar") save(analytics.checked, marketing.checked);
        if (action === "personalizar") {
            show(true);
            analytics.focus();
        }
    });

    // Rodapé: "Preferências de cookies" reabre o aviso com a escolha atual marcada
    document.addEventListener("click", event => {
        if (!event.target.closest("[data-consent-open]")) return;
        event.preventDefault();
        const current = read() || {};
        analytics.checked = !!current.a;
        marketing.checked = !!current.m;
        show(true);
        analytics.focus();
    });

    if (!read()) show(false);
})();
