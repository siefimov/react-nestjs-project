import { useEffect, useState } from 'react';
import {
  TaskUpdateSchema,
  type Task,
  type TaskUpdateDto,
} from '../../../../schemas';
import { useEditTask, useTasks, useUsers } from '../../../../api';
import { TaskTableRow } from '../task-table-row/task-table-row';
import { useSortedItems } from '../../../../utils';
import type { TaskStatus } from '../../../../types';

type Prop = {
  projectId: number;
  filters: { status?: TaskStatus; page: number; limit: number };
  onTotalChange: (total: number) => void;
};

type InlineEditableTaskField = 'title' | 'description';

type Editing = {
  id: number | null;
  field: InlineEditableTaskField | null;
  value: string;
};

export const TaskTableBody: React.FC<Prop> = ({
  projectId,
  filters,
  onTotalChange,
}) => {
  const [editing, setEditing] = useState<Editing>({
    id: null,
    field: null,
    value: '',
  });
  const { limit, page, status } = filters;

  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useTasks({ projectId, status, limit, page });

  useEffect(() => {
    if (onTotalChange && typeof tasks?.total === 'number') {
      onTotalChange(tasks.total);
    }
  }, []);

  const { data: users } = useUsers();

  const sortedTasks = useSortedItems<Task>(
    tasks?.tasks ?? [],
    t => t.createdAt,
  );

  const editTask = useEditTask({
    onSuccess: () => setEditing({ id: null, field: null, value: '' }),
  });

  if (isLoading) {
    return (
      <tbody>
        <tr>
          <td colSpan={6}>Loading tasks...</td>
        </tr>
      </tbody>
    );
  }

  if (isError) {
    return (
      <tbody>
        <tr>
          <td colSpan={6}>Error: {error?.message || 'Failed to load tasks'}</td>
        </tr>
      </tbody>
    );
  }

  const handleTaskChange = (changes: TaskUpdateDto) => {
    const result = TaskUpdateSchema.safeParse(changes);
    if (!result.success) {
      return;
    }
    editTask.mutate({ ...changes });
  };

  return (
    <tbody>
      {sortedTasks.map((task, i) => (
        <TaskTableRow
          key={task.id}
          task={task}
          index={i}
          users={users ?? []}
          editing={editing}
          setEditing={setEditing}
          handleTaskChange={handleTaskChange}
        />
      ))}
    </tbody>
  );
};
