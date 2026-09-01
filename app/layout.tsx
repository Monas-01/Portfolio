import type { Metadata } from "next";
import { Space_Grotesk, Inter, Roboto_Flex } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Monas Waqar — DevOps & Cloud Engineer",
  description:
    "Personal portfolio of Monas Waqar — DevOps Engineer, Cloud Engineer, and Full Stack Developer based in Lahore, Pakistan.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${robotoFlex.variable} min-h-screen flex flex-col font-sans bg-background text-foreground antialiased selection:bg-foreground selection:text-background relative`}
      >
        <Nav />
        <main className="flex-1 relative z-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}


