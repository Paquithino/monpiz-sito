/* MonPiz — comportamento della pagina.
   Ogni funzione gestisce un pezzo: header, logo, video, menu, ricerca, lingua,
   mappa e rivenditori, shop online, comparsa delle sezioni.
   I testi stanno in i18n.js (italiano e inglese). */

import { RIVENDITORI, MAPPA, MODELLI, CONTATTI, TAGLIE, MARGINE_CM } from "./data.js";
import { applyLang, initialLang, getLang, t } from "./i18n.js";
import { initConsent } from "./consent.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M5.5 4H12v6.5"/></svg>';
const PLUS = '<svg viewBox="0 0 13 13" aria-hidden="true"><path d="M6.5 0v13M0 6.5h13"/></svg>';
const allStores = RIVENDITORI.flatMap((r) => r.negozi.map((n) => ({ ...n, regione: r.regione })));

/* ---------- header: trasparente sopra la foto, bianco dopo ---------- */
function initHeader() {
  const hdr = $("[data-hdr]");
  const hero = $(".hero__photo");
  if (!hdr || !hero) return;
  const io = new IntersectionObserver(([e]) => {
    hdr.classList.toggle("is-solid", !e.isIntersecting);
    document.body.classList.toggle("at-hero", e.isIntersecting); // il pulsante WhatsApp compare dopo la foto
  }, {
    rootMargin: "-64px 0px 0px 0px",
  });
  io.observe(hero);
}

/* ---------- video di apertura: versione verticale o orizzontale secondo lo schermo ---------- */
function initHeroVideo() {
  const v = $(".hero__video");
  if (!v) return;
  const mq = matchMedia("(max-width: 55.99em)");
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  const pick = () => {
    const kind = mq.matches ? "mobile" : "desktop";
    if (v.dataset.current === kind) return;
    v.dataset.current = kind;
    v.poster = v.dataset[`poster${kind[0].toUpperCase()}${kind.slice(1)}`];
    v.src = v.dataset[`src${kind[0].toUpperCase()}${kind.slice(1)}`];
    if (still.matches) { v.removeAttribute("autoplay"); v.pause(); return; }
    v.play().catch(() => {}); // se il browser blocca l'avvio resta l'immagine di copertina
  };
  pick();
  mq.addEventListener("change", pick);
  // fuori dallo schermo il video si ferma, per non consumare batteria
  new IntersectionObserver(([e]) => {
    if (still.matches) return;
    if (e.isIntersecting) v.play().catch(() => {}); else v.pause();
  }).observe(v);
}

/* ---------- pannelli: menu e ricerca ---------- */
let panels = { close() {} };
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
  panels = { close: () => { opener = null; close(); } };
}

/* ---------- logo e "torna su": tornano al video in cima alla pagina ---------- */
function initBackToTop() {
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  $$(".js-top").forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    panels.close();
    window.scrollTo({ top: 0, behavior: still.matches ? "auto" : "smooth" });
    history.replaceState(null, "", location.pathname + location.search);
    $(".hero__video")?.play().catch(() => {});
  }));
}

/* ---------- lingua: italiano / inglese ---------- */
function setLang(lang) {
  applyLang(lang, { n: allStores.length });
  $$("[data-lang]").forEach((b) => b.setAttribute("aria-current", String(b.dataset.lang === getLang())));
  renderDealers();
  renderShops();
  renderSearch();
  renderSizes();
}

function initLang() {
  const btn = $("[data-lang-toggle]");
  const menu = $("#lingue");
  if (btn && menu) {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.hidden = !menu.hidden;
      btn.setAttribute("aria-expanded", String(!menu.hidden));
    });
    document.addEventListener("click", () => { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); });
  }
  $$("[data-lang]").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
}

/* ---------- guida alle taglie ---------- */
let sizeChoice = null; // ultima taglia consigliata
let sizeMsg = "";       // ultimo messaggio mostrato (chiave di traduzione), per cambiare lingua
const cmText = (n) => n.toLocaleString(getLang() === "en" ? "en-GB" : "it-IT", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function renderSizes() {
  const grid = $("[data-sizes-grid]");
  if (!grid) return;
  grid.innerHTML = TAGLIE.map((tg) =>
    `<li class="sizes__cell${tg.it === sizeChoice ? " is-match" : ""}" data-size="${tg.it}">` +
    `<span class="sizes__it"><span class="sr-only">${esc(t("sizes.size"))} </span>${tg.it}</span>` +
    `<span class="sizes__cm">${cmText(tg.cm)}<span class="sr-only"> cm</span></span></li>`).join("");
  const out = $("[data-sizes-out]");
  if (out) out.innerHTML = sizeMsg === "sizes.result" ? t(sizeMsg, { n: sizeChoice }) : sizeMsg ? esc(t(sizeMsg)) : "";
}

/* misura del piede + margine → prima taglia che la contiene */
function sizeFor(footCm) {
  const need = footCm + MARGINE_CM;
  return TAGLIE.find((tg) => tg.cm >= need - 0.05) ?? null;
}

function initSizes() {
  const form = $("[data-sizes-form]");
  if (!form) return;
  const input = $("#piede-cm", form);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = parseFloat(String(input.value).replace(",", "."));
    const tg = v >= 15 && v <= 40 ? sizeFor(v) : null;
    sizeChoice = tg ? tg.it : null;
    sizeMsg = !(v >= 15 && v <= 40) ? "sizes.invalid" : tg ? "sizes.result" : "sizes.tooBig";
    renderSizes();
    if (tg) $(`[data-size="${tg.it}"]`)?.scrollIntoView({ block: "nearest", inline: "center" });
  });
}

/* ---------- ricerca: modelli e negozi ---------- */
let renderSearch = () => {};
function initSearch() {
  const input = $("#cerca-input");
  const out = $("#cerca-risultati");
  if (!input || !out) return;

  const render = () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) {
      out.innerHTML = `<p class="search__hint">${esc(t("search.hint"))}</p>`;
      return;
    }
    const models = MODELLI.filter((m) => `${m.nome} ${m.linea} ${t("line." + m.linea)} ${m.materiale}`.toLowerCase().includes(q));
    const stores = allStores.filter((s) => `${s.nome} ${s.indirizzo} ${s.regione}`.toLowerCase().includes(q));
    let html = "";
    if (models.length) {
      html += `<div class="search__group"><h3>${esc(t("search.models"))}</h3>` + models.map((m) =>
        `<a href="${CONTATTI.lookbook}" target="_blank" rel="noopener"><span>${esc(m.nome)} · ${esc(t("line." + m.linea))}</span><small>${esc(m.materiale)}</small></a>`).join("") + "</div>";
    }
    if (stores.length) {
      html += `<div class="search__group"><h3>${esc(t("search.stores"))}</h3>` + stores.map((s) =>
        `<a href="#${s.id}" data-goto-store="${s.id}"><span>${esc(s.nome)}</span><small>${esc(s.citta)}</small></a>`).join("") + "</div>";
    }
    out.innerHTML = html || `<p class="search__hint">${esc(t("search.none"))}</p>`;
  };
  renderSearch = render;

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

/* ---------- rivenditori: mappa, elenco e ricerca ---------- */
function storeHTML(s) {
  const links = [];
  if (s.telefono) links.push(`<a href="tel:${s.telefono.replace(/\s+/g, "")}">${esc(t("store.tel"))} ${esc(s.telefono)}</a>`);
  links.push(`<a href="${esc(s.mappa)}" target="_blank" rel="noopener">${esc(t("store.map"))}</a>`);
  if (s.shop) links.push(`<a class="is-shop" href="${esc(s.shop)}" target="_blank" rel="noopener">${esc(t("store.shop"))} ↗</a>`);
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

function renderDealers() {
  const regionsEl = $("[data-regions]");
  if (!regionsEl) return;
  const count = $("[data-count]");
  if (count) count.textContent = allStores.length;

  const q = ($("#riv-q")?.value || "").trim();
  regionsEl.innerHTML = RIVENDITORI.map((r) => `
    <details class="region" data-region="${esc(r.regione.toLowerCase())}">
      <summary><span class="region__name">${esc(r.regione)}</span>
        <span class="region__n">${r.negozi.length} ${esc(t(r.negozi.length === 1 ? "dealers.store1" : "dealers.storeN"))}${PLUS}</span></summary>
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
    const group = t("map.group", { n: ss.length, list: label });
    return `<a class="map__dot" href="#${ss[0].id}" data-ids="${ss.map((s) => s.id).join(" ")}" aria-label="${esc(group)}"><title>${esc(label)}</title><circle r="12" cx="${d.x}" cy="${d.y}"/><text x="${d.x}" y="${d.y}">${ss.length}</text></a>`;
  }).join("");
  const cities = MAPPA.citta.map((c) => `<text class="map__city" x="${c.x}" y="${c.y}" text-anchor="${c.ancora}">${esc(c.nome)}</text>`).join("");
  $("[data-map]").innerHTML = `<svg viewBox="0 0 ${MAPPA.w} ${MAPPA.h}" role="img" aria-label="${esc(t("map.aria"))}"><path class="map__sky" d="${MAPPA.cielo}"/>${cities}${dots}</svg>
    <figcaption>${esc(t("map.caption"))}</figcaption>`;
  $$("[data-ids]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); goToStores(a.dataset.ids.split(" ")); }));

  if (q) $("#riv-q").dispatchEvent(new Event("input")); // riapplica un'eventuale ricerca in corso
}

function initDealers() {
  const regionsEl = $("[data-regions]");
  if (!regionsEl) return;
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
    count.textContent = q ? (shown === 1 ? t("dealers.found1") : t("dealers.foundN", { n: shown })) : "";
    empty.hidden = !(q && shown === 0);
  });
}

/* ---------- shop online ---------- */
function renderShops() {
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
    <li class="shop"><a href="${esc(url)}" target="_blank" rel="noopener" aria-label="${esc(t("shops.go", { name: commonName(ss) }))}">
      <span class="shop__text">
        <span class="shop__region">${esc(ss[0].regione)}</span>
        <span class="shop__name">${esc(commonName(ss))}</span>
        <span class="shop__towns">${esc(t(ss.length > 1 ? "shops.inN" : "shops.in1"))}${esc(ss.map((s) => s.citta).join(" · "))}</span>
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
  initHeroVideo();
  initPanels();
  initBackToTop();
  initDealers();
  initSearch();
  initLang();
  initSizes();
  setLang(initialLang()); // traduce la pagina e disegna rivenditori, mappa e shop
  initConsent();          // banner cookie al primo accesso
  initReveal();
  const y = $("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
});
