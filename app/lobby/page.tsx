"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { EllipsisVertical } from "lucide-react";
import Header from "@/components/Header";
import CountdownBanner from "@/components/CountdownBanner";
import MoreSheet from "@/components/MoreSheet";
import { useCountdown } from "@/hooks/useCountdown";
import { clearStoredPhone, getStoredPhone } from "@/lib/storage";
import { formatPhoneDisplay } from "@/lib/phone";

// localStorage never notifies within a session; SSR snapshot is "signed out".
const subscribeNoop = () => () => {};
const getServerPhone = () => null;

export default function LobbyPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { isToday } = useCountdown();
  // /more deep-links render this same component with the sheet already open.
  const [open, setOpen] = useState(pathname === "/more");
  const storedPhone = useSyncExternalStore(
    subscribeNoop,
    getStoredPhone,
    getServerPhone,
  );
  const phone = storedPhone ? formatPhoneDisplay(storedPhone) : null;
  const kebabRef = useRef<HTMLButtonElement | null>(null);

  // Shallow URL swap keeps the lobby mounted so focus can return to the kebab.
  const openSheet = () => {
    setOpen(true);
    window.history.replaceState(null, "", "/more");
  };

  const closeSheet = () => {
    setOpen(false);
    window.history.replaceState(null, "", "/lobby");
  };

  const leaveToLogin = () => {
    clearStoredPhone();
    router.push("/login");
  };

  return (
    <main id="main" className="screen-enter min-h-dvh">
      {/* Radix (MoreSheet) hides and locks the page content itself while open. */}
      <div>
        <div className="w-full max-w-[980px] mx-auto px-[21px] md:px-8 pt-[max(48px,env(safe-area-inset-top))] md:pt-12">
          <Header
            trailing={
              <button
                ref={kebabRef}
                type="button"
                onClick={openSheet}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-label="Open More"
                className="flex h-11 w-11 min-h-11 min-w-11 items-center justify-center"
              >
                <EllipsisVertical size={26} strokeWidth={2} aria-hidden />
              </button>
            }
          />
        </div>

        <div className="w-full max-w-[880px] mx-auto px-[21px] md:px-8 pt-[clamp(64px,12vh,136px)]">
          {/* The doubled "at" is verbatim from the Android screenshot. */}
          <h1 className="text-center text-[clamp(26px,3.5vw,44px)] leading-[1.18] tracking-[-0.035em] font-bold">
            Get ready! {isToday ? "Today's" : "Tomorrow's"} live trivia show
            kicks off at
            <br />
            at 2:00 PM
          </h1>

          <section className="mt-[clamp(64px,12vh,104px)]">
            <h2 className="text-center italic font-semibold text-[clamp(18px,2vw,23px)]">
              Live Trivia Show Rules:
            </h2>
            <ol className="mt-6 list-decimal pl-[18px] md:pl-7 text-[clamp(17px,1.65vw,20px)] leading-[1.5] space-y-7">
              <li>
                Answer 10 multiple-choice questions correctly during the live
                trivia show to win cash prizes deposited directly into your
                mobile money account. Please note: the cash prize is divided
                equally among all winners.
              </li>
              <li>
                You&apos;re eliminated if you answer incorrectly, skip
                questions, or don&apos;t answer at all.
              </li>
            </ol>
            <p className="mt-10 italic text-[clamp(16px,1.55vw,19px)] leading-[1.5]">
              Eliminated? No worries&mdash;you can still earn points for correct
              answers. Stay tuned; something extra sweet is coming soon.
            </p>
            <div className="text-center">
              <a
                href="https://play.google.com/store/apps/details?id=com.chemshaa"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block underline underline-offset-4 text-[clamp(16px,1.55vw,19px)]"
              >
                Share your feedback on our app
              </a>
            </div>
          </section>
        </div>

        <div className="mt-[clamp(58px,10vh,84px)]">
          <CountdownBanner />
        </div>
      </div>

      <MoreSheet
        open={open}
        onClose={closeSheet}
        onLogOut={leaveToLogin}
        onDeleteAccount={leaveToLogin}
        phone={phone}
        returnFocusRef={kebabRef}
      />
    </main>
  );
}
