const Formatter = {
  rupiah: (amount, prefix) => {
    // console.log(amount + '')
    // return 1;
    amount = amount + '';
    let number_string = amount.replace(/[^,\d]/g, '').toString(),
      split = number_string.split(','),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
  },
  singkat_angka($n, $presisi = 1) {
    if ($n < 900) {
      $format_angka = number_format($n, $presisi);
      $simbol = '';
    } else if ($n < 900000) {
      $format_angka = number_format($n / 1000, $presisi);
      $simbol = 'rb';
    } else if ($n < 900000000) {
      $format_angka = number_format($n / 1000000, $presisi);
      $simbol = 'jt';
    } else if ($n < 900000000000) {
      $format_angka = number_format($n / 1000000000, $presisi);
      $simbol = 'M';
    } else {
      $format_angka = number_format($n / 1000000000000, $presisi);
      $simbol = 'T';
    }

    if ($presisi > 0) {
      $pisah = '.'.str_repeat('0', $presisi);
      $format_angka = str_replace($pisah, '', $format_angka);
    }

    return $format_angka.$simbol;
  },
};

export default Formatter;
