import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChProviders } from "@/components/context/ChakraProvider";
import { AppProvider } from "@/components/context/AppContext";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LotX",
  description: "Experience the thrill of playing the lottery with our secured app. Check your numbers, claim your prizes, and stay up-to-date with the latest jackpot information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        
        <AppProvider>
          <ChProviders>
            <NavBar />
            {children}
            <div id="heroPattern">
            <Footer />
            </div>
            </ChProviders>
          </AppProvider>
      </body>
    </html>
  );
}
