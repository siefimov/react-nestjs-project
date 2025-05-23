import { Link } from 'react-router';
import { useProjects } from '../../api';
import { ProjectList } from '../../components';
import { APP_ROUTES } from '../../constants';
import styles from './projects.module.scss';

export const Projects = () => {
  const projects = useProjects();

  return (
    <div className={styles['projects-page']}>
      <div className={styles['projects-page__header']}>
        <h2 className={styles['projects-page__title']}>List of Projects</h2>
        <Link
          to={APP_ROUTES.CREATE}
          className={styles['projects-page__new-link']}
        >
          + New
        </Link>
      </div>
      {projects.isSuccess && (
        <div>
          <ProjectList projects={projects.data} />
        </div>
      )}
    </div>
  );
};
