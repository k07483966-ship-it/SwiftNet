import type {Metadata} from 'next';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'SwiftNet - Dashboard',
  description: 'SwiftNet - High-performance digital services and reseller platform powered by Ironclad IT',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'SwiftNet - Dashboard',
    description: 'SwiftNet - High-performance digital services and reseller platform powered by Ironclad IT',
    images: ['/logo.png'],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
