import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const inter = localFont({
  src: "../public/fonts/Inter.ttf",
  display: "swap",
  variable: "--font-inter",
});

const gothic = localFont({
  src: "../public/fonts/Gothic.ttf",
  display: "swap",
  variable: "--font-gothic",
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
    <html lang="en" className={` ${inter.variable} ${gothic.variable}`}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}>{children}</body>
    </html>
  );
}
