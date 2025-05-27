import { Outlet, useNavigate } from 'react-router';
import clsx from 'clsx';
import { useAuthStore } from '../../store/auth-store';
import { APP_ROUTES } from '../../constants';
import styles from './app-layout.module.scss';

export const AppLayout = () => {
  const { user, logout } = useAuthStore(state => state);
  const navigte = useNavigate();

  const handleLogout = () => {
    logout();
    navigte(APP_ROUTES.LOGIN);
  };

  return (
    <div className={styles['app-layout']}>
      <header className={clsx(styles['app-layout__header'], styles['header'])}>
        <h1 className={styles['header__title']}>Mini Project Management App</h1>
        {user && (
          <div className={styles['header__user-block']}>
            <span className={styles['header__name']}>
              Welcome, {user.name}!
            </span>
            <button className={styles['header__logout']} onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </header>
      <Outlet />
    </div>
  );
};
