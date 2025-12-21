import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Typing Speed Test",
  description: "Type as fast as you can in 60 seconds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="flex flex-col max-w-7xl mx-auto p-4 sm:p-6">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
