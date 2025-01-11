'use client';

import { Menu, CircleUserRound, ShoppingCart, Search } from 'lucide-react';
import { useAuth } from '@/lib/context/authContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getCart } from '@/lib/api/cart';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const countCartItems = async () => {
    try {
      const cart = await getCart();
      setCartCount(cart.data.cart_items.length);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      countCartItems();
    }
  }, [isAuthenticated]);

  return (
    <div className='navbar bg-neutral sticky top-0 z-50'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <Menu />
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
          >
            <li>
              <Link href={'/'}>Mom's</Link>
            </li>
            <li>
              <Link href={'/'}>Baby's</Link>
            </li>
            <li>
              <Link href={'/'}>Equipment</Link>
            </li>
          </ul>
        </div>
        <Link href={'/'} role='button' className='btn btn-ghost text-xl'>
          Baby Wonders
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1 font-semibold text-lg'>
          <li>
            <Link href={'/'}>Mom's</Link>
          </li>
          <li>
            <Link href={'/'}>Baby's</Link>
          </li>
          <li>
            <Link href={'/'}>Equipment</Link>
          </li>
        </ul>
      </div>
      <div className='navbar-end'>
        <button className='btn btn-circle btn-ghost'>
          <Search />
        </button>
        <div className='dropdown dropdown-end'>
          <Link
            href={'/cart'}
            role='button'
            className='btn btn-ghost btn-circle'
          >
            <div className='indicator'>
              <ShoppingCart />
              {cartCount > 0 && (
                <span className='badge badge-sm indicator-item'>
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>
        <div className='dropdown dropdown-end'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle'>
            <CircleUserRound size={32} strokeWidth={1.5} />
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
          >
            {!isAuthenticated ? (
              <div>
                <li>
                  <Link href={'/auth/login'}>Login</Link>
                </li>
                <li>
                  <Link href={'/auth/register'}>Register</Link>
                </li>
              </div>
            ) : (
              <div>
                <li>
                  <Link href={'/profile'}>Profile</Link>
                </li>
                <li>
                  <Link href={'/wishlist'}>Wishlist</Link>
                </li>
                <li>
                  <a className='text-red-500' onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
