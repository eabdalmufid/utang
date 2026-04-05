import styles from './ConfirmDialog.module.css';

export default function ConfirmDialog({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onCancel();
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.dialog}>
        <p className={styles.message}>{message || 'Yakin ingin menghapus?'}</p>
        <div className={styles.actions}>
          <button className={styles.btnCancel} onClick={onCancel}>Batal</button>
          <button className={styles.btnConfirm} onClick={onConfirm}>Hapus</button>
        </div>
      </div>
    </div>
  );
}
