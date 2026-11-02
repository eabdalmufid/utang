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
  const activeDebts = debts.filter(d => !d.lunas);

  const normalise = str => str.toLowerCase().replace(/\s+/g, '');

  const filteredDebts = activeDebts.filter(d =>
    search === '' || normalise(d.nama).includes(normalise(search))
  );

  const sortedDebts = sort === 'semua'
    ? filteredDebts
    : (() => {
      if (sort === 'terlambat') {
        return filteredDebts
          .filter(d => getStatus(d) === 'terlambat')
          .sort((a, b) => {
            const da = parseDateStr(a.tempo)?.getTime() ?? -Infinity;
            const db = parseDateStr(b.tempo)?.getTime() ?? -Infinity;
            return db - da;
          });
      }

      if (sort === 'terdekat') {
        return filteredDebts
          .filter(d => getStatus(d) === 'belum')
          .sort((a, b) => {
            const da = parseDateStr(a.tempo)?.getTime() ?? Infinity;
            const db = parseDateStr(b.tempo)?.getTime() ?? Infinity;
            return da - db;
          });
      }

      if (sort === 'terbesar') {
        return filteredDebts.sort((a, b) => {
          const ta = a.jumlah + calculateFine(a.jumlah, a.denda, a.tempo);
          const tb = b.jumlah + calculateFine(b.jumlah, b.denda, b.tempo);
          return tb - ta;
        });
      }

      return filteredDebts;
    })();

  const overdueCount = activeDebts.filter(d => getStatus(d) === 'terlambat').length;

  return (
    <div className="app">
      <header className="appHeader">
        <div className="headerContent">
          <div className="brandMark" aria-hidden="true">U</div>
          <div className="brandCopy">
            <span className="eyebrow">PERSONAL FINANCE</span>
            <h1 className="appTitle">Catatan Utang</h1>
          </div>
          <div className="headerMeta">
            <span className="statusDot" />
            <span>Data tersimpan lokal</span>
          </div>
        </div>
        <Ticker debts={activeDebts} />
      </header>

      <main className="appMain">
        <div className="pageIntro">
          <div>
            <span className="sectionKicker">Ringkasan hari ini</span>
            <h2>Jaga arus kas tetap jelas.</h2>
          </div>
          <span className="updatedLabel">Aktif · {activeDebts.length} catatan</span>
        </div>
        <Summary debts={activeDebts} />

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
            <div className="emptyIcon" aria-hidden="true">
              <span>✓</span>
            </div>
            <p className="emptyTitle">{search ? 'Tidak ada hasil yang cocok.' : 'Belum ada catatan utang.'}</p>
            <p className="emptyDescription">
              {search ? `Coba cari dengan kata kunci lain selain “${search}”.` : 'Saat ini semua terlihat aman. Data baru akan muncul di sini.'}
            </p>
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
