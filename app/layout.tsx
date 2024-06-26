import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import SiteHeader from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import SiteFooter from "@/components/site-footer";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Nova Blog Tech",
  description: "A blog about technology, programming, and web development.",
  applicationName: "Nova Blog Tech",
  authors: {
    url: "https://dev-rajeshkumars.vercel.app",
    name: "Rajeshkumar S",
  },
  keywords: [
    "technology",
    "programming",
    "web development",
    "blog",
    "tech",
    "code",
    "software",
    "development",
    "web",
    "design",
    "web design",
    "web development",
    "programming",
    "developer",
    "coding",
    "software development",
    "web developer",
    "web development",
    "web design",
  ],
  icons: ["./favicon.ico"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide scroll-pt-[3.5rem]">
      <head>
        <meta
          name="google-site-verification"
          content="LiVS5zSsOXXbDhqN3Jcg2WONLpCtEI1Fhvm2laimQr4"
        />
        <meta name="google-adsense-account" content="ca-pub-6894062980363896" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-dvh flex-col bg-background">
            <SiteHeader />
            {children}
            <SiteFooter />
            <Toaster />
            <Analytics />
          </div>
        </ThemeProvider>

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6894062980363896"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
