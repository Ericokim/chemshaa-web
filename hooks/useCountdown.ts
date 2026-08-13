import { useSyncExternalStore } from "react";
import { formatCountdown, isShowToday, msUntilNextShow } from "@/lib/time";

export type Countdown = {
  /** "HH:MM:SS" until the next 14:00 Africa/Nairobi show. */
  display: string;
  /** True -> "Today's" headline, false -> "Tomorrow's". */
  isToday: boolean;
  /** Coarse minute-level string for screen readers; stable within a minute. */
  announcement: string;
};

// A 1s clock as an external store: the server (and the hydration render)
// snapshot is null, so prerendered HTML never disagrees with the client.
const subscribeSecond = (onTick: () => void) => {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
};
const getClientSecond = () => Math.floor(Date.now() / 1000);
const getServerSecond = () => null;

function compute(now: Date): Countdown {
  const ms = msUntilNextShow(now);
  // Derive from whole minutes remaining so the string is identical for every
  // tick within the same minute (aria-live only announces on change).
  const wholeMinutes = Math.floor(ms / 60_000);
  const hours = Math.floor(wholeMinutes / 60);
  const minutes = wholeMinutes % 60;
  const plural = (n: number, unit: string): string =>
    `${n} ${unit}${n === 1 ? "" : "s"}`;
  return {
    display: formatCountdown(ms),
    isToday: isShowToday(now),
    announcement: `${plural(hours, "hour")} ${plural(minutes, "minute")} until the next live trivia show`,
  };
}

export function useCountdown(): Countdown {
  const second = useSyncExternalStore(
    subscribeSecond,
    getClientSecond,
    getServerSecond,
  );
  if (second === null) {
    return { display: "--:--:--", isToday: true, announcement: "" };
  }
  return compute(new Date(second * 1000));
}
