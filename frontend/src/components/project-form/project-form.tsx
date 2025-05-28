import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { APP_ROUTES } from '../../constants';
import styles from './project-form.module.scss';
import { type ProjectCreateDto, ProjectCreateSchema } from '../../schemas';
import { useAuthStore } from '../../store/auth-store';
import { toast } from 'react-toastify';

type Props = {
  onSubmit: (data: ProjectCreateDto) => void;
};

export const ProjectForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
    reset,
  } = useForm<ProjectCreateDto>({
    resolver: zodResolver(ProjectCreateSchema),
  });

  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  const handleFormSubmit = (data: ProjectCreateDto) => {
    if (!user) {
      toast.error('You must be logged in to create a project');
      return;
    }
    onSubmit({ ...data, ownerId: user.id });
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
          {...register('title')}
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
      <div className={styles['project-form__actions']}>
        <button type="submit" disabled={isSubmitting}>
          Create Project
        </button>
        <button
          className={styles['project-form__button-back']}
          type="button"
          onClick={() => navigate(APP_ROUTES.PROJECTS)}
        >
          Back to projects
        </button>
      </div>
    </form>
  );
};
