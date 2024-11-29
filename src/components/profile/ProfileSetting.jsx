import { updateUser } from '@/lib/api/user';
import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Toast from '../ToastMessage';

export default function ProfileSetting({ user, fetchUser }) {
  const [fullname, setFullname] = useState(user.fullname || '');
  const [email, setEmail] = useState(user.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({ message: '' });

  useEffect(() => {
    setFullname(user.fullname || '');
    setEmail(user.email || '');
    setPhoneNumber(user.phone_number || '');
  }, [user]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    const updateData = {
      fullname,
      phone_number: phoneNumber,
      email,
    };

    if (password) {
      if (!validatePassword(password)) {
        setError({
          message:
            'Password must be at least 8 characters long, contain at least 1 letter and 1 number.',
        });
        setTimeout(() => setError(false), 5000);
        return;
      }

      if (password !== confirmPassword) {
        setError({
          message: 'Passwords do not match!',
        });
        setTimeout(() => setError(false), 5000);
        return;
      }

      updateData.password = password;
    }

    try {
      const response = await updateUser(updateData);

      if (response) {
        setSuccess(true);
        setPassword('');
        setConfirmPassword('');
        await fetchUser ();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError({
          message: 'Update Failed!',
        });
        setTimeout(() => setError(false), 5000);
      }
    } catch (error) {
      setError({
        message: 'Update Failed!',
      });
      setTimeout(() => setError(false), 5000);
    }
  };

  return (
    <form
      onSubmit={handleUpdateUser}
      className='flex flex-col justify-start items-start gap-5'
    >
      <h1 className='text-3xl font-bold'>Information</h1>

      <label className='form-control w-full'>
        <div className='label'>
          <span className='label-text font-medium'>Fullname</span>
        </div>
        <input
          required
          type='text'
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder='Enter Your Full Name'
          className='input input-bordered input-neutral w-full'
        />
      </label>

      <label className='form-control w-full'>
        <div className='label'>
          <span className='label-text font-medium'>E-Mail</span>
        </div>
        <input
          required
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='your@mail.com'
          className='input input-bordered input-neutral w-full'
        />
      </label>

      <label className='form-control w-full'>
        <div className='label'>
          <span className='label-text font-medium'>Phone Number</span>
        </div>
        <input
          required
          type='number'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder='+62812345678'
          className='input input-bordered input-neutral w-full'
        />
      </label>

      <h1 className='text-3xl font-bold mt-10'>Change Password</h1>

      <label className='form-control w-full'>
        <div className='label'>
          <span className='label-text font-medium'>Password</span>
        </div>
        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => handlePasswordChange(e, setPassword)}
            placeholder='Enter Your Password'
            className={`input input-bordered w-full ${
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

      <div className='w-full bg-base-300 p-2 text-sm'>
        <p>Password Minimum Length 8 Characters</p>
        <p>Contain at Least 1 Letter</p>
        <p>Contain at Least 1 Number</p>
      </div>

      <label className='form-control w-full'>
        <div className='label'>
          <span className='label-text font-medium'>Confirm Password</span>
        </div>
        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => handlePasswordChange(e, setConfirmPassword)}
            placeholder='Re-Enter Your Password'
            className={`input input-bordered w-full ${
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

      <button type='submit' className='mt-10 btn btn-neutral w-full'>
        Save Changes
      </button>

      {error.message && <Toast message={error.message} type='error' />}
      {success && <Toast message='Update Success' type='success' />}
    </form>
  );
}
