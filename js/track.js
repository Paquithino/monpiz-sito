/* MonPiz — registrazione dei clic importanti (per Google Analytics e Meta Pixel).
   Funziona solo se il visitatore ha accettato i cookie: senza consenso gtag e fbq
   non esistono e qui non succede niente.

   Cosa registra:
   ┌─────────────────────────────┬──────────────────────────┬────────────────────┐
   │ clic su…                    │ Google Analytics (evento)│ Meta Pixel         │
   ├─────────────────────────────┼──────────────────────────┼────────────────────┤
   │ shop online di un negozio   │ click_shop_online        │ ClickShop (custom) │
   │ mappa / telefono negozio    │ click_rivenditore        │ FindLocation       │
   │ WhatsApp / email            │ contatto                 │ Contact            │
   │ lookbook                    │ apri_lookbook            │ ViewContent        │
   └─────────────────────────────┴──────────────────────────┴────────────────────┘
   Parametri inviati: nome_negozio, azione/canale, link_url, pagina. */

const txt = (el) => (el ? el.textContent.trim().replace(/\s+/g, " ") : "");

/** Capisce che tipo di clic è. Restituisce null per i clic che non ci interessano. */
export function classify(a) {
  const href = a.getAttribute("href") || "";
  const store = a.closest(".store");
  const isMaps = /google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps|maps\.google/.test(href);

  // elenco "Shop online"
  if (a.closest(".shop")) return { tipo: "shop", nome: txt(a.querySelector(".shop__name")) };
  // pulsante "Shop online ↗" nella scheda di un negozio
  if (a.classList.contains("is-shop")) return { tipo: "shop", nome: txt(store?.querySelector("h4")) };
  // puntino sulla mappa con un solo negozio: porta allo shop oppure a Google Maps
  if (a.classList.contains("map__dot") && /^https?:/.test(href)) {
    const nome = (a.getAttribute("aria-label") || "").replace(/\s*\(.*\)\s*$/, "");
    return isMaps ? { tipo: "rivenditore", azione: "mappa", nome } : { tipo: "shop", nome };
  }
  // scheda di un negozio: mappa o telefono
  if (store && isMaps) return { tipo: "rivenditore", azione: "mappa", nome: txt(store.querySelector("h4")) };
  if (store && href.startsWith("tel:")) return { tipo: "rivenditore", azione: "telefono", nome: txt(store.querySelector("h4")) };
  // contatti MonPiz
  if (href.includes("wa.me/")) return { tipo: "contatto", canale: "whatsapp" };
  if (href.startsWith("mailto:")) return { tipo: "contatto", canale: "email" };
  // lookbook
  if (href.includes("lookbook.monpiz.it")) return { tipo: "lookbook" };
  return null;
}

function send(info, href) {
  const pagina = location.pathname;
  const gtag = typeof window.gtag === "function" ? window.gtag : null;
  const fbq = typeof window.fbq === "function" ? window.fbq : null;
  if (!gtag && !fbq) return; // nessun consenso: non si registra niente

  if (info.tipo === "shop") {
    gtag?.("event", "click_shop_online", { nome_negozio: info.nome, link_url: href, pagina });
    fbq?.("trackCustom", "ClickShop", { content_name: info.nome });
  } else if (info.tipo === "rivenditore") {
    gtag?.("event", "click_rivenditore", { nome_negozio: info.nome, azione: info.azione, link_url: href, pagina });
    fbq?.("track", "FindLocation", { content_name: info.nome });
  } else if (info.tipo === "contatto") {
    gtag?.("event", "contatto", { canale: info.canale, pagina });
    fbq?.("track", "Contact", { content_name: info.canale });
  } else if (info.tipo === "lookbook") {
    gtag?.("event", "apri_lookbook", { link_url: href, pagina });
    fbq?.("track", "ViewContent", { content_name: "Lookbook" });
  }
}

export function initTracking() {
  // un solo ascoltatore per tutta la pagina: vale anche per i link disegnati dopo (rivenditori, shop, mappa)
  document.addEventListener("click", (e) => {
    const a = e.target.closest?.("a[href]");
    if (!a) return;
    const info = classify(a);
    if (!info) return;
    try { send(info, a.href); } catch { /* il tracciamento non deve mai bloccare il link */ }
  }, true);
}
