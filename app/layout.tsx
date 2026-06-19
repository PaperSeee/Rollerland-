import "./globals.css";

// Passthrough root layout. The <html>/<body> are rendered by the segment
// layouts: app/[locale]/layout.tsx for the public site (locale-aware lang) and
// app/admin/layout.tsx for the admin area.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
