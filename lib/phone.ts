import { parsePhoneNumberFromString } from "libphonenumber-js";

const COUNTRY = "KE";

/** "2547…" typed without a "+" is still an international Kenyan number. */
function toParseable(input: string): string {
  const digits = input.replace(/\D/g, "");
  return digits.startsWith("254") ? `+${digits}` : input;
}

/** E.164 ("+254XXXXXXXXX") for a valid Kenyan mobile number, else null. */
export function normalizePhone(input: string): string | null {
  if (!input.trim()) return null;
  const parsed = parsePhoneNumberFromString(toParseable(input), COUNTRY);
  if (!parsed || !parsed.isValid() || parsed.country !== COUNTRY) return null;
  // Mobile-money accounts live on mobile numbers only (07XX / 01XX ranges);
  // the min metadata build carries no type info, so guard by prefix.
  if (!/^[71]/.test(parsed.nationalNumber)) return null;
  return parsed.number;
}

/** Display grouping fixed by the design spec: "+254 713 081 296". */
export function formatPhoneDisplay(input: string): string {
  const e164 = normalizePhone(input);
  if (!e164) return "";
  const digits = e164.slice(1);
  return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`.trim();
}
