import Head from "next/head";
import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "./sections/CustomCursor/CustomCursor";

const inter = Inter({ subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ['latin'], display: 'swap', });

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
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
