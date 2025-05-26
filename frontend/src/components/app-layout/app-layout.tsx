import { Link, Outlet } from 'react-router';
import styles from './app-layout.module.scss';
import { APP_ROUTES } from '../../constants';

export const AppLayout = () => {
  return (
    <div className={styles['app-layout']}>
      <header className={styles['app-layout__header']}>
        <h1 className={styles['app-layout__title']}>
          Mini Project Management App
        </h1>
      </header>
      <div className={styles['app-layout__body']}>
        <aside className={styles['app-layout__sidebar']}>
          <nav className={styles['app-layout__nav']}>
            <ul className={styles['app-layout__nav-list']}>
              <li className={styles['app-layout__nav-item']}>
                <Link to={APP_ROUTES.PROJECTS} className={styles['app-layout__nav-link']}>
                  Projects
                </Link>
              </li>
              <li className={styles['app-layout__nav-item']}>
                <Link to={APP_ROUTES.PROJECT_CREATE} className={styles['app-layout__nav-link']}>
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
    </div>
  );
};
