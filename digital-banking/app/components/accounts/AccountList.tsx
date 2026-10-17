"use client";

import React from "react";
import type { Account } from "@/app/types";

interface Props {
  accounts: Account[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const AccountList: React.FC<Props> = ({ accounts, selectedId, onSelect }) => {
  return (
    <div className="accounts-list">
      <h2 className="accounts-list-title">حساب‌های من</h2>
      {accounts.map((acc) => (
        <button
          key={acc.id}
          className={
            "account-item" + (acc.id === selectedId ? " account-item-active" : "")
          }
          onClick={() => onSelect(acc.id)}
        >
          <div className="account-item-top">
            <span className="account-name">{acc.name}</span>
            <span className={`account-status status-${acc.status}`}>
              {acc.status === "active"
                ? "فعال"
                : acc.status === "blocked"
                ? "مسدود"
                : "بسته‌شده"}
            </span>
          </div>
          <div className="account-item-bottom">
            <span className="account-id">شماره حساب: {acc.id}</span>
            <span className="account-balance">
              موجودی: {acc.balance.toLocaleString()} {acc.currency}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default AccountList;
