import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "@/utils/provider";

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"]
})

export const metadata: Metadata = {
  title: "Movie Search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.className} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
