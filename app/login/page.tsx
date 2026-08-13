"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import Button from "@/components/Button";
import Field from "@/components/Field";
import Wordmark from "@/components/Wordmark";
import { normalizePhone } from "@/lib/phone";
import { setStoredPhone } from "@/lib/storage";

const ERROR_MESSAGE =
  "Enter a valid Kenyan mobile number, for example 0712 345 678.";

type LoginForm = { phone: string };

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: { phone: "" },
  });

  const onValid = ({ phone }: LoginForm) => {
    const normalized = normalizePhone(phone);
    if (!normalized) return;
    setStoredPhone(normalized);
    setLoading(true);
    // Brief spinner like the app's network round-trip, then on to OTP.
    setTimeout(() => router.push("/verify"), 700);
  };

  return (
    <main
      id="main"
      className="screen-enter min-h-dvh bg-brand text-ink pt-[clamp(84px,28vh,300px)] pb-12"
    >
      <div className="mx-auto w-[min(100%,660px)] px-[21px] md:px-8">
        <Wordmark className="text-[clamp(38px,10vw,60px)]" />
        <hr className="mt-5 border-0 h-px bg-black/20" />
        <h1 className="mt-5 text-[clamp(20px,2.4vw,26px)] leading-[1.32] tracking-[-0.025em] font-normal">
          Please log in using your mobile money phone number.
        </h1>
        <p className="mt-3 text-muted text-[16px]">
          Your prize will be sent to this number if you win.
        </p>
        <form noValidate onSubmit={handleSubmit(onValid)}>
          <div className="mt-[clamp(32px,5vw,48px)]">
            <Controller
              name="phone"
              control={control}
              rules={{
                validate: (value) =>
                  normalizePhone(value) !== null || ERROR_MESSAGE,
              }}
              render={({ field, fieldState }) => (
                <Field
                  id="phone"
                  label="Mobile money phone number"
                  variant="boxed"
                  value={field.value}
                  onChange={(raw) =>
                    field.onChange(raw.replace(/\D/g, "").slice(0, 12))
                  }
                  error={fieldState.error?.message}
                  placeholder="07/01 XX-XXX-XXX"
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={12}
                  enterKeyHint="next"
                  inputRef={field.ref}
                />
              )}
            />
          </div>
          <p className="mt-3 text-center text-muted text-[16px] underline underline-offset-4">
            By proceeding, you agree to our terms &amp; privacy policy.
          </p>
          <div className="mt-[clamp(46px,8vh,86px)] flex justify-center">
            <Button type="submit" disabled={loading}>
              Proceed
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
