// Funzioni comuni ai test.
export const HOME = "/html/index.html";
export const WHATSAPP = "https://wa.me/393357604522";
export const EMAIL = "mailto:monpiz@monpiz.it";
export const PHONE = "tel:+393357604522";
export const INSTAGRAM = "https://www.instagram.com/monpiz_/";

/** Apre la Home come un visitatore che ha già scelto sui cookie (così il banner non copre la pagina). */
export async function openHome(page, { lang = "it", consent = true, path = HOME } = {}) {
  await page.addInitScript(({ lang, consent }) => {
    try {
      if (consent && !localStorage.getItem("monpiz-consent")) {
        localStorage.setItem("monpiz-consent", JSON.stringify({ version: 1, date: Date.now(), choices: { statistiche: false, marketing: false } }));
      }
      if (lang && !localStorage.getItem("monpiz-lang")) localStorage.setItem("monpiz-lang", lang);
    } catch {}
  }, { lang, consent });
  await page.goto(path);
  await page.waitForFunction(() => document.querySelectorAll(".store").length > 0); // il JS ha disegnato i rivenditori
}

export const isMobile = (testInfo) => testInfo.project.name === "mobile";

/** Raccoglie gli errori JavaScript della pagina. */
export function collectErrors(page) {
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => {
    if (m.type() === "error" && !/favicon|ERR_|net::/i.test(m.text())) errors.push(m.text());
  });
  return errors;
}

export const scrollY = (page) => page.evaluate(() => Math.round(window.scrollY));
