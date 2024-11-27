import './globals.css';
import { Poppins } from 'next/font/google';
import { AuthProvider } from '@/lib/context/authContext';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Baby Wonders',
  description: 'E-Commerce',
};

const poppins = Poppins({ subsets: ['latin'], weight: '400' });

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
