type WordmarkProps = {
  className?: string;
};

export default function Wordmark({ className }: WordmarkProps) {
  return (
    <span
      className={`font-brand font-bold tracking-[-0.065em] leading-[0.92] text-ink${
        className ? ` ${className}` : ""
      }`}
    >
      ChemShaa
    </span>
  );
}
