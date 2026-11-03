
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Groww AI Discovery Engine',
  description: 'Analyzing first-time investor behavior at scale',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-premium-black text-ivory-text`}>
        {children}
      </body>
    </html>
  );
}
