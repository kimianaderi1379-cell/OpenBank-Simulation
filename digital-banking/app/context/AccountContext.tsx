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


const initialAccounts: Account[] = [
  { id: "1234567890", name: "حساب جاری اصلی", balance: 50000000, type: "checking" },
  { id: "9876543210", name: "حساب پس‌انداز", balance: 120000000, type: "savings" },
] as any; 

const initialTransactions: Transaction[] = [
  {
    id: "trx1",
    from: "1234567890",
    to: "9876543210",
    amount: 5000000,
    type: "transfer",
    status: "success",
    date: "1403/07/15",
  },
  {
    id: "trx2",
    from: "9876543210",
    to: "",
    amount: 2000000,
    type: "withdraw",
    status: "success",
    date: "1403/07/20",
  },
  {
    id: "trx3",
    from: "1234567890",
    to: "",
    amount: 10000000,
    type: "deposit",
    status: "success",
    date: "1403/07/25",
  },
] as any;

export const AccountProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  useEffect(() => {
    const savedAccounts = localStorage.getItem("accounts");
    const savedTransactions = localStorage.getItem("transactions");

    
    if (savedAccounts && JSON.parse(savedAccounts).length > 0) {
      setAccounts(JSON.parse(savedAccounts));
    }
    if (savedTransactions && JSON.parse(savedTransactions).length > 0) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  useEffect(() => {

    if (accounts.length > 0) {
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }
  }, [accounts]);

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
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