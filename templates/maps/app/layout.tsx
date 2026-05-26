import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const outfitSans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenSubsidies — Global Grant Intelligence",
  description:
    "The open, public map of grant funders and schemes worldwide. Discover, filter and watch grant programmes — across the EU, US, Nordics, APAC and multilateral funders — sourced from the grants-sources catalog.",
  applicationName: "OpenSubsidies",
  keywords: [
    "grants",
    "public funding",
    "EU grants",
    "Horizon Europe",
    "EIC Accelerator",
    "SBIR",
    "NIH grants",
    "Innovation Norway",
    "Bpifrance",
    "open data",
    "grants catalog",
  ],
  authors: [{ name: "OpenSubsidies" }],
  openGraph: {
    title: "OpenSubsidies — Global Grant Intelligence",
    description:
      "The open, interactive map of grant funders and schemes worldwide — sourced from the grants-sources catalog.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfitSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
