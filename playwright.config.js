// Configurazione dei test automatici (Playwright).
// I test aprono il sito con il server di sviluppo e lo provano come farebbe un visitatore,
// su un computer e su uno smartphone (iPhone 14 simulato).
//
// Browser usato: se sul Mac c'è già Chrome, Brave o Chromium, i test usano quello
// (così non serve scaricare niente, e funziona anche su macOS 12 Monterey, dove
// Playwright non può più installare i suoi browser). Altrimenti usano il Chromium di
// Playwright (da installare con "npm run test:install").
// Per scegliere un browser preciso: BROWSER_PATH="/percorso/del/browser" npm test
import { defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";

const LOCAL_BROWSERS = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
];
const executablePath = process.env.BROWSER_PATH || LOCAL_BROWSERS.find((p) => existsSync(p));
// timeout: se il browser si blocca all'avvio, il test viene ritentato invece di aspettare 3 minuti
const launchOptions = executablePath ? { executablePath, timeout: 30_000 } : {};
if (executablePath) console.log(`Browser per i test: ${executablePath}`);

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: { timeout: 7_000 },
  fullyParallel: true,
  retries: 1, // un secondo tentativo solo per i test che falliscono (es. browser lento ad avviarsi)
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:4173",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npx vite --port 4173 --strictPort",
    url: "http://localhost:4173/index.html",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 }, launchOptions },
    },
    {
      // iPhone 14 simulato (schermo, tocco, user agent) ma con il motore Chromium,
      // che funziona su tutti i Mac.
      name: "mobile",
      use: { ...devices["iPhone 14"], browserName: "chromium", launchOptions },
    },
  ],
});
