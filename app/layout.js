import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme/theme-provider";

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
    <html lang="en" className={` ${inter.variable} ${gothic.variable}`} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased lg:overflow-hidden overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
