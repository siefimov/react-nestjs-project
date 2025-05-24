import { useLocation } from 'react-router';
import type { ProjectResponseDto } from '../../schemas';
import { getFormattedDate } from '../../utils';
import styles from './project-info.module.scss';

type Props = {
  project: ProjectResponseDto;
};

export const ProjectInfo: React.FC<Props> = ({ project }) => {
  const location = useLocation();
  const projectOwner = location.state?.projectOwner;

  return (
    <div>
      <p className={styles['project-page__field']}>
        <b>ID:</b> {project.id}
      </p>
      <p className={styles['project-page__field']}>
        <b>Title:</b> {project.title}
      </p>
      <p className={styles['project-page__field']}>
        <b>Description:</b> {project.description}
      </p>
      <p className={styles['project-page__field']}>
        <b>Owner:</b> {projectOwner}
      </p>
      <p className={styles['project-page__field']}>
        <b>Created:</b> {getFormattedDate(project.createdAt)}
      </p>
    </div>
  );
};
