"use client";
import clsx from "clsx";

export default function AnimatedMenuIcon({
  active,
  setActive,
  className,
  ariaLabel,
}) {
  return (
    <button
      onClick={() => setActive(!active)}
      aria-label={ariaLabel}
      aria-pressed={active}
      tabIndex={0}
      className={`xl:hidden flex items-center justify-center cursor-pointer select-none ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        width="48"
        height="48"
        className={clsx(
          "transition-transform duration-500 ease-in-out",
          active && "rotate-90"
        )}
      >
        <g strokeWidth="8" strokeLinecap="round">
          <path
            d="M72 82.286h28.75"
            fill="var(--primary)"
            stroke="var(--foreground)"
            className={clsx(
              "origin-[36%_40%] transition-transform duration-500",
              active && "translate-x-[9px] translate-y-[1px] rotate-45"
            )}
          />
          <path
            d="M100.75 103.714l72.482-.143c.043 39.398-32.284 71.434-72.16 71.434-39.878 0-72.204-32.036-72.204-71.554"
            fill="none"
            stroke="var(--foreground)"
            className={clsx(
              "transition-all duration-500",
              active && "[stroke-dasharray:225_299] [stroke-dashoffset:-72px]",
              !active && "[stroke-dasharray:29_299]"
            )}
          />
          <path
            d="M72 125.143h28.75"
            fill="var(--primary-light)"
            stroke="var(--foreground)"
            className={clsx(
              "origin-[35%_63%] transition-transform duration-500",
              active && "translate-x-[9px] translate-y-[1px] rotate-[-45deg]"
            )}
          />
          <path
            d="M100.75 103.714l-71.908-.143c.026-39.638 32.352-71.674 72.23-71.674 39.876 0 72.203 32.036 72.203 71.554"
            fill="none"
            stroke="var(--foreground)"
            className={clsx(
              "transition-all duration-500",
              active && "[stroke-dasharray:225_299] [stroke-dashoffset:-72px]",
              !active && "[stroke-dasharray:29_299]"
            )}
          />
          <path
            d="M100.75 82.286h28.75"
            fill="var(--primary)"
            stroke="var(--foreground)"
            className={clsx(
              "origin-[61%_52%] transition-transform duration-500",
              active && "translate-x-[9px] translate-y-[1px] rotate-[-45deg]"
            )}
          />
          <path
            d="M100.75 125.143h28.75"
            fill="var(--primary-light)"
            stroke="var(--foreground)"
            className={clsx(
              "origin-[62%_52%] transition-transform duration-500",
              active && "translate-x-[9px] translate-y-[1px] rotate-45"
            )}
          />
        </g>
      </svg>
    </button>
  );
}
