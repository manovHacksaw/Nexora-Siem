import type { Metadata, Viewport } from 'next';
import TopNav from '@/components/TopNav';
import Sidebar from '@/components/Sidebar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nexora SIEM - Security Monitoring',
  description: 'AI-powered Security Information and Event Management platform',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background">
      <body className="bg-background text-foreground antialiased">
        <TopNav />
        <Sidebar />
        <main className="ml-20 pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
