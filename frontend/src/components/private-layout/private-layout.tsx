import { Outlet, Link } from 'react-router';
import { APP_ROUTES } from '../../constants';
import styles from './private-layout.module.scss';

export const PrivateLayout: React.FC = () => (
  <div className={styles['app-layout__body']}>
    <aside className={styles['app-layout__sidebar']}>
      <nav className={styles['app-layout__nav']}>
        <ul className={styles['app-layout__nav-list']}>
          <li className={styles['app-layout__nav-item']}>
            <Link
              to={APP_ROUTES.PROJECTS}
              className={styles['app-layout__nav-link']}
            >
              Projects
            </Link>
          </li>
          <li className={styles['app-layout__nav-item']}>
            <Link
              to={APP_ROUTES.PROJECT_CREATE}
              className={styles['app-layout__nav-link']}
            >
              Create Project
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
    <main className={styles['app-layout__main']}>
      <Outlet />
    </main>
  </div>
);
