import { addDays, intervalToDuration, set } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";

/** The show is a single Kenyan broadcast: 14:00 Africa/Nairobi, daily. */
const TZ = "Africa/Nairobi";
const SHOW_HOUR = 14;

/** Absolute instant of the next 14:00 Nairobi show. */
export function nextShowTarget(now: Date = new Date()): Date {
  const zonedNow = toZonedTime(now, TZ);
  let zonedTarget = set(zonedNow, {
    hours: SHOW_HOUR,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  if (zonedNow >= zonedTarget) {
    zonedTarget = addDays(zonedTarget, 1);
  }
  return fromZonedTime(zonedTarget, TZ);
}

export function msUntilNextShow(now: Date = new Date()): number {
  return Math.max(0, nextShowTarget(now).getTime() - now.getTime());
}

/** True before 14:00 Nairobi ("Today's" show), false after ("Tomorrow's"). */
export function isShowToday(now: Date = new Date()): boolean {
  return toZonedTime(now, TZ).getHours() < SHOW_HOUR;
}

/** "HH:MM:SS", zero-padded; negatives clamp to "00:00:00". */
export function formatCountdown(ms: number): string {
  const clamped = Math.max(0, Math.floor(ms / 1000)) * 1000;
  const {
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = intervalToDuration({ start: 0, end: clamped });
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(days * 24 + hours)}:${pad(minutes)}:${pad(seconds)}`;
}
