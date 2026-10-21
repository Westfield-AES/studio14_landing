import { expect, test } from "@playwright/test";

test("renders the Studio14 value proposition", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Leave iconic");
  await expect(page.getByRole("link", { name: "Find your shoot" }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Choose your moment." })).toBeVisible();
});

test("keeps the complete studio story readable at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Your photo is here for one reason: your portraits." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Your studio is ready." })).toBeVisible();

  const sizes = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(sizes.content).toBeLessThanOrEqual(sizes.viewport);
});

for (const width of [320, 390, 430, 620]) {
  test(`keeps the mobile story focused and portraits curved at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 932 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await expect(page.locator(".privacy-art")).toBeHidden();
    await expect(page.locator(".shoot-story")).toBeHidden();
    await expect(page.locator(".marquee")).toBeHidden();
    await expect(page.locator(".step-icon:visible")).toHaveCount(0);
    await expect(page.locator(".collection-card:visible")).toHaveCount(3);
    await expect(page.locator(".privacy-copy")).toContainText("within 24 hours");
    await expect(page.locator(".price-card:visible")).toHaveCount(2);

    const framing = await page.evaluate(() => {
      const frames = [...document.querySelectorAll(".hero-frame")].map((frame) => frame.getBoundingClientRect());
      const portraits = [...document.querySelectorAll<HTMLImageElement>(".collection-image-wrap img")];
      return {
        topEdges: frames.map((frame) => frame.top),
        insideViewport: frames.every((frame) => frame.left >= 0 && frame.right <= innerWidth),
        portraitPositions: portraits.map((portrait) => getComputedStyle(portrait).objectPosition),
        signaturePanels: portraits[0].getBoundingClientRect().width / portraits[0].parentElement!.getBoundingClientRect().width,
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    expect(framing.topEdges[1]).toBeLessThan(framing.topEdges[0]);
    expect(framing.topEdges[1]).toBeLessThan(framing.topEdges[2]);
    expect(framing.insideViewport).toBe(true);
    expect(framing.portraitPositions).toEqual(["0% 0%", "50% 0%", "50% 0%"]);
    expect(framing.signaturePanels).toBeCloseTo(3, 2);
    expect(framing.overflow).toBe(false);
  });
}

test("mobile content and FAQ stay usable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 430, height: 932 } });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".privacy-copy")).toBeVisible();
  const disclosure = page.locator("summary").filter({ hasText: "How are the portraits created?" });
  await disclosure.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText(/Studio14 uses automated image-generation technology/)).toBeVisible();
  await context.close();
});

test("keeps the full desktop presentation above the mobile breakpoint", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [621, 900, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator(".privacy-art")).toBeVisible();
    await expect(page.locator(".shoot-story")).toBeVisible();
    await expect(page.locator(".marquee")).toBeVisible();
    await expect(page.locator(".step-icon:visible")).toHaveCount(3);
  }
});
