'use client';

import { findAllAddresses, deleteAddress } from '@/lib/api/address';
import { useState, useEffect } from 'react';
import Toast from '../ToastMessage';
import Link from 'next/link';

export default function ProfileAddress() {
  const [addresses, setAddresses] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const fetchAddresses = async () => {
    try {
      const response = await findAllAddresses();
      const sortedAddresses = response.sort((a, b) => a.id - b.id);
      setAddresses(sortedAddresses);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleDeleteAddress = async (id) => {
    try {
      const response = await deleteAddress(id);
      await fetchAddresses();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1000);
    } catch (error) {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='text-3xl font-bold'>Addresses List</h1>
        <Link
          href={'/profile/address/new'}
          role='button'
          className='btn btn-success'
        >
          Add New Address
        </Link>
      </div>
      <div className='flex flex-col justify-center items-center gap-5'>
        {addresses.map((address) => (
          <div key={address.id} className='card bg-base-200 w-full shadow-xl'>
            <div className='card-body'>
              <h2 className='card-title'>{address.title}</h2>
              <p>
                {address.street_address}, {address.city.name},{' '}
                {address.city.province.name}, {address.city.postal_code}
              </p>
              <div className='card-actions justify-end'>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className='btn btn-error w-1/4'
                >
                  Delete
                </button>
                <Link
                  href={`/profile/address/edit/${address.id}`}
                  role='button'
                  className='btn btn-info w-1/4'
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
        {error.message && (
          <Toast message='Failed to Delete Adress!' type='error' />
        )}
        {success && <Toast message='Address Deleted!' type='success' />}
      </div>
    </div>
  );
}
