import { Inter } from "next/font/google";

import "../styles/globals.css";
import "../styles/code-js-syntax.css";

import styles from '../styles/Home.module.css';

import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <main className={styles.container}>
          <Header />

          <section className={styles.section}>
            {children}
          </section>

          <Footer />
        </main>
      </body>
    </html>
  );
}
