import type { Metadata } from "next";
import {JetBrains_Mono} from "next/font/google";
import "./globals.css";
import { NextProvider } from "./provider";
import { Toaster } from "@/components/ui/toaster";

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Workstream",
  description: "A project management SaaS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextProvider>
        <body className={`${jetBrainsMono.className}`}>
          {children}
          <Toaster />
        </body>
      </NextProvider>
    </html>
  );
}
