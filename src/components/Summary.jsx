import { formatRupiah, calculateFine, getStatus } from '../utils/debtUtils';
import styles from './Summary.module.css';

export default function Summary({ debts }) {
  const totalPokok = debts.reduce((sum, d) => sum + d.jumlah, 0);
  const totalDenda = debts.reduce((sum, d) => sum + calculateFine(d.jumlah, d.denda, d.tempo), 0);
  const totalAll = totalPokok + totalDenda;
  const overdueCount = debts.filter(d => getStatus(d) === 'terlambat').length;

  return (
    <div className={styles.summary}>
      <div className={styles.mainTotal}>
        <span className={styles.mainLabel}>Total Tagihan Aktif</span>
        <span className={styles.mainValue}>Rp {formatRupiah(totalAll)}</span>
      </div>
      <div className={styles.breakdown}>
        <div className={styles.item}>
          <span className={styles.itemLabel}>Pokok</span>
          <span className={styles.itemValue}>Rp {formatRupiah(totalPokok)}</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.item}>
          <span className={styles.itemLabel}>Denda</span>
          <span className={`${styles.itemValue} ${totalDenda > 0 ? styles.fineColor : ''}`}>
            Rp {formatRupiah(totalDenda)}
          </span>
        </div>
        <div className={styles.divider} />
        <div className={styles.item}>
          <span className={styles.itemLabel}>Terlambat</span>
          <span className={`${styles.itemValue} ${overdueCount > 0 ? styles.overdueColor : ''}`}>
            {overdueCount} tagihan
          </span>
        </div>
      </div>
    </div>
  );
}
