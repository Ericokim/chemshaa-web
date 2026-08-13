"use client";

import { useImperativeHandle, useRef, useState } from "react";
import { Input } from "@/components/ui/input";

type FieldProps = {
  id: string;
  label: string;
  variant: "boxed" | "underline";
  value: string;
  onChange: (raw: string) => void;
  error?: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  maxLength?: number;
  enterKeyHint?: React.InputHTMLAttributes<HTMLInputElement>["enterKeyHint"];
  inputRef?: React.Ref<HTMLInputElement>;
};

export default function Field({
  id,
  label,
  variant,
  value,
  onChange,
  error,
  placeholder,
  inputMode,
  autoComplete,
  maxLength,
  enterKeyHint,
  inputRef,
}: FieldProps): React.JSX.Element {
  const innerRef = useRef<HTMLInputElement | null>(null);
  const [focused, setFocused] = useState(false);
  const errorId = `${id}-error`;

  useImperativeHandle(inputRef, () => innerRef.current as HTMLInputElement, []);

  // Outlined Material-style field: the hint sits inside, then floats up onto
  // the border on focus or once a value exists (as in the Android app).
  const floated = focused || value.length > 0;

  const input =
    variant === "boxed" ? (
      <div className="relative">
        <Input
          ref={innerRef}
          id={id}
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          inputMode={inputMode}
          autoComplete={autoComplete}
          maxLength={maxLength}
          enterKeyHint={enterKeyHint}
          aria-label={label}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="w-full h-[56px] md:h-[64px] rounded-[12px] border-2 border-ink bg-transparent px-5 text-[22px] md:text-[22px] text-ink font-sans shadow-none focus-visible:ring-0 focus-visible:border-ink focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_1px_var(--color-ink)]"
        />
        {placeholder && (
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute left-5 transition-all duration-150 ${
              floated
                ? "top-0 -translate-y-1/2 bg-brand px-1.5 text-[13px]"
                : "top-1/2 -translate-y-1/2 text-[22px]"
            }`}
          >
            {placeholder}
          </span>
        )}
      </div>
    ) : (
      <Input
        ref={innerRef}
        id={id}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        maxLength={maxLength}
        enterKeyHint={enterKeyHint}
        aria-label={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="w-full max-w-[420px] mx-auto block h-[52px] border-0 border-b-[3px] border-ink rounded-none bg-transparent text-center text-[22px] md:text-[22px] tracking-wide text-ink font-sans placeholder:text-ink placeholder:opacity-100 shadow-none focus-visible:ring-0 focus-visible:border-ink focus-visible:outline-none focus-visible:shadow-[0_2px_0_0_var(--color-ink)]"
      />
    );

  return (
    <div>
      {input}
      {error && (
        <p role="alert" id={errorId} className="mt-3 text-center text-sm font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
