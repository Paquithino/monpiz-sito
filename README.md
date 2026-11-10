# Sito MonPiz — versione 2026

Sito in HTML, CSS e JavaScript puro, senza framework. Prima versione pensata per il telefono;
il layout per computer c'è ma va rifinito nella seconda fase.

## Avviarlo in VS Code

1. Apri la cartella `monpiz-sito` in VS Code.
2. Apri il terminale integrato (Terminale → Nuovo terminale).
3. La prima volta installa il server di sviluppo:
   ```bash
   npm install
   ```
4. Avvia il sito:
   ```bash
   npm run dev
   ```
   Si apre il browser su `http://localhost:5173/`. Ogni volta che salvi un file
   la pagina si aggiorna da sola. Per vederlo sul telefono, collegato alla stessa rete Wi-Fi,
   usa l'indirizzo "Network" che compare nel terminale.
5. Per fermarlo: `Ctrl + C` nel terminale.

Serve Node.js 18 o più recente (https://nodejs.org). I file non si aprono con un doppio clic,
perché il JavaScript usa i moduli: serve il server di `npm run dev`.

## Struttura

```
index.html               la pagina (Home)
donna/ uomo/             pagine delle collezioni: un riquadro per modello (foto in img/modelli/)
lookbook/                presentazione del lookbook, con i link a lookbook.monpiz.it
rivenditori/             mappa ed elenco dei negozi (disegnati da js/main.js con i dati di js/data.js)
shop-online/             shop online dei rivenditori
guida-taglie/            passaggi, calcolo e tabella delle taglie
cookie-policy.html       informativa cookie (italiano e inglese)
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
- **Pagine interne** (donna, uomo, lookbook, rivenditori, shop online, guida taglie): servono soprattutto a
  Google per mostrare i link sotto il risultato "MonPiz". Sono collegate dal footer (e la guida taglie dal
  menu ☰). Ogni cartella ha il suo `index.html` con header, menu e footer copiati dalla Home: se cambi una
  voce del menu, del footer o un contatto, cambiala anche lì (in VS Code: Cmd+Shift+H, Sostituisci nei file).
  I testi delle pagine sono in `js/i18n.js` (chiavi `page.…`, `meta.…` e `model.…`).
- **Nuova pagina**: aggiungila anche a `sitemap.xml` e alla riga `cp -r …` in `.github/workflows/pubblica.yml`,
  altrimenti non viene pubblicata.

## Da verificare

- Il numero WhatsApp usato è +39 376 066 9500 (lo stesso dei contatti): confermare che sia attivo su WhatsApp.
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

e va aggiunto alla tabella in `cookie-policy.html`. Se cambiano i servizi, aumentare `CONSENT_VERSION`
in `js/consent.js`: il banner ricomparirà a tutti.
