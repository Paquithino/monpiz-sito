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
   Si apre il browser su `http://localhost:5173/html/index.html`. Ogni volta che salvi un file
   la pagina si aggiorna da sola. Per vederlo sul telefono, collegato alla stessa rete Wi-Fi,
   usa l'indirizzo "Network" che compare nel terminale.
5. Per fermarlo: `Ctrl + C` nel terminale.

Serve Node.js 18 o più recente (https://nodejs.org). I file non si aprono con un doppio clic,
perché il JavaScript usa i moduli: serve il server di `npm run dev`.

## Struttura

```
html/index.html   la pagina (Home)
css/main.css      tutto lo stile: colori e caratteri in cima, poi una sezione per blocco,
                  in fondo le regole per tablet (640px) e computer (1024px)
js/main.js        menu, ricerca, lingua, carosello, mappa e rivenditori, shop online
js/data.js        i dati: rivenditori, mappa, modelli in evidenza, contatti
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
