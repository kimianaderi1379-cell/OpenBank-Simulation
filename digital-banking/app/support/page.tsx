"use client";
import { useState } from "react";
import "./support.css"

export default function SupportPage() {
   const [message, setMessage] = useState<string>("");
   const [success, setSuccess] = useState<boolean>(false);



  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (message.trim().length > 0) {
    setSuccess(true);
    setMessage("");

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }
};
const handleCancel = () => {
  setMessage("");
};


   return (
    <div className="support-container">
      <h1 className="support-title">پشتیبانی</h1>

      <div className="support-box">
        <form onSubmit={handleSubmit}>
          <textarea
            className="support-textarea"
            placeholder="درخواست یا پیام خود را بنویسید..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <div className="support-buttons">
            <button type="submit" className="btn-submit">
              ثبت و ارسال
            </button>

            <button
              type="button"
              className="btn-cancel"
              onClick={handleCancel}
            >
              انصراف
            </button>
          </div>
        </form>

        {success && (
          <div className="alert-success">
            درخواست شما با موفقیت ثبت شد.
          </div>
        )}
      </div>

      <div className="support-links">
        <a href="tel:02112345678">📞 تماس تلفنی: ۰۲۱-۱۲۳۴۵۶۷۸</a>
        <a href="mailto:support@digitalbank.com">✉ ارسال ایمیل به پشتیبانی</a>
      </div>
    </div>
  );
}
