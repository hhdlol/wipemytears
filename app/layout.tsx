import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "WipeMyTears",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
      </head>

      <body>
        {children}
      </body>
    </html>
  );
}
