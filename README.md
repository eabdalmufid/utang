# 💰 Catatan Utang

Website sederhana untuk pengutang melihat tagihan mereka. Dibangun dengan **React + Vite**, tanpa backend. Data diatur langsung dari satu file JS.

## Screenshot Mobile

![Mobile Screenshot](https://raw.githubusercontent.com/eabdalmufid/utang/copilot/create-debt-tracking-website/public/mobile-screenshot.png)

## Cara Edit Data

Buka file **`src/data/debts.js`** dan ubah langsung:

```js
export const debts = [
  {
    id: '1',
    nama: 'Nama Pengutang',
    jumlah: 16817896,       // dalam rupiah, tanpa titik
    tempo: '30/09/2026',    // format DD/MM/YYYY
    denda: 10,              // % per bulan
    lunas: false,           // true jika sudah lunas
  },
  // tambah item baru di sini...
];
```

Setelah simpan dan push ke branch `main`, website **otomatis ter-deploy** ke GitHub Pages via GitHub Actions.

## Auto-Deploy (GitHub Actions)

Setiap `git push` ke branch `main` akan:
1. Build proyek dengan `npm run build`
2. Deploy hasil build ke branch `gh-pages` secara otomatis

Workflow ada di `.github/workflows/deploy.yml`.

## Setup Awal GitHub Pages

1. Push ke branch `main`
2. Tunggu Actions selesai (cek tab **Actions** di repo)
3. Buka **Settings → Pages** → Source: `gh-pages` branch, folder `/ (root)` → Save
4. Website live di: `https://<username>.github.io/utang/`

## Jalankan Lokal

```bash
npm install
npm run dev
```

## Struktur File

```
src/
├── data/
│   └── debts.js          ← EDIT FILE INI untuk ubah data
├── components/
│   ├── DebtCard.jsx       — Kartu tampilan satu tagihan
│   ├── Summary.jsx        — Ringkasan total tagihan
│   └── ...
├── utils/
│   └── debtUtils.js       — Kalkulasi denda, format, status
└── App.jsx
```
