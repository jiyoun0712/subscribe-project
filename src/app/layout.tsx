import type { Metadata } from "next";

//import { Noto_Sans_KR } from 'next/font/google';
import MyApp from "./app";
import { Providers } from "@/store/providers";
import "./globals.css";
import "./fonts.css";
/*
const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});
*/


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body>
        <Providers >
          <MyApp>{children}</MyApp>
        </Providers>
      </body>
    </html>
  );
}