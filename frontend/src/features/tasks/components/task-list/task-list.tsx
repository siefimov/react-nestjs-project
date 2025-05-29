import styles from './task-list.module.scss';
import { TaskPagination, TaskTableBody } from './components';
import type { TaskStatus } from '../../shared/types';
import { useState } from 'react';
import { TaskListFilters } from './components/task-list-filters';

type Props = {
  projectId: number;
};

export const TaskList: React.FC<Props> = ({ projectId }) => {
  const [filters, setFilters] = useState<{
    status?: TaskStatus;
    page: number;
    limit: number;
  }>({ limit: 10, page: 1, status: undefined });
  const [total, setTodal] = useState(0);

  return (
    <div className={styles['task-list']}>
      <div className={styles['task-list__scroll']}>
        <TaskListFilters filters={filters} setFilters={setFilters} />
        <table className={styles['task-list__table']}>
          <thead>
            <tr>
              <th>#</th>
              <th>title</th>
              <th>description</th>
              <th>assignee</th>
              <th>status</th>
              <th>created</th>
              <th>actions</th>
            </tr>
          </thead>
          <TaskTableBody
            projectId={projectId}
            filters={filters}
            onTotalChange={setTodal}
          />
        </table>
        <TaskPagination
          filters={filters}
          setFilters={setFilters}
          total={total}
        />
      </div>
    </div>
  );
};
