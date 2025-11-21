"use client";

import { useState } from "react";
import "./payments.css";
import { useAccount } from "../context/AccountContext";

export default function PaymentsPage() {
  const { accounts, addTransaction } = useAccount();

  const [paymentType, setPaymentType] = useState<"transfer" | "bill" | "online">(
    "transfer"
  );

  
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [fade, setFade] = useState(false);

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    amount: "",
    billType: "water",
    billId: "",
    mobile: "",
    cardNumber: "",
    cvv2: "",
    expireDate: "",
    secondPassword: "",
  });

  const showMessage = (msg: string) => {
    setMessage(msg);
    setError("");
    setFade(true);
    setTimeout(() => setFade(false), 3000);
  };

  const showError = (msg: string) => {
    setError(msg);
    setMessage("");
    setFade(true);
    setTimeout(() => setFade(false), 3000);
  };

  const saveTransaction = (data: any) => {
    addTransaction({
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("fa-IR"),
      ...data,
    });
  };


  const handleTransfer = () => {
    if (!formData.from || !formData.to || !formData.amount) {
      showError("همه فیلدهای انتقال را تکمیل کنید.");
      return;
    }

    saveTransaction({
      type: "transfer",
      from: formData.from,
      to: formData.to,
      amount: Number(formData.amount),
      status: "success",
      description: "انتقال وجه",
    });

    showMessage("انتقال وجه با موفقیت انجام شد.");
  };

  
  
  const handleBill = () => {
    if (formData.billType === "mobile" || formData.billType === "phone") {
      if (!formData.mobile || !formData.billId) {
        showError("شماره موبایل و شناسه قبض الزامی است.");
        return;
      }
    } else {
      if (!formData.billId) {
        showError("شناسه قبض را وارد کنید.");
        return;
      }
    }

    saveTransaction({
      type: "bill",
      from: "-",
      to: "bill",
      amount: 0,
      status: "success",
      description: `پرداخت قبض ${formData.billType}`,
    });

    showMessage("پرداخت قبض با موفقیت انجام شد.");
  };

  
  const handleOnline = () => {
    if (!/^\d{16}$/.test(formData.cardNumber)) {
      showError("شماره کارت باید ۱۶ رقم باشد.");
      return;
    }
    if (!/^\d{3,4}$/.test(formData.cvv2)) {
      showError("CVV2 صحیح نیست.");
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expireDate)) {
      showError("تاریخ انقضا معتبر نیست.");
      return;
    }
    if (formData.secondPassword.length < 5) {
      showError("رمز دوم حداقل ۵ رقم است.");
      return;
    }

    saveTransaction({
      type: "online",
      from: "card",
      to: "shop",
      amount: 0,
      status: "success",
      description: "خرید اینترنتی",
    });

    showMessage("پرداخت با موفقیت انجام شد.");
  };

  return (
    <div className="payments-wrapper">
      <div className="payment-box">

        <h1>مدیریت پرداخت‌ها</h1>

        <h2>نوع پرداخت:</h2>
        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value as any)}
          className="payment-select"
        >
          <option value="transfer">انتقال وجه</option>
          <option value="bill">پرداخت قبض</option>
          <option value="online">خرید آنلاین</option>
        </select>

        {error && <div className={`alert error ${fade ? "fade" : ""}`}>{error}</div>}
        {message && <div className={`alert success ${fade ? "fade" : ""}`}>{message}</div>}

        
        {paymentType === "transfer" && (
          <div className="payment-form">
            <h3>فرم انتقال وجه</h3>

            <select
              className="payment-input"
              value={formData.from}
              onChange={(e) => setFormData({ ...formData, from: e.target.value })}
            >
              <option value="">انتخاب حساب مبدأ</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} - {acc.id}
                </option>
              ))}
            </select>

            <select
              className="payment-input"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
            >
              <option value="">انتخاب حساب مقصد</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} - {acc.id}
                </option>
              ))}
            </select>

            <input
              type="number"
              className="payment-input"
              placeholder="مبلغ"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />

            <button className="payment-btn" onClick={handleTransfer}>
              ثبت انتقال
            </button>
          </div>
        )}

       
        {paymentType === "bill" && (
          <div className="payment-form">
            <h3>پرداخت قبض</h3>

            <select
              className="payment-select"
              value={formData.billType}
              onChange={(e) => setFormData({ ...formData, billType: e.target.value })}
            >
              <option value="water">قبض آب</option>
              <option value="electricity">قبض برق</option>
              <option value="gas">قبض گاز</option>
              <option value="mobile">قبض موبایل</option>
              <option value="phone">قبض تلفن</option>
            </select>

            {(formData.billType === "water" ||
              formData.billType === "electricity" ||
              formData.billType === "gas") && (
              <input
                type="text"
                className="payment-input"
                placeholder="شناسه قبض"
                value={formData.billId}
                onChange={(e) => setFormData({ ...formData, billId: e.target.value })}
              />
            )}

            {(formData.billType === "mobile" ||
              formData.billType === "phone") && (
              <>
                <input
                  type="text"
                  className="payment-input"
                  placeholder="شماره موبایل / تلفن"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                />

                <input
                  type="text"
                  className="payment-input"
                  placeholder="شناسه قبض"
                  value={formData.billId}
                  onChange={(e) => setFormData({ ...formData, billId: e.target.value })}
                />
              </>
            )}

            <button className="payment-btn" onClick={handleBill}>
              پرداخت قبض
            </button>
          </div>
        )}

        
        {paymentType === "online" && (
          <div className="payment-form">
            <h3>خرید اینترنتی</h3>

            <input
              type="text"
              className="payment-input"
              placeholder="شماره کارت"
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
            />

            <input
              type="text"
              className="payment-input"
              placeholder="CVV2"
              value={formData.cvv2}
              onChange={(e) => setFormData({ ...formData, cvv2: e.target.value })}
            />

            <input
              type="text"
              className="payment-input"
              placeholder="تاریخ انقضا 02/05"
              value={formData.expireDate}
              onChange={(e) =>
                setFormData({ ...formData, expireDate: e.target.value })
              }
            />

            <input
              type="password"
              className="payment-input"
              placeholder="رمز دوم"
              value={formData.secondPassword}
              onChange={(e) =>
                setFormData({ ...formData, secondPassword: e.target.value })
              }
            />

            <button className="payment-btn" onClick={handleOnline}>
              پرداخت
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
