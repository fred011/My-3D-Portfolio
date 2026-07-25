import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = "https://ferdinandmorena.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ferdinand Morena — Full Stack Engineer",
    template: "%s — Ferdinand Morena",
  },
  description:
    "Ferdinand Mphahle Morena is a product-focused full stack engineer building high-performance, beautifully crafted digital products with the MERN stack.",
  keywords: [
    "Ferdinand Morena",
    "Full Stack Engineer",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Developer",
    "South Africa Web Developer",
  ],
  authors: [{ name: "Ferdinand Mphahle Morena" }],
  creator: "Ferdinand Mphahle Morena",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Ferdinand Morena — Full Stack Engineer",
    description:
      "Product-focused full stack engineer building high-performance, beautifully crafted digital products.",
    siteName: "Ferdinand Morena",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Ferdinand Morena" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ferdinand Morena — Full Stack Engineer",
    description:
      "Product-focused full stack engineer building high-performance, beautifully crafted digital products.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
