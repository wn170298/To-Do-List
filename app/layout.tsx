import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "To-Do List App",
  description: "A simple and elegant to-do list application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}
