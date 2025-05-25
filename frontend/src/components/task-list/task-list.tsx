import { useState } from 'react';
import { useEditTask, useTasks, useUsers } from '../../api';
import type { Task, TaskUpdateDto } from '../../schemas';

import { getFormattedDate, useSortedItems } from '../../utils';
import styles from './task-list.module.scss';
import type { TaskStatus } from '../../types';

type Props = {
  projectId: number;
};

export const TaskList: React.FC<Props> = ({ projectId }) => {
  const [editing, setEditing] = useState<{
    id: number | null;
    field: 'title' | 'description' | null;
    value: string;
  }>({ id: null, field: null, value: '' });
  const { data: tasks, isLoading, isError, error } = useTasks(projectId);
  const { data: users } = useUsers();
  const editTask = useEditTask();
  const sortedTasks = useSortedItems<Task>(tasks ?? [], t => t.createdAt);

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message || 'Failed to load tasks'}</div>;
  }

  const handleTaskChange = (changes: TaskUpdateDto) => {
    if ('title' in changes && !changes.title?.trim()) {
      return;
    }
    editTask.mutate({ ...changes });
  };

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
          {sortedTasks.map((task, i) => (
            <tr key={task.id}>
              <td>{i + 1}</td>
              <td
                onDoubleClick={() =>
                  setEditing({ id: task.id, field: 'title', value: task.title })
                }
              >
                {editing.id === task.id && editing.field === 'title' ? (
                  <input
                    value={editing.value}
                    autoFocus
                    onChange={e =>
                      setEditing({ ...editing, value: e.target.value })
                    }
                    onBlur={() => {
                      handleTaskChange({ id: task.id, title: editing.value });
                      setEditing({ id: null, field: null, value: '' });
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        handleTaskChange({ id: task.id, title: editing.value });
                        setEditing({ id: null, field: null, value: '' });
                      }
                      if (e.key === 'Escape') {
                        setEditing({ id: null, field: null, value: '' });
                      }
                    }}
                  />
                ) : (
                  task.title
                )}
              </td>
              <td
                onDoubleClick={() =>
                  setEditing({
                    id: task.id,
                    field: 'description',
                    value: task.description ?? '',
                  })
                }
              >
                {editing.id === task.id && editing.field === 'description' ? (
                  <input
                    value={editing.value}
                    autoFocus
                    onChange={e =>
                      setEditing({ ...editing, value: e.target.value })
                    }
                    onBlur={() => {
                      handleTaskChange({
                        id: task.id,
                        description: editing.value,
                      });
                      setEditing({ id: null, field: null, value: '' });
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        handleTaskChange({
                          id: task.id,
                          description: editing.value,
                        });
                        setEditing({ id: null, field: null, value: '' });
                      }
                      if (e.key === 'Escape') {
                        setEditing({ id: null, field: null, value: '' });
                      }
                    }}
                  />
                ) : task.description ? (
                  task.description
                ) : (
                  <span
                    style={{
                      color: '#a1a7bb',
                      fontSize: '12px',
                      fontStyle: 'italic',
                    }}
                  >
                    add description
                  </span>
                )}
              </td>
              <td>
                {task.assignedUserId ? (
                  <select>
                    <option value="">
                      {
                        users?.find(user => user.id === task.assignedUserId)
                          ?.name
                      }
                    </option>
                    {users?.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    value={task.assignedUserId ?? ''}
                    onChange={e =>
                      handleTaskChange({
                        id: task.id,
                        assignedUserId:
                          e.target.value === '' ? null : Number(e.target.value),
                      })
                    }
                  >
                    <option value="">assign user</option>
                    {users?.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                )}
              </td>
              <td>
                <select
                  value={task.status}
                  onChange={e =>
                    handleTaskChange({
                      id: task.id,
                      status: e.target.value as TaskStatus,
                    })
                  }
                >
                  <option value="todo">Todo</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </td>
              <td>{getFormattedDate(task.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
