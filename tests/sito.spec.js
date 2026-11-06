// Test della Home MonPiz: pulsanti, collegamenti, contatti, video, ricerca, rivenditori,
// lingua e banner dei cookie. Avvio: `npm test`.
import { test, expect } from "@playwright/test";
import { HOME, WHATSAPP, EMAIL, PHONE, INSTAGRAM, openHome, isMobile, collectErrors, scrollY } from "./helpers.js";

// -------------------------------------------------------------------------------------------
test.describe("Pagina", () => {
  test("si carica senza errori JavaScript", async ({ page }) => {
    const errors = collectErrors(page);
    await openHome(page);
    await page.waitForTimeout(500);
    expect(errors).toEqual([]);
  });

  test("non scorre di lato", async ({ page }) => {
    await openHome(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("tutte le immagini si caricano", async ({ page }) => {
    await openHome(page);
    await page.evaluate(() => document.querySelectorAll("img").forEach((i) => { i.loading = "eager"; }));
    await expect.poll(() => page.evaluate(() => [...document.images].filter((i) => !i.complete).length)).toBe(0);
    const broken = await page.evaluate(() => [...document.images].filter((i) => i.naturalWidth === 0).map((i) => i.src.slice(-60)));
    expect(broken).toEqual([]);
  });
});

// -------------------------------------------------------------------------------------------
test.describe("Collegamenti", () => {
  test("ogni link interno (#sezione) porta a una sezione che esiste", async ({ page }) => {
    await openHome(page);
    const missing = await page.evaluate(() =>
      [...document.querySelectorAll('a[href^="#"]')]
        .map((a) => a.getAttribute("href").slice(1))
        .filter((id) => id && !document.getElementById(id)));
    expect(missing).toEqual([]);
  });

  test("i link esterni si aprono in una nuova scheda in modo sicuro e usano https", async ({ page }) => {
    await openHome(page);
    const bad = await page.evaluate(() =>
      [...document.querySelectorAll('a[href^="http"]')] // comprende i punti della mappa (link SVG)
        .filter((a) => !a.getAttribute("href").startsWith("https://") || a.getAttribute("target") !== "_blank" || !/noopener/.test(a.getAttribute("rel") || ""))
        .map((a) => a.getAttribute("href")));
    expect(bad).toEqual([]);
  });

  test("i link al lookbook sono corretti e le collezioni aprono la sezione giusta", async ({ page }) => {
    await openHome(page);
    const hrefs = await page.locator('a[href*="lookbook.monpiz.it"]').evaluateAll((as) => as.map((a) => a.getAttribute("href")));
    expect(hrefs.length).toBeGreaterThanOrEqual(4);
    for (const h of hrefs) expect(h).toMatch(/^https:\/\/lookbook\.monpiz\.it\/(#[a-z-]+)?$/);
    await expect(page.locator("#donna")).toHaveAttribute("href", "https://lookbook.monpiz.it/#donna");
    await expect(page.locator("#uomo")).toHaveAttribute("href", "https://lookbook.monpiz.it/#uomo");
  });

  test("in inglese i link portano al lookbook inglese (en.html)", async ({
      page,
    }) => {
      await openHome(page, { lang: "en" });
      const hrefs = await page
        .locator('a[href*="lookbook.monpiz.it"]')
        .evaluateAll((as) => as.map((a) => a.getAttribute("href")));
      expect(hrefs.length).toBeGreaterThan(3);
      for (const h of hrefs)
        expect(h).toMatch(
          /^https:\/\/lookbook\.monpiz\.it\/en\.html(#[a-z-]+)?$/,
        );
      await expect(page.locator("#donna")).toHaveAttribute(
        "href",
        "https://lookbook.monpiz.it/en.html#women",
      );
      await expect(page.locator("#uomo")).toHaveAttribute(
        "href",
        "https://lookbook.monpiz.it/en.html#men",
      );
    });

  test("nessun link al lookbook ha la freccetta", async ({ page }) => {
    await openHome(page);
    const withArrow = await page.locator('a[href*="lookbook.monpiz.it"]').evaluateAll((as) => as.filter((a) => /↗/.test(a.textContent)).length);
    expect(withArrow).toBe(0);
  });

  test("il menu in alto porta alle sezioni (computer)", async ({ page }, testInfo) => {
    test.skip(isMobile(testInfo), "sul telefono il menu in alto non c'è");
    await openHome(page);
    for (const id of ["donna", "uomo", "dettagli", "storia", "rivenditori", "shop-online"]) {
      await page.locator(`.hdr__nav a[href="#${id}"]`).click();
      await expect(page.locator(`#${id}`)).toBeInViewport();
    }
  });

  test("i collegamenti sopra il video portano alle sezioni (telefono)", async ({ page }, testInfo) => {
    test.skip(!isMobile(testInfo), "solo telefono");
    await openHome(page);
    for (const id of ["donna", "uomo", "storia", "rivenditori", "shop-online"]) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.locator(`.hero__links a[href="#${id}"]`).click();
      await expect(page.locator(`#${id}`)).toBeInViewport();
    }
  });

  test("i pulsanti dell'apertura funzionano", async ({ page }) => {
    await openHome(page);
    await expect(page.locator(".hero__actions a").first()).toHaveAttribute("href", /lookbook\.monpiz\.it/);
    await page.locator('.hero__actions a[href="#rivenditori"]').click();
    await expect(page.locator("#rivenditori")).toBeInViewport();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.locator('.hero__actions a[href="#shop-online"]').click();
    await expect(page.locator("#shop-online")).toBeInViewport();
  });
});

// -------------------------------------------------------------------------------------------
test.describe("Logo e torna su", () => {
  test("il logo nell'header riporta al video da qualsiasi punto", async ({ page }) => {
    await openHome(page);
    for (const where of ["#storia", "#rivenditori", ".ftr"]) {
      await page.locator(where).scrollIntoViewIfNeeded();
      expect(await scrollY(page)).toBeGreaterThan(200);
      await page.locator(".hdr__logo").click();
      await expect.poll(() => scrollY(page)).toBeLessThan(5);
    }
    await expect(page.locator(".hero__video")).toBeInViewport();
  });

  test("il logo e 'Torna su' nel footer riportano in cima", async ({ page }) => {
    await openHome(page);
    for (const sel of [".ftr__logo-link", '.ftr__bottom a.js-top']) {
      await page.locator(".ftr").scrollIntoViewIfNeeded();
      await page.locator(sel).click();
      await expect.poll(() => scrollY(page)).toBeLessThan(5);
    }
  });

  test("il logo nel menu ☰ chiude il menu e riporta in cima (telefono)", async ({ page }, testInfo) => {
    test.skip(!isMobile(testInfo), "solo telefono");
    await openHome(page);
    await page.locator("#storia").scrollIntoViewIfNeeded();
    await page.locator('[data-open="menu"]').click();
    await page.locator(".drawer__logo").click();
    await expect(page.locator("#menu")).toBeHidden();
    await expect.poll(() => scrollY(page)).toBeLessThan(5);
  });
});

// -------------------------------------------------------------------------------------------
test.describe("Menu ☰ (telefono)", () => {
  test.beforeEach(async ({}, testInfo) => test.skip(!isMobile(testInfo), "solo telefono"));

  test("si apre, si chiude con la X e con Esc", async ({ page }) => {
    await openHome(page);
    await page.locator('[data-open="menu"]').click();
    await expect(page.locator("#menu")).toBeVisible();
    await page.locator('#menu [data-close].icon-btn').click();
    await expect(page.locator("#menu")).toBeHidden();
    await page.locator('[data-open="menu"]').click();
    await page.keyboard.press("Escape");
    await expect(page.locator("#menu")).toBeHidden();
  });

  test("ogni voce porta alla sezione e chiude il menu", async ({ page }) => {
    await openHome(page);
    for (const id of ["donna", "uomo", "storia", "rivenditori", "shop-online"]) {
      await page.locator('[data-open="menu"]').click();
      await page.locator(`.drawer__nav a[href="#${id}"]`).last().click();
      await expect(page.locator("#menu")).toBeHidden();
      await expect(page.locator(`#${id}`)).toBeInViewport();
    }
  });
});

// -------------------------------------------------------------------------------------------
test.describe("Video di apertura", () => {
  test("è muto, in loop, parte da solo e usa la versione giusta per lo schermo", async ({ page }, testInfo) => {
    await openHome(page);
    const v = page.locator(".hero__video");
    const props = await v.evaluate((el) => ({ loop: el.loop, muted: el.muted, autoplay: el.autoplay, inline: el.playsInline, src: el.currentSrc || el.src }));
    expect(props).toMatchObject({ loop: true, muted: true, autoplay: true, inline: true });
    expect(props.src).toContain(isMobile(testInfo) ? "monpiz-home-mobile.mp4" : "monpiz-home-desktop.mp4");
    expect(await v.getAttribute("poster")).toContain(isMobile(testInfo) ? "hero-poster-mobile" : "hero-poster-desktop");
  });

  test("si riproduce e ricomincia da capo alla fine", async ({ page }) => {
    await openHome(page);
    const v = page.locator(".hero__video");
    const canPlay = await v.evaluate((el) => el.canPlayType('video/mp4; codecs="avc1.640028"'));
    test.skip(!canPlay, "questo browser di test non legge l'H.264: prova il video a mano o con il progetto 'mobile'");
    await expect.poll(() => v.evaluate((el) => el.currentTime), { timeout: 10_000 }).toBeGreaterThan(0.3);
    expect(await v.evaluate((el) => el.paused)).toBe(false);
    // salta quasi alla fine: grazie al loop deve ripartire dall'inizio senza fermarsi
    await v.evaluate((el) => { el.currentTime = Math.max(0, el.duration - 0.4); });
    await expect.poll(() => v.evaluate((el) => el.currentTime), { timeout: 8_000 }).toBeLessThan(3);
    expect(await v.evaluate((el) => ({ ended: el.ended, paused: el.paused }))).toEqual({ ended: false, paused: false });
  });

  test("si mette in pausa fuori schermo e riparte tornando su", async ({ page }) => {
    await openHome(page);
    const v = page.locator(".hero__video");
    const canPlay = await v.evaluate((el) => el.canPlayType('video/mp4; codecs="avc1.640028"'));
    test.skip(!canPlay, "il browser di test non legge l'H.264");
    await expect.poll(() => v.evaluate((el) => el.paused), { timeout: 10_000 }).toBe(false);
    await page.locator("#rivenditori").scrollIntoViewIfNeeded();
    await expect.poll(() => v.evaluate((el) => el.paused)).toBe(true);
    await page.locator(".hdr__logo").click();
    await expect.poll(() => v.evaluate((el) => el.paused)).toBe(false);
  });
});

// -------------------------------------------------------------------------------------------
test.describe("Contatti", () => {
  test("tutti i link WhatsApp puntano al numero giusto", async ({ page }) => {
    await openHome(page);
    const was = await page.locator('a[href*="wa.me"]').evaluateAll((as) => as.map((a) => ({ href: a.getAttribute("href"), target: a.target })));
    expect(was.length).toBeGreaterThanOrEqual(2);
    for (const w of was) expect(w).toEqual({ href: WHATSAPP, target: "_blank" });
  });

  test("il pulsante WhatsApp fisso è nascosto sul video e compare scorrendo", async ({ page }) => {
    await openHome(page);
    const wa = page.locator("a.wa");
    await expect(wa).toHaveCSS("opacity", "0");
    await page.locator("#rivenditori").scrollIntoViewIfNeeded();
    await expect(wa).toHaveCSS("opacity", "1");
    await expect(wa).toHaveAttribute("href", WHATSAPP);
  });

  test("tutti i link email e telefono sono corretti", async ({ page }) => {
    await openHome(page);
    const mails = await page.locator('a[href^="mailto:"]').evaluateAll((as) => as.map((a) => a.getAttribute("href")));
    expect(mails.length).toBeGreaterThanOrEqual(2);
    for (const m of mails) expect(m).toBe(EMAIL);
    const tels = await page.locator('a[href^="tel:"]').evaluateAll((as) => as.map((a) => a.getAttribute("href")));
    expect(tels).toContain(PHONE);
    for (const t of tels) expect(t).toMatch(/^tel:\+?\d{6,}$/);
  });

  test("il link Instagram è corretto", async ({ page }) => {
    await openHome(page);
    const ig = await page.locator('a[href*="instagram.com"]').evaluateAll((as) => as.map((a) => a.getAttribute("href")));
    expect(ig.length).toBeGreaterThanOrEqual(1);
    for (const h of ig) expect(h).toBe(INSTAGRAM);
  });
});

// -------------------------------------------------------------------------------------------
test.describe("Ricerca (lente)", () => {
  test("trova un negozio per città e ci porta sopra", async ({ page }) => {
    await openHome(page);
    await page.locator('[data-open="cerca"]').click();
    await expect(page.locator("#cerca")).toBeVisible();
    await expect(page.locator("#cerca-risultati")).toContainText("Cortina");
    await page.locator("#cerca-input").fill("Trento");
    const hit = page.locator('#cerca-risultati a[data-goto-store="negozio-caneppele"]');
    await expect(hit).toBeVisible();
    await hit.click();
    await expect(page.locator("#cerca")).toBeHidden();
    await expect(page.locator("#negozio-caneppele")).toBeInViewport();
  });

  test("trova un modello e collega al lookbook", async ({ page }) => {
    await openHome(page);
    await page.locator('[data-open="cerca"]').click();
    await page.locator("#cerca-input").fill("lussari");
    await expect(page.locator('#cerca-risultati a[href*="lookbook.monpiz.it"]')).toContainText("Lussari");
  });

  test("dice quando non trova niente", async ({ page }) => {
    await openHome(page);
    await page.locator('[data-open="cerca"]').click();
    await page.locator("#cerca-input").fill("zzzzzz");
    await expect(page.locator("#cerca-risultati")).toContainText("Nessun risultato");
  });
});

// -------------------------------------------------------------------------------------------
test.describe("Rivenditori", () => {
  test("mostra 30 negozi in 5 regioni, ognuno con mappa e telefono validi", async ({ page }) => {
    await openHome(page);
    await expect(page.locator("[data-count]")).toHaveText("30");
    await expect(page.locator(".region")).toHaveCount(5);
    await expect(page.locator(".store")).toHaveCount(30);
    const maps = await page.locator(".store").evaluateAll((lis) => lis.filter((li) => !li.querySelector('a[href^="https://www.google.com/maps/"]')).map((li) => li.id));
    expect(maps).toEqual([]);
  });

  test("le regioni si aprono e si chiudono", async ({ page }) => {
    await openHome(page);
    const veneto = page.locator('.region[data-region="veneto"]');
    await veneto.locator("summary").click();
    await expect(veneto.locator(".store").first()).toBeVisible();
    await veneto.locator("summary").click();
    await expect(veneto.locator(".store").first()).toBeHidden();
  });

  test("la ricerca filtra i negozi", async ({ page }) => {
    await openHome(page);
    await page.locator("#riv-q").fill("Cortina");
    await expect(page.locator("[data-riv-count]")).toHaveText("1 rivenditore trovato");
    await expect(page.locator(".store:visible")).toHaveCount(1);
    await page.locator("#riv-q").fill("zzzz");
    await expect(page.locator("[data-riv-empty]")).toBeVisible();
    await page.locator("#riv-q").fill("");
    await expect(page.locator("[data-riv-count]")).toHaveText("");
  });

  test("un punto con più negozi sulla mappa apre la regione e li evidenzia", async ({ page }) => {
    await openHome(page);
    const dot = page.locator(".map__dot[data-ids]").first();
    const first = (await dot.getAttribute("data-ids")).split(" ")[0];
    await page.emulateMedia({ reducedMotion: "reduce" }); // scorrimento immediato: il test non dipende dall'animazione
    await dot.click();
    await expect(page.locator(`#${first}`)).toBeInViewport();
    await expect(page.locator(`#${first}`)).toHaveClass(/is-flash/);
  });
});

// -------------------------------------------------------------------------------------------
test.describe("Guida alle taglie", () => {
  test("mostra la tabella e consiglia la taglia giusta dalla lunghezza del piede", async ({ page }) => {
    await openHome(page);
    await expect(page.locator(".sizes__cell")).toHaveCount(13);
    const input = page.locator("#piede-cm");
    const out = page.locator("[data-sizes-out]");
    const go = page.locator("[data-sizes-form] button");
    await input.fill("25,3"); await go.click();           // 25,3 + 0,5 = 25,8 cm → taglia 41
    await expect(out).toContainText("41");
    await expect(page.locator(".sizes__cell.is-match")).toHaveAttribute("data-size", "41");
    await input.fill("22"); await go.click();              // 22,5 cm → taglia 36
    await expect(page.locator(".sizes__cell.is-match")).toHaveAttribute("data-size", "36");
    await input.fill("32"); await go.click();              // oltre la 47
    await expect(out).toContainText("47");
    await expect(page.locator(".sizes__cell.is-match")).toHaveCount(0);
    await input.fill("abc"); await go.click();
    await expect(out).toContainText("25,5");
  });
});

// -------------------------------------------------------------------------------------------
test.describe("Shop online", () => {
  test("elenca gli shop e ogni riquadro apre lo shop in una nuova scheda", async ({ page }) => {
    await openHome(page);
    const shops = await page.locator(".shop a").evaluateAll((as) => as.map((a) => ({ href: a.href, target: a.target })));
    expect(shops.length).toBe(6);
    for (const s of shops) {
      expect(s.href).toMatch(/^https:\/\//);
      expect(s.target).toBe("_blank");
    }
  });
});

// -------------------------------------------------------------------------------------------
test.describe("Lingua", () => {
  async function chooseEnglish(page, testInfo) {
    if (isMobile(testInfo)) {
      await page.locator('[data-open="menu"]').click();
      await page.locator('.drawer__lang [data-lang="en"]').click();
      await page.keyboard.press("Escape");
    } else {
      await page.locator("[data-lang-toggle]").click();
      await page.locator('#lingue [data-lang="en"]').click();
    }
  }

  test("passa all'inglese e traduce anche le parti generate dal codice", async ({ page }, testInfo) => {
    await openHome(page);
    await chooseEnglish(page, testInfo);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("#hero-t span")).toHaveText("Urban fashion mountain boots");
    await expect(page.locator("#dealers-t")).toHaveText("A network of 30 stores");
    await expect(page.locator(".region__n").first()).toContainText("stores");
    await expect(page.locator("a.wa")).toHaveAttribute("aria-label", "Message us on WhatsApp");
    expect(await page.title()).toContain("Urban fashion");
  });

  test("ricorda la lingua scelta dopo aver ricaricato la pagina", async ({ page }, testInfo) => {
    await openHome(page);
    await chooseEnglish(page, testInfo);
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("?lang=en apre direttamente in inglese", async ({ page }) => {
    await openHome(page, { lang: null, path: `${HOME}?lang=en` });
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator('[data-i18n="help.title"]')).toHaveText("Not sure about your size?");
  });
});

// -------------------------------------------------------------------------------------------
test.describe("Cookie (Linee guida Garante Privacy 2021)", () => {
  test("al primo accesso compare il banner con Accetta e Rifiuta, senza caselle già spuntate", async ({ page }) => {
    await openHome(page, { consent: false });
    const banner = page.locator("#cookie");
    await expect(banner).toBeVisible();
    await expect(banner.locator("[data-consent-accept]")).toBeVisible();
    await expect(banner.locator("[data-consent-reject]")).toBeVisible();
    await expect(banner.locator("[data-consent-close]")).toBeVisible();
    await expect(banner.locator('a[href="cookie-policy.html"]')).toBeVisible();
    // Rifiuta ha la stessa evidenza di Accetta
    const [a, r] = await Promise.all(["accept", "reject"].map((k) =>
      banner.locator(`[data-consent-${k}]`).evaluate((el) => { const s = getComputedStyle(el); return [s.backgroundColor, s.color, s.fontSize]; })));
    expect(r).toEqual(a);
    await banner.locator("[data-consent-customize]").click();
    await expect(banner.locator("#ck-statistiche")).not.toBeChecked();
    await expect(banner.locator("#ck-marketing")).not.toBeChecked();
  });

  test("scorrere la pagina non vale come consenso", async ({ page }) => {
    await openHome(page, { consent: false });
    await page.locator(".ftr").scrollIntoViewIfNeeded();
    await expect(page.locator("#cookie")).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem("monpiz-consent"))).toBeNull();
  });

  for (const [button, expected] of [["accept", "accepted"], ["reject", "rejected"], ["close", "rejected"]]) {
    test(`"${button}" salva la scelta e il banner non ricompare`, async ({ page }) => {
      await openHome(page, { consent: false });
      await page.locator(`#cookie [data-consent-${button}]`).click();
      await expect(page.locator("#cookie")).toBeHidden();
      await expect(page.locator("html")).toHaveAttribute("data-consent", expected);
      const rec = await page.evaluate(() => JSON.parse(localStorage.getItem("monpiz-consent")));
      expect(rec.version).toBe(1);
      expect(Date.now() - rec.date).toBeLessThan(60_000);
      await page.reload();
      await expect(page.locator("#cookie")).toBeHidden();
    });
  }

  test("'Personalizza' salva solo le categorie scelte", async ({ page }) => {
    await openHome(page, { consent: false });
    await page.locator("#cookie [data-consent-customize]").click();
    await page.locator("#ck-statistiche").check();
    await page.locator("#cookie [data-consent-save]").click();
    await expect(page.locator("html")).toHaveAttribute("data-consent", "custom");
    const rec = await page.evaluate(() => JSON.parse(localStorage.getItem("monpiz-consent")));
    expect(rec.choices).toEqual({ statistiche: true, marketing: false });
  });

  test("dopo 6 mesi il banner ricompare", async ({ page }) => {
    await page.addInitScript(() => {
      const seven = 1000 * 60 * 60 * 24 * 213;
      localStorage.setItem("monpiz-consent", JSON.stringify({ version: 1, date: Date.now() - seven, choices: { statistiche: true, marketing: true } }));
    });
    await openHome(page, { consent: false });
    await expect(page.locator("#cookie")).toBeVisible();
  });

  test("'Preferenze cookie' nel footer riapre le scelte", async ({ page }) => {
    await openHome(page);
    await expect(page.locator("#cookie")).toBeHidden();
    await page.locator(".ftr [data-consent-open]").click();
    await expect(page.locator("#cookie")).toBeVisible();
    await expect(page.locator("[data-consent-prefs]")).toBeVisible();
  });

  test("gli script di statistica partono solo dopo il consenso", async ({ page }) => {
    // aggiunge alla pagina uno script finto in attesa di consenso
    await page.route("**/index.html*", async (route) => {
      const res = await route.fetch();
      const body = (await res.text()).replace("</body>",
        '<script type="text/plain" data-consent="statistiche">window.__statistiche = true;</script></body>');
      await route.fulfill({ response: res, body });
    });
    await openHome(page, { consent: false });
    expect(await page.evaluate(() => window.__statistiche)).toBeUndefined();
    await page.locator("#cookie [data-consent-reject]").click();
    expect(await page.evaluate(() => window.__statistiche)).toBeUndefined();
    await page.locator(".ftr [data-consent-open]").click();
    await page.locator("#cookie [data-consent-accept]").click();
    expect(await page.evaluate(() => window.__statistiche)).toBe(true);
  });

  test("la cookie policy si apre, elenca gli strumenti usati e torna al sito", async ({ page }) => {
    await openHome(page);
    const res = await page.request.get("/cookie-policy.html");
    expect(res.status()).toBe(200);
    await page.locator('.ftr a[href="cookie-policy.html"]').click();
    await expect(page.locator('article[lang="it"] h1')).toHaveText("Cookie policy");
    await expect(page.locator('article[lang="it"] table')).toContainText("monpiz-lang");
    await expect(page.locator('article[lang="it"] table')).toContainText("monpiz-consent");
    await page.locator('article[lang="it"] .policy-back').click();
    await expect(page).toHaveURL(/index\.html$/);
  });
});
