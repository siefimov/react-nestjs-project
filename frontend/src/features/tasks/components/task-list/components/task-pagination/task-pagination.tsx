import type { TaskStatus } from '@/features/tasks';
import { ArrowLeft, ArrowRight } from '@/shared/components';
import styles from './task-pagination.module.scss';

type Filters = {
  status?: TaskStatus;
  page: number;
  limit: number;
};

type Props = {
  total: number;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

export const TaskPagination: React.FC<Props> = ({
  filters,
  setFilters,
  total,
}) => {
  return (
    <div
      className={`${styles['task-list__pagination']} ${styles['pagination']}`}
    >
      <button
        className={styles['pagination__button']}
        disabled={filters.page === 1}
        onClick={() => setFilters(f => ({ ...f, page: f.page - 1 }))}
      >
        <ArrowLeft />
      </button>
      <span className={styles['pagination__value']}>Page {filters.page}</span>
      <button
        className={styles['pagination__button']}
        disabled={filters.page === Math.ceil(total / filters.limit)}
        onClick={() => setFilters(f => ({ ...f, page: f.page + 1 }))}
      >
        <ArrowRight />
      </button>
    </div>
  );
};
