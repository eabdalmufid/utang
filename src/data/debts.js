/**
 * Data utang — edit file debts.json di branch `data` untuk mengubah data.
 *
 * Format setiap item di debts.json:
 * {
 *   "id":     string  — unik, bebas diisi (contoh: "1", "a", "xyz")
 *   "nama":   string  — nama peminjam
 *   "jumlah": number  — jumlah pokok utang dalam rupiah (tanpa titik/koma)
 *   "tempo":  string  — tanggal jatuh tempo format DD/MM/YYYY
 *   "denda":  number  — persentase denda per bulan (default 10)
 *   "lunas":  boolean — true jika sudah lunas
 * }
 */
import debtsData from './debts.json';

export const debts = debtsData;
