import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("landing page", () => {
  it("communicates the core three-photo product", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Walk inas you are.Leave iconic.",
    );
    expect(screen.getByText(/fully styled three-photo studio shoot/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /shoot/i }).length).toBeGreaterThan(0);
  });
});
