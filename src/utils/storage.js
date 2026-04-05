const STORAGE_KEY = 'utang_data';

const INITIAL_DATA = [
  {
    id: 'init-1',
    nama: 'F**DA F******TI',
    jumlah: 16817896,
    tempo: '30/09/2026',
    denda: 10,
    lunas: false,
  },
  {
    id: 'init-2',
    nama: 'F**DA F******TI',
    jumlah: 903667,
    tempo: '17/04/2026',
    denda: 10,
    lunas: false,
  },
  {
    id: 'init-3',
    nama: 'F**DA F******TI',
    jumlah: 903667,
    tempo: '17/05/2026',
    denda: 10,
    lunas: false,
  },
  {
    id: 'init-4',
    nama: 'F**DA F******TI',
    jumlah: 903667,
    tempo: '17/06/2026',
    denda: 10,
    lunas: false,
  },
  {
    id: 'init-5',
    nama: 'F**DA F******TI',
    jumlah: 903664,
    tempo: '17/07/2026',
    denda: 10,
    lunas: false,
  },
];

export function loadDebts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_DATA;
    return JSON.parse(raw);
  } catch {
    return INITIAL_DATA;
  }
}

export function saveDebts(debts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(debts));
}

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
