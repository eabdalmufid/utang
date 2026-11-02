import { useMemo } from 'react';
import { calculateFine, formatRupiah } from '../utils/debtUtils';
import styles from './Ticker.module.css';

export default function Ticker({ debts }) {
  const top3 = useMemo(() => {
    return [...debts]
      .filter(d => !d.lunas)
      .map(d => ({
        ...d,
        total: d.jumlah + calculateFine(d.jumlah, d.denda, d.tempo),
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 3);
  }, [debts]);

  if (top3.length === 0) return null;

  return (
    <div className={styles.ticker} aria-label="Top 3 utang terbesar">
      <span className={styles.label}>🔥 TOP 3</span>
      <div className={styles.track}>
        <div className={styles.content}>
          {top3.map((d, i) => (
            <span key={d.id} className={styles.item}>
              <span className={styles.rank}>#{i + 1}</span>
              <span className={styles.name}>{d.nama}</span>
              <span className={styles.sep}>—</span>
              <span className={styles.amount}>Rp {formatRupiah(d.total)}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
