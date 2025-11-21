"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    const login = localStorage.getItem("isLoggedIn");
    if (login !== "true") {
      router.replace("/login");
    }
  }, [router]);

  return <>{children}</>;
}
