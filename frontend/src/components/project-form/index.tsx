import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createProjectSchema,
  type NewProjectFormValues,
  type CreateProjectRequestDto,
} from '../../types';
import { APP_ROUTES } from '../../constants';

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
  } = useForm<CreateProjectRequestDto>({
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
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label>Title</label>
        <input
          {...register('title', {
            required: 'Title is required',
            minLength: 1,
            maxLength: 100,
          })}
        />
        {errors.title && <span>{errors.title.message}</span>}
      </div>
      <div>
        <label>Description</label>
        <textarea {...register('description')} />
      </div>
      <div>
        <label>Owner ID</label>
        <input
          type="number"
          {...register('ownerId', {
            required: 'Owner ID is required',
            min: 1,
            valueAsNumber: true,
          })}
        />
        {errors.ownerId && <span>{errors.ownerId.message}</span>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        Create Project
      </button>

      <button
        type="button"
        style={{ marginLeft: '1rem' }}
        onClick={() => navigate(APP_ROUTES.PROJECTS)}
      >
        Назад до списку проектів
      </button>
    </form>
  );
};
