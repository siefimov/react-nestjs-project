import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProjectSchema, type NewProjectFormValues } from '../../types';
import { APP_ROUTES } from '../../constants';
import styles from './project-form.module.scss';

type Props = {
  onSubmit: (data: NewProjectFormValues) => void;
};

export const ProjectForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
    reset,
  } = useForm<NewProjectFormValues>({
    resolver: zodResolver(createProjectSchema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  const handleFormSubmit = (data: NewProjectFormValues) => {
    onSubmit(data);
    reset();
    setFocus('title');
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={styles['project-form']}
    >
      <div className={styles['project-form__field']}>
        <label className={styles['project-form__label']}>Title</label>
        <input
          className={styles['project-form__input']}
          {...register('title', {
            required: 'Title is required',
            minLength: 1,
            maxLength: 100,
          })}
        />
        {errors.title && (
          <span className={styles['project-form__error']}>
            {errors.title.message}
          </span>
        )}
      </div>
      <div className={styles['project-form__field']}>
        <label className={styles['project-form__label']}>Description</label>
        <textarea
          className={styles['project-form__textarea']}
          {...register('description')}
        />
      </div>
      <div className={styles['project-form__field']}>
        <label className={styles['project-form__label']}>Owner ID</label>
        <input
          type="number"
          className={styles['project-form__input']}
          {...register('ownerId', {
            required: 'Owner ID is required',
            min: 1,
            valueAsNumber: true,
          })}
        />
        {errors.ownerId && (
          <span className={styles['project-form__error']}>
            {errors.ownerId.message}
          </span>
        )}
      </div>
      <div className={styles['project-form__actions']}>
        <button type="submit" disabled={isSubmitting}>
          Create Project
        </button>
        <button type="button" onClick={() => navigate(APP_ROUTES.PROJECTS)}>
          Назад до списку проектів
        </button>
      </div>
    </form>
  );
};
