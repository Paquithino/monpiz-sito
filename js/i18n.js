/* Testi del sito in italiano e inglese.
   Nell'HTML ogni testo traducibile ha un attributo:
     data-i18n="chiave"        → sostituisce il testo
     data-i18n-html="chiave"   → sostituisce il contenuto con HTML (grassetti, corsivi)
     data-i18n-attr="alt:chiave, aria-label:chiave, placeholder:chiave" → traduce gli attributi
   Per cambiare una frase basta modificarla qui, nelle due lingue. */

export const LANGS = ["it", "en"];

export const I18N = {
  it: {
    "meta.title": "MonPiz · Pedule urban fashion, made in Montebelluna",
    "meta.desc": "MonPiz: pedule urban fashion fatte a mano a Montebelluna con pelli italiane e suole Vibram. Collezione F/W 2026/2027, rivenditori autorizzati e shop online.",
    "skip": "Vai al contenuto",

    "aria.logo": "MonPiz, torna all'inizio",
    "aria.menuOpen": "Apri il menu",
    "aria.menuClose": "Chiudi il menu",
    "aria.menu": "Menu",
    "aria.search": "Cerca un modello o un negozio",
    "aria.searchClose": "Chiudi la ricerca",
    "aria.searchDialog": "Cerca",
    "aria.lang": "Lingua",
    "aria.main": "Principale",
    "aria.sections": "Sezioni",
    "aria.collections": "Collezioni",
    "aria.video": "Video delle pedule MonPiz: modelli e dettagli della collezione",
    "aria.wa": "Scrivici su WhatsApp",

    "nav.women": "Donna",
    "nav.men": "Uomo",
    "nav.quality": "Qualità",
    "nav.story": "Storia",
    "nav.dealers": "Rivenditori",
    "nav.shop": "Shop online",
    "nav.lookbook": "Lookbook",

    "drawer.collections": "Collezioni",
    "drawer.women": "Collezione Donna",
    "drawer.men": "Collezione Uomo",
    "drawer.story": "La nostra storia",

    "search.label": "Cerca un modello, un negozio o una città",
    "search.placeholder": "Modello, negozio o città",
    "search.hint": "Prova con \"Cortina\", \"Trento\" o il nome di un negozio.",
    "search.none": "Nessun risultato. Scrivici su WhatsApp, ti aiutiamo noi.",
    "search.models": "Modelli",
    "search.stores": "Negozi",

    "hero.subtitle": "Pedule urban fashion",
    "hero.lead": "Fatte a mano a Montebelluna, con pelli italiane e suole Vibram.",

    "tile.women": "Collezione Donna",
    "tile.women.sub": "Cortina, Falcade, Lagazuoi, Ortisei, Orma, Urban e Anfibio",
    "tile.women.alt": "Mani che allacciano pedule MonPiz grigie con lacci rossi tra le foglie",
    "tile.men": "Collezione Uomo",
    "tile.men.sub": "Cortina, Falcade, Lussari, Corvara, Lagazuoi, Grostè e City",
    "tile.men.alt": "Pedule MonPiz da uomo con lacci gialli sulla neve",
    "tile.browse": "Sfoglia",

    "det.eyebrow": "Fatte a Montebelluna",
    "det.title": "Qualità nei dettagli",
    "det.alt": "Dettaglio della pedula MonPiz Grostè in pelle verde, con collarino imbottito, ganci in metallo e lacci rossi",
    "det.upper": "Tomaia",
    "det.upper.p": "in pelle di <b>vitello conciato</b> in Toscana",
    "det.lining": "Fodera",
    "det.lining.p": "in pelle di vitello con <b>lavorazione sottovuoto</b>",
    "det.sole": "Suola",
    "det.sole.p": "in gomma <b>Vibram</b>",
    "det.hooks": "Ganci e anelli",
    "det.hooks.p": "in ferro con <b>trattamento antiruggine</b>",

    "story.eyebrow": "Come nasce MonPiz",
    "story.title": "Tra tradizione e innovazione",
    "story.lead": "Negli anni '50 Montebelluna, in provincia di Treviso, diventa un centro di eccellenza per le calzature tecniche.",
    "story.p": "Le pedule nascono qui, dall'abilità dei calzolai locali che usavano pelle di alta qualità e suole chiodate per gli alpinisti. MonPiz unisce quella tradizione all'innovazione: materiali dell'eccellenza italiana, più comfort, nessun compromesso sulla qualità.",
    "story.alt": "Pedule MonPiz bianche davanti a una foto d'epoca di due contadine al lavoro",
    "fact.origin": "Origine",
    "fact.since": "Dal",
    "fact.since.v": "Anni '50",
    "fact.sole": "Suola",

    "dealers.eyebrow": "Dove trovarci",
    "dealers.title": "Una rete di <span data-count>{n}</span> negozi",
    "dealers.intro": "I rivenditori autorizzati MonPiz, regione per regione. Tocca un punto sulla mappa o cerca il negozio più vicino a te.",
    "dealers.label": "Cerca un rivenditore",
    "dealers.placeholder": "Città, negozio o regione",
    "dealers.empty": "Nessun rivenditore trovato. Prova con un'altra città o scrivici su WhatsApp.",
    "dealers.found1": "1 rivenditore trovato",
    "dealers.foundN": "{n} rivenditori trovati",
    "dealers.store1": "negozio",
    "dealers.storeN": "negozi",
    "map.aria": "Mappa dei rivenditori MonPiz",
    "map.caption": "I punti singoli aprono lo shop o Google Maps; i numeri raggruppano i negozi vicini.",
    "map.group": "{n} negozi: {list}",
    "store.tel": "Tel.",
    "store.map": "Mappa",
    "store.shop": "Shop online",

    "shops.eyebrow": "Acquista online",
    "shops.title": "Shop online",
    "shops.intro": "Ogni negozio apre il suo shop, già filtrato sui modelli MonPiz.",
    "shops.alt": "Pedule MonPiz in pelle martellata bianca su un ceppo di legno",
    "shops.in1": "Negozio a ",
    "shops.inN": "Negozi a ",
    "shops.go": "Vai allo shop di {name}",

    "help.title": "Dubbi sulla taglia?",
    "help.p": "Scrivici: ti aiutiamo a scegliere il modello giusto e il negozio più vicino.",
    "help.wa": "Scrivici su WhatsApp",
    "help.email": "Email",
    "help.alt": "Pedule MonPiz in suede grigio con lacci bianchi tra le foglie, nel bosco",

    "ftr.claim": "Pedule urban fashion, <em>made in Montebelluna.</em>",
    "ftr.explore": "Esplora",
    "ftr.contacts": "Contatti",
    "ftr.collections": "Collezioni",
    "ftr.top": "Torna su ↑",

    "line.Donna": "Donna",
    "line.Uomo": "Uomo",
  },

  en: {
    "meta.title": "MonPiz · Urban fashion pedule, made in Montebelluna",
    "meta.desc": "MonPiz: urban fashion pedule handmade in Montebelluna, Italy, with Italian leather and Vibram soles. F/W 2026/2027 collection, authorised retailers and online shops.",
    "skip": "Skip to content",

    "aria.logo": "MonPiz, back to the top",
    "aria.menuOpen": "Open the menu",
    "aria.menuClose": "Close the menu",
    "aria.menu": "Menu",
    "aria.search": "Search for a model or a store",
    "aria.searchClose": "Close search",
    "aria.searchDialog": "Search",
    "aria.lang": "Language",
    "aria.main": "Main",
    "aria.sections": "Sections",
    "aria.collections": "Collections",
    "aria.video": "Video of MonPiz boots: models and details from the collection",
    "aria.wa": "Message us on WhatsApp",

    "nav.women": "Women",
    "nav.men": "Men",
    "nav.quality": "Quality",
    "nav.story": "Story",
    "nav.dealers": "Retailers",
    "nav.shop": "Shop online",
    "nav.lookbook": "Lookbook",

    "drawer.collections": "Collections",
    "drawer.women": "Women's collection",
    "drawer.men": "Men's collection",
    "drawer.story": "Our story",

    "search.label": "Search for a model, a store or a town",
    "search.placeholder": "Model, store or town",
    "search.hint": "Try \"Cortina\", \"Trento\" or the name of a store.",
    "search.none": "No results. Message us on WhatsApp and we'll help you.",
    "search.models": "Models",
    "search.stores": "Stores",

    "hero.subtitle": "Urban fashion pedule",
    "hero.lead": "Handmade in Montebelluna, with Italian leather and Vibram soles.",

    "tile.women": "Women's collection",
    "tile.women.sub": "Cortina, Falcade, Lagazuoi, Ortisei, Orma, Urban and Anfibio",
    "tile.women.alt": "Hands lacing grey MonPiz boots with red laces among autumn leaves",
    "tile.men": "Men's collection",
    "tile.men.sub": "Cortina, Falcade, Lussari, Corvara, Lagazuoi, Grostè and City",
    "tile.men.alt": "Men's MonPiz boots with yellow laces in the snow",
    "tile.browse": "Browse",

    "det.eyebrow": "Made in Montebelluna",
    "det.title": "Quality in the details",
    "det.alt": "Close-up of the MonPiz Grostè boot in green leather, with padded collar, metal hooks and red laces",
    "det.upper": "Upper",
    "det.upper.p": "<b>calfskin</b> tanned in Tuscany",
    "det.lining": "Lining",
    "det.lining.p": "calfskin with a <b>vacuum-pressed finish</b>",
    "det.sole": "Sole",
    "det.sole.p": "<b>Vibram</b> rubber",
    "det.hooks": "Hooks and eyelets",
    "det.hooks.p": "iron with <b>rust-proof treatment</b>",

    "story.eyebrow": "How MonPiz began",
    "story.title": "Between tradition and innovation",
    "story.lead": "In the 1950s Montebelluna, near Treviso, became a centre of excellence for technical footwear.",
    "story.p": "Pedule were born here, from the skill of local shoemakers who used high-quality leather and nailed soles for climbers. MonPiz brings that tradition together with innovation: the best Italian materials, more comfort, no compromise on quality.",
    "story.alt": "White MonPiz boots in front of a vintage photo of two farm women at work",
    "fact.origin": "Origin",
    "fact.since": "Since",
    "fact.since.v": "The 1950s",
    "fact.sole": "Sole",

    "dealers.eyebrow": "Where to find us",
    "dealers.title": "A network of <span data-count>{n}</span> stores",
    "dealers.intro": "Authorised MonPiz retailers, region by region. Tap a point on the map or search for the store nearest to you.",
    "dealers.label": "Find a retailer",
    "dealers.placeholder": "Town, store or region",
    "dealers.empty": "No retailers found. Try another town or message us on WhatsApp.",
    "dealers.found1": "1 retailer found",
    "dealers.foundN": "{n} retailers found",
    "dealers.store1": "store",
    "dealers.storeN": "stores",
    "map.aria": "Map of MonPiz retailers",
    "map.caption": "Single points open the online shop or Google Maps; numbers group nearby stores.",
    "map.group": "{n} stores: {list}",
    "store.tel": "Tel.",
    "store.map": "Map",
    "store.shop": "Online shop",

    "shops.eyebrow": "Buy online",
    "shops.title": "Shop online",
    "shops.intro": "Each store opens its own online shop, already filtered for MonPiz models.",
    "shops.alt": "White hammered-leather MonPiz boots on a tree stump",
    "shops.in1": "Store in ",
    "shops.inN": "Stores in ",
    "shops.go": "Go to the {name} online shop",

    "help.title": "Not sure about your size?",
    "help.p": "Message us: we'll help you choose the right model and the nearest store.",
    "help.wa": "Message us on WhatsApp",
    "help.email": "Email",
    "help.alt": "Grey suede MonPiz boots with white laces among fallen leaves in the woods",

    "ftr.claim": "Urban fashion pedule, <em>made in Montebelluna.</em>",
    "ftr.explore": "Explore",
    "ftr.contacts": "Contact",
    "ftr.collections": "Collections",
    "ftr.top": "Back to top ↑",

    "line.Donna": "Women",
    "line.Uomo": "Men",
  },
};

let current = "it";

/* lingua iniziale: ?lang=en nell'indirizzo, poi la scelta salvata, poi la lingua del browser */
export function initialLang() {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (LANGS.includes(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem("monpiz-lang");
    if (LANGS.includes(saved)) return saved;
  } catch { /* archiviazione non disponibile */ }
  return (navigator.language || "it").toLowerCase().startsWith("it") ? "it" : "en";
}

export function getLang() { return current; }

export function t(key, vars = {}) {
  const str = I18N[current][key] ?? I18N.it[key] ?? key;
  return str.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
}

/* applica la lingua a tutti gli elementi segnati nell'HTML */
export function applyLang(lang, vars = {}) {
  current = LANGS.includes(lang) ? lang : "it";
  document.documentElement.lang = current;
  document.title = t("meta.title");
  document.querySelector('meta[name="description"]')?.setAttribute("content", t("meta.desc"));

  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n, vars); });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml, vars); });
  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    el.dataset.i18nAttr.split(",").forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      if (attr && key) el.setAttribute(attr, t(key, vars));
    });
  });

  try { localStorage.setItem("monpiz-lang", current); } catch { /* archiviazione non disponibile */ }
}
