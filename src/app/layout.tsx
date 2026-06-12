import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'SweetDelights - Handcrafted Cakes & Pastries',
    template: '%s | SweetDelights',
  },
  description:
    'Indulge in our handcrafted cakes, cupcakes, and pastries made with love and the finest ingredients. Perfect for birthdays, weddings, and every sweet moment.',
  keywords: [
    'bakery',
    'cakes',
    'cupcakes',
    'pastries',
    'wedding cakes',
    'birthday cakes',
    'custom cakes',
    'desserts',
    'sweet treats',
  ],
  openGraph: {
    title: 'SweetDelights - Handcrafted Cakes & Pastries',
    description:
      'Indulge in our handcrafted cakes, cupcakes, and pastries made with love and the finest ingredients.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
