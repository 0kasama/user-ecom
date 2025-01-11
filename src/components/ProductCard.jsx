'use client';

import { getAllProducts } from '@/lib/api/product';
import {
  getAllWishlists,
  addWishlist,
  removeWishlist,
} from '@/lib/api/wishlist';
import { useState, useEffect } from 'react';
import { convertToRupiah } from '@/lib/utils/convertRupiah';
import { Heart } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/context/authContext';

export default function ProductCard() {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [wishlists, setWishlists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const productsData = await getAllProducts();
      setProducts(productsData.result.data);

      if (isAuthenticated) {
        const wishlistsData = await getAllWishlists();
        setWishlists(wishlistsData.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAuthenticated]);

  const isProductWishlisted = (productId) => {
    if (!isAuthenticated) return false;
    return wishlists.some((wishlist) => wishlist.product.id === productId);
  };

  const getWishlistId = (productId) => {
    const wishlist = wishlists.find((w) => w.product.id === productId);
    return wishlist ? wishlist.id : null;
  };

  const toggleWishlist = async (productId) => {
    if (!isAuthenticated) return;

    try {
      if (isProductWishlisted(productId)) {
        const wishlistId = getWishlistId(productId);
        if (wishlistId) {
          await removeWishlist(wishlistId);
          setWishlists((prevWishlists) =>
            prevWishlists.filter((wishlist) => wishlist.id !== wishlistId)
          );
        }
      } else {
        await addWishlist({ product_id: productId });
        const wishlistsData = await getAllWishlists();
        setWishlists(wishlistsData.data.data);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='m-10 gap-5 flex flex-wrap justify-center items-center'>
      {products.map((product) => (
        <div
          key={product.id}
          className='card card-compact bg-base-100 w-96 shadow-xl'
        >
          <Link href={`/product/${product.slug}`}>
            <figure className='relative h-80'>
              <Image
                src={product.image}
                fill
                sizes='(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 70vw, (max-width: 1200px) 50vw, 33vw'
                alt={product.name}
                className='object-contain'
                priority
              />
            </figure>
          </Link>

          <div className='card-body'>
            <h2 className='card-title'>{product.name}</h2>
            <div className='flex flex-row justify-between items-center'>
              <p className='text-lg font-medium'>
                {convertToRupiah(product.price)}
              </p>
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    toggleWishlist(product.id);
                    setWishlists((prevWishlists) =>
                      isProductWishlisted(product.id)
                        ? prevWishlists.filter(
                            (wishlist) => wishlist.product.id !== product.id
                          )
                        : [...prevWishlists, { product: { id: product.id } }]
                    );
                  }}
                  className='btn btn-circle btn-ghost'
                >
                  <Heart
                    fill={isProductWishlisted(product.id) ? 'red' : 'none'}
                  />
                </button>
              ) : (
                <button className='btn btn-circle btn-ghost'>
                  <Heart />
                </button>
              )}
            </div>
            <Link href={`/product/${product.slug}`}>
              <p className='text-justify line-clamp-2'>{product.description}</p>
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
