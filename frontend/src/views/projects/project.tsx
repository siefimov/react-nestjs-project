import { useProject } from '../../api';
import { ProjectInfo } from '../../components';
import { TaskList } from '../../components/task-list';
import styles from './project.module.scss';

export const Project = () => {
  const { data: project, isLoading, isError, error } = useProject();
  console.log(project);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !project)
    return <div>Error: {error?.message || 'Project not found'}</div>;

  return (
    <div className={styles['project-page']}>
      <ProjectInfo project={project} />
      <TaskList projectId={project.id} />
    </div>
  );
};
