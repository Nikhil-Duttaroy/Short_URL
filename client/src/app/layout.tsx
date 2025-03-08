import type { Metadata, Viewport } from "next";
import { Fira_Code, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const Fira = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shorten Url",
  description: "A web application to shorten URLs quickly and easily.",
  keywords: [
    "URL Shortener",
    "Shorten URL",
    "Link Shortener",
    "URL",
    "Short URL",
    "Nikhil Duttaroy",
  ],
  openGraph: {
    title: "Shorten Url",
    description: "A web application to shorten URLs quickly and easily.",
    type: "website",
    url: "https://isyoururlshort.netlify.app",
    siteName: "Shorten Url",
    locale: "en_IN",
  },
};

const Viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Fira.className} ${geistSans.className} ${geistMono.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
