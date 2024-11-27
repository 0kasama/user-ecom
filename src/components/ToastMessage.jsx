export default function Toast({ message, type }) {
  const alertType =
    type === 'success' ? 'alert alert-success' : 'alert alert-error';

  return (
    <div className='mt-10 toast toast-top toast-center'>
      <div className={alertType}>
        <span>{message}</span>
      </div>
    </div>
  );
}
