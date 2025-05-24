import { useTasks } from '../../api';
import { getFormattedDate } from '../../utils';
import styles from './task-list.module.scss';

type Props = {
  projectId: number;
};

export const TaskList: React.FC<Props> = ({ projectId }) => {
  const { data: tasks, isLoading, isError, error } = useTasks(projectId);

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message || 'Failed to load tasks'}</div>;
  }

  return (
    <div className={styles['task-list']}>
      <table className={styles['task-list__table']}>
        <thead>
          <tr>
            <th>#</th>
            <th>title</th>
            <th>description</th>
            <th>assignee</th>
            <th>status</th>
            <th>created</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task, i) => (
            <tr key={task.id}>
              <td>{i + 1}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td></td>
              <td>{task.status}</td>
              <td>{getFormattedDate(task.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
