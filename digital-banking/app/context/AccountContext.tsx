"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Account, Transaction } from "@/app/types";

interface ContextType {
  accounts: Account[];
  transactions: Transaction[];
  addAccount: (acc: Account) => void;
  addTransaction: (trx: Transaction) => void;
}

const AccountContext = createContext<ContextType | null>(null);

export const AccountProvider = ({ children }: { children: React.ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const savedAccounts = localStorage.getItem("accounts");
    const savedTransactions = localStorage.getItem("transactions");

    if (savedAccounts) setAccounts(JSON.parse(savedAccounts));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
  }, []);

  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addAccount = (acc: Account) => {
    setAccounts((prev) => [...prev, acc]);
  };

  const addTransaction = (trx: Transaction) => {
    setTransactions((prev) => [...prev, trx]);
  };

  return (
    <AccountContext.Provider
      value={{ accounts, transactions, addAccount, addTransaction }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used inside AccountProvider");
  return ctx;
};
