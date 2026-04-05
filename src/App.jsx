import { useState } from 'react';
import { debts } from './data/debts';
import { getStatus, calculateFine, parseDateStr } from './utils/debtUtils';
import DebtCard from './components/DebtCard';
import Summary from './components/Summary';
import './App.css';

function App() {
  const [filter, setFilter] = useState('semua');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  const normalise = str => str.toLowerCase().replace(/\s+/g, '');

  const filteredDebts = debts.filter(d => {
    const matchesStatus = (() => {
      if (filter === 'semua') return true;
      if (filter === 'lunas') return d.lunas;
      if (filter === 'terlambat') return getStatus(d) === 'terlambat';
      if (filter === 'belum') return getStatus(d) === 'belum';
      return true;
    })();
    const matchesName = search === '' || normalise(d.nama).includes(normalise(search));
    return matchesStatus && matchesName;
  });

  const sortedDebts = sort === 'default' ? filteredDebts : [...filteredDebts].sort((a, b) => {
    if (sort === 'tempo-asc' || sort === 'tempo-desc') {
      const da = parseDateStr(a.tempo)?.getTime() ?? Infinity;
      const db = parseDateStr(b.tempo)?.getTime() ?? Infinity;
      return sort === 'tempo-asc' ? da - db : db - da;
    }
    if (sort === 'nominal-desc' || sort === 'nominal-asc') {
      const ta = a.jumlah + calculateFine(a.jumlah, a.denda, a.tempo);
      const tb = b.jumlah + calculateFine(b.jumlah, b.denda, b.tempo);
      return sort === 'nominal-desc' ? tb - ta : ta - tb;
    }
    if (sort === 'nama-asc') {
      return a.nama.localeCompare(b.nama, 'id');
    }
    return 0;
  });

  const overdueCount = debts.filter(d => getStatus(d) === 'terlambat').length;

  return (
    <div className="app">
      <header className="appHeader">
        <div className="headerContent">
          <h1 className="appTitle">💰 Catatan Utang</h1>
        </div>
      </header>

      <main className="appMain">
        <Summary debts={debts} />

        <div className="searchBar">
          <span className="searchIcon">🔍</span>
          <input
            className="searchInput"
            type="search"
            placeholder="Cari nama pengutang…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="searchClear" onClick={() => setSearch('')} aria-label="Hapus">✕</button>
          )}
        </div>

        <div className="filterBar">
          {['semua', 'terlambat', 'belum', 'lunas'].map(f => (
            <button
              key={f}
              className={`filterBtn ${filter === f ? 'filterBtnActive' : ''} ${f === 'terlambat' && overdueCount > 0 ? 'filterBtnOverdue' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'semua' ? 'Semua' : f === 'terlambat' ? `Terlambat${overdueCount > 0 ? ` (${overdueCount})` : ''}` : f === 'belum' ? 'Belum Tempo' : 'Lunas'}
            </button>
          ))}
        </div>

        <div className="sortBar">
          <span className="sortLabel">⇅ Urutkan:</span>
          <select
            className="sortSelect"
            value={sort}
            onChange={e => setSort(e.target.value)}
            aria-label="Urutan tampilan"
          >
            <option value="default">Default (urutan input)</option>
            <option value="tempo-asc">Jatuh Tempo Terdekat</option>
            <option value="tempo-desc">Jatuh Tempo Terjauh</option>
            <option value="nominal-desc">Nominal Terbesar</option>
            <option value="nominal-asc">Nominal Terkecil</option>
            <option value="nama-asc">Nama A–Z</option>
          </select>
        </div>

        {sortedDebts.length === 0 ? (
          <div className="emptyState">
            <p>{search ? `Tidak ada hasil untuk "${search}".` : 'Tidak ada data untuk filter ini.'}</p>
          </div>
        ) : (
          <div className="debtList">
            {sortedDebts.map(debt => (
              <DebtCard
                key={debt.id}
                debt={debt}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

