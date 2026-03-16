import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BaseYield | Programmable Digital Money",
  description:
    "Prototype Layer-3 product on Base: programmable digital money and digital yield built on STRC digital credit."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
