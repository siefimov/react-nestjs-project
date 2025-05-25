import styles from './task-list.module.scss';
import { TaskTableBody } from './components';

type Props = {
  projectId: number;
};

export const TaskList: React.FC<Props> = ({ projectId }) => {
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
            <th>actions</th>
          </tr>
        </thead>
        <TaskTableBody projectId={projectId} />
      </table>
    </div>
  );
};
