'use client';

import { useParams } from 'next/navigation';
import AddressForm from '@/components/AddressForm';

export default function EditAddressPage() {
  const params = useParams();
  return <AddressForm addressId={params.id} />;
}
