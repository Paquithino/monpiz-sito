/* Gestione del consenso ai cookie, secondo le Linee guida del Garante Privacy
   sui cookie (provvedimento del 10 giugno 2021):
   - al primo accesso compare il banner; chiudendolo con la X si prosegue senza accettare
     (restano solo gli strumenti tecnici);
   - "Accetta tutto" e "Rifiuta" hanno la stessa evidenza;
   - "Personalizza" permette di scegliere per categoria, con le caselle NON già spuntate;
   - scorrere la pagina non vale come consenso;
   - la scelta viene ricordata per 6 mesi, poi il banner ricompare;
   - la scelta si può cambiare quando si vuole dal link "Preferenze cookie" nel footer.

   Oggi il sito usa solo strumenti tecnici (preferenza di lingua e registrazione della scelta
   sui cookie), che non richiedono consenso. Il sistema è pronto per quando si aggiungeranno
   statistiche o marketing: basta scrivere lo script così e partirà solo dopo il consenso:

     <script type="text/plain" data-consent="statistiche" src="https://..."></script>
     <script type="text/plain" data-consent="marketing">  ...codice...  </script>
*/

export const CONSENT_KEY = "monpiz-consent";
export const CONSENT_VERSION = 1;                       // aumentarlo quando cambiano i servizi: il banner ricompare
export const CONSENT_MAX_AGE = 1000 * 60 * 60 * 24 * 182; // circa 6 mesi
export const CATEGORIES = ["statistiche", "marketing"];

const $ = (sel, root = document) => root.querySelector(sel);

export function readConsent() {
  try {
    const raw = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null");
    if (!raw || raw.version !== CONSENT_VERSION) return null;
    if (typeof raw.date !== "number" || Date.now() - raw.date > CONSENT_MAX_AGE) return null;
    return raw;
  } catch {
    return null;
  }
}

function saveConsent(choices) {
  const record = { version: CONSENT_VERSION, date: Date.now(), choices };
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify(record)); } catch { /* archiviazione non disponibile */ }
  return record;
}

/* avvia gli script in attesa di consenso per le categorie accettate */
function activateScripts(choices) {
  document.querySelectorAll('script[type="text/plain"][data-consent]').forEach((old) => {
    if (!choices[old.dataset.consent] || old.dataset.activated) return;
    const s = document.createElement("script");
    [...old.attributes].forEach((a) => { if (a.name !== "type") s.setAttribute(a.name, a.value); });
    s.textContent = old.textContent;
    old.dataset.activated = "true";
    old.replaceWith(s);
  });
}

function stateOf(choices) {
  const on = CATEGORIES.filter((c) => choices[c]);
  if (on.length === CATEGORIES.length) return "accepted";
  if (on.length === 0) return "rejected";
  return "custom";
}

export function initConsent() {
  const banner = $("#cookie");
  if (!banner) return;
  const prefs = $("[data-consent-prefs]", banner);
  const boxes = Object.fromEntries(CATEGORIES.map((c) => [c, $(`#ck-${c}`, banner)]));

  const show = (withPrefs = false) => {
    const current = readConsent();
    CATEGORIES.forEach((c) => { if (boxes[c]) boxes[c].checked = Boolean(current?.choices?.[c]); });
    prefs.hidden = !withPrefs;
    banner.hidden = false;
    document.body.classList.add("has-cookie");
  };
  const hide = () => {
    banner.hidden = true;
    document.body.classList.remove("has-cookie");
  };
  const decide = (choices) => {
    saveConsent(choices);
    document.documentElement.dataset.consent = stateOf(choices);
    activateScripts(choices);
    document.dispatchEvent(new CustomEvent("monpiz:consent", { detail: choices }));
    hide();
  };
  const all = (value) => Object.fromEntries(CATEGORIES.map((c) => [c, value]));

  $("[data-consent-accept]", banner)?.addEventListener("click", () => decide(all(true)));
  $("[data-consent-reject]", banner)?.addEventListener("click", () => decide(all(false)));
  $("[data-consent-close]", banner)?.addEventListener("click", () => decide(all(false)));
  $("[data-consent-customize]", banner)?.addEventListener("click", () => { prefs.hidden = !prefs.hidden; });
  $("[data-consent-save]", banner)?.addEventListener("click", () =>
    decide(Object.fromEntries(CATEGORIES.map((c) => [c, Boolean(boxes[c]?.checked)]))));
  document.querySelectorAll("[data-consent-open]").forEach((a) =>
    a.addEventListener("click", (e) => { e.preventDefault(); show(true); }));

  const saved = readConsent();
  if (saved) {
    document.documentElement.dataset.consent = stateOf(saved.choices);
    activateScripts(saved.choices);
  } else {
    document.documentElement.dataset.consent = "none";
    show(false);
  }
  if (location.hash === "#cookie") show(true); // arrivo dal link "Preferenze cookie" della cookie policy
}
