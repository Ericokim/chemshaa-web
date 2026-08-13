"use client";

import { useCountdown } from "@/hooks/useCountdown";

export default function CountdownBanner() {
  const { display, announcement } = useCountdown();

  return (
    <section
      aria-labelledby="countdown-label"
      className="w-screen ml-[calc(50%-50vw)] bg-black text-white text-center py-7"
    >
      <p id="countdown-label" className="text-[clamp(16px,1.8vw,20px)]">
        The next live trivia show begins in
      </p>
      <p
        role="timer"
        aria-live="off"
        className="countdown-breathe mt-2 text-[clamp(30px,3.5vw,44px)] leading-none tabular-nums tracking-[0.015em]"
      >
        {display}
      </p>
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </section>
  );
}
