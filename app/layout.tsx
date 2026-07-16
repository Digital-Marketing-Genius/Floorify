import type { Metadata } from "next";
import "./globals.css";
import { ChatWidget } from "./interactive-components";

export const metadata: Metadata = {
  metadataBase: new URL("https://floorifycanada.ca"),
  title: { default: "Floorify Canada | Flooring Store & Installation", template: "%s | Floorify Canada" },
  description: "Flooring products, expert guidance and professional installation for Calgary, Chestermere and surrounding communities.",
  openGraph: { title: "Floorify Canada", description: "Beautiful floors. Expertly installed.", type: "website", locale: "en_CA", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Floorify Canada — Beautiful floors. Expertly installed." }] },
  twitter: { card: "summary_large_image", title: "Floorify Canada", description: "Beautiful floors. Expertly installed.", images: ["/og.png"] },
  icons: { icon: "/floorify-icon-512.png", shortcut: "/floorify-icon-512.png", apple: "/floorify-icon-512.png" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<ChatWidget /></body></html>;
}
