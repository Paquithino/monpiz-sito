// Controlla che i siti esterni collegati rispondano (shop dei rivenditori, Google Maps, lookbook...).
// Serve internet, quindi parte solo con `npm run test:links`.
import { test, expect } from "@playwright/test";
import { openHome } from "./helpers.js";

// siti che bloccano i controlli automatici: se non rispondono lo segnaliamo senza far fallire il test
const SOFT = ["instagram.com", "wa.me", "google.com", "support.apple.com", "support.microsoft.com"];

test.skip(!process.env.EXTERNAL, "controllo dei link esterni: avvialo con npm run test:links");
test.use({ ignoreHTTPSErrors: false });

test("tutti i link esterni rispondono", async ({ page, request }, testInfo) => {
  test.setTimeout(180_000);
  test.skip(testInfo.project.name !== "desktop", "basta controllarli una volta");
  await openHome(page);
  const urls = [...new Set(await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="https://"]')].map((a) => a.getAttribute("href").split("#")[0])))];
  const failures = [];
  for (const url of urls) {
    let status = 0;
    try {
      const res = await request.get(url, { timeout: 20_000, maxRedirects: 5, headers: { "user-agent": "Mozilla/5.0 MonPiz link check" } });
      status = res.status();
    } catch (e) { status = -1; }
    const soft = SOFT.some((h) => new URL(url).hostname.endsWith(h));
    if (status < 200 || status >= 400) {
      if (soft) testInfo.annotations.push({ type: "avviso", description: `${status} ${url}` });
      else failures.push(`${status} ${url}`);
    }
  }
  console.log(`Controllati ${urls.length} link esterni`);
  expect(failures, "link esterni che non rispondono").toEqual([]);
});
