import Head from "next/head";
import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import { CursorProvider } from './components/CustomCursor/CursorContext';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://carsonsecrest.me'),
  title: "Carson Secrest",
  description: "Software developer studying Computer Science at Oregon State. Projects, experience, and work in web, mobile, and AI.",
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Carson Secrest',
    title: 'Carson Secrest',
    description: 'Software developer · Web, mobile & AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carson Secrest',
    description: 'Software developer · Web, mobile & AI',
  },
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
        <Analytics />
      </body>
    </html>
  );
}
