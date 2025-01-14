'use client';

import { useState, useEffect } from 'react';
import { getProduct } from '@/lib/api/product';
import { convertToRupiah } from '@/lib/utils/convertRupiah';
import Image from 'next/image';
import LoadingSpinner from './LoadingSpinner';

export default function ProductDetail({ slug }) {
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await getProduct(slug);
      console.log(response.data);
      setProduct(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='product-detail'>
      <div className='grid grid-cols-40/60 place-content-between'>
        <figure className='flex w-full mx-auto justify-center items-center rounded-2xl overflow-hidden'>
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={500}
            className='object-contain'
          />
        </figure>
        <div className='grid grid-rows-20/10/50/20'>
          <h1 className='text-3xl font-bold place-content-center'>
            {product.name}
          </h1>
          <div className='flex flex-row justify-between items-start'>
            <p>{convertToRupiah(product.price)}</p>
            <p>Rating</p>
          </div>
          <p>{product.description}</p>
          <div className='flex flex-row w-full justify-center items-end gap-5'>
            <button className='btn btn-neutral w-1/2'>Buy Now</button>
            <button className='btn btn-primary w-1/2'>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
