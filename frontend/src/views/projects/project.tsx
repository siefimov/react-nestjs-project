import { useParams } from 'react-router';
import { useProject } from '../../api';
import { ProjectInfo, TaskList } from '../../components';
import { TaskForm } from '../../components/task-form/task-form';
import styles from './project.module.scss';

export const Project = () => {
  const { data: project, isLoading, isError, error } = useProject();
  const { id } = useParams();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !project)
    return <div>Error: {error?.message || 'Project not found'}</div>;

  return (
    <div className={styles['project-page']}>
      <div className={styles['project-page__header']}>
        <ProjectInfo project={project} />
        <TaskForm id={Number(id)} />
      </div>
      <TaskList projectId={project.id} />
    </div>
  );
};
