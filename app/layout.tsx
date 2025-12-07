import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "EBMC GROUP | Expertise SAP, ICT & Cybersécurité",
    template: "%s | EBMC GROUP",
  },
  description:
    "EBMC GROUP - Votre partenaire européen pour la transformation digitale. Expertise SAP S/4HANA, solutions ICT et Cybersécurité.",
  keywords: [
    "SAP",
    "S/4HANA",
    "ICT",
    "Cybersécurité",
    "Luxembourg",
    "ESN",
    "Consulting",
  ],
  authors: [{ name: "EBMC GROUP" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "EBMC GROUP",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
