import { useState } from 'react';
import { debts } from './data/debts';
import { getStatus, calculateFine, parseDateStr } from './utils/debtUtils';
import DebtCard from './components/DebtCard';
import Summary from './components/Summary';
import Ticker from './components/Ticker';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('semua');

  const normalise = str => str.toLowerCase().replace(/\s+/g, '');

  const filteredDebts = debts.filter(d =>
    search === '' || normalise(d.nama).includes(normalise(search))
  );

  const sortedDebts = sort === 'semua'
    ? (() => {
      const { unpaidDebts, paidDebts } = filteredDebts.reduce(
        (acc, debt) => {
          if (debt.lunas) acc.paidDebts.push(debt);
          else acc.unpaidDebts.push(debt);
          return acc;
        },
        { unpaidDebts: [], paidDebts: [] }
      );
      return [...unpaidDebts, ...paidDebts];
    })()
    : [...filteredDebts].sort((a, b) => {
      const aLunas = a.lunas ? 1 : 0;
      const bLunas = b.lunas ? 1 : 0;
      if (aLunas !== bLunas) return aLunas - bLunas;

      if (sort === 'terlambat') {
        const aOver = getStatus(a) === 'terlambat' ? 0 : 1;
        const bOver = getStatus(b) === 'terlambat' ? 0 : 1;
        if (aOver !== bOver) return aOver - bOver;
        const da = parseDateStr(a.tempo)?.getTime() ?? Infinity;
        const db = parseDateStr(b.tempo)?.getTime() ?? Infinity;
        return da - db;
      }
      if (sort === 'terdekat') {
        const da = parseDateStr(a.tempo)?.getTime() ?? Infinity;
        const db = parseDateStr(b.tempo)?.getTime() ?? Infinity;
        return da - db;
      }
      if (sort === 'terbesar') {
        const ta = a.jumlah + calculateFine(a.jumlah, a.denda, a.tempo);
        const tb = b.jumlah + calculateFine(b.jumlah, b.denda, b.tempo);
        return tb - ta;
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
        <Ticker debts={debts} />
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
          {[
            { key: 'semua', label: 'Semua', overdue: false },
            { key: 'terlambat', label: `Terlambat${overdueCount > 0 ? ` (${overdueCount})` : ''}`, overdue: overdueCount > 0 },
            { key: 'terdekat', label: 'Terdekat', overdue: false },
            { key: 'terbesar', label: 'Terbesar', overdue: false },
          ].map(({ key, label, overdue }) => (
            <button
              key={key}
              className={`filterBtn ${sort === key ? 'filterBtnActive' : ''} ${key === 'terlambat' && overdue && sort !== 'terlambat' ? 'filterBtnOverdue' : ''}`}
              onClick={() => setSort(key)}
            >
              {label}
            </button>
          ))}
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
