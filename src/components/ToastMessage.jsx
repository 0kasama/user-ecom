export default function Toast({ message, type }) {
  const alertType =
    type === 'success' ? 'alert alert-success' : 'alert alert-error';

  return (
    <div className='mt-20 toast toast-top toast-center'>
      <div className={alertType}>
        <span className='text-white'>{message}</span>
      </div>
    </div>
  );
}
