import Select from 'react-select';
import { getFormattedDate } from '../../../../utils';
import type { Task, TaskUpdateDto, User } from '../../../../schemas';
import type { TaskStatus } from '../../../../types';
import { TaskTableCellEditable } from '../task-table-cell-editable';
import { AiOutlineDelete } from '../../../icons';
import styles from './task-table-row.module.scss';
import { useDeleteTask } from '../../../../api';
import { useCallback } from 'react';

type InlineEditableTaskField = 'title' | 'description';
type Editing = {
  id: number | null;
  field: InlineEditableTaskField | null;
  value: string;
};

type Props = {
  task: Task;
  index: number;
  users: User[];
  editing: Editing;
  setEditing: React.Dispatch<React.SetStateAction<Editing>>;
  handleTaskChange: (changes: TaskUpdateDto) => void;
};

const statusOptions = [
  { value: 'todo', label: 'todo', color: '#fbbf24' },
  { value: 'in_progress', label: 'in progress', color: '#3b82f6' },
  { value: 'done', label: 'done', color: '#22c55e' },
];

export const TaskTableRow: React.FC<Props> = ({
  task,
  index,
  users,
  editing,
  setEditing,
  handleTaskChange,
}) => {
  const deleteTaskMutation = useDeleteTask();

  const assigneeOptions = users.map(user => ({
    value: user.id,
    label: user.name,
  }));

  const handleDeleteTask = useCallback(
    async (id: number) => {
      deleteTaskMutation.mutateAsync(id);
    },
    [deleteTaskMutation],
  );

  const handleTitleDoubleClick = () => {
    setEditing({ id: task.id, field: 'title', value: task.title });
  };

  const handleTitleBlurOrEnter = (value: string) => {
    handleTaskChange({ id: task.id, title: value });
  };

  const handleDescriptionDoubleClick = () => {
    setEditing({
      id: task.id,
      field: 'description',
      value: task.description ?? '',
    });
  };

  const handleDescriptionBlurOrEnter = (value: string) => {
    handleTaskChange({ id: task.id, description: value });
  };

  const resetEditing = () => {
    setEditing({ id: null, field: null, value: '' });
  }; 

  return (
    <tr className={styles['task-list__row']}>
      <td className={styles['task-list__cell']}>{index + 1}</td>
      <TaskTableCellEditable
        value={task.title}
        editing={editing.id === task.id && editing.field === 'title'}
        onDoubleClick={handleTitleDoubleClick}
        editValue={editing.value}
        onChange={e => setEditing(prev => ({ ...prev, value: e.target.value }))}
        onBlurOrEnter={handleTitleBlurOrEnter}
        onEscape={resetEditing}
      />
      <TaskTableCellEditable
        value={task.description ?? ''}
        editing={editing.id === task.id && editing.field === 'description'}
        onDoubleClick={handleDescriptionDoubleClick}
        editValue={editing.value}
        onChange={e => setEditing(prev => ({ ...prev, value: e.target.value }))}
        onBlurOrEnter={handleDescriptionBlurOrEnter}
        onEscape={resetEditing}
        placeholder="add description"
      />
      <td className={styles['task-list__cell']}>
        <Select
          value={
            assigneeOptions.find(opt => opt.value === task.assignedUserId) ??
            null
          }
          onChange={option =>
            handleTaskChange({
              id: task.id,
              assignedUserId: option ? option.value : null,
            })
          }
          options={assigneeOptions}
          isClearable
          placeholder="assign user"
        />
      </td>
      <td className={styles['task-list__cell']}>
        <Select
          value={statusOptions.find(opt => opt.value === task.status)}
          onChange={option =>
            handleTaskChange({
              id: task.id,
              status: option?.value as TaskStatus,
            })
          }
          options={statusOptions}
          styles={{
            option: (provided, state) => ({
              ...provided,
              color: state.data.color,
            }),
            singleValue: (provided, state) => ({
              ...provided,
              color: state.data.color,
            }),
          }}
        />
      </td>
      <td className={`${styles['task-list__cell']}`}>
        {getFormattedDate(task.createdAt)}
      </td>
      <td className={`${styles['task-list__cell']} ${styles['action']}`}>
        <button
          className={styles['task-list__icon-btn']}
          onClick={() => handleDeleteTask(task.id)}
          aria-label="Delete"
        >
          <AiOutlineDelete />
        </button>
      </td>
    </tr>
  );
};
