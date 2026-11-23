import type { FilterStatus } from '../types/task';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: FilterStatus;
  onStatusChange: (status: FilterStatus) => void;
  totalShown: number;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  totalShown,
}: FilterBarProps) {
  const filters: { key: FilterStatus; label: string }[] = [
    { key: 'all', label: 'Semua' },
    { key: 'pending', label: 'Belum Selesai' },
    { key: 'completed', label: 'Selesai' },
  ];

  return (
    <div className="filter-bar card">
      <input
        type="search"
        className="search-input"
        placeholder="Cari judul tugas atau mata kuliah..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className="filter-controls">
        <div className="filter-group" role="group" aria-label="Filter Status">
          {filters.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`filter-btn ${statusFilter === item.key ? 'active' : ''}`}
              onClick={() => onStatusChange(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <span className="filter-count">{totalShown} tugas ditampilkan</span>
      </div>
    </div>
  );
}