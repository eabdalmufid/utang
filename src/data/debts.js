/**
 * Data utang — edit file ini langsung untuk mengubah data.
 *
 * Format setiap item:
 * {
 *   id:     string  — unik, bebas diisi (contoh: '1', 'a', 'xyz')
 *   nama:   string  — nama peminjam
 *   jumlah: number  — jumlah pokok utang dalam rupiah (tanpa titik/koma)
 *   tempo:  string  — tanggal jatuh tempo format DD/MM/YYYY
 *   denda:  number  — persentase denda per bulan (default 10)
 *   lunas:  boolean — true jika sudah lunas
 * }
 */
export const debts = [
  {
    id: '1',
    nama: 'F**DA F******TI',
    jumlah: 16817896,
    tempo: '30/09/2026',
    denda: 10,
    lunas: false,
  },
  {
    id: '2',
    nama: 'F**DA F******TI',
    jumlah: 903667,
    tempo: '17/04/2026',
    denda: 10,
    lunas: false,
  },
  {
    id: '3',
    nama: 'F**DA F******TI',
    jumlah: 903667,
    tempo: '17/05/2026',
    denda: 10,
    lunas: false,
  },
  {
    id: '4',
    nama: 'F**DA F******TI',
    jumlah: 903667,
    tempo: '17/06/2026',
    denda: 10,
    lunas: false,
  },
  {
    id: '5',
    nama: 'F**DA F******TI',
    jumlah: 903664,
    tempo: '17/07/2026',
    denda: 10,
    lunas: false,
  },
  {
    id: '6',
    nama: 'A**F K****UL',
    jumlah: 150000,
    tempo: '07/04/2026',
    denda: 0,
    lunas: true,
  },
];
