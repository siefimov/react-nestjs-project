import { useLocation } from 'react-router';
import type { ProjectResponseDto } from '@/features/projects';
import { getFormattedDate } from '@/shared/utils';
import styles from './project-info.module.scss';

type Props = {
  project: ProjectResponseDto;
};

export const ProjectInfo: React.FC<Props> = ({ project }) => {
  const location = useLocation();
  const projectOwner = location.state?.projectOwner;

  return (
    <div className={styles['project-info']}>
      <div className={styles['project-info__title']}>{project.title}</div>
      <div className={styles['project-info__field']}>
        <span className={styles['project-info__label']}>ID:</span>
        <span className={styles['project-info__value']}>{project.id}</span>
      </div>
      <div className={styles['project-info__field']}>
        <span className={styles['project-info__label']}>Description:</span>
        <span className={styles['project-info__value']}>
          {project.description}
        </span>
      </div>
      <div className={styles['project-info__field']}>
        <span className={styles['project-info__label']}>Owner:</span>
        <span className={styles['project-info__value']}>{projectOwner}</span>
      </div>
      <div className={styles['project-info__field']}>
        <span className={styles['project-info__label']}>Created:</span>
        <span className={styles['project-info__value']}>
          {getFormattedDate(project.createdAt)}
        </span>
      </div>
    </div>
  );
};
