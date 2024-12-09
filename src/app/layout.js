import './globals.css';
import localFont from 'next/font/local';
import { AuthProvider } from '@/lib/context/authContext';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Baby Wonders',
  description: 'E-Commerce',
};

const poppins = localFont({
  src: './font/Poppins.ttf',
});

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
