'use client';

import { getAllWishlists } from '@/lib/api/wishlist';
import { useState, useEffect } from 'react';
import { convertToRupiah } from '@/lib/utils/convertRupiah';
import { Heart } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import Link from 'next/link';
import Image from 'next/image';

export default function WishlistCard() {
  const [wishlists, setWishlists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWishlists = async () => {
    try {
      const productsData = await getAllWishlists();
      setWishlists(productsData.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching wishlists:', error);
    }
  };

  useEffect(() => {
    fetchWishlists();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='m-10 gap-5 flex flex-wrap justify-center items-center'>
      {wishlists.map((wishlist) => (
        <div
          key={wishlist.id}
          className='card card-compact bg-base-100 w-96 shadow-xl'
        >
            <figure className='relative h-80'>
              <Image
                src={wishlist.product.image}
                fill
                sizes='(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 70vw, (max-width: 1200px) 50vw, 33vw'
                alt={wishlist.product.name}
                className='object-contain'
                priority
              />
            </figure>

          <div className='card-body'>
            <h2 className='card-title'>{wishlist.product.name}</h2>
            <div className='flex flex-row justify-between items-center'>
              <p className='text-lg font-medium'>
                {convertToRupiah(wishlist.product.price)}
              </p>
              <button className='btn btn-circle btn-ghost'>
                <Heart fill='red' />
              </button>
            </div>
            <Link href={`/product/${wishlist.product.slug}`}>
              <p className='text-justify line-clamp-2'>{wishlist.product.description}</p>
            </Link>
            <div className='card-actions justify-end'>
              <button className='btn btn-neutral w-32'>Buy Now</button>
              <button className='btn btn-primary w-32'>Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
