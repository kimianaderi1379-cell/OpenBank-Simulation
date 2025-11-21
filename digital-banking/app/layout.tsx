import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AccountProvider } from "./context/AccountContext";

export const metadata: Metadata = {
  title: "بانک دیجیتال",
  description: "سامانه مدیریت بانک دیجیتال",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AccountProvider>
          <Navbar />
          {children}
        </AccountProvider>
      </body>
    </html>
  );
}
