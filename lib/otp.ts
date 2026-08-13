const MAX_OTP_LENGTH = 6;

/** Strip non-digits from raw input and cap at 6 digits. */
export function sanitizeOtp(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, MAX_OTP_LENGTH);
}

/** True iff the given string is exactly 4, 5, or 6 digits. */
export function isValidOtp(value: string): boolean {
  return /^\d{4,6}$/.test(value);
}
