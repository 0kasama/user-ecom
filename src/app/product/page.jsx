"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/fetch/product";
import { convertToRupiah } from "@/lib/convertRupiah";

import { createWishlist } from "@/fetch/wishlist";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(8);

  async function handleWishlist(id) {
    const res = await createWishlist({ product_id: +id });
  }

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-10 max-h-2xl"
      style={{ transform: "scale(0.7)" }}
    >
      {currentProducts.map((product) => (
        <div
          key={product.id}
          className="flex flex-col items-center p-4 m-auto bg-white rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
        >
          <Link href={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              width={100}
              height={90}
              className="w-full h-auto object-cover rounded-t-lg "
            />
            <h2 className="mt-4 font-semibold text-2xl text-gray-900 py-4 ">
              {product.name}
            </h2>
            <h1>{product.category_id}</h1>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-lg text-gray-900 font-semibold">
              {convertToRupiah(product.price)}
            </p>
          </Link>
          <div className="sm:flex lg:flex ">
            <div className="flex sm:gap-2 sm:px-6 sm:py-3 sm:mr-9">
              <button className="bg-blue-500  hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded transition-colors duration-300 ease-in-out flex items-center justify-center w-full truncate">
                <Link href="/cart" aria-label="Add to Cart">
                  Add to Cart
                </Link>
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded transition-colors duration-300 ease-in-out flex items-center justify-center w-full truncate">
                <Link href="/order" aria-label="Buy Now">
                  Buy Now
                </Link>
              </button>
            </div>
            <button
              className=" text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
              onClick={(e) => handleWishlist(product.id)}
              aria-label="Add to Wishlist"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      ))}

      <div className="mt-8 px-2 py-3  flex justify-center">
        {Array.from({
          length: Math.ceil(products.length / productPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none ${
              currentPage === index + 1 ? "bg-blue-700" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
export default ProductsPage;
