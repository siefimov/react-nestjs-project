import { useProject } from '../../api';
import styles from './project.module.scss';

export const Project = () => {
  const project = useProject();
  console.log(project);

  if (!project.data) {
    return <div>Loading...</div>;
  }

  const { data: projectData } = project;
  const getFormattedDate = (date: string) => {
    return date.split('T')[0].split('-').reverse().join('.');
  };

  return (
    <div className={styles['project-page']}>
      <p className={styles['project-page__field']}>
        {' '}
        <b>ID:</b> {projectData.id}{' '}
      </p>
      <p className={styles['project-page__field']}>
        {' '}
        <b>Title:</b> {projectData.title}{' '}
      </p>
      <p className={styles['project-page__field']}>
        {' '}
        <b>Description:</b> {projectData.description}{' '}
      </p>
      <p className={styles['project-page__field']}>
        {' '}
        <b>Created:</b> {getFormattedDate(projectData.createdAt)}{' '}
      </p>
    </div>
  );
};
