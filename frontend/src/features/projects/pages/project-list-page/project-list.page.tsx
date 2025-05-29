import { Link } from 'react-router';
import { ProjectList, useProjects } from '@/features';
import { APP_ROUTES } from '@/shared/constants';
import styles from './project-list-page.module.scss';

export const ProjectListPage = () => {
  const projects = useProjects();

  return (
    <div className={styles['projects-page']}>
      <div className={styles['projects-page__header']}>
        <h2 className={styles['projects-page__title']}>List of Projects</h2>
        <Link
          to={APP_ROUTES.PROJECT_CREATE}
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
