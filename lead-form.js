/* --------------------------------------------------------------------------
   Formulário antes do WhatsApp
   Qualquer botão com data-wa abre esta janela. Depois de validar, a pessoa
   segue para o WhatsApp da VALLENCI com as respostas já na mensagem e confirma
   o envio por lá. Sem JavaScript, os botões continuam indo direto ao WhatsApp.
   Eventos (tracking.js): form_open, form_start, generate_lead, whatsapp_click.
   -------------------------------------------------------------------------- */
(() => {
    const modal = document.getElementById("leadModal");
    const form = document.getElementById("leadForm");
    if (!modal || !form) return;

    const dialog = modal.querySelector(".lead-dialog");
    const fields = {
        nome: form.elements.nome,
        whatsapp: form.elements.whatsapp,
        area: form.elements.area,
        pacientes: form.elements.pacientes
    };
    const track = (name, params) => { if (typeof window.vallenciTrack === "function") window.vallenciTrack(name, params); };

    let origin = "sem_posicao";
    let opener = null;
    let started = false;

    /* Telefone: formata enquanto digita e valida DDD + número (fixo ou celular) */
    const digits = value => value.replace(/\D/g, "").replace(/^55(?=\d{10,11}$)/, "").slice(0, 11);
    function formatPhone(value) {
        const d = digits(value);
        if (d.length <= 2) return d.length ? `(${d}` : "";
        if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
        if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
        return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    }
    function validPhone(value) {
        const d = digits(value);
        if (d.length !== 10 && d.length !== 11) return false;
        if (+d.slice(0, 2) < 11 || d[2] === "0") return false;
        return d.length === 10 || d[2] === "9";
    }

    fields.whatsapp.addEventListener("input", () => {
        fields.whatsapp.value = formatPhone(fields.whatsapp.value);
    });

    const checks = {
        nome: () => fields.nome.value.trim().length >= 2,
        whatsapp: () => validPhone(fields.whatsapp.value),
        area: () => Boolean(fields.area.value),
        pacientes: () => Boolean(fields.pacientes.value)
    };
    const errorIds = { nome: "leadNomeErro", whatsapp: "leadWhatsErro", area: "leadAreaErro", pacientes: "leadPacientesErro" };
    const errorOf = name => document.getElementById(errorIds[name]);

    function showError(name, show) {
        const field = fields[name];
        const error = errorOf(name);
        field.classList.toggle("is-invalid", show);
        field.setAttribute("aria-invalid", String(show));
        if (error) {
            error.hidden = !show;
            if (show) field.setAttribute("aria-describedby", error.id);
            else field.removeAttribute("aria-describedby");
        }
    }

    Object.keys(fields).forEach(name => {
        const field = fields[name];
        const recheck = () => { if (field.classList.contains("is-invalid")) showError(name, !checks[name]()); };
        field.addEventListener("input", recheck);
        field.addEventListener("change", recheck);
        field.addEventListener("blur", () => { if (field.value) showError(name, !checks[name]()); });
    });

    // Início do formulário: primeira alteração real em qualquer campo, uma vez por abertura
    form.addEventListener("input", () => {
        if (started) return;
        started = true;
        track("form_start", { form_id: "whatsapp_lead", cta_position: origin });
    });

    /* Abrir e fechar */
    function focusables() {
        return [...dialog.querySelectorAll("button, input, select, a[href]")].filter(el => !el.disabled && el.offsetParent !== null);
    }

    function open(button) {
        opener = button;
        origin = button.dataset.waOrigin || "sem_posicao";
        started = false;
        modal.hidden = false;
        document.body.classList.add("lead-open");
        requestAnimationFrame(() => modal.classList.add("is-open"));
        track("form_open", { form_id: "whatsapp_lead", cta_position: origin });
        setTimeout(() => fields.nome.focus({ preventScroll: true }), 60);
    }

    function close() {
        modal.classList.remove("is-open");
        document.body.classList.remove("lead-open");
        modal.hidden = true;
        if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
    }

    document.addEventListener("click", event => {
        const button = event.target.closest("[data-wa]");
        if (!button || modal.contains(button)) return;
        event.preventDefault();
        open(button);
    });

    modal.querySelectorAll("[data-lead-close]").forEach(el => el.addEventListener("click", close));

    document.addEventListener("keydown", event => {
        if (modal.hidden) return;
        if (event.key === "Escape") close();
        if (event.key === "Tab") {
            const items = focusables();
            const first = items[0];
            const last = items[items.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
    });

    /* Envio: valida, registra e segue para o WhatsApp com as respostas */
    form.addEventListener("submit", event => {
        event.preventDefault();
        const invalid = Object.keys(checks).filter(name => !checks[name]());
        Object.keys(checks).forEach(name => showError(name, invalid.includes(name)));
        if (invalid.length) {
            fields[invalid[0]].focus();
            track("form_error", { form_id: "whatsapp_lead", error_fields: invalid.join(",") });
            return;
        }

        const answers = {
            nome: fields.nome.value.trim().replace(/\s+/g, " "),
            whatsapp: formatPhone(fields.whatsapp.value),
            area: fields.area.value,
            pacientes: fields.pacientes.value
        };
        const wa = window.vallenciWa || {};
        const message = [
            wa.defaultMessage || "Olá! Sou profissional, vim pelo site e gostaria de mais informações sobre as salas.",
            "",
            `*Nome:* ${answers.nome}`,
            `*WhatsApp:* ${answers.whatsapp}`,
            `*Área de atuação:* ${answers.area}`,
            `*Pacientes por mês:* ${answers.pacientes}`
        ].join("\n");
        const base = wa.base || `https://wa.me/${(document.querySelector('meta[name="whatsapp-number"]')?.content || "").replace(/\D/g, "")}`;
        const url = `${base}${base.includes("?") ? "&" : "?"}text=${encodeURIComponent(message)}`;

        // Só as respostas de múltipla escolha vão para o rastreamento; nome e telefone não
        track("generate_lead", { form_id: "whatsapp_lead", cta_position: origin, area_atuacao: answers.area, pacientes_mes: answers.pacientes });
        track("whatsapp_click", { cta_position: origin, link_url: base });

        const win = window.open(url, "_blank");
        if (win) win.opener = null;
        else window.location.href = url; // navegador bloqueou a nova aba: abre na mesma
        form.reset();
        Object.keys(fields).forEach(name => showError(name, false));
        close();
    });
})();
