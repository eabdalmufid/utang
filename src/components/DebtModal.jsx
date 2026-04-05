import { useState } from 'react';
import { formatRupiah, parseRupiah, inputValueToDate, dateToInputValue, formatDateStr, parseDateStr } from '../utils/debtUtils';
import styles from './DebtModal.module.css';

function getInitialForm(debt) {
  if (!debt) {
    return { nama: '', jumlah: '', jumlahDisplay: '', tempo: '', denda: '10', lunas: false };
  }
  const tempoDate = parseDateStr(debt.tempo);
  return {
    nama: debt.nama || '',
    jumlah: debt.jumlah || '',
    jumlahDisplay: debt.jumlah ? formatRupiah(debt.jumlah) : '',
    tempo: tempoDate ? dateToInputValue(tempoDate) : '',
    denda: String(debt.denda ?? 10),
    lunas: debt.lunas || false,
  };
}

export default function DebtModal({ isOpen, debt, onClose, onSave }) {
  const [form, setForm] = useState(() => getInitialForm(debt));

  if (!isOpen) return null;

  function handleJumlahChange(e) {
    const raw = e.target.value.replace(/\./g, '');
    const num = parseFloat(raw) || 0;
    setForm(f => ({ ...f, jumlah: num, jumlahDisplay: num > 0 ? formatRupiah(num) : raw === '' ? '' : raw }));
  }

  function handleJumlahBlur() {
    if (form.jumlah) {
      setForm(f => ({ ...f, jumlahDisplay: formatRupiah(f.jumlah) }));
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const tempoDate = inputValueToDate(form.tempo);
    onSave({
      nama: form.nama.trim(),
      jumlah: typeof form.jumlah === 'number' ? form.jumlah : parseRupiah(form.jumlah),
      tempo: tempoDate ? formatDateStr(tempoDate) : '',
      denda: parseFloat(form.denda) || 10,
      lunas: form.lunas,
    });
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>{debt ? 'Edit Utang' : 'Tambah Utang'}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Tutup">✕</button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="nama">Nama</label>
            <input
              id="nama"
              name="nama"
              className={styles.input}
              type="text"
              placeholder="Nama peminjam"
              value={form.nama}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="jumlah">Jumlah Utang (Rp)</label>
            <div className={styles.inputGroup}>
              <span className={styles.inputPrefix}>Rp</span>
              <input
                id="jumlah"
                name="jumlah"
                className={`${styles.input} ${styles.inputWithPrefix}`}
                type="text"
                inputMode="numeric"
                placeholder="0"
                value={form.jumlahDisplay}
                onChange={handleJumlahChange}
                onBlur={handleJumlahBlur}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="tempo">Tanggal Jatuh Tempo</label>
            <input
              id="tempo"
              name="tempo"
              className={styles.input}
              type="date"
              value={form.tempo}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="denda">Denda (%/bulan)</label>
            <input
              id="denda"
              name="denda"
              className={styles.input}
              type="number"
              min="0"
              max="100"
              step="0.1"
              placeholder="10"
              value={form.denda}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.checkRow}>
            <label className={styles.checkLabel}>
              <input
                type="checkbox"
                name="lunas"
                checked={form.lunas}
                onChange={handleChange}
                className={styles.checkbox}
              />
              Tandai sebagai Lunas
            </label>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.btnCancel} onClick={onClose}>
              Batal
            </button>
            <button type="submit" className={styles.btnSave}>
              {debt ? 'Simpan Perubahan' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
