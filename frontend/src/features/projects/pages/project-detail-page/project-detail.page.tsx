import { useParams } from 'react-router';
import { ProjectInfo, useProject } from '@/features/projects';
import { TaskForm, TaskList } from '@/features/tasks';
import styles from './project-detail-page.module.scss';

export const ProjectDetailPage = () => {
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
