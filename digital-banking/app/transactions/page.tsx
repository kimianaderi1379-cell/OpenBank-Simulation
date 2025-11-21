"use client";

import { useAccount } from "@/app/context/AccountContext";
import { useEffect, useState } from "react";
import type { Account } from "@/app/types";
import "./transactions.css";

type Transaction = {
  id: string;
  from: string;
  to: string;
  amount: number;
  type: "transfer" | "deposit" | "withdraw";
  status: "success" | "pending" | "error";
  date: string;
};

export default function TransactionsPage() {
  const { accounts, transactions, addTransaction } = useAccount();
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    amount: "",
    type: "transfer" as Transaction["type"],
  });

  useEffect(() => {
    const log = localStorage.getItem("isLoggedIn");
    if (log !== "true") {
      window.location.href = "/login";
      return;
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTrx: Transaction = {
      id: Date.now().toString(),
      from: formData.from,
      to: formData.type === "withdraw" ? "" : formData.to,
      amount: Number(formData.amount),
      type: formData.type,
      status: "success",
      date: new Date().toLocaleDateString("fa-IR"),
    };

    addTransaction(newTrx);

    setFormData({
      from: "",
      to: "",
      amount: "",
      type: "transfer",
    });
  };

  return (
    <div className="transactions-container">
      <h1 className="page-title">مدیریت تراکنش‌ها</h1>

      <div className="history-box">
        <h2>تاریخچه تراکنش‌ها</h2>

        <table>
          <thead>
            <tr>
              <th>مبدأ</th>
              <th>مقصد</th>
              <th>مبلغ</th>
              <th>نوع</th>
              <th>وضعیت</th>
              <th>تاریخ</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((trx) => (
              <tr key={trx.id}>
                <td>{trx.from}</td>
                <td>{trx.to || "-"}</td>
                <td>{trx.amount.toLocaleString()} ریال</td>

                <td>
                  {trx.type === "transfer"
                    ? "انتقال"
                    : trx.type === "deposit"
                    ? "واریز"
                    : "برداشت"}
                </td>

                <td>
                  <span className={`status ${trx.status}`}>
                    {trx.status === "success" && "موفق"}
                    {trx.status === "pending" && "در حال پردازش"}
                    {trx.status === "error" && "خطا"}
                  </span>
                </td>

                <td>{trx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="create-box">
        <h2>ایجاد تراکنش جدید</h2>

        <form onSubmit={handleSubmit}>
          <select
            value={formData.from}
            onChange={(e) =>
              setFormData({ ...formData, from: e.target.value })
            }
            required
          >
            <option value="">انتخاب حساب مبدأ</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name} – {acc.id}
              </option>
            ))}
          </select>

          <select
            value={formData.to}
            onChange={(e) =>
              setFormData({ ...formData, to: e.target.value })
            }
            disabled={formData.type !== "transfer"}
            required={formData.type === "transfer"}
          >
            <option value="">انتخاب حساب مقصد</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name} – {acc.id}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="مبلغ"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            required
          />

          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as Transaction["type"],
              })
            }
          >
            <option value="transfer">انتقال وجه</option>
            <option value="deposit">واریز</option>
            <option value="withdraw">برداشت</option>
          </select>

          <button className="submit-btn">ثبت تراکنش</button>
        </form>
      </div>
    </div>
  );
}
