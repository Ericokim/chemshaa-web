"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStoredPhone } from "@/lib/storage";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace(getStoredPhone() ? "/lobby" : "/login");
  }, [router]);

  return null;
}
