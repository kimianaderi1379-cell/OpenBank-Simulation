"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLogged(loginStatus === "true");
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-logo">بانک دیجیتال</div>

      <div className="nav-links">
        <Link className="nav-item" href="/">خانه</Link>

        {isLogged ? (
          <>
            <Link className="nav-item" href="/accounts">حساب‌ها</Link>
            <Link className="nav-item" href="/transactions">تراکنش‌ها</Link>
            <Link className="nav-item" href="/payments">پرداخت‌ها</Link>
            <Link className="nav-item" href="/help">راهنما</Link>
            <Link className="nav-item" href="/support">پشتیبانی📞</Link>

            <button
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                window.location.href = "/";
              }}
              className="nav-item logout-btn"
            >
              خروج
            </button>
          </>
        ) : (
          <>
            <Link className="nav-item" href="/login">ورود</Link>
          </>
        )}
      </div>
    </nav>
  );
}
