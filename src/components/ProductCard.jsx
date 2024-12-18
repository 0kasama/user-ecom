'use client';

import { getAllProducts } from '@/lib/api/product';
import { useState, useEffect } from 'react';
import { convertToRupiah } from '@/lib/utils/convertRupiah';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData.result.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

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
              <button className='btn btn-circle btn-ghost'>
                <Heart />
              </button>
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
