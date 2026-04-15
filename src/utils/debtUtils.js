/**
 * Format number to Indonesian Rupiah string (no symbol, just formatted number)
 * e.g. 1000000 -> "1.000.000"
 */
export function formatRupiah(amount) {
  if (amount == null || isNaN(amount)) return '0';
  return Math.round(amount).toLocaleString('id-ID');
}

/**
 * Parse rupiah string back to number
 * e.g. "1.000.000" -> 1000000
 */
export function parseRupiah(str) {
  if (!str) return 0;
  return parseFloat(String(str).replace(/\./g, '').replace(',', '.')) || 0;
}

/**
 * Parse DD/MM/YYYY date string to Date object (local midnight)
 */
export function parseDateStr(dateStr) {
  if (!dateStr) return null;
  const [d, m, y] = dateStr.split('/');
  if (!d || !m || !y) return null;
  return new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
}

/**
 * Format Date object to DD/MM/YYYY string
 */
export function formatDateStr(date) {
  if (!date) return '';
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

/**
 * Format Date to YYYY-MM-DD for <input type="date">
 */
export function dateToInputValue(date) {
  if (!date) return '';
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${y}-${m}-${d}`;
}

/**
 * Parse YYYY-MM-DD from input to Date
 */
export function inputValueToDate(str) {
  if (!str) return null;
  const [y, m, d] = str.split('-');
  return new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
}

/**
 * Calculate overdue periods since dueDate.
 * Denda starts on the day AFTER the due date (H+1) and increments every month.
 * e.g. due 17 Apr → 18 Apr = 1, 18 May = 2, 18 Jun = 3, …
 * Returns 0 if not overdue.
 */
export function monthsOverdue(dueDateStr, today = new Date()) {
  const due = parseDateStr(dueDateStr);
  if (!due) return 0;
  // Normalize today to midnight
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (now <= due) return 0;
  // First overdue date is due + 1 day; count full months from there and add 1
  const firstOverdue = new Date(due.getFullYear(), due.getMonth(), due.getDate() + 1);
  let months = (now.getFullYear() - firstOverdue.getFullYear()) * 12 + (now.getMonth() - firstOverdue.getMonth());
  if (now.getDate() < firstOverdue.getDate()) months -= 1;
  return Math.max(1, months + 1);
}

/**
 * Calculate total fine amount.
 * Fine = principal * (finePercent/100) * monthsOverdue
 */
export function calculateFine(principal, finePercent, dueDateStr, today = new Date()) {
  const months = monthsOverdue(dueDateStr, today);
  if (months <= 0) return 0;
  return principal * (finePercent / 100) * months;
}

/**
 * Get debt status: 'lunas' | 'belum' | 'terlambat'
 */
export function getStatus(debt, today = new Date()) {
  if (debt.lunas) return 'lunas';
  const due = parseDateStr(debt.tempo);
  if (!due) return 'belum';
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (now > due) return 'terlambat';
  return 'belum';
}
