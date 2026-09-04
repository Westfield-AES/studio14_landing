import { expect, test } from "@playwright/test";

const MAX_SCROLL_LONG_TASK_MS = 250;
const MAX_REDUCED_MOTION_ANIMATION_SECONDS = 0.001;

type MotionProbe = {
  longTasks: number[];
  observer: PerformanceObserver;
};

declare global {
  interface Window {
    __studio14MotionProbe?: MotionProbe;
  }
}

test("reduced motion keeps the full story immediately readable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator("html")).not.toHaveAttribute("data-motion", "ready");
  await expect(page.locator("[data-reveal]:not(.is-visible)")).toHaveCount(0);

  const maximumMotionSeconds = await page.locator("[data-reveal]").evaluateAll((items) =>
    Math.max(...items.map((item) => {
      const styles = getComputedStyle(item);
      const durations = [styles.animationDuration, styles.transitionDuration]
        .flatMap((value) => value.split(","))
        .map((duration) => Number.parseFloat(duration) || 0);
      return Math.max(...durations);
    })),
  );
  expect(maximumMotionSeconds).toBeLessThanOrEqual(MAX_REDUCED_MOTION_ANIMATION_SECONDS);
});

test("approved scroll motion stays responsive and does not hijack scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "ready");

  await page.evaluate(() => {
    const longTasks: number[] = [];
    const observer = new PerformanceObserver((list) => {
      longTasks.push(...list.getEntries().map((entry) => entry.duration));
    });
    observer.observe({ type: "longtask", buffered: true });
    window.__studio14MotionProbe = { longTasks, observer };
  });

  const targets = page.locator("[data-reveal]");
  for (let index = 0; index < await targets.count(); index += 1) {
    const target = targets.nth(index);
    await target.evaluate((element) => element.scrollIntoView({ block: "center" }));
    await expect(target).toHaveClass(/is-visible/);
  }

  const metrics = await page.evaluate(() => {
    const probe = window.__studio14MotionProbe;
    probe?.observer.disconnect();
    delete window.__studio14MotionProbe;
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    return {
      finalScrollY: window.scrollY,
      maximumLongTask: Math.max(0, ...(probe?.longTasks ?? [])),
      unrevealed: revealTargets.filter((target) => !target.classList.contains("is-visible")).length,
    };
  });

  expect(metrics.finalScrollY).toBeGreaterThan(0);
  expect(metrics.unrevealed).toBe(0);
  expect(metrics.maximumLongTask).toBeLessThan(MAX_SCROLL_LONG_TASK_MS);
});
