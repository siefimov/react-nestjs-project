import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUsers } from '../../api/users/use-get-users';
import { TASK_STATUS } from '../../constants/task-status.const';
import {
  TaskCreateSchema,
  type TaskCreateDto,
} from '../../schemas/task/task.schems';
import { useCreateTask } from '../../api/tasks/use-create-task';
import styles from './task-form.module.scss';

type Props = {
  id: number;
};

export const TaskForm: React.FC<Props> = ({ id }) => {
  const { data: users = [] } = useUsers();
  const createTask = useCreateTask();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setError,
  } = useForm<TaskCreateDto>({
    resolver: zodResolver(TaskCreateSchema),
  });

  const handleFormSubmit = (data: TaskCreateDto) => {
    const payload = {
      ...data,
      projectId: Number(id),
    };

    createTask.mutate(payload, {
      onError: (err: any) => {
        setError('root', { message: err?.message || 'Failed to create task' });
      },
      onSuccess: () => {
        reset({
          title: '',
          description: '',
          status: TASK_STATUS.TODO,
          assignedUserId: null,
        });
      },
    });
  };

  return (
    <form
      className={styles['task-form']}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className={styles['task-form__field-wrapper']}>
        <div className={styles['task-form__field']}>
          <label className={styles['task-form__label']}></label>
          <input
            type="text"
            className={styles['task-form__input']}
            placeholder="title"
            {...register('title')}
          />
          {errors.title && (
            <span className={styles['task-form__error']}>
              {errors.title.message}
            </span>
          )}
        </div>
        <div className={styles['task-form__field']}>
          <label className={styles['task-form__label']}></label>
          <textarea
            className={styles['task-form__textarea']}
            placeholder="description"
            {...register('description')}
          />
          {errors.description && (
            <span className={styles['task-form__error']}>
              {errors.description.message}
            </span>
          )}
        </div>
      </div>
      <div className={styles['task-form__field-wrapper']}>
        <div className={styles['task-form__field']}>
          <label className={styles['task-form__label']}></label>
          <Controller
            control={control}
            name="assignedUserId"
            render={({ field }) => (
              <select
                className={styles['task-form__select']}
                value={field.value ?? ''}
                onChange={e =>
                  field.onChange(
                    e.target.value === '' ? null : Number(e.target.value),
                  )
                }
              >
                <option value="">Not assigned</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.assignedUserId && (
            <span className={styles['task-form__error']}>
              {errors.assignedUserId.message}
            </span>
          )}
        </div>
        <div className={styles['task-form__field']}>
          <label className={styles['task-form__label']}></label>
          <select
            className={styles['task-form__select']}
            {...register('status')}
          >
            {Object.values(TASK_STATUS).map(s => (
              <option key={s} value={s}>
                {s.replace('_', ' ').toUpperCase()}
              </option>
            ))}
          </select>
          {errors.status && (
            <span className={styles['task-form__error']}>
              {errors.status.message}
            </span>
          )}
        </div>
        <button className={styles['task-form__button']} type="submit">
          Create Task
        </button>
      </div>
      {errors.root && (
        <div className={styles['task-form__error']}>{errors.root.message}</div>
      )}
    </form>
  );
};
