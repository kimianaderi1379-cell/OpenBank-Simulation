"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

type RoleType = "user" | "admin";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [isReset, setIsReset] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState<RoleType>("user");

  const [error, setError] = useState("");

  const fakeEmail = "user@test.com";
  const fakePassword = "1234";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (mode === "login") {
      if (email === fakeEmail && password === fakePassword) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("role", role);

        router.push("/accounts");
      } else {
        setError("ایمیل یا رمز عبور اشتباه است.");
      }
    } else {
      if (!email) {
        setError("ایمیل را وارد کنید.");
        return;
      }
      if (password !== confirm) {
        setError("رمز عبور و تکرار آن یکسان نیست.");
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("role", role);

      router.push("/accounts");
    }
  };

  const handleResetSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("برای بازیابی رمز عبور، ایمیل را وارد کنید.");
      return;
    }

    alert("اگر ایمیل موجود باشد لینک بازیابی ارسال می‌شود.");
    setIsReset(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">

        
        {!isReset && (
          <div className="login-tabs">
            <span
              className={mode === "login" ? "active" : ""}
              onClick={() => {
                setMode("login");
                setError("");
              }}
            >
              ورود
            </span>

            <span
              className={mode === "register" ? "active" : ""}
              onClick={() => {
                setMode("register");
                setError("");
              }}
            >
              ثبت‌نام
            </span>
          </div>
        )}

      
        {error && <div className="login-error">{error}</div>}

        {isReset ? (
          <form onSubmit={handleResetSubmit}>
            <h3 className="login-title">بازیابی رمز عبور</h3>

            <label>ایمیل</label>
            <input
              type="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className="login-btn">
              ارسال لینک بازیابی
            </button>

            <div
              className="login-reset-back"
              onClick={() => setIsReset(false)}
            >
              بازگشت به ورود
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>ایمیل</label>
            <input
              type="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>رمز عبور</label>
            <input
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            
            {mode === "login" && (
              <div className="forgot" onClick={() => setIsReset(true)}>
                فراموشی رمز عبور؟
              </div>
            )}

           
            {mode === "register" && (
              <>
                <label>تکرار رمز عبور</label>
                <input
                  type="password"
                  className="login-input"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </>
            )}

            
            <label>نقش:</label>
            <select
              className="login-input"
              value={role}
              onChange={(e) => setRole(e.target.value as RoleType)}
            >
              <option value="user">کاربر</option>
              <option value="admin">مدیر</option>
            </select>

            <button type="submit" className="login-btn">
              {mode === "login" ? "ورود" : "ثبت‌نام"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
