import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Providers, SearchProvider } from "@/utils/provider";
import { AuthProvider } from "@/context/auth-context";
import { getUserSession } from "@/lib/auth";

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"]
})

export const metadata: Metadata = {
  title: "Movie Search",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { username, initialName } = await getUserSession()

  return (
    <html lang="en">
      <body
        className={`${lato.className} antialiased text-white`}
      >
        <AuthProvider username={username} initialName={initialName}>
          <Providers>
            <SearchProvider>
              {children}
            </SearchProvider>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
