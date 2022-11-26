const currencyHelper = {
  toRupiah: (number) => {
    return new Intl.NumberFormat('in-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  },
};

module.exports = currencyHelper;
