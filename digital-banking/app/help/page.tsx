import "./help.css"

export default function HelpPage(){
    return(
     <div className="help-wrapper">
        <h1 className="help-title">راهنمای استفاده از بانک دیجیتال</h1>

        <div className="help-grid">
        <div className="help-box">
          <h2>مدیریت حساب‌ها</h2>
          <p>
            در این بخش می‌توانید حساب‌های خود را مشاهده کنید، حساب جدید بسازید
            و جزئیات هر حساب مانند موجودی و تاریخچه را ببینید.
          </p>
        </div>

        <div className="help-box">
          <h2>تراکنش‌ها</h2>
          <p>
            این قسمت برای مشاهده، ثبت و مدیریت تراکنش‌هاست. انتقال وجه، برداشت
            و واریز در این بخش انجام می‌شود.
          </p>
        </div>

        <div className="help-box help-center-box">
          <h2>پرداخت‌ها</h2>
          <p>
            پرداخت قبوض، انتقال وجه و خریدهای آنلاین از این بخش قابل انجام است.
          </p>
        </div>
      </div>
    </div>  
    );
}