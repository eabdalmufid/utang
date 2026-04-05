import { useState } from 'react';
import { debts } from './data/debts';
import { getStatus } from './utils/debtUtils';
import DebtCard from './components/DebtCard';
import Summary from './components/Summary';
import './App.css';

function App() {
  const [filter, setFilter] = useState('semua');

  const filteredDebts = debts.filter(d => {
    if (filter === 'semua') return true;
    if (filter === 'lunas') return d.lunas;
    if (filter === 'terlambat') return getStatus(d) === 'terlambat';
    if (filter === 'belum') return getStatus(d) === 'belum';
    return true;
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

        {filteredDebts.length === 0 ? (
          <div className="emptyState">
            <p>Tidak ada data untuk filter ini.</p>
          </div>
        ) : (
          <div className="debtList">
            {filteredDebts.map(debt => (
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

