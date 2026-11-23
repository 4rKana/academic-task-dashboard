import type { Task } from '../types/task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state card">
        <h3>Tidak ada tugas ditemukan</h3>
        <p>Tambahkan tugas baru atau ubah kata kunci pencarian dan filter.</p>
      </div>
    );
  }

  return (
    <section className="task-list" aria-label="Daftar Tugas">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}