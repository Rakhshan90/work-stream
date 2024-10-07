import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NextProvider } from "./provider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

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
      <NextProvider>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          {children}
          <Toaster />
        </body>
      </NextProvider>
    </html>
  );
}
