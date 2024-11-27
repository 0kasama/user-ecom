'use client';

import { useAuth } from '@/lib/context/authContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api/auth';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import Toast from '@/components/ToastMessage';

export default function LoginForm() {
  const router = useRouter();
  const { login: setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      const token = response.accessToken;
      if (!token) {
        setError(true);
      } else {
        setAuth(token);
        setSuccess(true);
        setTimeout(() => router.push('/'), 1000);
      }
    } catch (error) {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleLogin} className='auth-form'>
      <label className='form-control w-full max-w-xs'>
        <div className='label'>
          <span className='label-text font-medium'>E-Mail</span>
        </div>
        <input
          required
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='your@mail.com'
          className='input input-bordered input-neutral w-full max-w-xs'
        />
      </label>

      <label className='form-control w-full max-w-xs'>
        <div className='label'>
          <span className='label-text font-medium'>Password</span>
        </div>
        <div className='relative'>
          <input
            required
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Your Password'
            className='input input-bordered input-neutral w-full max-w-xs'
          />
          <button
            className='absolute top-3 right-4'
            onClick={handleShowPassword}
            type='button'
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </label>

      <button type='submit' className='btn btn-neutral w-full max-w-xs'>
        Login
      </button>

      <Link href={'/auth/register'} className='link link-info'>
        Don't have an account yet?
      </Link>

      {error && <Toast message='Wrong Email or Password!' type='error' />}
      {success && <Toast message='Login Success!' type='success' />}
    </form>
  );
}
