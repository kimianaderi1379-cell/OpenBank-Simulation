import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="main-section">

        <div className="main-text">
          <h1 className="main-title">به سامانه مدیریت بانک دیجیتال خوش آمدید</h1>
          <p className="main-subtitle">
            مدیریت حساب‌ها، پرداخت‌ها و تراکنش‌ها  
            <br />
            به صورت سریع، ساده و کاملاً آنلاین
          </p>
          <Link href="/login" className="main-btn">ورود</Link>
        </div>
            
        
          <div className="image-container">
  <div className="image-inner">
    <div className="main-image">
      <img src="/digitalBanking.png" alt="front" />
    </div>

    <div className="image-back">
      <img src="/digitbank.png" alt="back"/>
    </div>
  </div>
</div>

      </section>
    </>
  );
}
