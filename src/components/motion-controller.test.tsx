import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { MotionController } from "./motion-controller";

function useMotionPreference(matches: boolean) {
  vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({
    addEventListener: vi.fn(),
    matches,
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
    removeEventListener: vi.fn(),
  }));
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  delete document.documentElement.dataset.motion;
  document.documentElement.removeAttribute("style");
  document.body.className = "";
});

describe("MotionController", () => {
  it("reveals every item immediately when reduced motion is requested", () => {
    useMotionPreference(true);

    const { container } = render(
      <>
        <MotionController />
        <div data-reveal>First frame</div>
        <div data-reveal>Second frame</div>
      </>,
    );

    expect(document.documentElement).not.toHaveAttribute("data-motion");
    for (const item of container.querySelectorAll("[data-reveal]")) {
      expect(item).toHaveClass("is-visible");
    }
  });

  it("promotes observed items and removes motion state on cleanup", () => {
    useMotionPreference(false);
    let callback: IntersectionObserverCallback | undefined;
    const disconnect = vi.fn();

    class TestIntersectionObserver {
      constructor(next: IntersectionObserverCallback) {
        callback = next;
      }

      disconnect = disconnect;
      observe = vi.fn();
      unobserve = vi.fn();
    }

    vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((next) => {
      next(0);
      return 1;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => undefined);

    const { container, unmount } = render(
      <>
        <MotionController />
        <div data-reveal>Observed frame</div>
      </>,
    );
    const item = container.querySelector<HTMLElement>("[data-reveal]");
    expect(item).not.toBeNull();
    expect(document.documentElement).toHaveAttribute("data-motion", "ready");

    callback?.([
      { isIntersecting: true, target: item } as unknown as IntersectionObserverEntry,
    ], {} as IntersectionObserver);
    expect(item).toHaveClass("is-visible");

    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(document.documentElement).not.toHaveAttribute("data-motion");
  });
});
