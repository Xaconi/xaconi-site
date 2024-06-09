import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../styles/globals.css";
import "../styles/code-js-syntax.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
