import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AppShell } from "@/presentation/shared/components/layout/app-shell";
import { Providers } from "@/presentation/shared/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Pedro — Backend Developer",
    template: "%s — pedrolcs.dev",
  },
  description:
    "Pedro’s backend development portfolio. Explore projects, APIs, and systems through a local HTTP client experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
