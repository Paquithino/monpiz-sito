# Sito MonPiz — versione 2026

Sito in HTML, CSS e JavaScript puro, senza framework. P



## Struttura

```
html/index.html          la pagina (Home)
html/cookie-policy.html  informativa cookie (italiano e inglese)
css/main.css      tutto lo stile: colori e caratteri in cima, poi una sezione per blocco,
                  in fondo le regole per tablet (640px) e computer (1024px)
js/main.js        menu, ricerca, lingua, carosello, mappa e rivenditori, shop online
js/data.js        i dati: rivenditori, mappa, modelli in evidenza, contatti
js/i18n.js        tutti i testi in italiano e inglese
js/consent.js     banner e consenso cookie (Linee guida Garante Privacy 2021)
video/            video di apertura (verticale per telefono, orizzontale per computer)
tests/            test automatici (Playwright)
img/              foto ottimizzate (WebP), loghi, prodotti e dettagli
```

## Modifiche frequenti

- **Aggiungere o togliere un negozio**: `js/data.js`, lista `RIVENDITORI`. Se ha uno shop online
  basta compilare `shop`: comparirà da solo anche nella sezione Shop online.
- **Cambiare i modelli del carosello**: `js/data.js`, lista `MODELLI`, più la foto in `img/prodotti/`
  (formato 4:5, per esempio 800 × 1000 px).
- **Colori e caratteri**: le variabili in cima a `css/main.css`.

## Da verificare

- Il numero WhatsApp usato è +39 335 760 4522 (lo stesso dei contatti): confermare che sia attivo su WhatsApp.
- Rivenditori: elenco del lookbook (30 negozi). Mancano Montesport (Andorra) e i tre Pellizzari.
- I link "Collezione Donna/Uomo" e "I modelli" portano per ora al lookbook: diventeranno pagine del sito.

## Test automatici

I test aprono il sito come un visitatore, su computer (Chrome) e su iPhone (Safari/WebKit), e controllano
pulsanti, collegamenti, video in loop, WhatsApp, email e telefono, ricerca, rivenditori, shop, lingua e cookie.

La prima volta:
```bash
npm install
npm run test:install     # scarica i browser di test (una volta sola)
```

Poi:
```bash
npm test                 # tutti i test, computer e telefono
npm run test:desktop     # solo computer
npm run test:mobile      # solo telefono
npm run test:ui          # interfaccia visiva: vedi ogni test passo per passo
npm run test:report      # apre il resoconto dell'ultimo giro
npm run test:links       # controlla che i siti esterni rispondano (serve internet)
```

Il server di sviluppo parte da solo durante i test. Se un test fallisce, nel resoconto trovi lo screenshot
del momento dell'errore.

## Cookie

Oggi il sito usa solo strumenti tecnici (lingua e scelta sui cookie): per le Linee guida del Garante non
servirebbe il consenso, ma il banner è già attivo e pronto. Se si aggiungono statistiche o marketing
(es. Google Analytics, Meta Pixel), lo script va scritto così e partirà solo dopo il consenso:

```html
<script type="text/plain" data-consent="statistiche" src="https://..."></script>
```

e va aggiunto alla tabella in `html/cookie-policy.html`. Se cambiano i servizi, aumentare `CONSENT_VERSION`
in `js/consent.js`: il banner ricomparirà a tutti.
