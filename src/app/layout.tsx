"use client";

import "./globals.css";
import AppSidebar from "@/components/AppSidebar";
import AppNavbar from "@/components/AppNavbar";
import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "@/components/ui/loader";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  // Detect page change
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // loader time

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <html lang="en">
      <body className={`${outfit.className} bg-gray-50`}>
        <div className="flex">
          <div className="h-screen sticky top-0">
            <AppSidebar />
          </div>

          <div className="flex-1 flex flex-col overflow-hidden relative">
            <AppNavbar />

            {/* CONTENT AREA */}
            <main className="p-6 relative min-h-[calc(100vh-64px)]">
              {loading && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
                  <Loader />
                </div>
              )}

              {!loading && children}
            </main>
          </div>
        </div>

        {/* react-hot-toast */}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
