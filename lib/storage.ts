export const PHONE_KEY = "chemshaa.phone.v1";

export function getStoredPhone(): string | null {
  try {
    return localStorage.getItem(PHONE_KEY) || null;
  } catch {
    return null;
  }
}

export function setStoredPhone(phone: string): void {
  try {
    localStorage.setItem(PHONE_KEY, phone);
  } catch {
    // Storage unavailable (e.g. private-mode Safari) — degrade silently.
  }
}

export function clearStoredPhone(): void {
  try {
    localStorage.removeItem(PHONE_KEY);
  } catch {
    // Storage unavailable — degrade silently.
  }
}
