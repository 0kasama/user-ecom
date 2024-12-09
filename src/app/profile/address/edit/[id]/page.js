'use client';

import { useParams } from 'next/navigation';
import EditAddressForm from '@/components/EditAddressForm';

export default function EditAddressPage() {
  const params = useParams();
  return <EditAddressForm addressId={params.id} />;
}
