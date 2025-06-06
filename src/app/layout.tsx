import "./globals.css";
import { openSans } from "@/lib/fonts";
import { metadata } from "@/lib/metadata";
import { Toaster } from "@/components/ui/feedback/sonner"

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${openSans.className}`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
