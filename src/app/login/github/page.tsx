"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function Page() {
  const searchParams = useSearchParams();
  const code = searchParams!.get("code");

  useEffect(() => {
    if (code) {
      window.location.href = `/api/auth/github?code=${code}`;
    }
  }, [code]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}
