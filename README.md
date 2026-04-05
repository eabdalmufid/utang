# 💰 Catatan Utang

Website sederhana untuk mencatat utang, dibangun dengan **React + Vite**. Tidak membutuhkan backend — semua data disimpan di `localStorage` browser.

## Fitur

- ✅ Tambah, edit, hapus data utang
- ✅ Field: Nama, Jumlah (format rupiah), Tanggal Tempo, Denda (% per bulan)
- ✅ Hitung denda otomatis (10% per bulan sejak jatuh tempo)
- ✅ Tampilkan total utang + denda
- ✅ Status: **Lunas**, **Belum Jatuh Tempo**, **Terlambat** (highlight merah)
- ✅ Filter berdasarkan status
- ✅ Mobile-first UI
- ✅ Data tersimpan otomatis di `localStorage`

## Cara Jalankan Secara Lokal

```bash
# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

Buka [http://localhost:5173/utang/](http://localhost:5173/utang/)

## Deploy ke GitHub Pages

### Prasyarat
- Repo sudah ada di GitHub
- GitHub Pages diaktifkan dari branch `gh-pages`

### Langkah Deploy

**1. Pastikan `vite.config.js` sudah benar:**
```js
base: '/utang/',  // ganti 'utang' dengan nama repo Anda jika berbeda
```

**2. Build dan deploy:**
```bash
npm run deploy
```

Perintah ini akan:
1. Build proyek ke folder `dist/`
2. Push folder `dist/` ke branch `gh-pages` secara otomatis

**3. Aktifkan GitHub Pages:**
- Buka Settings → Pages di repo GitHub
- Source: Deploy from branch → pilih branch `gh-pages`, folder `/ (root)`
- Klik Save

**4. Akses website:**
```
https://<username>.github.io/utang/
```

### Deploy Ulang
Cukup jalankan lagi:
```bash
npm run deploy
```

## Struktur File

```
src/
├── components/
│   ├── DebtCard.jsx          # Kartu tampilan satu utang
│   ├── DebtCard.module.css
│   ├── DebtModal.jsx         # Form tambah/edit utang
│   ├── DebtModal.module.css
│   ├── ConfirmDialog.jsx     # Dialog konfirmasi hapus
│   ├── ConfirmDialog.module.css
│   ├── Summary.jsx           # Ringkasan total tagihan
│   └── Summary.module.css
├── utils/
│   ├── debtUtils.js          # Kalkulasi denda, format, status
│   └── storage.js            # localStorage + data awal
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```
