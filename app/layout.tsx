import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ModalRenderer from "./_components/ModalRenderer";
import ToastRenderer from "./_components/ToastRenderer";
import BottomSheetRenderer from "./_components/BottomSheetRenderer";
import GuestModeHandler from "./_components/GuestModeHandler";
// import WebViewHandler from "./_components/WebViewHandler";

const customFont = localFont({
  src: "../public/fonts/SUIT-Variable.woff2",
  display: "swap",
  variable: "--font-suit-variable",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_FRONTEND_BASE_URL ?? "https://localhost:3000",
  ),
  title: "모티모 | 그룹 기반 목표 관리 서비스",
  description: "그룹 매칭을 통해 목표를 관리해요!",
  keywords: ["목표", "그룹", "투두", "업무", "모티모"],
  openGraph: {
    url: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL ?? "https://localhost:3000",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${customFont.className} w-full h-full`}>
      <head>
        {/* <link
          rel="preload"
          href="/fonts/SUIT-Variable.woff2"
          as="font"
          type="font/woff2" // 폰트 파일 형식에 맞게 (woff, ttf 등)
          crossOrigin="anonymous" // 일반적으로 폰트에는 추가하는 것이 좋음
        /> */}
      </head>
      <body
        className={`${customFont.variable} antialiased bg-background-alternative`}
      >
        <GuestModeHandler />
        {/* <WebViewHandler /> */}
        <div className="w-[360px] mx-auto min-h-screen bg-background-normal">
          {/* {process.env.NODE_ENV === "development" && <MSWComponent />} */}
          <ModalRenderer />
          <ToastRenderer />
          <BottomSheetRenderer />
          {children}
        </div>
      </body>
    </html>
  );
}
