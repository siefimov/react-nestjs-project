import { Outlet, Link, NavLink } from 'react-router';
import { APP_ROUTES } from '../../constants';
import styles from './private-layout.module.scss';

export const PrivateLayout: React.FC = () => (
  <div className={styles['app-layout__body']}>
    <aside className={styles['app-layout__sidebar']}>
      <nav className={styles['app-layout__nav']}>
        <ul className={styles['app-layout__nav-list']}>
          <li className={styles['app-layout__nav-item']}>
            <NavLink
              to={APP_ROUTES.PROJECTS}
              className={({ isActive }) =>
                [
                  styles['app-layout__nav-link'],
                  isActive ? styles['app-layout__nav-link--active'] : '',
                ].join(' ')
              }
            >
              Projects
            </NavLink>
          </li>
          <li className={styles['app-layout__nav-item']}>
           <NavLink
              to={APP_ROUTES.PROJECT_CREATE}
              className={({ isActive }) =>
                [
                  styles['app-layout__nav-link'],
                  isActive ? styles['app-layout__nav-link--active'] : '',
                ].join(' ')
              }
            >
              Create Project
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
    <main className={styles['app-layout__main']}>
      <Outlet />
    </main>
  </div>
);
