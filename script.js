const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const metaContent = name => document.querySelector(`meta[name="${name}"]`)?.content.trim() || "";

/* --------------------------------------------------------------------------
   WhatsApp
   O número fica na meta tag "whatsapp-number" (index.html). Cada botão pode
   ter uma mensagem própria em data-wa-msg; sem ela, usa a mensagem padrão.
   Se no futuro houver links rastreáveis por origem (ex.: Tintim), basta
   preencher waLinksByOrigin: a origem da visita (UTM) passa a definir o
   destino de todos os botões, sem mudar visual, texto ou posição.
   -------------------------------------------------------------------------- */
const waDefaultMessage = "Olá! Sou profissional, vim pelo site e gostaria de mais informações sobre as salas.";
const waNumber = metaContent("whatsapp-number").replace(/\D/g, "");
const waLinksByOrigin = {
    // instagram_bio: "https://tintim.link/whatsapp/.../...",
    // meta_ads: "",
    // google_ads: "",
    // google_profile: ""
};

function resolveVisitOrigin(source, medium) {
    source = (source || "").trim().toLowerCase();
    medium = (medium || "").trim().toLowerCase();
    if (medium === "paid_social" && (source === "meta" || source === "instagram")) return "meta_ads";
    if (source === "google" && medium === "cpc") return "google_ads";
    if (source === "instagram" && (medium === "organic" || medium === "organic_social")) return "instagram_bio";
    if (source === "google" && medium === "organic") return "google_profile";
    return null;
}

function currentVisitOrigin() {
    const params = new URLSearchParams(location.search);
    const fromUrl = resolveVisitOrigin(params.get("utm_source"), params.get("utm_medium"));
    try {
        if (fromUrl) {
            sessionStorage.setItem("vallenci_origin", fromUrl);
            return fromUrl;
        }
        return sessionStorage.getItem("vallenci_origin");
    } catch (error) {
        return fromUrl;
    }
}

const visitOrigin = currentVisitOrigin();
const waBase = (visitOrigin && waLinksByOrigin[visitOrigin]) || `https://wa.me/${waNumber}`;

document.querySelectorAll("[data-wa]").forEach(link => {
    const message = link.dataset.waMsg || waDefaultMessage;
    link.href = `${waBase}?text=${encodeURIComponent(message)}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
});

const instagramUrl = metaContent("instagram-url");
if (instagramUrl) document.querySelectorAll("[data-instagram]").forEach(link => link.href = instagramUrl);

/* --------------------------------------------------------------------------
   Cabeçalho, progresso de rolagem e menu móvel
   -------------------------------------------------------------------------- */
const header = document.getElementById("siteHeader");
const progress = document.getElementById("scrollProgress");
function updateScrollUI() {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max ? scrollY / max * 100 : 0}%`;
    header.classList.toggle("scrolled", scrollY > 24);
}
addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const navBackdrop = document.getElementById("navBackdrop");
function setNavOpen(open) {
    mobileNav.classList.toggle("open", open);
    navBackdrop.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open);
    menuToggle.setAttribute("aria-expanded", open);
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}
menuToggle.addEventListener("click", () => setNavOpen(!mobileNav.classList.contains("open")));
navBackdrop.addEventListener("click", () => setNavOpen(false));
mobileNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setNavOpen(false)));
addEventListener("keydown", event => { if (event.key === "Escape") setNavOpen(false); });

const desktopLinks = [...document.querySelectorAll(".desktop-nav a")];
if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) desktopLinks.forEach(link => link.classList.toggle("active", link.hash === `#${entry.target.id}`));
    }), { rootMargin: "-45% 0px -50%" });
    desktopLinks.map(link => document.querySelector(link.hash)).filter(Boolean).forEach(section => navObserver.observe(section));
}

/* --------------------------------------------------------------------------
   Animação de entrada
   -------------------------------------------------------------------------- */
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduced) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    }), { threshold: .12, rootMargin: "0px 0px -40px" });
    reveals.forEach(element => revealObserver.observe(element));
} else {
    reveals.forEach(element => element.classList.add("visible"));
}

/* --------------------------------------------------------------------------
   FAQ
   -------------------------------------------------------------------------- */
const faqItems = [...document.querySelectorAll(".faq-item")];
faqItems.forEach(item => {
    const button = item.querySelector("button");
    button.addEventListener("click", () => {
        const willOpen = !item.classList.contains("open");
        faqItems.forEach(other => {
            other.classList.remove("open");
            other.querySelector("button").setAttribute("aria-expanded", "false");
        });
        item.classList.toggle("open", willOpen);
        button.setAttribute("aria-expanded", String(willOpen));
    });
});

/* --------------------------------------------------------------------------
   Carrossel
   Serve para as fotos (1 por vez) e para os profissionais (3 no desktop,
   1 no celular). Quantos cabem por vez é lido do próprio CSS. Setas,
   indicadores, teclado, toque e troca automática com pausa ao interagir.
   -------------------------------------------------------------------------- */
class Carousel {
    constructor(root) {
        this.root = root;
        this.viewport = root.querySelector(".carousel-viewport");
        this.track = root.querySelector(".carousel-track");
        this.slides = [...this.track.children];
        this.prevButton = root.querySelector(".carousel-btn.prev");
        this.nextButton = root.querySelector(".carousel-btn.next");
        this.counter = root.querySelector(".carousel-counter");
        this.dotsWrap = root.querySelector(".carousel-dots");
        this.delay = Number(root.dataset.autoplay) || 0;
        this.index = 0;
        this.paused = false;
        this.inView = false;

        this.prevButton?.addEventListener("click", () => this.go(this.index - 1, true));
        this.nextButton?.addEventListener("click", () => this.go(this.index + 1, true));
        this.viewport.addEventListener("keydown", event => {
            if (event.key === "ArrowRight") this.go(this.index + 1, true);
            if (event.key === "ArrowLeft") this.go(this.index - 1, true);
        });

        let startX = 0;
        let startY = 0;
        this.viewport.addEventListener("touchstart", event => {
            startX = event.touches[0].clientX;
            startY = event.touches[0].clientY;
            this.pause();
        }, { passive: true });
        this.viewport.addEventListener("touchend", event => {
            const dx = startX - event.changedTouches[0].clientX;
            const dy = startY - event.changedTouches[0].clientY;
            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) this.go(this.index + (dx > 0 ? 1 : -1), true);
            this.resume();
        }, { passive: true });

        root.addEventListener("mouseenter", () => this.pause());
        root.addEventListener("mouseleave", () => this.resume());
        root.addEventListener("focusin", () => this.pause());
        root.addEventListener("focusout", () => this.resume());

        if ("IntersectionObserver" in window) {
            new IntersectionObserver(entries => entries.forEach(entry => {
                this.inView = entry.isIntersecting;
                if (entry.isIntersecting) this.loadImages();
                this.inView ? this.resume() : this.stop();
            }), { rootMargin: "200px 0px" }).observe(root);
        } else {
            this.inView = true;
            this.loadImages();
        }

        addEventListener("resize", () => this.layout());
        this.layout();
        this.resume();
    }

    loadImages() {
        this.root.querySelectorAll("img[loading='lazy']").forEach(image => image.loading = "eager");
    }

    perView() {
        const slideWidth = this.slides[0].getBoundingClientRect().width;
        return slideWidth ? Math.max(1, Math.round(this.viewport.clientWidth / slideWidth)) : 1;
    }

    maxIndex() {
        return Math.max(0, this.slides.length - this.perView());
    }

    layout() {
        const pages = this.maxIndex() + 1;
        this.root.classList.toggle("is-static", pages <= 1);
        if (this.dotsWrap && this.dotsWrap.children.length !== pages) {
            this.dotsWrap.replaceChildren(...Array.from({ length: pages }, (_, i) => {
                const dot = document.createElement("button");
                dot.type = "button";
                dot.setAttribute("aria-label", `Ir para o item ${i + 1}`);
                dot.addEventListener("click", () => this.go(i, true));
                return dot;
            }));
        }
        this.index = Math.min(this.index, pages - 1);
        this.render();
    }

    render() {
        const gap = parseFloat(getComputedStyle(this.track).columnGap) || 0;
        const slideWidth = this.slides[0].getBoundingClientRect().width;
        this.track.style.transform = `translate3d(${-this.index * (slideWidth + gap)}px,0,0)`;
        const perView = this.perView();
        this.slides.forEach((slide, i) => {
            const visible = i >= this.index && i < this.index + perView;
            slide.setAttribute("aria-hidden", String(!visible));
            slide.inert = !visible;
        });
        if (this.counter) {
            const pad = n => String(n).padStart(2, "0");
            this.counter.textContent = `${pad(this.index + 1)} / ${pad(this.maxIndex() + 1)}`;
        }
        if (this.dotsWrap) [...this.dotsWrap.children].forEach((dot, i) => {
            dot.classList.toggle("active", i === this.index);
            dot.setAttribute("aria-current", i === this.index ? "true" : "false");
        });
    }

    go(target, userAction = false) {
        const max = this.maxIndex();
        this.index = target > max ? 0 : target < 0 ? max : target;
        this.render();
        if (userAction) this.restart();
    }

    stop() {
        clearInterval(this.timer);
        this.timer = null;
    }

    restart() {
        this.stop();
        if (!this.delay || reduced || this.paused || !this.inView || this.maxIndex() === 0) return;
        this.timer = setInterval(() => this.go(this.index + 1), this.delay);
    }

    pause() {
        this.paused = true;
        this.stop();
    }

    resume() {
        this.paused = false;
        this.restart();
    }
}

document.querySelectorAll("[data-carousel]").forEach(root => new Carousel(root));

/* --------------------------------------------------------------------------
   Faixa de parceiros: duplica os logos para a rolagem contínua
   -------------------------------------------------------------------------- */
document.querySelectorAll(".marquee-track").forEach(track => {
    [...track.children].forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        clone.querySelector("img").alt = "";
        track.appendChild(clone);
    });
});

document.getElementById("year").textContent = new Date().getFullYear();
