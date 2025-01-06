'use client';

import { findUser } from '@/lib/api/user';
import { useAuth } from '@/lib/context/authContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Map, Settings, LogOut } from 'lucide-react';
import ProfileOrder from './profile/ProfileOrder';
import ProfileAddress from './profile/ProfileAddress';
import ProfileSetting from './profile/ProfileSetting';

export default function ProfileCard() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const [user, setUser] = useState('');
  const [activeTab, setActiveTab] = useState('orders');
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const user = await findUser();
      if (user) {
        setUser(user);
      } else {
        throw error;
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/auth/login');
      }
    }
  }, [loading, isAuthenticated, router]);

  const tabContent = {
    orders: <ProfileOrder />,
    address: <ProfileAddress />,
    setting: <ProfileSetting user={user} fetchUser={fetchUser} />,
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <span className='loading loading-spinner loading-lg'></span>
      </div>
    );
  }

  return (
    <div className='flex flex-col md:my-40 mx-auto w-3/4 justify-center items-center'>
      <div className='md:grid md:grid-cols-30/70 flex flex-col w-full gap-5'>
        <div className='flex flex-col bg-base-200 h-[404px] rounded-2xl shadow-xl p-10 gap-3'>
          <div className='text-center mb-5'>
            <div className='text-3xl font-bold'>{user.fullname}</div>
            <div className='text-lg'>{user.email}</div>
          </div>
          <button
            onClick={() => changeTab('orders')}
            className='justify-start btn btn-ghost no-animation'
          >
            <Package /> Orders
          </button>
          <button
            onClick={() => changeTab('address')}
            className='justify-start btn btn-ghost no-animation'
          >
            <Map /> Address
          </button>
          <button
            onClick={() => changeTab('setting')}
            className='justify-start btn btn-ghost no-animation'
          >
            <Settings /> Setting
          </button>
          <button
            onClick={handleLogout}
            className='justify-start btn btn-ghost text-error no-animation'
          >
            <LogOut /> Logout
          </button>
        </div>

        <div className='rounded-2xl p-10 border border-base-300'>
          {tabContent[activeTab]}
        </div>
      </div>
    </div>
  );
}
