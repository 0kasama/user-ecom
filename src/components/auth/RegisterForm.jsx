'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api/auth';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import Toast from '@/components/ToastMessage';

export default function LoginForm() {
  const router = useRouter();
  const [fullname, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({ message: '' });

  const validatePassword = (password) => {
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return password.length >= minLength && hasLetter && hasNumber;
  };

  const handlePasswordChange = (e, passwordChange) => {
    const passwordInput = e.target.value;
    passwordChange(passwordInput);

    if (password === passwordInput) {
      setPasswordMatch(true);
      setError(false);
    } else {
      setPasswordMatch(false);
      setError({
        message: 'Password does not match!',
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setError({
        message:
          'Password must be at least 8 characters long, contain at least 1 letter and 1 number.',
      });
      setTimeout(() => setError(false), 5000);
      return;
    }

    try {
      const data = {
        fullname,
        phone_number: phoneNumber,
        email,
        password,
      };
      const response = await register(data);
      if (response.message === 'Register Success') {
        setSuccess(true);
        setTimeout(() => router.push('/auth/login'), 1000);
      } else {
        setError({
          message: 'Please check again your data!',
        });
        setTimeout(() => setError(false), 5000);
      }
    } catch (error) {
      setError({
        message: 'Please check again your data!',
      });
      setTimeout(() => setError(false), 5000);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleRegister} className='auth-form'>
      <label className='form-control w-full max-w-xs'>
        <div className='label'>
          <span className='label-text font-medium'>Fullname</span>
        </div>
        <input
          required
          type='text'
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder='Enter Your Full Name'
          className='input input-bordered input-neutral w-full max-w-xs'
        />
      </label>

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
            onChange={(e) => handlePasswordChange(e, setPassword)}
            placeholder='Enter Your Password'
            className={`input input-bordered w-full max-w-xs ${
              !passwordMatch ? 'input-error' : 'input-neutral'
            }`}
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

      <div className='w-full max-w-xs bg-base-300 p-2 text-sm'>
        <p>Password Minimum Length 8 Characters</p>
        <p>Contain at Least 1 Letter</p>
        <p>Contain at Least 1 Number</p>
      </div>

      <label className='form-control w-full max-w-xs'>
        <div className='label'>
          <span className='label-text font-medium'>Confirm Password</span>
        </div>
        <div className='relative'>
          <input
            required
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => handlePasswordChange(e, setConfirmPassword)}
            placeholder='Re-Enter Your Password'
            className={`input input-bordered w-full max-w-xs ${
              !passwordMatch ? 'input-error' : 'input-neutral'
            }`}
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

      <label className='form-control w-full max-w-xs'>
        <div className='label'>
          <span className='label-text font-medium'>Phone Number</span>
        </div>
        <input
          required
          type='number'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder='+62812345678'
          className='input input-bordered input-neutral w-full max-w-xs'
        />
      </label>

      <button type='submit' className='btn btn-neutral w-full max-w-xs'>
        Register
      </button>

      <p>
        Already have an account? {''}
        <Link href={'/auth/login'} className='link link-info'>
          Login
        </Link>
      </p>

      {error.message && <Toast message={error.message} type='error' />}
      {success && <Toast message='Register Success' type='success' />}
    </form>
  );
}
