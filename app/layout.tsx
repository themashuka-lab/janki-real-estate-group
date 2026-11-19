import type { Metadata } from 'next';
import './globals.css';
import { SiteChrome } from '@/components/site-chrome';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'JANKI Real Estate Group | Jaipur Homes',
    template: '%s | JANKI Real Estate Group',
  },
  description: 'Discover thoughtfully selected apartments, villas, houses and residential plots in Jaipur with JANKI Real Estate Group.',
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
