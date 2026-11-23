export type Priority = 'Tinggi' | 'Sedang' | 'Rendah';
export type FilterStatus = 'all' | 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  course: string;
  deadline: string;
  priority: Priority;
  notes: string;
  completed: boolean;
}