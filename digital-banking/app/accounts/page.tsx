"use client";

import { useEffect, useState } from "react";
import AccountList from "../components/accounts/AccountList";
import AccountDetails from "../components/accounts/AccountDetails";
import NewAccountForm from "../components/accounts/NewAccountForm";

import type { Account } from "@/app/types";

const fallbackAccounts: Account[] = [
  {
    id: "11234567890",
    name: "حساب جاری اصلی",
    type: "checking",
    currency: "IRR",
    balance: 10000000,
    status: "active",
    transactions: [
      {
        id: "t1",
        date: "1402/08/01",
        type: "deposit",
        amount: 5000000,
        description: "واریز حقوق",
      },
      {
        id: "t2",
        date: "1402/08/05",
        type: "withdrawal",
        amount: 1000000,
        description: "خرید فروشگاه",
      },
    ],
  },
  {
    id: "22345678901",
    name: "حساب پس‌انداز فعال",
    type: "saving",
    currency: "IRR",
    balance: 25000000,
    status: "active",
    transactions: [
      {
        id: "t3",
        date: "1402/07/20",
        type: "deposit",
        amount: 20000000,
        description: "انتقال از حساب جاری",
      },
    ],
  },
];

export default function AccountsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState<Account[]>(fallbackAccounts);
  const [selectedId, setSelectedId] = useState<string | null>(fallbackAccounts[0]?.id ?? null);

  
  useEffect(() => {
    const isLogged = localStorage.getItem("isLoggedIn");

    if (isLogged !== "true") {
      window.location.href = "/login";
      return;
    }

   
    const saved = localStorage.getItem("accounts");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAccounts(parsed);
        setSelectedId(parsed[0]?.id ?? null);
      } catch {}
    }

    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  const selectedAccount =
    accounts.find((acc) => acc.id === selectedId) ?? null;


  const handleCreateAccount = (newAccount: Account) => {
    const updated = [...accounts, newAccount];
    setAccounts(updated);
    setSelectedId(newAccount.id);

    localStorage.setItem("accounts", JSON.stringify(updated));
  };

  return (
    <div className="accounts-page">
      <div className="accounts-container">

        <div className="accounts-sidebar">
          <div className="card">
            <AccountList
              accounts={accounts}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          <div className="card">
            <NewAccountForm onCreate={handleCreateAccount} />
          </div>
        </div>

        <div className="accounts-main">
          <div className="card">
            <AccountDetails account={selectedAccount} />
          </div>
        </div>

      </div>
    </div>
  );
}
