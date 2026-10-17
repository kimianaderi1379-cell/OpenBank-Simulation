"use client";

import React from "react";
import type { Account } from "@/app/types";



interface Props {
  account: Account | null;
}

const AccountDetails: React.FC<Props> = ({ account }) => {
  if (!account) {
    return (
      <div className="account-details">
        <h2>جزئیات حساب</h2>
        <p>لطفاً یک حساب را از لیست انتخاب کنید.</p>
      </div>
    );
  }

  return (
    <div className="account-details">
      <h2>جزئیات حساب</h2>

      <div className="account-summary">
        <div>
          <strong>نام حساب:</strong> {account.name}
        </div>
        <div>
          <strong>شماره حساب:</strong> {account.id}
        </div>
        <div>
          <strong>نوع حساب:</strong>{" "}
          {account.type === "checking" ? "جاری" : "پس‌انداز"}
        </div>
        <div>
          <strong>وضعیت:</strong>{" "}
          {account.status === "active"
            ? "فعال"
            : account.status === "blocked"
            ? "مسدود"
            : "بسته‌شده"}
        </div>
        <div>
          <strong>موجودی:</strong>{" "}
          {account.balance.toLocaleString()} {account.currency}
        </div>
      </div>

      <h3 className="transactions-title">تاریخچه تراکنش‌ها</h3>
      {account.transactions.length === 0 ? (
        <p>برای این حساب هنوز تراکنشی ثبت نشده است.</p>
      ) : (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>تاریخ</th>
              <th>نوع</th>
              <th>مبلغ</th>
              <th>توضیحات</th>
            </tr>
          </thead>
          <tbody>
            {account.transactions.map((trx) => (
              <tr key={trx.id}>
                <td>{trx.date}</td>
                <td>
                  {trx.type === "deposit"
                    ? "واریز"
                    : trx.type === "withdrawal"
                    ? "برداشت"
                    : "انتقال"}
                </td>
                <td>{trx.amount.toLocaleString()}</td>
                <td>{trx.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AccountDetails;
