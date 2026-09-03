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
