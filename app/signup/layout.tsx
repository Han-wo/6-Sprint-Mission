import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "회원가입 | 판다마켓",
  description: "판다마켓 회원가입 페이지",
};

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
