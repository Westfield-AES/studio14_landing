import { expect, test } from "@playwright/test";

const studioAppUrl = process.env.NEXT_PUBLIC_STUDIO_APP_URL ?? "https://app.studio14.example";
const expectedCatalogueUrl = `${studioAppUrl.replace(/\/+$/, "")}/studio`;

test("every studio call to action enters the PWA catalogue", async ({ page }) => {
  await page.goto("/");

  const studioLinks = page.locator(`a[href="${expectedCatalogueUrl}"]`);
  await expect(studioLinks).toHaveCount(9);
  await expect(page.getByRole("link", { name: "Open the studio" })).toHaveAttribute(
    "href",
    expectedCatalogueUrl,
  );
  await expect(page.getByRole("link", { name: "Find your shoot" }).first()).toHaveAttribute(
    "href",
    expectedCatalogueUrl,
  );
});
