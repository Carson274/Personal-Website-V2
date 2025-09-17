import Head from "next/head";
import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import { CursorProvider } from './components/CustomCursor/CursorContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carson Secrest",
  description: "Personal Website v2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <Head>
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <body className={`${inter.className} bg-light-cream`}>
        <CursorProvider>
          {children}
          <CustomCursor />
        </CursorProvider>
      </body>
    </html>
  );
}
