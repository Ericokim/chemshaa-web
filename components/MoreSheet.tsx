"use client";

import {
  ArrowLeft,
  CalendarDays,
  Lightbulb,
  LogOut,
  Mail,
  Smartphone,
  Trash2,
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

type MoreSheetProps = {
  open: boolean;
  onClose: () => void;
  onLogOut: () => void;
  onDeleteAccount: () => void;
  phone: string | null;
  /** Element to return focus to on close (the kebab that opened the sheet). */
  returnFocusRef?: React.RefObject<HTMLElement | null>;
};

const ROW_CLASS = "grid grid-cols-[40px_1fr] gap-5 items-start";
const LABEL_CLASS = "text-[clamp(18px,2vw,22px)] leading-tight";
const SUB_CLASS = "text-muted mt-2 text-[16px]";
const ICON_PROPS = { size: 30, strokeWidth: 1.75, "aria-hidden": true } as const;

/**
 * The More screen as a right-side sheet. Radix (via shadcn Sheet) owns the
 * dialog semantics: focus trap, Escape, scroll lock, focus return.
 */
export default function MoreSheet({
  open,
  onClose,
  onLogOut,
  onDeleteAccount,
  phone,
  returnFocusRef,
}: MoreSheetProps) {
  return (
    <Sheet open={open} onOpenChange={(next) => !next && onClose()}>
      <SheetContent
        side="right"
        showCloseButton={false}
        aria-describedby={undefined}
        aria-modal="true"
        onCloseAutoFocus={(event) => {
          if (returnFocusRef?.current) {
            event.preventDefault();
            returnFocusRef.current.focus();
          }
        }}
        className="data-[side=right]:w-full data-[side=right]:sm:max-w-full data-[side=right]:md:max-w-[470px] border-l-0 bg-brand text-ink gap-0 overflow-y-auto shadow-[-18px_0_42px_rgba(0,0,0,0.1)]"
      >
        <div className="px-7 pt-8 pb-12">
          <button
            type="button"
            onClick={onClose}
            aria-label="Back to waiting lobby"
            className="flex h-11 w-11 items-center justify-center cursor-pointer"
          >
            <ArrowLeft {...ICON_PROPS} size={32} />
          </button>

          <SheetTitle asChild>
            <h1 className="mt-8 font-sans text-[clamp(40px,5vw,56px)] font-medium tracking-[-0.035em] text-ink">
              More
            </h1>
          </SheetTitle>

          <div className="mt-12 space-y-9">
            <div className={ROW_CLASS}>
              <Smartphone {...ICON_PROPS} />
              <div>
                <p className={LABEL_CLASS}>Phone Number</p>
                <p className={SUB_CLASS}>{phone ? phone : "Not set"}</p>
              </div>
            </div>

            <div className={ROW_CLASS}>
              <CalendarDays {...ICON_PROPS} />
              <div>
                <p className={LABEL_CLASS}>Joined On</p>
                <p className={SUB_CLASS}>8/13/2026 5:08 PM</p>
              </div>
            </div>

            <a
              href="https://play.google.com/store/apps/details?id=com.chemshaa"
              target="_blank"
              rel="noopener noreferrer"
              className={`${ROW_CLASS} min-h-11 items-center`}
            >
              <Mail {...ICON_PROPS} />
              <span className={LABEL_CLASS}>Contact Us</span>
            </a>

            <a
              href="https://x.com/chemshaa"
              target="_blank"
              rel="noopener noreferrer"
              className={`${ROW_CLASS} min-h-11 items-center`}
            >
              <Lightbulb {...ICON_PROPS} />
              <span className={LABEL_CLASS}>Follow Our Updates On 𝕏</span>
            </a>

            <button
              type="button"
              onClick={onDeleteAccount}
              className={`${ROW_CLASS} min-h-11 items-center w-full text-left text-danger cursor-pointer`}
            >
              <Trash2 {...ICON_PROPS} />
              <span className={LABEL_CLASS}>Delete Account</span>
            </button>

            <button
              type="button"
              onClick={onLogOut}
              className={`${ROW_CLASS} min-h-11 items-center w-full text-left text-danger cursor-pointer`}
            >
              <LogOut {...ICON_PROPS} />
              <span className={LABEL_CLASS}>Log Out</span>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
