import { useState } from 'react';
import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <article className={`task-item card ${task.completed ? 'is-completed' : ''}`}>
      <div className="task-main">
        <div className="task-left">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            aria-label={`Tandai ${task.title} selesai`}
          />
          <div>
            <div className="task-meta">
              <span className="course-tag">{task.course}</span>
              <span className={`priority-tag priority-${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
              <span className="deadline-tag">Deadline: {task.deadline}</span>
            </div>
            <h3 className="task-title">{task.title}</h3>
          </div>
        </div>

        <div className="task-actions">
          {task.notes && (
            <button
              type="button"
              className="btn-ghost"
              onClick={() => setShowNotes((prev) => !prev)}
            >
              {showNotes ? 'Sembunyikan Detail' : 'Lihat Detail'}
            </button>
          )}
          <button
            type="button"
            className="btn-danger"
            onClick={() => onDelete(task.id)}
          >
            Hapus
          </button>
        </div>
      </div>

      {showNotes && task.notes && (
        <div className="task-notes">
          <strong>Catatan:</strong> {task.notes}
        </div>
      )}
    </article>
  );
}