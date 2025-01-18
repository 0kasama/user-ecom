'use client';

import { useState, useEffect } from 'react';
import { getCart } from '@/lib/api/cart';
import { convertToRupiah } from '@/lib/utils/convertRupiah';
import { useAuth } from '@/lib/context/authContext';
import Image from 'next/image';

export default function CartList() {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const cart = await getCart();
      setCartItems(cart.data.cart_items);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCartItems();
    }
  }, [isAuthenticated]);

  return (
    <div className='flex flex-col justify-center items-start w-5/6 mx-auto my-20'>
      <h1 className='text-3xl font-bold underline underline-offset-4 mb-10'>
        Cart
      </h1>
      <div className='form-control w-full'>
        <label className='label cursor-pointer justify-start gap-3 mb-10'>
          <input type='checkbox' className='checkbox checkbox-info' />
          <span className='label-text'>Select All</span>
        </label>
        {{ cartItems } &&
          cartItems.map((item) => (
            <div key={item.id} className='flex w-3/5 flex-col'>
              <div className='card bg-slate-100 rounded-box grid grid-cols-3 place-items-center h-40'>
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  width={100}
                  height={100}
                />
                <p className='font-bold'>{item.product.name}</p>
                <div className='flex flex-col justify-center items-end'>
                  <p className='font-bold'>{convertToRupiah(item.price)}</p>
                </div>
              </div>
              <div className='divider'></div>
            </div>
          ))}
      </div>
    </div>
  );
}
