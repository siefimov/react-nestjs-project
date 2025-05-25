import { getFormattedDate } from '../../../../utils';
import type { Task, TaskUpdateDto, User } from '../../../../schemas';
import type { TaskStatus } from '../../../../types';
import { TaskTableCellEditable } from '../task-table-cell-editable';

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

export const TaskTableRow: React.FC<Props> = ({
  task,
  index,
  users,
  editing,
  setEditing,
  handleTaskChange,
}) => {
  const handleTitleDoubleClick = () => {
    setEditing({ id: task.id, field: 'title', value: task.title });
  };

  const handleTitleBlurOrEnter = (value: string) => {
    handleTaskChange({ id: task.id, title: value });
    // resetEditing();
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
    // resetEditing();
  };

  const resetEditing = () => {
    setEditing({ id: null, field: null, value: '' });
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleTaskChange({
      id: task.id,
      assignedUserId: e.target.value === '' ? null : Number(e.target.value),
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleTaskChange({
      id: task.id,
      status: e.target.value as TaskStatus,
    });
  };

  return (
    <tr>
      <td>{index + 1}</td>
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
      <td>
        <select
          value={task.assignedUserId ?? ''}
          onChange={handleAssigneeChange}
        >
          <option value="">assign user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </td>
      <td>
        <select value={task.status} onChange={handleStatusChange}>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </td>
      <td>{getFormattedDate(task.createdAt)}</td>
    </tr>
  );
};
