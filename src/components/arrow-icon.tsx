export function ArrowIcon({ direction = "up-right" }: { direction?: "up-right" | "down" }) {
  return (
    <svg
      className="arrow-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={direction === "down" ? "M12 5v14m-6-6 6 6 6-6" : "M7 17 17 7M7 7h10v10"} />
    </svg>
  );
}
