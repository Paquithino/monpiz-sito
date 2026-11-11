// Test delle pagine interne: donna, uomo, lookbook, rivenditori, shop online, guida taglie.
// Servono soprattutto a Google (link sotto il risultato "MonPiz"); sono collegate dal footer.
import { test, expect } from "@playwright/test";
import { openPage, openHome, collectErrors, isMobile, PAGINE, WHATSAPP } from "./helpers.js";

test.describe("Pagine interne", () => {
  for (const p of PAGINE) {
    test(`${p.path} si apre senza errori, con titolo, indirizzo ufficiale e intestazione giusti`, async ({ page }, testInfo) => {
      const errors = collectErrors(page);
      await openPage(page, p.path);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText(p.h1);
      await expect(page).toHaveTitle(/MonPiz/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.monpiz.it${p.path}`);
      await expect(page.locator("[data-hdr]")).toHaveClass(/is-solid/);      // senza foto d'apertura l'header è sempre chiaro
      await expect(page.locator(".crumbs a")).toHaveAttribute("href", "/");  // briciole di pane verso la home
      if (!isMobile(testInfo) && p.path !== "/guida-taglie/") {
        await expect(page.locator(`.hdr__nav a[href="${p.path}"]`)).toHaveAttribute("aria-current", "page");
      }
      const width = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(width).toBeLessThanOrEqual(0);
      await page.waitForTimeout(300);
      expect(errors).toEqual([]);
    });
  }

  test("nelle pagine interne il menu in alto porta alle pagine e alle sezioni della home", async ({ page }, testInfo) => {
    test.skip(isMobile(testInfo), "sul telefono il menu in alto non c'è");
    await openPage(page, "/rivenditori/");
    await expect(page.locator(".hdr__nav a", { hasText: "Donna" })).toHaveAttribute("href", "/donna/");
    await expect(page.locator(".hdr__nav a", { hasText: "Uomo" })).toHaveAttribute("href", "/uomo/");
    await expect(page.locator(".hdr__nav a", { hasText: "Lookbook" })).toHaveAttribute("href", "/lookbook/");
    await expect(page.locator(".hdr__nav a", { hasText: "Storia" })).toHaveAttribute("href", "/#storia");
  });

  test("il logo delle pagine interne riporta alla home", async ({ page }) => {
    await openPage(page, "/rivenditori/");
    await page.locator(".hdr__logo").click();
    await expect(page).toHaveURL(/\/(index\.html)?$/);
    await expect(page.locator(".hero__video")).toBeVisible();
  });

  test("la sezione 'Continua a scoprire' collega le altre pagine", async ({ page }) => {
    await openPage(page, "/donna/");
    const hrefs = await page.locator(".next__list a").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
    expect(hrefs).toEqual(expect.arrayContaining(["/uomo/", "/lookbook/", "/rivenditori/", "/shop-online/", "/guida-taglie/", "/"]));
    expect(hrefs).not.toContain("/donna/");
  });

  test("la sitemap elenca tutte le pagine", async ({ page }) => {
    const xml = await (await page.request.get("/sitemap.xml")).text();
    for (const p of PAGINE) expect(xml).toContain(`https://www.monpiz.it${p.path}`);
  });
});

test.describe("Pagine Donna e Uomo", () => {
  for (const [path, linea] of [["/donna/", "donna"], ["/uomo/", "uomo"]]) {
    test(`${path} mostra 7 modelli, ognuno con foto, descrizione e link al lookbook`, async ({ page }) => {
      await openPage(page, path);
      const models = page.locator(".coll-card");
      await expect(models).toHaveCount(7);
      for (const m of await models.all()) {
        const id = await m.getAttribute("id");
        expect(id.startsWith(`${linea}-`)).toBe(true);
        await expect(m.locator(".coll-card__desc")).not.toBeEmpty();
        await expect(m.locator(".coll-card__img")).toHaveAttribute("alt", /^Pedula MonPiz /);
        await expect(m.locator(".coll-card__link")).toHaveAttribute("href", `https://lookbook.monpiz.it/#${id}`);
      }
      await expect(page.locator(`.coll-bar__tabs a[href="${path}"]`)).toHaveAttribute("aria-current", "page"); // scheda Donna/Uomo attiva
      await expect(page.locator(".where a").first()).toHaveAttribute("href", "/rivenditori/");
      await expect(page.locator('.where a[href^="https://wa.me/"]')).toHaveAttribute("href", WHATSAPP);
    });
  }

  test("in inglese i modelli portano al lookbook inglese e le descrizioni sono tradotte", async ({ page }) => {
    await openPage(page, "/donna/", { lang: "en" });
    await expect(page.locator("h1")).toHaveText("Women's collection");
    await expect(page.locator("#donna-cortina .coll-card__link")).toHaveAttribute("href", "https://lookbook.monpiz.it/en.html#women-cortina");
    await expect(page.locator(".coll-bar__count")).toContainText("7 models");
    await expect(page).toHaveTitle(/women's collection/i);
  });
});

test.describe("Pagina Rivenditori", () => {
  test("mostra mappa e 30 negozi", async ({ page }) => {
    await openPage(page, "/rivenditori/");
    await expect(page.locator(".store")).toHaveCount(30);
    await expect(page.locator("[data-map] svg")).toBeVisible();
  });

  test("un link diretto a un negozio apre la regione e lo evidenzia", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await openPage(page, "/rivenditori/#negozio-marinotti");
    await expect(page.locator("#negozio-marinotti")).toBeInViewport();
    await expect(page.locator("#negozio-marinotti")).toHaveClass(/is-flash/);
  });

  test("dalla ricerca di un'altra pagina si arriva al negozio nella pagina Rivenditori", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await openPage(page, "/donna/");
    await page.locator('[data-open="cerca"]').click();
    await page.locator("#cerca-input").fill("Cortina");
    const link = page.locator('#cerca-risultati a[href^="/rivenditori/#"]').first();
    await expect(link).toBeVisible();
    const href = await link.getAttribute("href");
    await link.click();
    await expect(page).toHaveURL(new RegExp(href + "$"));
    await expect(page.locator(href.slice("/rivenditori/".length))).toBeInViewport();
  });
});

test.describe("Pagine Shop online, Guida taglie e Lookbook", () => {
  test("Shop online elenca gli shop dei rivenditori", async ({ page }) => {
    await openPage(page, "/shop-online/");
    const shops = page.locator(".shop a");
    expect(await shops.count()).toBeGreaterThan(0);
    for (const a of await shops.all()) {
      await expect(a).toHaveAttribute("href", /^https:\/\//);
      await expect(a).toHaveAttribute("target", "_blank");
    }
  });

  test("Guida taglie calcola la taglia", async ({ page }) => {
    await openPage(page, "/guida-taglie/");
    await expect(page.locator(".sizes__cell")).toHaveCount(13);
    await page.locator("#piede-cm").fill("25,3");
    await page.locator("[data-sizes-form] button").click();
    await expect(page.locator(".sizes__cell.is-match")).toHaveAttribute("data-size", "41");
  });

  test("Lookbook porta al catalogo, alle collezioni e a ogni modello", async ({ page }) => {
    await openPage(page, "/lookbook/");
    await expect(page.locator(".lb-open")).toHaveAttribute("href", "https://lookbook.monpiz.it/");
    await expect(page.locator(".lb-panel__link")).toHaveCount(2);
    await expect(page.locator(".lb-panel__link").first()).toHaveAttribute("href", "https://lookbook.monpiz.it/#donna");
    await expect(page.locator(".lb-panel__link").last()).toHaveAttribute("href", "https://lookbook.monpiz.it/#uomo");
    await expect(page.locator('.lb-panel__site[href="/donna/"]')).toHaveCount(1);
    await expect(page.locator('.lb-panel__site[href="/uomo/"]')).toHaveCount(1);
    const models = page.locator(".lb-idx__item a");
    await expect(models).toHaveCount(14);
    for (const a of await models.all()) await expect(a).toHaveAttribute("href", /^https:\/\/lookbook\.monpiz\.it\/#(donna|uomo)-/);
  });
});

test.describe("Home → pagine", () => {
  test("il footer della home collega tutte le pagine interne", async ({ page }) => {
    await openHome(page);
    const hrefs = await page.locator(".ftr a").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
    for (const p of PAGINE) expect(hrefs).toContain(p.path);
  });

  test("il menu ☰ porta alla guida alle taglie", async ({ page }, testInfo) => {
    test.skip(!isMobile(testInfo), "solo telefono");
    await openHome(page);
    await page.locator('[data-open="menu"]').click();
    await page.locator('.drawer__nav a[href="/guida-taglie/"]').click();
    await expect(page).toHaveURL(/\/guida-taglie\/$/);
  });
});
