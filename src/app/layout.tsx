import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Codexa Technologies | High-End Website & Mobile App Development Agency",
  description:
    "We build unstoppable digital products. Premium website development, custom web apps, and native iOS & Android mobile applications engineered with speed, design, and code that scales.",
  keywords: [
    "Codexa Technologies",
    "Website Development India",
    "Mobile App Development",
    "Next.js Development Agency",
    "Flutter App Agency",
    "Custom Web Applications",
    "UI UX Design Studio",
    "E-commerce Website Development",
    "Bengaluru Tech Agency",
  ],
  authors: [{ name: "Codexa Technologies" }],
  creator: "Codexa Technologies",
  publisher: "Codexa Technologies",
  metadataBase: new URL("https://codexatech.in"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Codexa Technologies | Premium Website & App Development Agency",
    description:
      "We Build Digital Products That Make Brands Unstoppable. Next.js, React, Flutter, and Full-Stack Engineering for Ambitious Companies.",
    url: "https://codexatech.in",
    siteName: "Codexa Technologies",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 1200,
        alt: "Codexa Technologies - Chrome CX Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codexa Technologies | High-End Digital Products",
    description: "Premium websites and mobile apps engineered with speed, design, and code that scales.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-[#05050A] text-[#A1A1B5] min-h-screen selection:bg-[#6C4CF5] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
