import type { ReactNode } from "react";
import { Button as UIButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonProps = {
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
};

/** The single elevated white primary button from the Android screens. */
export default function Button({
  type = "button",
  onClick,
  disabled,
  children,
  className,
}: ButtonProps) {
  return (
    <UIButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-14 w-[min(60%,320px)] rounded-xl bg-white text-ink text-[18px] font-sans font-normal shadow-[0_12px_20px_rgba(0,0,0,0.16)] transition-[transform,box-shadow,background-color] duration-150 ease-out hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_16px_24px_rgba(0,0,0,0.2)] active:translate-y-px cursor-pointer",
        className,
      )}
    >
      {children}
    </UIButton>
  );
}
