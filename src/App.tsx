import { useEffect, useState } from 'react';
import { FilterBar } from './components/FilterBar';
import { Navbar } from './components/Navbar';
import { StatCard } from './components/StatCard';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import type { FilterStatus, Task } from './types/task';
import './App.css';

const STORAGE_KEY = 'ark4na_paw_tasks_v1';

const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Component-Based UI Development dengan React & Vite',
    course: 'Pengembangan Aplikasi Web',
    deadline: '2026-11-30',
    priority: 'Tinggi',
    notes: 'Deploy ke subdomain server pribadi dan pastikan minimal 5 commit di GitHub.',
    completed: false,
  },
  {
    id: 'task-2',
    title: 'Optimasi Query Spatial PostgreSQL & PostGIS',
    course: 'Basis Data Lanjut',
    deadline: '2026-12-03',
    priority: 'Sedang',
    notes: 'Uji endpoint pencarian lokasi terdekat menggunakan koleksi Postman.',
    completed: false,
  },
  {
    id: 'task-3',
    title: 'Integrasi Room Database & Laporan PDF',
    course: 'Pengembangan Aplikasi Mobile',
    deadline: '2026-11-25',
    priority: 'Tinggi',
    notes: 'Validasi transaksi checkout dan fitur pencatatan kasbon pada aplikasi POS.',
    completed: true,
  },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return INITIAL_TASKS;
    try {
      return JSON.parse(saved) as Task[];
    } catch {
      return INITIAL_TASKS;
    }
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'about'>('dashboard');
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTaskData: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: `task-${Date.now()}`,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    setShowForm(false);
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.course.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && task.completed) ||
      (statusFilter === 'pending' && !task.completed);

    return matchesSearch && matchesStatus;
  });

  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;

  return (
    <div className="app-shell">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container">
        {activeTab === 'dashboard' ? (
          <>
            <section className="page-header">
              <div>
                <h2>Dashboard Tugas Kuliah</h2>
                <p>Kelola prioritas, tenggat waktu, dan progres mata kuliah secara terpusat.</p>
              </div>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setShowForm((prev) => !prev)}
              >
                {showForm ? 'Tutup Formulir' : '+ Tambah Tugas'}
              </button>
            </section>

            <section className="stats-grid">
              <StatCard
                label="Total Tugas"
                value={totalCount}
                subtitle="Semua mata kuliah"
              />
              <StatCard
                label="Belum Selesai"
                value={pendingCount}
                subtitle="Perlu dikerjakan"
                accent="amber"
              />
              <StatCard
                label="Selesai"
                value={completedCount}
                subtitle="Tuntas dikerjakan"
                accent="emerald"
              />
            </section>

            {showForm && (
              <TaskForm
                onAddTask={handleAddTask}
                onCancel={() => setShowForm(false)}
              />
            )}

            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              totalShown={filteredTasks.length}
            />

            <TaskList
              tasks={filteredTasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          </>
        ) : (
          <section className="about-section card">
            <h2>Informasi Mahasiswa &amp; Arsitektur Aplikasi</h2>
            <div className="info-grid">
              <div>
                <span className="info-label">Nama Lengkap</span>
                <p className="info-value">Arya Fabio Ismail</p>
              </div>
              <div>
                <span className="info-label">NIM</span>
                <p className="info-value">1247050080</p>
              </div>
              <div>
                <span className="info-label">Program Studi</span>
                <p className="info-value">Teknik Informatika &mdash; UIN Sunan Gunung Djati Bandung</p>
              </div>
              <div>
                <span className="info-label">Tech Stack</span>
                <p className="info-value">React, TypeScript, Vite, CSS3, Nginx</p>
              </div>
            </div>
            <p className="about-desc">
              Aplikasi ini dibangun dengan pola <strong>Component-Based UI Development</strong> yang
              memisahkan antarmuka menjadi 6 komponen modular (<code>Navbar</code>,{' '}
              <code>StatCard</code>, <code>TaskForm</code>, <code>FilterBar</code>,{' '}
              <code>TaskItem</code>, dan <code>TaskList</code>) dengan penyimpanan lokal otomatis via{' '}
              <code>localStorage</code>.
            </p>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>Arya Fabio Ismail (1247050080) &bull; Tugas Pengembangan Aplikasi Web</p>
      </footer>
    </div>
  );
}