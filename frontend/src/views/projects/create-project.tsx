import { useCreateProject } from '../../api';
import { ProjectForm } from '../../components/project-form';
import type { NewProjectFormValues } from '../../types';

export const CreateProject = () => {
  const createProject = useCreateProject();
  const onSubmit = async (data: NewProjectFormValues) =>
    createProject.mutate(data);

  return (
    <div>
      <h2>NewProject</h2>
      {createProject.isPending && <div>Loading...</div>}

      {createProject.error && (
        <div>An error occured: {createProject.error.message}</div>
      )}

      <ProjectForm onSubmit={onSubmit} />
    </div>
  );
};
