import { expect, test, type Page } from "@playwright/test";

const track = { title: "Test Track", artist: "Test Artist", album: "Album", isPlaying: true, url: "https://open.spotify.com/track/test" };
const mockSpotify = (page: Page, body: object) =>
  page.route("**/api/now-playing", (route) => route.fulfill({ json: body }));

// Sparks remove themselves, so count every one that is ever added.
const sparksAdded = (page: Page, selector = "svg.spark") =>
  page.evaluate((sel) => (window as unknown as { sparks: Element[] }).sparks.filter((el) => el.matches(sel)).length, selector);

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const w = window as unknown as { sparks: Element[] };
    w.sparks = [];
    new MutationObserver((records) => records.forEach((r) => r.addedNodes.forEach((n) => {
      if (n instanceof Element && n.matches(".spark")) w.sparks.push(n);
    }))).observe(document, { childList: true, subtree: true });
  });
  await mockSpotify(page, { track: null });
});

test.describe("navigation", () => {
  test("links reach each page and mark the current one", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "main navigation" });
    for (const name of ["projects", "about", "gallery"]) {
      await nav.getByRole("link", { name }).click();
      await expect(page).toHaveURL(`/${name}`);
      await expect(page.getByRole("heading", { level: 1, name })).toBeVisible();
      await expect(nav.getByRole("link", { name })).toHaveAttribute("aria-current", "page");
    }
    await page.getByRole("link", { name: /home$/ }).click();
    await expect(page).toHaveURL("/");
  });

  test("mobile menu opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const about = page.getByRole("link", { name: "about" });
    await expect(about).toBeHidden();
    await page.getByRole("button", { name: "menu" }).click();
    await expect(about).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(about).toBeHidden();
  });

  test("/contact redirects to the footer", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveURL("/#contact");
    await expect(page.locator("#contact").getByRole("link", { name: "jgdcruz1179@gmail.com" })).toBeVisible();
  });

  test("unknown routes show the overgrown 404", async ({ page }) => {
    const response = await page.goto("/this-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByText("nothing’s lived here in a while.")).toBeVisible();
    await page.getByRole("link", { name: "← head home" }).click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("home", () => {
  test("work tiles link to their project entry", async ({ page }) => {
    await page.goto("/");
    const tiles = page.locator(".project-tile");
    await expect(tiles).not.toHaveCount(0);
    const href = await tiles.first().getAttribute("href");
    await tiles.first().click();
    await expect(page).toHaveURL(href!);
    await expect(page.locator(`article${href!.slice("/projects".length)}`)).toBeInViewport();
  });

  test("otter hands out every fact once, then says it's done", async ({ page }) => {
    await page.goto("/");
    const otter = page.getByRole("button", { name: /poke the otter/ });
    const seen = new Set<string>();
    for (let i = 1; i <= 8; i++) {
      await otter.click();
      await expect(page.locator(".pond-count")).toHaveText(`${i}/8`);
      seen.add((await page.locator(".pond [role=status]").textContent())!);
    }
    expect(seen.size).toBe(8);
    await otter.click();
    await expect(page.locator(".pond [role=status]")).toHaveText("that's everything. go outside :)");
    await expect(page.locator(".pond-count")).toHaveText("8/8");
  });

  test("otter progress survives a reload", async ({ page }) => {
    await page.goto("/");
    const otter = page.getByRole("button", { name: /poke the otter/ });
    await otter.click();
    await otter.click();
    await page.reload();
    await expect(page.locator(".pond-count")).toHaveText("2/8");
  });

  test("otter still works when storage is blocked", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, "localStorage", { get() { throw new Error("blocked"); } });
    });
    await page.goto("/");
    await page.getByRole("button", { name: /poke the otter/ }).click();
    await expect(page.locator(".pond-count")).toHaveText("1/8");
  });

  test("earbud player shows the current track", async ({ page }) => {
    await page.unrouteAll();
    await mockSpotify(page, { track });
    await page.goto("/");
    const label = page.getByRole("link", { name: /now playing: Test Track by Test Artist/ });
    await expect(label).toHaveAttribute("href", track.url);
    await expect(page.locator(".player .note")).toHaveCount(2);
  });

  test("earbud player is quiet when nothing plays", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".player")).toContainText("quiet for now");
    await expect(page.locator(".player .note")).toHaveCount(0);
  });
});

test.describe("ambient motion", () => {
  test("pointer clicks spark, keyboard clicks don't", async ({ page }) => {
    await page.goto("/about");
    await page.mouse.click(600, 400);
    expect(await sparksAdded(page, "svg.spark:not(.is-gold)")).toBe(1);
    await expect(page.locator("svg.spark")).toHaveCount(0); // cleans itself up
    await page.getByRole("link", { name: "about" }).focus();
    await page.keyboard.press("Enter");
    expect(await sparksAdded(page)).toBe(1);
  });

  test("the otter gives a gold spark", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /poke the otter/ }).click();
    expect(await sparksAdded(page, "svg.spark.is-gold")).toBe(1);
  });

  test("reduced motion turns sparks and wind off", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/about");
    await page.mouse.click(600, 400);
    expect(await sparksAdded(page)).toBe(0);
    await expect(page.locator(".wind")).toBeHidden();
  });

  test("wind drifts on inner pages only", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".wind")).toHaveCount(0);
    await page.goto("/gallery");
    await expect(page.locator(".wind")).toBeAttached();
  });
});

test.describe("gallery", () => {
  test("viewer opens, pages with arrow keys, and closes", async ({ page }) => {
    await page.goto("/gallery");
    await page.getByRole("button", { name: /open photo 1/ }).click();
    const viewer = page.getByRole("dialog", { name: "photo viewer" });
    await expect(viewer).toContainText("1 / 6");
    await page.keyboard.press("ArrowRight");
    await expect(viewer).toContainText("2 / 6");
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("ArrowLeft");
    await expect(viewer).toContainText("6 / 6");
    await viewer.getByRole("button", { name: "close" }).click();
    await expect(viewer).toBeHidden();
  });
});
