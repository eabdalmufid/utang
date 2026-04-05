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

  // Duplicate items for seamless infinite loop
  const items = [...top3, ...top3];

  return (
    <div className={styles.ticker} aria-label="Top 3 utang terbesar">
      <span className={styles.label}>🔥 TOP 3</span>
      <div className={styles.track}>
        <div className={styles.content}>
          {items.map((d, i) => (
            <span key={i} className={styles.item}>
              <span className={styles.rank}>#{(i % top3.length) + 1}</span>
              <span className={styles.name}>{d.nama}</span>
              <span className={styles.sep}>—</span>
              <span className={styles.amount}>Rp {formatRupiah(d.total)}</span>
              <span className={styles.dot} aria-hidden="true">⬥</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
