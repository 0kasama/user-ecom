'use client';

import { useState, useEffect } from 'react';
import { findProvinces, findCityByProvince } from '@/lib/api/city';
import { createAddress, updateAddress, findAddress } from '@/lib/api/address';
import { useRouter } from 'next/navigation';
import Toast from './ToastMessage';

export default function AddressForm({ addressId }) {
  const router = useRouter();
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [title, setTitle] = useState('');
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const isEditMode = Boolean(addressId);

  const fetchProvinces = async () => {
    try {
      const response = await findProvinces();
      setProvinces(response);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (isEditMode) {
      const fetchAddress = async () => {
        try {
          const response = await findAddress(addressId);
          setTitle(response.title);
          setStreetName(response.street_address);
          setSelectedProvince(response.city.province_id);
          const citiesResponse = await findCityByProvince(
            response.city.province_id
          );
          setCities(citiesResponse);
          setCity(response.city.id);
        } catch (error) {
          console.error('Failed to fetch address:', error);
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 3000);
        }
      };

      fetchAddress();
    }
  }, [addressId, isEditMode]);

  const handleProvinceChange = async (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);

    try {
      const response = await findCityByProvince(provinceId);
      setCities(response);

      if (response.length > 0) {
        setCity(response[0].id);
      } else {
        setCity('');
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
      setCities([]);
      setCity('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const params = {
        title,
        street_address: streetName,
        city_id: +city,
      };

      if (isEditMode) {
        await updateAddress(+addressId, params);
      } else {
        await createAddress(params);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/profile');
      }, 1000);
    } catch (error) {
      console.error(
        `Failed to ${isEditMode ? 'update' : 'create'} address:`,
        error
      );
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='address-form'>
      <h1 className='text-2xl underline font-bold'>
        {isEditMode ? 'Edit Address' : 'New Address'}
      </h1>

      <label className='form-control w-full max-w-xs'>
        <div className='label'>
          <span className='label-text font-medium'>Address Title</span>
        </div>
        <input
          required
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='ex. House, Office, Apartment, etc.'
          className='input input-bordered input-neutral w-full max-w-xs'
        />
      </label>

      <label className='form-control w-full max-w-xs'>
        <div className='label'>
          <span className='label-text font-medium'>Province</span>
        </div>
        <select
          className='select select-bordered select-neutral w-full max-w-xs'
          value={selectedProvince}
          onChange={handleProvinceChange}
          required
        >
          <option value=''>Select Province</option>
          {provinces.map((province) => (
            <option key={province.id} value={province.id}>
              {province.name}
            </option>
          ))}
        </select>
      </label>

      <label className='form-control w-full max-w-xs'>
        <div className='label'>
          <span className='label-text font-medium'>City</span>
        </div>
        <select
          className='select select-bordered select-neutral w-full max-w-xs'
          disabled={!selectedProvince}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        >
          <option value=''>
            {selectedProvince ? 'Select City' : 'Select Province First'}
          </option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </label>

      <label className='form-control w-full max-w-xs'>
        <div className='label'>
          <span className='label-text font-medium'>Street Name</span>
        </div>
        <input
          required
          type='text'
          placeholder='ex. Jl. Sesama'
          className='input input-bordered input-neutral w-full max-w-xs'
          value={streetName}
          onChange={(e) => setStreetName(e.target.value)}
        />
      </label>

      <button type='submit' className='btn btn-neutral w-full max-w-xs'>
        {isEditMode ? 'Update Address' : 'Create Address'}
      </button>

      {error && (
        <Toast
          message={`Failed to ${isEditMode ? 'update' : 'add'} address`}
          type='error'
        />
      )}
      {success && (
        <Toast
          message={`Address ${isEditMode ? 'updated' : 'added'} successfully`}
          type='success'
        />
      )}
    </form>
  );
}
