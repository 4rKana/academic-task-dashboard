import { useState, type FormEvent } from 'react';
import type { Priority, Task } from '../types/task';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  onCancel: () => void;
}

export function TaskForm({ onAddTask, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<Priority>('Sedang');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !course.trim() || !deadline) {
      setError('Judul tugas, mata kuliah, dan tenggat waktu wajib diisi.');
      return;
    }

    onAddTask({
      title: title.trim(),
      course: course.trim(),
      deadline,
      priority,
      notes: notes.trim(),
    });

    setTitle('');
    setCourse('');
    setDeadline('');
    setPriority('Sedang');
    setNotes('');
    setError('');
  };

  return (
    <form className="task-form card" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>Tambah Tugas Baru</h2>
        <button type="button" className="btn-ghost" onClick={onCancel}>
          Tutup
        </button>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="form-grid">
        <label className="field">
          <span>Judul Tugas</span>
          <input
            type="text"
            placeholder="Contoh: Implementasi REST API"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="field">
          <span>Mata Kuliah</span>
          <input
            type="text"
            placeholder="Contoh: Pengembangan Aplikasi Web"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
        </label>

        <label className="field">
          <span>Tenggat Waktu</span>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </label>

        <label className="field">
          <span>Prioritas</span>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="Tinggi">Tinggi</option>
            <option value="Sedang">Sedang</option>
            <option value="Rendah">Rendah</option>
          </select>
        </label>
      </div>

      <label className="field">
        <span>Catatan Tambahan (Opsional)</span>
        <textarea
          rows={2}
          placeholder="Detail pengerjaan, link repo, atau ketentuan khusus..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          Simpan Tugas
        </button>
      </div>
    </form>
  );
}