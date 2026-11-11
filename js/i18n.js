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
    "meta.desc":
      "MonPiz: pedule urban fashion fatte a mano a Montebelluna con pelli italiane e suole Vibram. Collezione F/W 2026/2027, rivenditori autorizzati e shop online.",
    skip: "Vai al contenuto",

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
    "aria.video":
      "Video delle pedule MonPiz: modelli e dettagli della collezione",
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
    "search.hint": 'Prova con "Cortina", "Trento" o il nome di un negozio.',
    "search.none": "Nessun risultato. Scrivici su WhatsApp, ti aiutiamo noi.",
    "search.models": "Modelli",
    "search.stores": "Negozi",

    "hero.subtitle": "Pedule urban fashion",
    "hero.lead":
      "Lavorate a mano a Montebelluna, tra pelli italiane e suole Vibram.",

    "tile.women": "Collezione Donna",
    "tile.women.sub":
      "Cortina, Falcade, Lagazuoi, Ortisei, Orma, Urban e Anfibio",
    "tile.women.alt":
      "Mani che allacciano pedule MonPiz grigie con lacci rossi tra le foglie",
    "tile.men": "Collezione Uomo",
    "tile.men.sub":
      "Cortina, Falcade, Lussari, Corvara, Lagazuoi, Grostè e City",
    "tile.men.alt": "Pedule MonPiz da uomo con lacci gialli sulla neve",
    "tile.browse": "Sfoglia",

    "det.title": "Qualità nei dettagli",
    "det.alt":
      "Dettaglio della pedula MonPiz Grostè in pelle verde, con collarino imbottito, ganci in metallo e lacci rossi",
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
    "story.lead":
      "Negli anni '50 Montebelluna, in provincia di Treviso, diventa un centro di eccellenza per le calzature tecniche.",
    "story.p":
      "Le pedule nascono qui, dall'abilità dei calzolai locali che univano pelli di altissima qualità a suole chiodate per gli alpinisti. MonPiz ne raccoglie l'eredità e la rivisita con colori vivaci e un gusto urban fashion: l'eccellenza e il comfort della tradizione alpina, ripensati per lo stile di tutti i giorni.",
    "story.alt":
      "Pedule MonPiz bianche davanti a una foto d'epoca di due contadine al lavoro",
    "fact.origin": "Origine",
    "fact.since": "Dal",
    "fact.since.v": "2022",
    "fact.sole": "Suola",

    "dealers.eyebrow": "Dove trovarci",
    "dealers.title": "Una rete di <span data-count>{n}</span> negozi",
    "dealers.intro":
      "I rivenditori autorizzati MonPiz, regione per regione. Tocca un punto sulla mappa o cerca il negozio più vicino a te.",
    "dealers.label": "Cerca un rivenditore",
    "dealers.placeholder": "Città, negozio o regione",
    "dealers.empty":
      "Nessun rivenditore trovato. Prova con un'altra città o scrivici su WhatsApp.",
    "dealers.found1": "1 rivenditore trovato",
    "dealers.foundN": "{n} rivenditori trovati",
    "dealers.store1": "negozio",
    "dealers.storeN": "negozi",
    "map.aria": "Mappa dei rivenditori MonPiz",
    "map.caption":
      "I punti singoli aprono lo shop o Google Maps; i numeri raggruppano i negozi vicini.",
    "map.group": "{n} negozi: {list}",
    "store.tel": "Tel.",
    "store.map": "Mappa",
    "store.shop": "Shop online",

    "shops.eyebrow": "Acquista online",
    "shops.title": "Shop online",
    "shops.intro":
      "Acquista online dai nostri rivenditori: troverai già filtrati i modelli attualmente disponibili.",
    "shops.alt":
      "Pedule MonPiz in pelle martellata bianca su un ceppo di legno",
    "shops.in1": "Negozio a ",
    "shops.inN": "Negozi a ",
    "shops.go": "Vai allo shop di {name}",

    "help.title": "Dubbi sulla taglia?",
    "help.p":
      "Scrivici: ti aiutiamo a scegliere il modello giusto e il negozio più vicino.",
    "help.wa": "Scrivici su WhatsApp",
    "help.email": "Email",
    "help.alt":
      "Pedule MonPiz in suede grigio con lacci bianchi tra le foglie, nel bosco",
    "sizes.title": "Guida alle taglie",
    "sizes.step1":
      "Appoggia il piede su un foglio bianco e traccia il contorno con una penna.",
    "sizes.step2":
      "Misura dal tallone alla punta del dito più lungo e aggiungi 0,5 cm.",
    "sizes.step3":
      "Scegli la taglia nella tabella: se sei a metà tra due misure, prendi quella più grande.",
    "sizes.label": "Lunghezza del piede (cm)",
    "sizes.placeholder": "es. 25,5",
    "sizes.go": "Trova la taglia",
    "sizes.result": "Ti consigliamo la taglia <strong>{n}</strong>",
    "sizes.invalid":
      "Scrivi la lunghezza del piede in centimetri, ad esempio 25,5.",
    "sizes.tooBig":
      "La misura supera la taglia 47: scrivici e troviamo una soluzione.",
    "sizes.table": "Tabella taglie: taglia italiana e lunghezza del piede",
    "sizes.size": "Taglia",
    "sizes.legend": "Taglia · lunghezza del piede in cm",
    "sizes.note": "Le misure sono indicative.",

    "ftr.claim": "Pedule urban fashion, <em>made in Montebelluna.</em>",
    "ftr.explore": "Esplora",
    "ftr.contacts": "Contatti",
    "ftr.collections": "Collezioni",
    "ftr.top": "Torna su ↑",

    "line.Donna": "Donna",
    "line.Uomo": "Uomo",

    "cookie.title": "Cookie e privacy",
    "cookie.text":
      "Usiamo strumenti tecnici necessari al funzionamento del sito, come la lingua scelta. Con il tuo consenso potremmo usare anche cookie di statistica e marketing. Puoi accettare, rifiutare o scegliere per categoria; chiudendo con la X continui senza accettare.",
    "cookie.more": "Leggi la cookie policy",
    "cookie.close": "Chiudi e continua senza accettare",
    "cookie.accept": "Accetta tutto",
    "cookie.reject": "Rifiuta",
    "cookie.customize": "Personalizza",
    "cookie.save": "Salva le scelte",
    "cookie.cat.tech": "Tecnici",
    "cookie.cat.tech.d": "Sempre attivi: lingua e scelta sui cookie.",
    "cookie.cat.stats": "Statistiche",
    "cookie.cat.stats.d":
      "Ci aiutano a capire come viene usato il sito, in forma aggregata.",
    "cookie.cat.mkt": "Marketing",
    "cookie.cat.mkt.d":
      "Servono a mostrarti contenuti e pubblicità in linea con i tuoi interessi.",
    "cookie.policy": "Cookie policy",
    "cookie.prefs": "Preferenze cookie",

    /* pagine interne (rivenditori, shop online, lookbook, donna, uomo, guida taglie) */
    "aria.home": "MonPiz, vai alla home",
    "next.title": "Continua a scoprire",
    "crumb.label": "Sei qui",
    "meta.dealers.title": "Rivenditori MonPiz · Dove comprare le pedule MonPiz",
    "meta.dealers.desc": "Trova il rivenditore MonPiz più vicino: 30 negozi autorizzati tra Veneto, Trentino-Alto Adige, Friuli-Venezia Giulia, Lombardia ed Emilia-Romagna, con mappa, indirizzi e telefoni.",
    "meta.shops.title": "Shop online MonPiz · Acquista le pedule dai rivenditori",
    "meta.shops.desc": "Acquista le pedule MonPiz online dagli shop dei rivenditori autorizzati: trovi già filtrati i modelli disponibili.",
    "meta.lb.title": "Lookbook MonPiz · Catalogo delle pedule Donna e Uomo",
    "meta.lb.desc": "Sfoglia il lookbook MonPiz: modelli, colori e materiali delle collezioni Donna e Uomo, pedule urban fashion fatte a mano a Montebelluna.",
    "meta.women.title": "Collezione Donna MonPiz · Pedule urban fashion da donna",
    "meta.women.desc": "Le pedule MonPiz da donna: Cortina, Falcade, Lagazuoi, Ortisei, Orma, Urban e Anfibio Stringato. Lavorate a mano a Montebelluna con pelli italiane e suole Vibram.",
    "meta.men.title": "Collezione Uomo MonPiz · Pedule urban fashion da uomo",
    "meta.men.desc": "Le pedule MonPiz da uomo: Cortina, Falcade, Lussari, Corvara, Lagazuoi, Grostè e City. Lavorate a mano a Montebelluna con pelli italiane e suole Vibram.",
    "meta.sizes.title": "Guida alle taglie MonPiz · Come scegliere il numero",
    "meta.sizes.desc": "Come misurare il piede e scegliere la taglia giusta delle pedule MonPiz: tabella delle taglie dalla 35 alla 47 e calcolo automatico.",
    "page.dealers.eyebrow": "Dove trovarci",
    "page.dealers.h1": "Rivenditori MonPiz",
    "page.dealers.lead": "I negozi autorizzati MonPiz, regione per regione. Tocca un punto sulla mappa o cerca il negozio più vicino a te.",
    "page.shops.eyebrow": "Acquista online",
    "page.shops.h1": "Shop online",
    "page.shops.lead": "Acquista online dai nostri rivenditori: troverai già filtrati i modelli attualmente disponibili.",
    "page.lb.eyebrow": "Catalogo",
    "page.lb.h1": "Il lookbook MonPiz",
    "page.lb.lead": "Tutti i modelli, i colori e i materiali delle collezioni Donna e Uomo in un unico catalogo da sfogliare.",
    "page.women.eyebrow": "Pedule urban fashion",
    "page.women.h1": "Collezione Donna",
    "page.women.lead": "Sette modelli nati dalla pedula di montagna e ripensati per la città, lavorati a mano a Montebelluna con pelli italiane e suole Vibram.",
    "page.men.eyebrow": "Pedule urban fashion",
    "page.men.h1": "Collezione Uomo",
    "page.men.lead": "Sette modelli nati dalla pedula di montagna e ripensati per la città, lavorati a mano a Montebelluna con pelli italiane e suole Vibram.",
    "page.sizes.eyebrow": "Taglie",
    "page.sizes.h1": "Guida alle taglie",
    "page.sizes.lead": "Misura il piede in un minuto e trova il tuo numero: tabella delle taglie dalla 35 alla 47 e calcolo automatico.",
    "coll.count": "7 modelli",
    "model.view": "Vedi nel lookbook",
    "model.photo": "Pedula MonPiz {name}",
    "page.where.title": "Dove trovarle",
    "page.where.p": "Nei negozi autorizzati, negli shop online dei rivenditori o scrivendoci su WhatsApp.",
    "page.lb.open": "Sfoglia il lookbook",
    "page.lb.alt": "Pedula MonPiz Falcade in pelle martellata con doppio laccio",
    "page.lb.collections": "Le collezioni sul sito",
    "model.donna-cortina": "Un classico della montagna, riletto oggi. L'apertura a soffietto rende la calzata più facile e offre una maggiore protezione, mentre le linee vintage restano attuali anche in città.",
    "model.donna-falcade": "Apertura classica della linguetta, per una calzata essenziale e senza tempo. Struttura solida e confortevole, per tutti i giorni tra città e natura.",
    "model.donna-lagazuoi": "Una pedula bassa con occhielli in metallo e suola Vibram dal fondo scuro, leggera come una scarpa sportiva. Cavallino, suede in due colori, puntale in gomma e una bordatura in gomma porosa effetto roccia.",
    "model.donna-ortisei": "La pedula che sceglie di distinguersi. Una base in cavallino gocciato, rifinita da bordatura e inserti in pelle Dakar, per un carattere che non passa inosservato.",
    "model.donna-orma": "La novità di MonPiz: una scarpa diversa da tutte le altre, che nasce da un'idea tecnica e la veste di un gusto fashion, senza rinunciare alla comodità.",
    "model.donna-urban": "Lo stile MonPiz, senza lacci. Un beatle in cavallino con due bande elastiche laterali che lo rendono comodo da infilare, su una suola Vibram.",
    "model.donna-anfibio-stringato": "Completamente diverso, pensato per chi osa. L'anfibio stringato MonPiz porta il cavallino e la suola Vibram fuori da ogni schema, con una zip laterale per una calzata comoda e immediata.",
    "model.uomo-cortina": "Un classico della montagna, riletto oggi. L'apertura a soffietto rende la calzata più facile e offre una maggiore protezione, mentre le linee vintage restano attuali anche in città.",
    "model.uomo-falcade": "Apertura classica della linguetta, per una calzata essenziale e senza tempo. Struttura solida e confortevole, per tutti i giorni tra città e natura.",
    "model.uomo-lussari": "Il suede incontra la gomma. La bordatura protegge la tomaia e regala alla pedula un'immagine più grintosa e accattivante.",
    "model.uomo-corvara": "Pedula in nabuk, una pelle pregiata ricavata dal lato fiore, la parte più esterna e compatta. Levigata finemente fino a diventare vellutata, morbida e calda al tatto, è più robusta e duratura dello scamosciato.",
    "model.uomo-lagazuoi": "Una pedula bassa con occhielli in metallo e suola Vibram dal fondo scuro, leggera come una scarpa sportiva. Nabuk suede in due colori, puntale in gomma e una bordatura in gomma porosa effetto roccia.",
    "model.uomo-groste": "Volutamente diversa, per chi ama la montagna sul serio. Un calzetto waterproof si stringe con un laccetto di chiusura, su una suola Vibram pronta a ogni terreno.",
    "model.uomo-city": "La City di MonPiz, pensata per il massimo comfort. Ben ammortizzata, con plantare in memory foam e l'immancabile suola Vibram. Nata per chi ama la pedula MonPiz e cerca un modello da città.",
  },

  en: {
    "meta.title": "MonPiz · Urban fashion mountain boots, made in Montebelluna",
    "meta.desc":
      "MonPiz: urban fashion mountain boots handmade in Montebelluna, Italy, with Italian leather and Vibram soles. F/W 2026/2027 collection, authorised retailers and online shops.",
    skip: "Skip to content",

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
    "aria.video":
      "Video of MonPiz boots: models and details from the collection",
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
    "search.hint": 'Try "Cortina", "Trento" or the name of a store.',
    "search.none": "No results. Message us on WhatsApp and we'll help you.",
    "search.models": "Models",
    "search.stores": "Stores",

    "hero.subtitle": "Urban fashion mountain boots",
    "hero.lead":
      "Handcrafted in Montebelluna, with Italian leather and Vibram soles.",

    "tile.women": "Women's collection",
    "tile.women.sub":
      "Cortina, Falcade, Lagazuoi, Ortisei, Orma, Urban and Anfibio",
    "tile.women.alt":
      "Hands lacing grey MonPiz boots with red laces among autumn leaves",
    "tile.men": "Men's collection",
    "tile.men.sub":
      "Cortina, Falcade, Lussari, Corvara, Lagazuoi, Grostè and City",
    "tile.men.alt": "Men's MonPiz boots with yellow laces in the snow",
    "tile.browse": "Browse",

    "det.title": "Quality in the details",
    "det.alt":
      "Close-up of the MonPiz Grostè boot in green leather, with padded collar, metal hooks and red laces",
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
    "story.lead":
      "In the 1950s Montebelluna, near Treviso, became a centre of excellence for technical footwear.",
    "story.p":
      "Mountain boots were born here, from the skill of local shoemakers who paired top-quality leather with nailed soles for climbers. MonPiz carries on that legacy and reinterprets it with bold colours and an urban fashion flair: the excellence and comfort of the Alpine tradition, rethought for everyday style.",
    "story.alt":
      "White MonPiz boots in front of a vintage photo of two farm women at work",
    "fact.origin": "Origin",
    "fact.since": "Since",
    "fact.since.v": "2022",
    "fact.sole": "Sole",

    "dealers.eyebrow": "Where to find us",
    "dealers.title": "A network of <span data-count>{n}</span> stores",
    "dealers.intro":
      "Authorised MonPiz retailers, region by region. Tap a point on the map or search for the store nearest to you.",
    "dealers.label": "Find a retailer",
    "dealers.placeholder": "Town, store or region",
    "dealers.empty":
      "No retailers found. Try another town or message us on WhatsApp.",
    "dealers.found1": "1 retailer found",
    "dealers.foundN": "{n} retailers found",
    "dealers.store1": "store",
    "dealers.storeN": "stores",
    "map.aria": "Map of MonPiz retailers",
    "map.caption":
      "Single points open the online shop or Google Maps; numbers group nearby stores.",
    "map.group": "{n} stores: {list}",
    "store.tel": "Tel.",
    "store.map": "Map",
    "store.shop": "Online shop",

    "shops.eyebrow": "Buy online",
    "shops.title": "Shop online",
    "shops.intro":
      "Shop online from our retailers: you will find the currently available models pre-filtered..",
    "shops.alt": "White hammered-leather MonPiz boots on a tree stump",
    "shops.in1": "Store in ",
    "shops.inN": "Stores in ",
    "shops.go": "Go to the {name} online shop",

    "help.title": "Not sure about your size?",
    "help.p":
      "Message us: we'll help you choose the right model and the nearest store.",
    "help.wa": "Message us on WhatsApp",
    "help.email": "Email",
    "help.alt":
      "Grey suede MonPiz boots with white laces among fallen leaves in the woods",
    "sizes.title": "Size guide",
    "sizes.step1":
      "Place your foot on a sheet of white paper and trace its outline with a pen.",
    "sizes.step2":
      "Measure from the heel to the tip of your longest toe and add 0.5 cm.",
    "sizes.step3":
      "Find your size in the chart: if you are between two sizes, take the larger one.",
    "sizes.label": "Foot length (cm)",
    "sizes.placeholder": "e.g. 25.5",
    "sizes.go": "Find my size",
    "sizes.result": "We recommend Italian size <strong>{n}</strong>",
    "sizes.invalid": "Enter your foot length in centimetres, for example 25.5.",
    "sizes.tooBig":
      "Your measurement is above size 47: message us and we'll find a solution.",
    "sizes.table": "Size chart: Italian size and foot length",
    "sizes.size": "Size",
    "sizes.legend": "Italian size · foot length in cm",
    "sizes.note": "Sizes are indicative.",

    "ftr.claim": "Urban fashion mountain boots, <em>made in Montebelluna.</em>",
    "ftr.explore": "Explore",
    "ftr.contacts": "Contact",
    "ftr.collections": "Collections",
    "ftr.top": "Back to top ↑",

    "line.Donna": "Women",
    "line.Uomo": "Men",

    "cookie.title": "Cookies and privacy",
    "cookie.text":
      "We use technical tools the site needs to work, such as your chosen language. With your consent we may also use statistics and marketing cookies. You can accept, reject or choose by category; closing with the X continues without accepting.",
    "cookie.more": "Read the cookie policy",
    "cookie.close": "Close and continue without accepting",
    "cookie.accept": "Accept all",
    "cookie.reject": "Reject",
    "cookie.customize": "Customise",
    "cookie.save": "Save choices",
    "cookie.cat.tech": "Technical",
    "cookie.cat.tech.d": "Always on: language and cookie choice.",
    "cookie.cat.stats": "Statistics",
    "cookie.cat.stats.d":
      "Help us understand how the site is used, in aggregate form.",
    "cookie.cat.mkt": "Marketing",
    "cookie.cat.mkt.d":
      "Used to show you content and ads that match your interests.",
    "cookie.policy": "Cookie policy",
    "cookie.prefs": "Cookie preferences",

    /* pagine interne (rivenditori, shop online, lookbook, donna, uomo, guida taglie) */
    "aria.home": "MonPiz, go to the home page",
    "next.title": "Keep exploring",
    "crumb.label": "You are here",
    "meta.dealers.title": "MonPiz retailers · Where to buy MonPiz boots",
    "meta.dealers.desc": "Find your nearest MonPiz retailer: 30 authorised stores across Veneto, Trentino-Alto Adige, Friuli-Venezia Giulia, Lombardy and Emilia-Romagna, with map, addresses and phone numbers.",
    "meta.shops.title": "MonPiz online shops · Buy from our retailers",
    "meta.shops.desc": "Buy MonPiz boots online from our authorised retailers' shops, with the available models already filtered.",
    "meta.lb.title": "MonPiz lookbook · Women's and men's boots catalogue",
    "meta.lb.desc": "Browse the MonPiz lookbook: models, colours and materials of the women's and men's collections, urban fashion mountain boots handmade in Montebelluna.",
    "meta.women.title": "MonPiz women's collection · Urban fashion boots for women",
    "meta.women.desc": "MonPiz boots for women: Cortina, Falcade, Lagazuoi, Ortisei, Orma, Urban and Anfibio Stringato. Handcrafted in Montebelluna with Italian leather and Vibram soles.",
    "meta.men.title": "MonPiz men's collection · Urban fashion boots for men",
    "meta.men.desc": "MonPiz boots for men: Cortina, Falcade, Lussari, Corvara, Lagazuoi, Grostè and City. Handcrafted in Montebelluna with Italian leather and Vibram soles.",
    "meta.sizes.title": "MonPiz size guide · How to choose your size",
    "meta.sizes.desc": "How to measure your foot and choose the right MonPiz size: size chart from 35 to 47 and automatic size finder.",
    "page.dealers.eyebrow": "Where to find us",
    "page.dealers.h1": "MonPiz retailers",
    "page.dealers.lead": "Authorised MonPiz stores, region by region. Tap a point on the map or search for the store nearest to you.",
    "page.shops.eyebrow": "Buy online",
    "page.shops.h1": "Shop online",
    "page.shops.lead": "Buy online from our retailers: you'll find the models currently available already filtered.",
    "page.lb.eyebrow": "Catalogue",
    "page.lb.h1": "The MonPiz lookbook",
    "page.lb.lead": "All the models, colours and materials of the women's and men's collections in one catalogue to browse.",
    "page.women.eyebrow": "Urban fashion mountain boots",
    "page.women.h1": "Women's collection",
    "page.women.lead": "Seven models born from the classic mountain boot and redesigned for the city, handcrafted in Montebelluna with Italian leather and Vibram soles.",
    "page.men.eyebrow": "Urban fashion mountain boots",
    "page.men.h1": "Men's collection",
    "page.men.lead": "Seven models born from the classic mountain boot and redesigned for the city, handcrafted in Montebelluna with Italian leather and Vibram soles.",
    "page.sizes.eyebrow": "Sizes",
    "page.sizes.h1": "Size guide",
    "page.sizes.lead": "Measure your foot in a minute and find your size: size chart from 35 to 47 and automatic size finder.",
    "coll.count": "7 models",
    "model.view": "View in the lookbook",
    "model.photo": "MonPiz {name} boot",
    "page.where.title": "Where to find them",
    "page.where.p": "At authorised stores, in our retailers' online shops or by messaging us on WhatsApp.",
    "page.lb.open": "Browse the lookbook",
    "page.lb.alt": "MonPiz Falcade boot in hammered leather with double laces",
    "page.lb.collections": "The collections on the site",
    "model.donna-cortina": "A mountain classic, reinterpreted for today. The bellows tongue makes the boot easier to put on and gives more protection, while its vintage lines still feel current in the city.",
    "model.donna-falcade": "A classic open tongue for a clean, timeless fit. Solid and comfortable, for every day between city and nature.",
    "model.donna-lagazuoi": "A low boot with metal eyelets and a dark Vibram sole, as light as a sneaker. Pony hair, two-tone suede, a rubber toe cap and a porous rubber rand with a rock effect.",
    "model.donna-ortisei": "The boot that chooses to stand out. A spotted pony-hair base, finished with a rand and inserts in Dakar leather, for a character that never goes unnoticed.",
    "model.donna-orma": "New from MonPiz: a shoe unlike any other, born from a technical idea and dressed with a fashion sensibility, without giving up comfort.",
    "model.donna-urban": "MonPiz style, without laces. A pony-hair Beatle boot with two elastic side panels that make it easy to slip on, on a Vibram sole.",
    "model.donna-anfibio-stringato": "Completely different, made for those who dare. The MonPiz lace-up combat boot takes pony hair and the Vibram sole beyond every convention, with a side zip for a quick, comfortable fit.",
    "model.uomo-cortina": "A mountain classic, reinterpreted for today. The bellows tongue makes the boot easier to put on and gives more protection, while its vintage lines still feel current in the city.",
    "model.uomo-falcade": "A classic open tongue for a clean, timeless fit. Solid and comfortable, for every day between city and nature.",
    "model.uomo-lussari": "Suede meets rubber. The rand protects the upper and gives the boot a bolder, more striking look.",
    "model.uomo-corvara": "A boot in nubuck, a fine leather taken from the grain side, its outermost and most compact layer. Finely buffed until velvety, soft and warm to the touch, it is sturdier and longer-lasting than suede.",
    "model.uomo-lagazuoi": "A low boot with metal eyelets and a dark Vibram sole, as light as a sneaker. Two-tone nubuck suede, a rubber toe cap and a porous rubber rand with a rock effect.",
    "model.uomo-groste": "Deliberately different, for those who take the mountains seriously. A waterproof inner sock tightens with a drawcord, on a Vibram sole ready for any terrain.",
    "model.uomo-city": "The MonPiz City, designed for maximum comfort. Well cushioned, with a memory foam insole and the signature Vibram sole. Made for those who love the MonPiz boot and want a model for the city.",
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
  // ogni pagina ha il suo titolo: <body data-page="dealers"> usa meta.dealers.title e meta.dealers.desc
  const page = document.body?.dataset.page;
  document.title = t(page ? `meta.${page}.title` : "meta.title");
  document.querySelector('meta[name="description"]')?.setAttribute("content", t(page ? `meta.${page}.desc` : "meta.desc"));

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
