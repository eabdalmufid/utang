import { useState, useCallback } from 'react';
import { loadDebts, saveDebts, generateId } from './utils/storage';
import { getStatus } from './utils/debtUtils';
import DebtCard from './components/DebtCard';
import DebtModal from './components/DebtModal';
import ConfirmDialog from './components/ConfirmDialog';
import Summary from './components/Summary';
import './App.css';

function App() {
  const [debts, setDebts] = useState(() => loadDebts());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDebt, setEditingDebt] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [filter, setFilter] = useState('semua');

  const persist = useCallback((newDebts) => {
    setDebts(newDebts);
    saveDebts(newDebts);
  }, []);

  function handleAdd() {
    setEditingDebt(null);
    setModalOpen(true);
  }

  function handleEdit(debt) {
    setEditingDebt(debt);
    setModalOpen(true);
  }

  function handleSave(data) {
    if (editingDebt) {
      persist(debts.map(d => d.id === editingDebt.id ? { ...editingDebt, ...data } : d));
    } else {
      persist([...debts, { id: generateId(), ...data }]);
    }
    setModalOpen(false);
    setEditingDebt(null);
  }

  function handleDeleteRequest(id) {
    setConfirmId(id);
  }

  function handleDeleteConfirm() {
    persist(debts.filter(d => d.id !== confirmId));
    setConfirmId(null);
  }

  function handleToggleLunas(id) {
    persist(debts.map(d => d.id === id ? { ...d, lunas: !d.lunas } : d));
  }

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
          <button className="btnAdd" onClick={handleAdd} aria-label="Tambah utang">
            + Tambah
          </button>
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
                onEdit={handleEdit}
                onDelete={handleDeleteRequest}
                onToggleLunas={handleToggleLunas}
              />
            ))}
          </div>
        )}
      </main>

      <DebtModal
        key={editingDebt ? editingDebt.id : 'new'}
        isOpen={modalOpen}
        debt={editingDebt}
        onClose={() => { setModalOpen(false); setEditingDebt(null); }}
        onSave={handleSave}
      />

      <ConfirmDialog
        isOpen={!!confirmId}
        message="Yakin ingin menghapus data utang ini?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  );
}

export default App;

