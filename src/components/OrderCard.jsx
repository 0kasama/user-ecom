'use client';

import { getAllOrders } from '@/lib/api/order';
import { useState, useEffect } from 'react';
import { convertToRupiah } from '@/lib/utils/convertRupiah';
import Image from 'next/image';
import Link from 'next/link';

export default function OrderCard() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();
      setOrders(response);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const orderStatus = (status) => {
    switch (status) {
      case 'cancelled':
        return <div className='text-xs badge badge-error'>Cancelled</div>;
      case 'waiting_payment':
        return <div className='text-xs badge badge-warning'>Waiting Payment</div>;
      case 'waiting_approval':
        return <div className='text-xs badge badge-warning'>Waiting Approval</div>;
      case 'approved':
        return <div className='text-xs badge badge-info'>Approved</div>;
      case 'shipping':
        return <div className='text-xs badge badge-info'>Shipping</div>;
      case 'delivered':
        return <div className='text-xs badge badge-info'>Delivered</div>;
      case 'completed':
        return <div className='text-xs badge badge-success'>Completed</div>;
    }
  };

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id} className='overflow-x-auto'>
          <table className='table table-fixed'>
            <thead>
              <tr>
                <th className='w-1/2'>Products</th>
                <th className='w-1/4 text-center'>Total</th>
                <th className='w-1/4 text-center'>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className='hover'>
                <td>
                  <Link
                    href={`/order/detail/${order.id}`}
                    className='flex flex-row items-center gap-3'
                  >
                    <Image
                      src={order.order_items[0].product.image}
                      alt={order.order_items[0].product.name}
                      width={50}
                      height={50}
                      className='rounded-lg'
                    />
                    <div>
                      <p className='font-bold'>
                        {order.order_items[0].product.name}
                      </p>
                      <p className='text-xs text-neutral'>Click for details</p>
                    </div>
                  </Link>
                </td>
                <td className='text-center'>
                  {convertToRupiah(order.total_price)}
                </td>
                <td className='text-center'>{orderStatus(order.status)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
