'use client';

import { useState, useEffect } from 'react';
import { getProduct } from '@/lib/api/product';
import { getProductAllReviews } from '@/lib/api/review';
import { convertToRupiah } from '@/lib/utils/convertRupiah';
import Image from 'next/image';
import LoadingSpinner from './LoadingSpinner';

export default function ProductDetail({ slug }) {
  const [product, setProduct] = useState();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const productData = await getProduct(slug);
      setProduct(productData.data);
      const reviewData = await getProductAllReviews({
        product_id: productData.data.id,
      });
      console.log('reviewData >>>', reviewData.data);
      setReviews(reviewData.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='product-detail'>
      <div className='grid grid-cols-40/60 place-content-between'>
        <figure className='flex w-[90%] mx-auto justify-center items-center rounded-2xl overflow-hidden'>
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={500}
            className='object-contain w-auto'
            priority
          />
        </figure>
        <div className='grid grid-rows-20/10/50/20'>
          <h1 className='text-3xl font-bold place-content-center'>
            {product.name}
          </h1>
          <div className='flex flex-row justify-between items-start'>
            <p>{convertToRupiah(product.price)}</p>
            <div className='rating'>
              {Array.from({ length: 5 }, (_, i) => (
                <input
                  key={i}
                  name='rating-2'
                  className={`mask mask-star-2 ${
                    i < averageRating ? 'bg-orange-400' : 'bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
          <p>{product.description}</p>
          <div className='flex flex-row w-full justify-center items-end gap-5'>
            <button className='btn btn-neutral w-1/2'>Buy Now</button>
            <button className='btn btn-primary w-1/2'>Add to Cart</button>
          </div>
        </div>
      </div>
      <div className='my-10 px-10 w-full'>
        <h1 className='text-3xl font-bold border-b mb-5'>Review</h1>
        {reviews.map((review) => (
          <div
            key={review.id}
            className='flex flex-col justify-start items-start w-full'
          >
            <div className='flex flex-row gap-2 items-center'>
              <h1 className='text-lg font-bold'>{review.user.fullname}</h1>
              <div className='rating rating-sm'>
                {Array.from({ length: 5 }, (_, i) => (
                  <input
                    key={i}
                    name='rating-2'
                    className={`mask mask-star-2 ${
                      i < review.rating ? 'bg-orange-400' : 'bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p>{review.comments}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
