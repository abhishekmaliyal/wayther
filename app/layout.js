import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const transcity = localFont({
  src: "../public/fonts/Transcity.otf",
  display: "swap",
  variable: "--font-transcity",
});

const faith = localFont({
  src: "../public/fonts/Faith.otf",
  display: "swap",
  variable: "--font-faith",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "wayther.",
  description: "here is too much raining..",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${transcity.variable} ${faith.variable}`}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
