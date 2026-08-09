import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { WeatherProvider } from "@/app/contexts/WeatherContext";

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
  title: "wayther. | Modern Weather App",
  description: "Real-time weather data, hourly forecast, and city autocomplete search.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${gothic.variable}`} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={true}
        >
          <WeatherProvider>{children}</WeatherProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
