"use client";

import React, { useState } from "react";
import type { Account } from "@/app/types";
import { useAccount } from "@/app/context/AccountContext";

interface Props {
  onCreate?: (account: Account) => void; // اختیاری شد
}

const NewAccountForm: React.FC<Props> = ({ onCreate }) => {
  const { addAccount } = useAccount();

  const [name, setName] = useState("");
  const [type, setType] = useState<"checking" | "saving">("checking");
  const [currency, setCurrency] = useState<"USD" | "EUR" | "IRR">("IRR");
  const [initialDeposit, setInitialDeposit] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = Date.now().toString();

    const newAccount: Account = {
      id,
      name: name || "حساب جدید",
      type,
      currency,
      balance: initialDeposit,
      status: "active",
      transactions: initialDeposit
        ? [
            {
              id: "init-" + id,
              date: new Date().toLocaleDateString("fa-IR"),
              type: "deposit",
              amount: initialDeposit,
              description: "واریز اولیه",
            },
          ]
        : [],
    };

    addAccount(newAccount);
    onCreate?.(newAccount);

    setName("");
    setInitialDeposit(0);
    setType("checking");
    setCurrency("IRR");
  };

  return (
    <div className="new-account">
      <h3>ایجاد حساب جدید</h3>

      <form className="new-account-form" onSubmit={handleSubmit}>
        <label>
          نام حساب:
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label>
          نوع حساب:
          <select value={type} onChange={(e) => setType(e.target.value as any)}>
            <option value="checking">جاری</option>
            <option value="saving">پس‌انداز</option>
          </select>
        </label>

        <label>
          ارز:
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as any)}
          >
            <option value="IRR">ریال</option>
            <option value="USD">دلار</option>
            <option value="EUR">یورو</option>
          </select>
        </label>

        <label>
          واریز اولیه:
          <input
            type="number"
            min={0}
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(Number(e.target.value))}
          />
        </label>

        <button className="new-account-btn">ایجاد حساب</button>
      </form>
    </div>
  );
};

export default NewAccountForm;
