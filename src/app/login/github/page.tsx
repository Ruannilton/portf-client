"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
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
