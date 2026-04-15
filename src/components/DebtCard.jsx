import { formatRupiah, calculateFine, getStatus, monthsOverdue } from '../utils/debtUtils';
import styles from './DebtCard.module.css';

const STATUS_CONFIG = {
  lunas: { label: 'Lunas', className: styles.statusLunas },
  belum: { label: 'Belum Jatuh Tempo', className: styles.statusBelum },
  terlambat: { label: 'Terlambat', className: styles.statusTerlambat },
};

export default function DebtCard({ debt }) {
  const status = getStatus(debt);
  const fine = calculateFine(debt.jumlah, debt.denda, debt.tempo);
  const total = debt.jumlah + fine;
  const overdueMonths = monthsOverdue(debt.tempo);
  const cfg = STATUS_CONFIG[status];

  return (
    <div className={`${styles.card} ${status === 'terlambat' ? styles.cardOverdue : ''} ${status === 'lunas' ? styles.cardLunas : ''}`}>
      <div className={styles.header}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{debt.nama}</span>
          <span className={`${styles.statusBadge} ${cfg.className}`}>{cfg.label}</span>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.row}>
          <span className={styles.label}>Pokok Utang</span>
          <span className={styles.value}>Rp {formatRupiah(debt.jumlah)}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Jatuh Tempo</span>
          <span className={styles.value}>{debt.tempo}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Denda</span>
          <span className={styles.value}>{debt.denda}% / bulan</span>
        </div>
        {fine > 0 && (
          <div className={styles.row}>
            <span className={styles.label}>
              Total Denda
              <small className={styles.sub}> ({overdueMonths} bln)</small>
            </span>
            <span className={`${styles.value} ${styles.fineValue}`}>
              + Rp {formatRupiah(fine)}
            </span>
          </div>
        )}
        <div className={`${styles.row} ${styles.totalRow}`}>
          <span className={styles.label}>Total</span>
          <span className={`${styles.value} ${styles.totalValue}`}>Rp {formatRupiah(total)}</span>
        </div>
      </div>
    </div>
  );
}
