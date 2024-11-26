import './globals.css';
import { Montserrat } from 'next/font/google';

export const metadata = {
  title: 'Baby Wonders',
  description: 'E-Commerce',
};

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
