import type { TaskStatus } from '../../../../types';
import styles from './task-list-filters.module.scss';

type Props = {
  filters: { status?: TaskStatus; page: number; limit: number };
  setFilters: React.Dispatch<
    React.SetStateAction<{ status?: TaskStatus; page: number; limit: number }>
  >;
};

export const TaskListFilters: React.FC<Props> = ({ filters, setFilters }) => (
  <div className={styles['task-list__filters']}>
    <select
      value={filters.status ?? ''}
      onChange={e =>
        setFilters(f => ({
          ...f,
          status: (e.target.value as TaskStatus) || undefined,
          page: 1,
        }))
      }
    >
      <option value="">All statuses</option>
      <option value="todo">Todo</option>
      <option value="in_progress">In progress</option>
      <option value="done">Done</option>
    </select>
    <input
      type="number"
      min={1}
      value={filters.limit}
      onChange={e =>
        setFilters(f => ({ ...f, limit: Number(e.target.value), page: 1 }))
      }
    />
  </div>
);
