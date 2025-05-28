import { useCreateProject } from '../../api';
import { ProjectForm } from '../../components/project-form/project-form';
import type { ProjectCreateDto } from '../../schemas';
import styles from './create-project.module.scss';

export const CreateProject = () => {
  const createProject = useCreateProject();
  const onSubmit = async (data: ProjectCreateDto) => createProject.mutate(data);

  return (
    <div className={styles['new-project']}>
      <h2 className={styles['new-project__title']}>NewProject</h2>
      {createProject.isPending && <div>Loading...</div>}

      {createProject.error && (
        <div>An error occured: {createProject.error.message}</div>
      )}

      <ProjectForm onSubmit={onSubmit} />
    </div>
  );
};
