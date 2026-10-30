/* MonPiz — comportamento della pagina.
   Ogni funzione gestisce un pezzo: header, menu, ricerca, lingua, carosello,
   mappa e rivenditori, shop online, comparsa delle sezioni. */

import { RIVENDITORI, MAPPA, MODELLI, CONTATTI } from "./data.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M5.5 4H12v6.5"/></svg>';
const PLUS = '<svg viewBox="0 0 13 13" aria-hidden="true"><path d="M6.5 0v13M0 6.5h13"/></svg>';
const imgPath = (name) => `../img/prodotti/${name}.webp`;
const allStores = RIVENDITORI.flatMap((r) => r.negozi.map((n) => ({ ...n, regione: r.regione })));

/* ---------- header: trasparente sopra la foto, bianco dopo ---------- */
function initHeader() {
  const hdr = $("[data-hdr]");
  const hero = $(".hero__photo");
  if (!hdr || !hero) return;
  const io = new IntersectionObserver(([e]) => hdr.classList.toggle("is-solid", !e.isIntersecting), {
    rootMargin: "-64px 0px 0px 0px",
  });
  io.observe(hero);
}

/* ---------- pannelli: menu e ricerca ---------- */
function initPanels() {
  let open = null;
  let opener = null;

  const close = () => {
    if (!open) return;
    open.hidden = true;
    document.body.classList.remove("is-locked");
    $$(`[aria-controls="${open.id}"]`).forEach((b) => b.setAttribute("aria-expanded", "false"));
    open = null;
    opener?.focus();
  };

  const show = (id, btn) => {
    close();
    open = document.getElementById(id);
    if (!open) return;
    opener = btn;
    open.hidden = false;
    document.body.classList.add("is-locked");
    btn?.setAttribute("aria-expanded", "true");
    const first = $("input, a, button", open.firstElementChild);
    setTimeout(() => (id === "cerca" ? $("#cerca-input") : first)?.focus(), 30);
  };

  $$("[data-open]").forEach((b) => b.addEventListener("click", () => show(b.dataset.open, b)));
  $$("[data-close]").forEach((b) => b.addEventListener("click", () => { opener = null; close(); }));
  $$(".drawer, .search").forEach((p) => p.addEventListener("click", (e) => { if (e.target === p) close(); }));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  return { close };
}

/* ---------- lingua ---------- */
function initLang() {
  const btn = $("[data-lang-toggle]");
  const menu = $("#lingue");
  if (!btn || !menu) return;
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.hidden = !menu.hidden;
    btn.setAttribute("aria-expanded", String(!menu.hidden));
  });
  document.addEventListener("click", () => { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); });
}

/* ---------- ricerca: modelli e negozi ---------- */
function initSearch() {
  const input = $("#cerca-input");
  const out = $("#cerca-risultati");
  if (!input || !out) return;

  const render = () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) {
      out.innerHTML = '<p class="search__hint">Prova con "Cortina", "Trento" o il nome di un negozio.</p>';
      return;
    }
    const models = MODELLI.filter((m) => `${m.nome} ${m.linea} ${m.materiale}`.toLowerCase().includes(q));
    const stores = allStores.filter((s) => `${s.nome} ${s.indirizzo} ${s.regione}`.toLowerCase().includes(q));
    let html = "";
    if (models.length) {
      html += '<div class="search__group"><h3>Modelli</h3>' + models.map((m) =>
        `<a href="${CONTATTI.lookbook}" target="_blank" rel="noopener"><span>${esc(m.nome)} · ${esc(m.linea)}</span><small>${esc(m.materiale)}</small></a>`).join("") + "</div>";
    }
    if (stores.length) {
      html += '<div class="search__group"><h3>Negozi</h3>' + stores.map((s) =>
        `<a href="#${s.id}" data-goto-store="${s.id}"><span>${esc(s.nome)}</span><small>${esc(s.citta)}</small></a>`).join("") + "</div>";
    }
    out.innerHTML = html || '<p class="search__hint">Nessun risultato. Scrivici su WhatsApp, ti aiutiamo noi.</p>';
  };

  input.addEventListener("input", render);
  out.addEventListener("click", (e) => {
    const a = e.target.closest("[data-goto-store]");
    if (!a) return;
    e.preventDefault();
    $(".search [data-close]").click();
    goToStores([a.dataset.gotoStore]);
  });
  render();
}

/* ---------- carosello dei modelli ---------- */
function initModels() {
  const track = $("[data-models]");
  if (!track) return;
  track.innerHTML = MODELLI.map((m) => `
    <li class="card">
      <a href="${CONTATTI.lookbook}" target="_blank" rel="noopener">
        <div class="card__img"><img src="${imgPath(m.img)}" alt="Pedula MonPiz ${esc(m.nome)} ${esc(m.linea.toLowerCase())}, ${esc(m.materiale.toLowerCase())}" width="800" height="1000" loading="lazy"></div>
        <div class="card__text">
          <span class="card__line">${esc(m.linea)}</span>
          <span class="card__name">${esc(m.nome)}</span>
          <span class="card__mat">${esc(m.materiale)}</span>
        </div>
      </a>
    </li>`).join("");

  const bar = $("[data-rail-progress]");
  const prev = $("[data-rail-prev]");
  const next = $("[data-rail-next]");
  const update = () => {
    const max = track.scrollWidth - track.clientWidth;
    const ratio = track.clientWidth / track.scrollWidth;
    const pos = max > 0 ? track.scrollLeft / max : 0;
    bar.style.width = `${ratio * 100}%`;
    bar.style.transform = `translateX(${pos * (1 / ratio - 1) * 100}%)`;
    if (prev) prev.disabled = track.scrollLeft < 4;
    if (next) next.disabled = track.scrollLeft > max - 4;
  };
  const step = () => track.querySelector(".card")?.offsetWidth || track.clientWidth;
  prev?.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  next?.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* ---------- rivenditori: mappa, elenco e ricerca ---------- */
function storeHTML(s) {
  const links = [];
  if (s.telefono) links.push(`<a href="tel:${s.telefono.replace(/\s+/g, "")}">Tel. ${esc(s.telefono)}</a>`);
  links.push(`<a href="${esc(s.mappa)}" target="_blank" rel="noopener">Mappa</a>`);
  if (s.shop) links.push(`<a class="is-shop" href="${esc(s.shop)}" target="_blank" rel="noopener">Shop online ↗</a>`);
  return `<li class="store" id="${s.id}" data-s="${esc(`${s.nome} ${s.indirizzo} ${s.regione}`.toLowerCase())}">
    <h4>${esc(s.nome)}</h4><address>${esc(s.indirizzo)}</address>
    <div class="store__links">${links.join("")}</div></li>`;
}

function goToStores(ids) {
  const input = $("#riv-q");
  if (input && input.value) { input.value = ""; input.dispatchEvent(new Event("input")); }
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  ids.forEach((id, i) => {
    const li = document.getElementById(id);
    if (!li) return;
    li.closest("details").open = true;
    li.classList.add("is-flash");
    setTimeout(() => li.classList.remove("is-flash"), 2400);
    if (i === 0) li.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "center" });
  });
}

function initDealers() {
  const regionsEl = $("[data-regions]");
  if (!regionsEl) return;
  $("[data-count]").textContent = allStores.length;

  regionsEl.innerHTML = RIVENDITORI.map((r) => `
    <details class="region" data-region="${esc(r.regione.toLowerCase())}">
      <summary><span class="region__name">${esc(r.regione)}</span>
        <span class="region__n">${r.negozi.length} ${r.negozi.length === 1 ? "negozio" : "negozi"}${PLUS}</span></summary>
      <ul>${r.negozi.map((n) => storeHTML({ ...n, regione: r.regione })).join("")}</ul>
    </details>`).join("");

  // mappa
  const byId = Object.fromEntries(allStores.map((s) => [s.id, s]));
  const dots = MAPPA.punti.map((d) => {
    const ss = d.ids.map((id) => byId[id]).filter(Boolean);
    const label = ss.map((s) => `${s.nome} (${s.citta})`).join(", ");
    if (ss.length === 1) {
      const s = ss[0];
      return `<a class="map__dot" href="${esc(s.shop || s.mappa)}" target="_blank" rel="noopener" aria-label="${esc(label)}"><title>${esc(label)}</title><circle r="7" cx="${d.x}" cy="${d.y}"/></a>`;
    }
    return `<a class="map__dot" href="#${ss[0].id}" data-ids="${ss.map((s) => s.id).join(" ")}" aria-label="${ss.length} negozi: ${esc(label)}"><title>${esc(label)}</title><circle r="12" cx="${d.x}" cy="${d.y}"/><text x="${d.x}" y="${d.y}">${ss.length}</text></a>`;
  }).join("");
  const cities = MAPPA.citta.map((c) => `<text class="map__city" x="${c.x}" y="${c.y}" text-anchor="${c.ancora}">${esc(c.nome)}</text>`).join("");
  $("[data-map]").innerHTML = `<svg viewBox="0 0 ${MAPPA.w} ${MAPPA.h}" role="img" aria-label="Mappa dei rivenditori MonPiz"><path class="map__sky" d="${MAPPA.cielo}"/>${cities}${dots}</svg>
    <figcaption>I punti singoli aprono lo shop o Google Maps; i numeri raggruppano i negozi vicini.</figcaption>`;
  $$("[data-ids]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); goToStores(a.dataset.ids.split(" ")); }));

  // ricerca nell'elenco
  const input = $("#riv-q");
  const count = $("[data-riv-count]");
  const empty = $("[data-riv-empty]");
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    $$(".region", regionsEl).forEach((g) => {
      let any = false;
      $$(".store", g).forEach((li) => {
        const ok = !q || li.dataset.s.includes(q);
        li.hidden = !ok;
        if (ok) { any = true; shown++; }
      });
      g.hidden = Boolean(q) && !any;
      g.open = Boolean(q) && any;
    });
    count.textContent = q ? (shown === 1 ? "1 rivenditore trovato" : `${shown} rivenditori trovati`) : "";
    empty.hidden = !(q && shown === 0);
  });
}

/* ---------- shop online ---------- */
function initShops() {
  const list = $("[data-shops]");
  if (!list) return;
  const groups = new Map();
  allStores.filter((s) => s.shop).forEach((s) => {
    if (!groups.has(s.shop)) groups.set(s.shop, []);
    groups.get(s.shop).push(s);
  });
  const commonName = (ss) => {
    if (ss.length === 1) return ss[0].nome;
    const words = ss.map((s) => s.nome.split(" "));
    const out = [];
    for (let i = 0; i < words[0].length; i++) {
      if (words.every((w) => w[i] === words[0][i])) out.push(words[0][i]); else break;
    }
    return out.join(" ") || ss[0].nome;
  };
  list.innerHTML = [...groups.entries()].map(([url, ss]) => `
    <li class="shop"><a href="${esc(url)}" target="_blank" rel="noopener" aria-label="Vai allo shop di ${esc(commonName(ss))}">
      <span class="shop__text">
        <span class="shop__region">${esc(ss[0].regione)}</span>
        <span class="shop__name">${esc(commonName(ss))}</span>
        <span class="shop__towns">${ss.length > 1 ? "Negozi a " : "Negozio a "}${esc(ss.map((s) => s.citta).join(" · "))}</span>
      </span>
      <span class="shop__go">${ARROW}</span>
    </a></li>`).join("");
}

/* ---------- comparsa dolce delle sezioni ---------- */
function initReveal() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  const els = $$(".section-head, .tile__text, .details .wrap, .story__text, .dealers__intro, .shops__head, .help__text");
  els.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }), { rootMargin: "0px 0px -10% 0px" });
  els.forEach((el) => io.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initPanels();
  initLang();
  initDealers();
  initShops();
  initSearch();
  initReveal();
  const y = $("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
});
