// Registrazione dei clic verso shop online, rivenditori e contatti (js/track.js).
import { test, expect } from "@playwright/test";

/** Apre una pagina con i cookie già scelti, blocca i siti esterni e "spia" gtag/fbq. */
async function apri(page, path, choices) {
  await page.context().route(/^(?!http:\/\/localhost)/, (route) => route.abort()); // niente chiamate vere a Google, Meta o ai negozi
  await page.addInitScript((choices) => {
    try {
      localStorage.setItem("monpiz-consent", JSON.stringify({ version: 3, date: Date.now(), choices }));
      localStorage.setItem("monpiz-lang", "it");
    } catch {}
  }, choices);
  await page.goto(path);
  await page.waitForFunction(() => document.documentElement.dataset.consent);
  await page.evaluate(() => {
    window.__ga = []; window.__fb = [];
    if (typeof window.gtag === "function") { const g = window.gtag; window.gtag = (...a) => { window.__ga.push(a); return g(...a); }; }
    if (typeof window.fbq === "function") { const f = window.fbq; window.fbq = (...a) => { window.__fb.push(a); return f(...a); }; }
  });
}
const clic = (locator) => locator.dispatchEvent("click");
const ga = (page) => page.evaluate(() => window.__ga.filter((a) => a[0] === "event"));
const fb = (page) => page.evaluate(() => window.__fb);

test.describe("Registrazione dei clic", () => {
  test("clic su uno shop online: evento per Analytics e per Meta", async ({ page }) => {
    await apri(page, "/shop-online/", { statistiche: true, marketing: true });
    const link = page.locator(".shop a").first();
    const nome = (await link.locator(".shop__name").textContent()).trim();
    await clic(link);
    await expect.poll(() => ga(page)).toEqual([["event", "click_shop_online", expect.objectContaining({ nome_negozio: nome, pagina: "/shop-online/" })]]);
    expect(await fb(page)).toEqual([["trackCustom", "ClickShop", { content_name: nome }]]);
  });

  test("clic su mappa, telefono e shop di un rivenditore", async ({ page }) => {
    await apri(page, "/rivenditori/", { statistiche: true, marketing: true });
    const negozio = page.locator(".store", { has: page.locator("a.is-shop") }).first();
    const nome = (await negozio.locator("h4").textContent()).trim();
    await clic(negozio.locator("a.is-shop"));
    await clic(negozio.locator('a[target="_blank"]:not(.is-shop)'));
    const eventi = await ga(page);
    expect(eventi.map((e) => e[1])).toEqual(["click_shop_online", "click_rivenditore"]);
    expect(eventi[1][2]).toMatchObject({ nome_negozio: nome, azione: "mappa" });
    expect((await fb(page)).map((e) => e[1])).toEqual(["ClickShop", "FindLocation"]);
    const conTelefono = page.locator(".store", { has: page.locator('a[href^="tel:"]') }).first();
    if (await conTelefono.count()) {
      await clic(conTelefono.locator('a[href^="tel:"]'));
      expect((await ga(page)).at(-1)[2]).toMatchObject({ azione: "telefono" });
    }
  });

  test("clic su WhatsApp, email e lookbook", async ({ page }) => {
    await apri(page, "/index.html", { statistiche: true, marketing: true });
    await clic(page.locator('.help a[href*="wa.me"], a.wa').first());
    await clic(page.locator('a[href^="mailto:"]').first());
    await clic(page.locator('a[href*="lookbook.monpiz.it"]').first());
    expect((await ga(page)).map((e) => e[1])).toEqual(["contatto", "contatto", "apri_lookbook"]);
    expect((await fb(page)).map((e) => e[1])).toEqual(["Contact", "Contact", "ViewContent"]);
  });

  test("senza consenso non si registra niente e i link funzionano lo stesso", async ({ page }) => {
    await apri(page, "/shop-online/", { statistiche: false, marketing: false });
    expect(await page.evaluate(() => [typeof window.gtag, typeof window.fbq])).toEqual(["undefined", "undefined"]);
    const errori = [];
    page.on("pageerror", (e) => errori.push(e.message));
    const [nuova] = await Promise.all([page.context().waitForEvent("page"), clic(page.locator(".shop a").first())]);
    expect(nuova).toBeTruthy();
    expect(errori).toEqual([]);
  });

  test("solo statistiche: Analytics sì, Meta no", async ({ page }) => {
    await apri(page, "/shop-online/", { statistiche: true, marketing: false });
    await clic(page.locator(".shop a").first());
    expect((await ga(page)).map((e) => e[1])).toEqual(["click_shop_online"]);
    expect(await page.evaluate(() => typeof window.fbq)).toBe("undefined");
  });
});
