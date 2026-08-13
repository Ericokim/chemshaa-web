import type { ReactNode } from "react";
import Wordmark from "@/components/Wordmark";

type HeaderProps = {
  leading?: ReactNode;
  trailing?: ReactNode;
};

export default function Header({ leading, trailing }: HeaderProps) {
  return (
    <header className="grid grid-cols-[48px_1fr_48px] items-center">
      {leading ? (
        <span className="justify-self-start">{leading}</span>
      ) : (
        <span aria-hidden="true" />
      )}
      <Wordmark className="justify-self-center text-[clamp(30px,8vw,44px)]" />
      {trailing ? (
        <span className="justify-self-end">{trailing}</span>
      ) : (
        <span aria-hidden="true" />
      )}
    </header>
  );
}
