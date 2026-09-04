import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import Home from "./page";

afterEach(() => cleanup());

describe("landing page", () => {
  it("communicates the core three-photo product", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Walk inas you are.Leave iconic.",
    );
    expect(screen.getByText(/fully styled three-photo studio shoot/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /shoot/i }).length).toBeGreaterThan(0);
  });

  it("sends studio calls to action to the PWA catalogue route", () => {
    render(<Home />);

    const callsToAction = [
      screen.getByRole("link", { name: /open the studio/i }),
      screen.getAllByRole("link", { name: /find your shoot/i })[0],
      screen.getByRole("link", { name: /explore all shoots/i }),
    ];

    for (const link of callsToAction) {
      const href = link.getAttribute("href");
      expect(href).not.toBeNull();
      expect(new URL(href as string).pathname).toBe("/studio");
    }
  });
});
