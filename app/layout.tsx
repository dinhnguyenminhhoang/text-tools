import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Text Tools Pro - Công cụ xử lý văn bản đa năng",
  description:
    "Bộ công cụ xử lý văn bản miễn phí: Đếm từ, chuyển đổi chữ hoa/thường, làm sạch văn bản, tìm thay thế, mã hóa, lorem ipsum và nhiều hơn nữa",
  keywords:
    "text tools, đếm từ, word counter, case converter, text cleaner, base64, lorem ipsum, text editor",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Text Tools Pro - Công cụ xử lý văn bản đa năng",
    description: "10+ công cụ xử lý văn bản chuyên nghiệp miễn phí",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
