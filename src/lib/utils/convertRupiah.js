export function convertToRupiah(numbers) {
  if (isNaN(numbers)) {
    throw new Error('Input must be a number');
  }

  let rupiah = [];
  const numberref = numbers.toString().split('').reverse().join('');

  for (let i = 0; i < numberref.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      rupiah.push('.');
    }
    rupiah.push(numberref[i]);
  }

  return 'Rp ' + rupiah.reverse().join('');
}