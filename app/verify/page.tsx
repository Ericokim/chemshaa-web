"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/Button";
import Field from "@/components/Field";
import { isValidOtp, sanitizeOtp } from "@/lib/otp";

const ERROR_MESSAGE = "Enter the 4–6 digit verification code.";

type VerifyForm = { code: string };

export default function VerifyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, setFocus } = useForm<VerifyForm>({
    defaultValues: { code: "" },
  });

  useEffect(() => {
    setFocus("code");
  }, [setFocus]);

  const onValid = () => {
    // Verification is mocked for this screening: any 4–6 digit code passes.
    setLoading(true);
    setTimeout(() => router.push("/lobby"), 700);
  };

  return (
    <main id="main" className="screen-enter min-h-dvh relative">
      <button
        type="button"
        aria-label="Back to phone number"
        onClick={() => router.push("/login")}
        className="absolute left-[clamp(16px,4vw,42px)] top-6 flex h-11 w-11 items-center justify-center text-ink cursor-pointer"
      >
        <ArrowLeft size={32} strokeWidth={1.75} aria-hidden="true" />
      </button>

      <div className="mx-auto w-full max-w-[800px] px-[21px] pt-[clamp(180px,38vh,420px)] text-center">
        <h1 className="text-[clamp(24px,3vw,34px)] font-medium tracking-[-0.025em]">
          Verify that it&apos;s you.
        </h1>
        <p className="mt-[clamp(28px,6vh,56px)] text-[clamp(16px,2vw,20px)] leading-[1.42]">
          We sent an SMS verification code to the phone number you entered.
        </p>

        <form noValidate onSubmit={handleSubmit(onValid)}>
          <div className="mx-auto mt-[clamp(64px,12vh,150px)] w-full max-w-[290px] md:max-w-[420px]">
            <Controller
              name="code"
              control={control}
              rules={{ validate: (value) => isValidOtp(value) || ERROR_MESSAGE }}
              render={({ field, fieldState }) => (
                <Field
                  id="otp"
                  label="SMS verification code"
                  variant="underline"
                  value={field.value}
                  onChange={(raw) => field.onChange(sanitizeOtp(raw))}
                  error={fieldState.error?.message}
                  placeholder="SMS Code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  enterKeyHint="done"
                  inputRef={field.ref}
                />
              )}
            />
          </div>
          <div className="mt-[clamp(48px,9vh,90px)] flex justify-center">
            <Button type="submit" disabled={loading}>
              Verify and Login
            </Button>
          </div>
        </form>
      </div>
      {loading && (
        <div
          role="status"
          aria-label="Loading"
          className="fixed inset-0 z-50 grid place-items-center bg-brand/60"
        >
          <span className="ring-loader" />
        </div>
      )}
    </main>
  );
}
