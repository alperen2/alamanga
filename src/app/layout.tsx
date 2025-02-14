import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Manga Reader",
  description: "Your favorite manga reading platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">MangaReader</Link>
            <div className="space-x-4">
              <Link href="/" className="hover:text-gray-300">Home</Link>
              <Link href="/categories" className="hover:text-gray-300">Categories</Link>
              <Link href="/favorites" className="hover:text-gray-300">Favorites</Link>
            </div>
          </div>
        </nav>
        
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="bg-gray-800 text-white p-8 mt-auto">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">MangaReader</h3>
                <p className="text-gray-300">
                  Your favorite manga reading platform. Read the latest manga, manhwa, and manhua online.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Legal Information</h3>
                <p className="text-gray-300">
                  All content on this website is provided for entertainment purposes only.
                  All manga, manhwa, and manhua properties are © their respective owners.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-300">
              © {new Date().getFullYear()} MangaReader. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
