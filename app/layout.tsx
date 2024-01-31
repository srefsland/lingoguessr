import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/globals.css";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lingoguessr",
  description: "Language guessing game",
  icons: {
    icon: "/iconlingoguessr.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          {children}
          <Footer />
        </div>

      </body>
    </html>
  );
}
