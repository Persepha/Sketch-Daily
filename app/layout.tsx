import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { TailwindSizeIndicator } from "@/components/tailwind-size-indicator";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daily Sketch",
  description: "Daily Sketch",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en">
    //   <body className={inter.className}>{children}</body>
    // </html>
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <main className="flex h-screen flex-col">
            {/*<SiteHeader />*/}
            <div className="flex-1">{children}</div>
            {/*<TailwindSizeIndicator />*/}
            <ThemeModeToggle />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
