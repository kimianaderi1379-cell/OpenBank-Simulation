export type AccountStatus = "active" | "blocked" | "closed";
export type TransactionType = "deposit" | "withdrawal" | "transfer";

export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  amount: number;
  description: string;
  from?: string;
  to?: string;
  status?: "success" | "pending" | "error";
}

export interface Account {
  id: string;
  name: string;
  type: "checking" | "saving";
  currency: "USD" | "EUR" | "IRR";
  balance: number;
  status: AccountStatus;
  transactions: Transaction[];
}